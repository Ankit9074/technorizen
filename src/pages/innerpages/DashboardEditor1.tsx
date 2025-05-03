import React, { useState, useRef, useEffect } from "react";
import { 
  DndContext, 
  DragEndEvent, 
  DragOverEvent, 
  DragStartEvent, 
  useSensor, 
  useSensors, 
  PointerSensor, 
  DragOverlay,
  MeasuringStrategy,
  rectIntersection,
  MouseSensor,
  TouchSensor,
  Modifier
} from "@dnd-kit/core";
import { Sidebar } from "../../components/dashboard/Sidebar";
import { Canvas } from "../../components/dashboard/Canvas";
import { PropertyPanel } from "../../components/dashboard/PropertyPanel";
import { DashboardTabs } from "../../components/dashboard/DashboardTabs";
import { useDndContext, useDashboardStore, useSelectedElementStore } from "@/store/dashboard";
import { createElement } from "../../components/dashboard/elements";
import { getElementById } from "../../lib/elements";
import { CanvasElement } from "../../components/dashboard/elements/CanvasElement";
import { getPositionForDrop } from "../../lib/utils";
import { DashboardOldHeader } from "@/components/dashboard/header/Old_DashboardHeader copy";
import SidebarOld from "@/components/dashboard/sidebar/Sidebar";
import { useSidebar } from "@/context/SidebarContext";


// Create a custom snap modifier for more precise positioning
const gridSize = 10; // 10px grid

const customSnapModifier: Modifier = ({transform}) => {
  // Simple grid snapping
  const x = Math.round(transform.x / gridSize) * gridSize;
  const y = Math.round(transform.y / gridSize) * gridSize;
  
  return {
    ...transform,
    x,
    y
  };
};

