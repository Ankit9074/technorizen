import React, { useState, useEffect, RefObject } from "react";
import { useDndContext, useDashboardStore, useSelectedElementStore } from "@/store/dashboard";
import { useDroppable } from "@dnd-kit/core";
import { EmptyCanvasIcon } from "@/components/ui/icon";
import { CanvasElement } from "../../components/dashboard/elements/CanvasElement";
import { cn } from "@/lib/utils";

interface CanvasProps {
  canvasRef?: RefObject<HTMLDivElement>;
}

export function Canvas({ canvasRef }: CanvasProps) {
  const { elements } = useDashboardStore();
  const { isDragging, isOver } = useDndContext();
  const { selectedElement } = useSelectedElementStore();
  
  const { setNodeRef, isOver: isOverDrop } = useDroppable({
    id: "canvas-drop-area",
  });
  
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [showGrid, setShowGrid] = useState(false);
  const [snapLines, setSnapLines] = useState<{
    horizontal: number[],
    vertical: number[]
  }>({
    horizontal: [],
    vertical: []
  });
  
  // Set up a combined ref function that works with both our ref and the droppable ref
  const setRefs = (node: HTMLDivElement | null) => {
    setNodeRef(node);
    // Safe way to set ref that doesn't modify the read-only current property
    if (canvasRef && node) {
      (canvasRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }
  };

  // Update canvas size for grid when it changes
  useEffect(() => {
    if (canvasRef?.current) {
      const updateSize = () => {
        const node = canvasRef.current;
        if (node) {
          setCanvasSize({
            width: node.offsetWidth,
            height: node.offsetHeight
          });
        }
      };
      
      updateSize();
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    }
  }, [canvasRef]);
  
  // Show alignment grid during drag
  useEffect(() => {
    setShowGrid(isDragging || isOver || isOverDrop);
  }, [isDragging, isOver, isOverDrop]);
  
  // Generate snap lines for alignment
  useEffect(() => {
    if (selectedElement && elements.length > 1) {
      const horizontal: number[] = [];
      const vertical: number[] = [];
      
      // Add canvas center lines
      horizontal.push(canvasSize.height / 2);
      vertical.push(canvasSize.width / 2);
      
      // Add lines for each element's edges
      elements.forEach(element => {
        if (element.id !== selectedElement.id) {
          // Top and bottom edges
          horizontal.push(element.position.y);
          horizontal.push(element.position.y + (element.position.height || 0));
          
          // Center of element
          horizontal.push(element.position.y + (element.position.height || 0) / 2);
          
          // Left and right edges
          vertical.push(element.position.x);
          vertical.push(element.position.x + (element.position.width || 0));
          
          // Center of element
          vertical.push(element.position.x + (element.position.width || 0) / 2);
        }
      });
      
      setSnapLines({ horizontal, vertical });
    }
  }, [selectedElement, elements, canvasSize]);

  const isEmpty = elements.length === 0;
  
  // Determine which grid lines to show based on proximity
  const getVisibleAlignmentGuides = (element: ElementType) => {
    if (!selectedElement || element.id === selectedElement.id) return null;
    
    const guides = [];
    const threshold = 5; // Proximity threshold in pixels
    
    // Check for horizontal alignment
    if (Math.abs(selectedElement.position.y - element.position.y) < threshold) {
      guides.push(
        <div 
          key={`h-guide-${element.id}-top`}
          className="alignment-guide absolute left-0 right-0 h-px bg-purple-500 z-50"
          style={{ top: `${element.position.y}px` }}
        />
      );
    }
    
    // Check for vertical alignment
    if (Math.abs(selectedElement.position.x - element.position.x) < threshold) {
      guides.push(
        <div 
          key={`v-guide-${element.id}-left`}
          className="alignment-guide absolute top-0 bottom-0 w-px bg-purple-500 z-50"
          style={{ left: `${element.position.x}px` }}
        />
      );
    }
    
    // Check for center alignment (horizontal)
    const selectedCenterY = selectedElement.position.y + (selectedElement.position.height || 0) / 2;
    const elementCenterY = element.position.y + (element.position.height || 0) / 2;
    
    if (Math.abs(selectedCenterY - elementCenterY) < threshold) {
      guides.push(
        <div 
          key={`h-guide-${element.id}-center`}
          className="alignment-guide absolute left-0 right-0 h-px bg-purple-500 z-50"
          style={{ top: `${elementCenterY}px` }}
        />
      );
    }
    
    // Check for center alignment (vertical)
    const selectedCenterX = selectedElement.position.x + (selectedElement.position.width || 0) / 2;
    const elementCenterX = element.position.x + (element.position.width || 0) / 2;
    
    if (Math.abs(selectedCenterX - elementCenterX) < threshold) {
      guides.push(
        <div 
          key={`v-guide-${element.id}-center`}
          className="alignment-guide absolute top-0 bottom-0 w-px bg-purple-500 z-50"
          style={{ left: `${elementCenterX}px` }}
        />
      );
    }
    
    return guides.length > 0 ? guides : null;
  };

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div 
        ref={setRefs}
        className={cn(
          "canvas-drop-area bg-white border border-dashed rounded-lg min-h-[600px] relative p-6",
          isOverDrop ? "dragging-over" : ""
        )}
      >
        {/* Alignment Grid */}
        {showGrid && (
          <div className="alignment-grid absolute inset-0 pointer-events-none">
            {/* Vertical center line */}
            <div className="vertical-center-line absolute top-0 bottom-0 w-px bg-blue-400 opacity-50" 
                 style={{ left: `${canvasSize.width / 2}px` }} />
            
            {/* Horizontal center line */}
            <div className="horizontal-center-line absolute left-0 right-0 h-px bg-blue-400 opacity-50" 
                 style={{ top: `${canvasSize.height / 2}px` }} />
            
            {/* Grid lines - vertical */}
            <div className="grid-lines vertical">
              {Array.from({ length: 10 }).map((_, i) => (
                <div 
                  key={`v-${i}`} 
                  className="grid-line vertical absolute top-0 bottom-0 w-px bg-gray-200 opacity-30"
                  style={{ left: `${(i + 1) * (canvasSize.width / 10)}px` }}
                />
              ))}
            </div>
            
            {/* Grid lines - horizontal */}
            <div className="grid-lines horizontal">
              {Array.from({ length: 10 }).map((_, i) => (
                <div 
                  key={`h-${i}`} 
                  className="grid-line horizontal absolute left-0 right-0 h-px bg-gray-200 opacity-30"
                  style={{ top: `${(i + 1) * (canvasSize.height / 10)}px` }}
                />
              ))}
            </div>
            
            {/* Dynamic alignment guides */}
            {selectedElement && elements.map(element => 
              getVisibleAlignmentGuides(element)
            )}
          </div>
        )}

        {/* Canvas Content */}
        <div className="canvas-content relative" style={{ minHeight: '100%' }}>
          {!isEmpty ? (
            <>
              {/* Render only top-level elements (elements without parents) */}
              {elements
                .filter(element => !element.parentId)
                .map((element) => (
                  <CanvasElement 
                    key={element.id} 
                    element={element} 
                  />
                ))
              }
              
              {/* Render container children inside their parent containers */}
              {/* They will be positioned by the container element */}
            </>
          ) : (
            <div className="text-center p-12 border-2 border-dashed border-neutral-light rounded-lg">
              <div className="text-neutral-medium mb-3">
                <EmptyCanvasIcon className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-neutral-dark mb-1">Your canvas is empty</h3>
              <p className="text-neutral-medium">Drag and drop elements from the sidebar to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
