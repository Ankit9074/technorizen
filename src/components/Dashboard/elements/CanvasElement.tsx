import React, { useEffect, useRef, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { BurgerMenuIcon, CloseCrossIcon } from "@/components/ui/icon";
import { useDashboardStore, useSelectedElementStore } from "@/store/dashboard";
import { TextElement } from "./TextElement";
import { ContainerElement } from "./ContainerElement";
import { CSS } from "@dnd-kit/utilities";
import ElementType from "@/lib/elements"

interface CanvasElementProps {
  element: ElementType;
  isDragOverlay?: boolean;
}

export function CanvasElement({ element, isDragOverlay = false }: CanvasElementProps) {
  const { removeElement, updateElementPosition } = useDashboardStore();
  const { selectedElement, setSelectedElement, updateSelectedElement } = useSelectedElementStore();
  const elementRef = useRef<HTMLDivElement>(null);
  
  // State for resize and rotation
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [startDimensions, setStartDimensions] = useState({ width: 0, height: 0 });
  const [rotation, setRotation] = useState(element.style.rotation || 0);
  const [isRotating, setIsRotating] = useState(false);
  const [originalRotation, setOriginalRotation] = useState(0);
  const [flipped, setFlipped] = useState({ 
    horizontal: element.style.flipHorizontal || false, 
    vertical: element.style.flipVertical || false 
  });
  
  // Only set up draggable if this isn't a drag overlay
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `canvas-${element.id}`,
    data: {
      type: 'canvas-element',
      element
    },
    disabled: isDragOverlay || isResizing || isRotating
  });

  const isSelected = selectedElement?.id === element.id;

  // Update element when rotation or flip changes
  useEffect(() => {
    if (!isDragOverlay && (isSelected || isResizing || isRotating)) {
      const updatedElement = {
        ...element,
        style: {
          ...element.style,
          rotation,
          flipHorizontal: flipped.horizontal,
          flipVertical: flipped.vertical
        }
      };
      
      // If element is selected, update it in the store
      if (isSelected) {
        setSelectedElement(updatedElement);
      }
    }
  }, [rotation, flipped, isSelected, isResizing, isRotating]);

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedElement(element);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeElement(element.id);
    if (isSelected) {
      setSelectedElement(null);
    }
  };
  
  // Resizing handlers
  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    e.preventDefault();
    
    setIsResizing(true);
    setResizeDirection(direction);
    setStartPosition({ x: e.clientX, y: e.clientY });
    
    // Get current dimensions
    const width = element.position.width || elementRef.current?.offsetWidth || 100;
    const height = element.position.height || elementRef.current?.offsetHeight || 50;
    setStartDimensions({ width, height });
    
    // Add event listeners for mouse move and up
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', handleResizeEnd);
  };
  
  const handleResize = (e: MouseEvent) => {
    if (!isResizing || !resizeDirection) return;
    
    // Calculate grid snap size (10px grid)
    const gridSize = 10;
    
    const deltaX = e.clientX - startPosition.x;
    const deltaY = e.clientY - startPosition.y;
    
    let newWidth = startDimensions.width;
    let newHeight = startDimensions.height;
    let newX = element.position.x;
    let newY = element.position.y;
    
    // Update width/height/position based on which handle is being dragged
    switch (resizeDirection) {
      case 'top-left':
        newWidth = startDimensions.width - deltaX;
        newHeight = startDimensions.height - deltaY;
        newX = element.position.x + deltaX;
        newY = element.position.y + deltaY;
        break;
      case 'top-right':
        newWidth = startDimensions.width + deltaX;
        newHeight = startDimensions.height - deltaY;
        newY = element.position.y + deltaY;
        break;
      case 'bottom-left':
        newWidth = startDimensions.width - deltaX;
        newHeight = startDimensions.height + deltaY;
        newX = element.position.x + deltaX;
        break;
      case 'bottom-right':
        newWidth = startDimensions.width + deltaX;
        newHeight = startDimensions.height + deltaY;
        break;
    }
    
    // Snap to grid
    newWidth = Math.round(newWidth / gridSize) * gridSize;
    newHeight = Math.round(newHeight / gridSize) * gridSize;
    newX = Math.round(newX / gridSize) * gridSize;
    newY = Math.round(newY / gridSize) * gridSize;
    
    // Ensure minimum dimensions based on element type
    let minWidth = 50;
    let minHeight = 30;
    
    // Container elements should have larger minimum dimensions
    if (element.type === 'section' || element.type === 'container' || element.type === 'grid') {
      minWidth = 200;
      minHeight = 100;
    }
    
    newWidth = Math.max(minWidth, newWidth);
    newHeight = Math.max(minHeight, newHeight);
    
    // Update element position and dimensions in real-time
    if (elementRef.current) {
      elementRef.current.style.width = `${newWidth}px`;
      elementRef.current.style.height = `${newHeight}px`;
      elementRef.current.style.top = `${newY}px`;
      elementRef.current.style.left = `${newX}px`;
    }
    
    // Store the latest dimensions to apply when resize ends
    (elementRef as any).latestDimensions = {
      x: newX,
      y: newY,
      width: newWidth,
      height: newHeight
    };
  };
  
  const handleResizeEnd = () => {
    setIsResizing(false);
    setResizeDirection(null);
    
    // Apply the final dimensions to the element in the store
    if ((elementRef as any).latestDimensions) {
      updateElementPosition(element.id, (elementRef as any).latestDimensions);
      (elementRef as any).latestDimensions = null;
    }
    
    // Clean up event listeners
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', handleResizeEnd);
  };
  
  // Rotation handlers
  const handleRotateStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    setIsRotating(true);
    setOriginalRotation(rotation);
    
    // Calculate center of element
    const rect = elementRef.current?.getBoundingClientRect();
    const centerX = rect ? rect.left + rect.width / 2 : 0;
    const centerY = rect ? rect.top + rect.height / 2 : 0;
    
    // Calculate initial angle based on mouse position
    const startAngle = Math.atan2(
      e.clientY - centerY,
      e.clientX - centerX
    ) * (180 / Math.PI);
    
    setStartPosition({ x: startAngle, y: 0 });
    
    document.addEventListener('mousemove', handleRotate);
    document.addEventListener('mouseup', handleRotateEnd);
  };
  
  const handleRotate = (e: MouseEvent) => {
    if (!isRotating || !elementRef.current) return;
    
    // Calculate center of element
    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate current angle based on mouse position
    const currentAngle = Math.atan2(
      e.clientY - centerY,
      e.clientX - centerX
    ) * (180 / Math.PI);
    
    // Calculate the rotation
    const newRotation = originalRotation + (currentAngle - startPosition.x);
    setRotation(newRotation);
  };
  
  const handleRotateEnd = () => {
    setIsRotating(false);
    document.removeEventListener('mousemove', handleRotate);
    document.removeEventListener('mouseup', handleRotateEnd);
  };
  
  // Handle flipping with immediate update to the element style
  const handleFlipHorizontal = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newFlipped = { ...flipped, horizontal: !flipped.horizontal };
    setFlipped(newFlipped);
    
    // Immediately update the element in the store
    updateSelectedElement({
      ...element,
      style: {
        ...element.style,
        flipHorizontal: newFlipped.horizontal,
        flipVertical: newFlipped.vertical
      }
    });
    
    // Apply the flip immediately to the element
    if (elementRef.current) {
      const newTransform = `
        rotate(${rotation}deg)
        scaleX(${newFlipped.horizontal ? -1 : 1})
        scaleY(${newFlipped.vertical ? -1 : 1})
      `;
      elementRef.current.style.transform = newTransform;
    }
  };
  
  const handleFlipVertical = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newFlipped = { ...flipped, vertical: !flipped.vertical };
    setFlipped(newFlipped);
    
    // Immediately update the element in the store
    updateSelectedElement({
      ...element,
      style: {
        ...element.style,
        flipHorizontal: newFlipped.horizontal,
        flipVertical: newFlipped.vertical
      }
    });
    
    // Apply the flip immediately to the element
    if (elementRef.current) {
      const newTransform = `
        rotate(${rotation}deg)
        scaleX(${newFlipped.horizontal ? -1 : 1})
        scaleY(${newFlipped.vertical ? -1 : 1})
      `;
      elementRef.current.style.transform = newTransform;
    }
  };

  // Apply styles
  const style: React.CSSProperties = {
    position: isDragOverlay ? 'relative' : 'absolute',
    top: element.position.y,
    left: element.position.x,
    width: element.position.width || 'auto',
    height: element.position.height || 'auto',
    backgroundColor: element.style.backgroundColor,
    ...element.style,
    transformOrigin: 'center center',
    zIndex: isSelected ? 10 : 1,
    transition: isDragOverlay ? 'none' : 'box-shadow 0.2s ease, border-color 0.2s ease'
  };

  // Apply transform separately to avoid conflicts
  const transformString = `
    ${isDragOverlay ? '' : CSS.Translate.toString(transform)}
    rotate(${rotation}deg)
    scaleX(${flipped.horizontal ? -1 : 1})
    scaleY(${flipped.vertical ? -1 : 1})
  `;
  
  style.transform = transformString;

  // Apply margin
  if (element.style.margin) {
    const margin = element.style.margin;
    if (margin.top) style.marginTop = margin.top;
    if (margin.right) style.marginRight = margin.right;
    if (margin.bottom) style.marginBottom = margin.bottom;
    if (margin.left) style.marginLeft = margin.left;
  }

  // Apply padding
  if (element.style.padding) {
    const padding = element.style.padding;
    if (padding.top) style.paddingTop = padding.top;
    if (padding.right) style.paddingRight = padding.right;
    if (padding.bottom) style.paddingBottom = padding.bottom;
    if (padding.left) style.paddingLeft = padding.left;
  }

  // Handle click outside to deselect
  useEffect(() => {
    if (!isDragOverlay) {
      const handleClickOutside = (event: MouseEvent) => {
        // Don't deselect if clicking in property panel
        const isPropertyPanel = (event.target as Element)?.closest('.property-panel');
        if (isPropertyPanel) return;
        
        if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
          if (isSelected && !isResizing && !isRotating) {
            setSelectedElement(null);
          }
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isSelected, setSelectedElement, isDragOverlay, isResizing, isRotating]);

  return (
    <div
      ref={(node) => {
        if (!isDragOverlay) {
          setNodeRef(node);
        }
        // Safe ref assignment
        if (elementRef && node) {
          (elementRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }}
      className={cn(
        "canvas-element bg-white border p-4 mb-4 hover:border-neutral-medium",
        isSelected ? "selected" : "", 
        isDragOverlay ? "element-drag-preview" : "",
        isResizing ? "resizing" : "",
        isRotating ? "rotating" : ""
      )}
      style={style}
      onClick={!isDragOverlay ? handleSelect : undefined}
      {...(!isDragOverlay ? attributes : {})}
      {...(!isDragOverlay && !isResizing && !isRotating ? listeners : {})}
    >
      {/* Text Elements */}
      {element.type === 'heading' && <TextElement element={element} isHeading />}
      {element.type === 'paragraph' && <TextElement element={element} />}
      {element.type === 'label' && <TextElement element={element} isLabel />}
      {element.type === 'textBlock' && <TextElement element={element} isBlock />}
      {element.type === 'textLink' && <TextElement element={element} isLink />}
      
      {/* Container Elements */}
      {element.type === 'section' && <ContainerElement element={element} isSection />}
      {element.type === 'container' && <ContainerElement element={element} />}
      {element.type === 'grid' && <ContainerElement element={element} isGrid />}
      {element.type === 'columns' && <ContainerElement element={element} isColumns />}
      
      {/* Show controls only if selected and not in drag overlay */}
      {isSelected && !isDragOverlay && (
        <>
          {/* Menu and Delete Controls - Top right */}
          <div className="element-controls absolute -top-3 -right-3 bg-white shadow rounded border border-neutral-light z-20">
            <button className="p-1 text-neutral-dark hover:text-primary" onClick={handleSelect}>
              <BurgerMenuIcon className="w-4 h-4" />
            </button>
            <button className="p-1 text-neutral-dark hover:text-red-500" onClick={handleDelete}>
              <CloseCrossIcon className="w-4 h-4" />
            </button>
          </div>
          
          {/* Rotation handle - Top center */}
          <div 
            className="rotate-handle"
            onMouseDown={handleRotateStart}
            title="Rotate"
          >
            <svg viewBox="0 0 24 24" className="w-3 h-3 text-white m-1" fill="none" stroke="currentColor">
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          
          {/* Flip controls - Top left */}
          <div className="flip-controls-container absolute -top-3 -left-3">
            <div className="flip-controls bg-white shadow rounded border border-neutral-light">
              <button 
                className="flip-horizontal p-1 text-neutral-dark hover:text-primary"
                onClick={handleFlipHorizontal}
                title="Flip Horizontal"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor">
                  <path d="M7 16V4m0 0L3 8m4-4l4 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17 8v12m0 0l4-4m-4 4l-4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button 
                className="flip-vertical p-1 text-neutral-dark hover:text-primary"
                onClick={handleFlipVertical}
                title="Flip Vertical"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor">
                  <path d="M4 7h16M4 7l4 4M4 7l4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20 17H4m16 0l-4-4m4 4l-4 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Resize handles */}
          <div 
            className="resize-handle top-left"
            onMouseDown={(e) => handleResizeStart(e, 'top-left')}
          ></div>
          <div 
            className="resize-handle top-right"
            onMouseDown={(e) => handleResizeStart(e, 'top-right')}
          ></div>
          <div 
            className="resize-handle bottom-left"
            onMouseDown={(e) => handleResizeStart(e, 'bottom-left')}
          ></div>
          <div 
            className="resize-handle bottom-right"
            onMouseDown={(e) => handleResizeStart(e, 'bottom-right')}
          ></div>
        </>
      )}
    </div>
  );
}