export default function Dashboard() {
  const { setIsDragging, setDraggedItem, setIsOver } = useDndContext();
  const { addElement, updateElementPosition, updateElementParent, elements } = useDashboardStore();
  const { selectedElement, setSelectedElement } = useSelectedElementStore();
  
  const [activeElement, setActiveElement] = useState<ElementType | null>(null);
  const [canvasRect, setCanvasRect] = useState<DOMRect | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [canvasObserver, setCanvasObserver] = useState<ResizeObserver | null>(null);
  
  // Measure canvas area and keep updated with ResizeObserver
  useEffect(() => {
    // Create a ResizeObserver to track canvas size changes
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.target === canvasRef.current) {
          setCanvasRect(entry.target.getBoundingClientRect());
        }
      }
    });
    
    setCanvasObserver(observer);
    
    // Initial measurement
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setCanvasRect(rect);
      observer.observe(canvasRef.current);
    }
    
    return () => {
      if (canvasObserver) {
        canvasObserver.disconnect();
      }
    };
  }, []);
  
  // Reconnect observer when canvas ref changes
  useEffect(() => {
    if (canvasRef.current && canvasObserver) {
      canvasObserver.observe(canvasRef.current);
      return () => {
        canvasObserver.disconnect();
      };
    }
  }, [canvasRef.current, canvasObserver]);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(MouseSensor, {
      // Require the mouse to move by 5 pixels before activating
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      // Press delay of 250ms, with tolerance of 5px of movement
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setIsDragging(true);
    const draggedData = event.active.data.current;
    setDraggedItem(draggedData);
    
    // If dragging a sidebar element, create a preview
    if (draggedData?.type && draggedData?.element && !draggedData?.type.includes('canvas')) {
      const elementDef = getElementById(draggedData.element.id);
      if (elementDef) {
        // Create a temporary element for preview with default settings
        const previewElement = createElement(elementDef.type, { x: 0, y: 0 });
        setActiveElement(previewElement);
      }
    } else if (draggedData?.type === 'canvas-element') {
      // If dragging an existing canvas element, show it
      setActiveElement(draggedData.element);
      // Maintain selection during drag
      setSelectedElement(draggedData.element);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over) {
      const draggedData = active.data.current;
      
      // Dropping on main canvas area
      if (over.id === "canvas-drop-area" && canvasRect && draggedData?.type && draggedData.element) {
        const elementDef = getElementById(draggedData.element.id);
        if (elementDef) {
          // Calculate exact drop position within canvas
          let clientX = 0;
          let clientY = 0;
          
          // Type guard to ensure we have mouse coordinates
          if (event.activatorEvent instanceof MouseEvent) {
            clientX = event.activatorEvent.clientX;
            clientY = event.activatorEvent.clientY;
          } else if ('clientX' in event.activatorEvent && 'clientY' in event.activatorEvent) {
            clientX = (event.activatorEvent as any).clientX;
            clientY = (event.activatorEvent as any).clientY;
          }
          
          const dropPosition = getPositionForDrop(
            { x: clientX, y: clientY },
            canvasRect
          );
          
          // Snap to grid
          const snappedPosition = {
            x: Math.round(dropPosition.x / gridSize) * gridSize,
            y: Math.round(dropPosition.y / gridSize) * gridSize
          };
          
          // Create and add the new element at exact drop position
          const newElement = createElement(elementDef.type, snappedPosition);
          addElement(newElement);
          // Select the newly added element
          setSelectedElement(newElement);
        }
      }
      // Dropping on a container element
      else if (over.data?.current?.type === 'container-drop-area') {
        const containerId = over.data.current.elementId;
        const containerType = over.data.current.containerType;
        
        // Get container element
        const containerElement = elements.find(el => el.id === containerId);
        
        if (containerElement && draggedData?.type && draggedData.element) {
          const elementDef = getElementById(draggedData.element.id);
          if (elementDef) {
            // Default position within container - will be relative to container
            const position = {
              x: 20, // Padding from left edge
              y: 20, // Padding from top edge
            };
            
            // Create the new element
            const newElement = createElement(elementDef.type, position);
            
            // Add element first
            addElement(newElement);
            
            // Update the element with parent relationship - select it first
            const addedElement = elements.find(el => el.id === newElement.id);
            if (addedElement) {
              // First select the element so we can interact with it
              setSelectedElement(addedElement);
              
              // Now use the store function to add parent references
              // We need to add a timeout to ensure the element is added before updating the reference
              setTimeout(() => {
                updateElementParent(newElement.id, containerId, containerType);
              }, 0);
            }
          }
        }
      }
    }
    
    // Update position for dragged canvas elements
    if (active.data.current?.type === 'canvas-element') {
      const element = active.data.current.element;
      
      // If dropping on main canvas
      if (over && over.id === "canvas-drop-area") {
        const { x, y } = element.position;
        
        // Calculate new position with constraints to keep within canvas
        let newX = x + event.delta.x;
        let newY = y + event.delta.y;
        
        // Snap to grid
        newX = Math.round(newX / gridSize) * gridSize;
        newY = Math.round(newY / gridSize) * gridSize;
        
        if (canvasRect) {
          // Ensure the element stays within canvas bounds
          // Account for padding in the canvas drop area (24px)
          const canvasPadding = 24;
          const elementWidth = element.position.width || 100;
          const elementHeight = element.position.height || 50;
          
          // Padding to ensure elements don't get stuck at the edge
          const padding = 5;
          
          // Adjust the constraints to account for the canvas padding
          const maxX = canvasRect.width - elementWidth - padding - canvasPadding;
          const maxY = canvasRect.height - elementHeight - padding - canvasPadding;
          
          newX = Math.max(padding, Math.min(newX, maxX));
          newY = Math.max(padding, Math.min(newY, maxY));
        }
        
        // If element was previously in a container, remove that association
        if (element.parentId) {
          // Update position first
          updateElementPosition(element.id, {
            x: newX,
            y: newY
          });
          
          // Remove parent references
          updateElementParent(element.id);
        } else {
          updateElementPosition(element.id, {
            x: newX,
            y: newY
          });
        }
      }
      // If dropping in a container
      else if (over && over.data?.current?.type === 'container-drop-area') {
        const containerId = over.data.current.elementId;
        const containerType = over.data.current.containerType;
        
        // Don't allow dropping a container into itself or its children (prevent circular structure)
        if (element.id !== containerId && !isChildOf(element.id, containerId)) {
          // Update position first
          updateElementPosition(element.id, {
            x: 20, // Default position within container
            y: 20
          });
          
          // Now update parent references
          updateElementParent(element.id, containerId, containerType);
        }
      }
      
      // Maintain selection after drag
      if (selectedElement && selectedElement.id === element.id) {
        // Find the updated element in the elements array
        const updatedElement = elements.find(el => el.id === element.id);
        if (updatedElement) {
          setSelectedElement(updatedElement);
        }
      }
    }
    
    setIsDragging(false);
    setDraggedItem(null);
    setActiveElement(null);
    setIsOver(false);
  };
  
  // Helper function to check if an element is a child of another element
  // This prevents circular container references
  const isChildOf = (elementId: string, containerId: string): boolean => {
    const element = elements.find(el => el.id === containerId);
    if (!element) return false;
    
    // If this element has a parent, check if it's the element we're looking for
    if (element.parentId === elementId) return true;
    
    // Recursively check up the parent chain
    if (element.parentId) {
      return isChildOf(elementId, element.parentId);
    }
    
    return false;
  };

  const handleDragOver = (event: DragOverEvent) => {
    // Update isOver state for visual cues
    const { over } = event;
    
    // Check if we're over the main canvas area or a container
    const isOverMainCanvas = over?.id === "canvas-drop-area";
    const isOverContainer = over?.data?.current?.type === "container-drop-area";
    
    setIsOver(isOverMainCanvas || isOverContainer);
  };

  const { collapsed } = useSidebar();

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      modifiers={[customSnapModifier]}
      collisionDetection={rectIntersection}
    >
      <div className="flex flex-col bg-white">
        <DashboardOldHeader 
          selectedResolution={null} 
          deviceResolutions={[]} 
          onResolutionChange={() => {}} 
          templateCategories={[]} 
          onSelectTemplate={() => {}} 
        />
        
        <div className="flex-1 flex">
        <SidebarOld collapsed={collapsed }  />

          <Sidebar />
          
          <div className="flex-1 flex flex-col bg-neutral-lightest overflow-hidden">
            <DashboardTabs />
            <Canvas canvasRef={canvasRef} />
          </div>
          
          <PropertyPanel />
        </div>
        
        {/* Drag Overlay - Shows visual of the element being dragged */}
        <DragOverlay 
          adjustScale={false} 
          zIndex={1000} 
          dropAnimation={{
            duration: 150,
            easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
            sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.4' } } }),
          }}
        >
          {activeElement ? (
            <div className="element-drag-preview">
              <CanvasElement 
                element={activeElement} 
                isDragOverlay={true} 
              />
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}

// Side effects for the drop animation (fade out)
function defaultDropAnimationSideEffects({ styles = {} }: { styles?: Record<string, any> } = {}) {
  return ({ active, dragOverlay }: { active: { node: HTMLElement }, dragOverlay: { node: HTMLElement } }) => {
    const { active: activeStyles = {}, dragOverlay: dragOverlayStyles = {} } = styles;
    
    if (active?.node && dragOverlay?.node) {
      Object.assign(dragOverlay.node.style, {
        opacity: '0',
        transition: 'opacity 200ms ease',
        ...dragOverlayStyles
      });
    
      requestAnimationFrame(() => {
        if (active.node) {
          Object.assign(active.node.style, {
            transition: 'opacity 200ms ease',
            ...activeStyles
          });
        }
      });
    }
    
    return () => {
      if (active?.node) {
        active.node.style.opacity = '';
      }
    };
  };
}
