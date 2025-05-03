import { useState, useCallback, useEffect } from "react";
import { useDragAndDrop } from "@/hooks/use-drag-and-drop";
import { Dashboard, DashboardComponent } from "@/lib/types";
import DashboardTabs from "./dashboard-tabs";
import EmptyState from "./empty-state";
import DashboardComponentDisplay from "./dashboard-component";

interface CanvasAreaProps {
  dashboards: Dashboard[];
  activeDashboard: Dashboard | null;
  onDashboardSelect: (dashboard: Dashboard) => void;
  onDashboardAdd: () => void;
  onDashboardRemove: (dashboardId: string) => void;
  selectedComponent: DashboardComponent | null;
  onComponentSelect: (component: DashboardComponent | null) => void;
  onComponentUpdate: (component: DashboardComponent) => void;
  onComponentRemove: (componentId: string) => void;
}

export default function CanvasArea({
  dashboards,
  activeDashboard,
  onDashboardSelect,
  onDashboardAdd,
  onDashboardRemove,
  selectedComponent,
  onComponentSelect,
  onComponentUpdate,
  onComponentRemove
}: CanvasAreaProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  
  // Use the sidebar's provided onElementDrop function
  const { canvasRef, handleDrop } = useDragAndDrop((elementType: string) => {
    // We need to pass this element type to the dashboard builder's addComponent function
    const event = new CustomEvent('add-component', { 
      detail: { type: elementType }
    });
    window.dispatchEvent(event);
    setIsDragOver(false);
  });

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleComponentClick = (component: DashboardComponent) => {
    onComponentSelect(component);
  };
  
  const handleCanvasClick = (e: React.MouseEvent) => {
    // Only deselect if the click was directly on the canvas, not on a component
    if (e.currentTarget === e.target) {
      onComponentSelect(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-100 h-full overflow-hidden">
      <DashboardTabs
        dashboards={dashboards}
        activeDashboard={activeDashboard}
        onDashboardSelect={onDashboardSelect}
        onDashboardAdd={onDashboardAdd}
        onDashboardRemove={onDashboardRemove}
      />
      
      <div className="flex-1 overflow-auto p-4">
        <div 
          ref={canvasRef}
          className={`bg-white border border-gray-200 rounded-md w-full h-full grid-bg relative ${isDragOver ? 'drop-zone-active' : ''}`}
          onClick={handleCanvasClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDragEnd={() => setIsDragOver(false)}
        >
          {activeDashboard && activeDashboard.components.length > 0 ? (
            activeDashboard.components.map((component) => (
              <DashboardComponentDisplay
                key={component.id}
                component={component}
                isSelected={selectedComponent?.id === component.id}
                onClick={() => handleComponentClick(component)}
                onUpdate={onComponentUpdate}
                onRemove={onComponentRemove}
                onDuplicate={(component) => {
                  // Create a duplicate component with a new ID and offset position
                  const duplicatedComponent = {
                    ...component,
                    id: `${component.elementType}-${Date.now()}`,
                    x: component.x + 20,
                    y: component.y + 20
                  };
                  // Add it to the dashboard
                  if (activeDashboard) {
                    const updatedDashboard = {
                      ...activeDashboard,
                      components: [...activeDashboard.components, duplicatedComponent]
                    };
                    onDashboardSelect(updatedDashboard);
                    // Also select the new component
                    onComponentSelect(duplicatedComponent);
                  }
                }}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
}
