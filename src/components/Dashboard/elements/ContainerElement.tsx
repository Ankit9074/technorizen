import React, { useRef, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { CanvasElement } from "./CanvasElement";
import { useDashboardStore } from "@/store/dashboard";

interface ContainerElementProps {
  element: ElementType;
  isSection?: boolean;
  isGrid?: boolean;
  isColumns?: boolean;
  children?: React.ReactNode;
}

export function ContainerElement({
  element,
  isSection = false,
  isGrid = false,
  isColumns = false,
  children
}: ContainerElementProps) {
  const { elements } = useDashboardStore();
  const { setNodeRef, isOver } = useDroppable({
    id: `container-${element.id}`,
    data: {
      type: 'container-drop-area',
      elementId: element.id,
      containerType: isSection ? 'section' : isGrid ? 'grid' : isColumns ? 'columns' : 'container'
    }
  });
  
  const [isHovering, setIsHovering] = useState(false);
  
  // Get children elements of this container
  const childElements = elements.filter(el => el.parentId === element.id);
  
  const getGridTemplateValue = () => {
    if (isGrid) {
      // Default to 3 columns grid
      return element.style.gridTemplateColumns || "repeat(3, 1fr)";
    }
    if (isColumns) {
      // Default to 2 columns
      return element.style.gridTemplateColumns || "repeat(2, 1fr)";
    }
    return undefined;
  };
  
  // Determine the appropriate styles based on container type
  const containerStyles: React.CSSProperties = {
    position: 'relative',
    display: (isGrid || isColumns) ? 'grid' : 'block', // Use block instead of flex for better absolute positioning
    flexDirection: element.style.flexDirection || 'column',
    gridTemplateColumns: getGridTemplateValue(),
    gap: element.style.gap || '16px',
    padding: '16px',
    minHeight: '150px',
    borderRadius: '4px',
    backgroundColor: element.style.backgroundColor || (isSection ? 'rgba(245, 245, 245, 0.5)' : 'transparent'),
    border: element.style.border || '1px dashed #ccc',
    borderCollapse: element.style.borderCollapse,
    width: '100%',
    height: '100%',
    overflow: 'hidden' // Prevent children from overflowing
  };
  
  // Add visual indication when hovering or when something is being dragged over
  const containerClassName = cn(
    "element-container",
    isOver && "drop-active",
    isHovering && "hover",
    isSection && "section-container",
    isGrid && "grid-container",
    isColumns && "columns-container"
  );
  
  return (
    <div
      ref={setNodeRef}
      className={containerClassName}
      style={containerStyles}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Render child elements if any */}
      {childElements.length > 0 ? (
        childElements.map(childElement => (
          <div 
            key={childElement.id} 
            className="container-child relative" 
            style={{
              position: 'absolute',
              top: childElement.position.y,
              left: childElement.position.x,
              margin: 0,
              padding: 0,
              width: childElement.position.width || 'auto',
              height: childElement.position.height || 'auto'
            }}
          >
            <CanvasElement 
              key={childElement.id}
              element={{
                ...childElement,
                // Override position to be relative to container
                position: {
                  ...childElement.position,
                  x: 0,
                  y: 0
                }
              }}
            />
          </div>
        ))
      ) : (
        <div className="empty-container-message text-center text-gray-400 text-sm flex items-center justify-center h-full">
          {isOver ? (
            <span>Drop element here</span>
          ) : (
            <span>
              {isSection 
                ? "Section Container: Drag elements here" 
                : isGrid 
                  ? "Grid Container: Drag elements here"
                  : isColumns
                    ? "Columns Container: Drag elements here"
                    : "Container: Drag elements here"}
            </span>
          )}
        </div>
      )}
      
      {/* Visual indicator for drop area */}
      {isOver && (
        <div className="drop-indicator absolute inset-0 border-2 border-blue-400 rounded-lg bg-blue-100 bg-opacity-20 pointer-events-none" />
      )}
    </div>
  );
}