import { useRef, useCallback } from "react";

export function useDragAndDrop(onElementDrop?: (elementType: string) => void) {
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    // Extract the data stored in the dataTransfer object
    const elementType = e.dataTransfer.getData("application/json");
    
    if (elementType && onElementDrop) {
      console.log("Dropped element type:", elementType);
      
      // Call the onDrop callback with the element type
      onElementDrop(elementType);
    }
  }, [onElementDrop]);
  
  return {
    canvasRef,
    handleDrop
  };
}
