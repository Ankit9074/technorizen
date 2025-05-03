import { create } from "zustand";
import { generateId, getDefaultDashboards } from "@/lib/utils";

// DND Context Store
interface DndContextState {
  isDragging: boolean;
  isOver: boolean;
  draggedItem: any;
  setIsDragging: (isDragging: boolean) => void;
  setIsOver: (isOver: boolean) => void;
  setDraggedItem: (item: any) => void;
}

export const useDndContext = create<DndContextState>((set) => ({
  isDragging: false,
  isOver: false,
  draggedItem: null,
  setIsDragging: (isDragging) => set({ isDragging }),
  setIsOver: (isOver) => set({ isOver }),
  setDraggedItem: (draggedItem) => set({ draggedItem }),
}));

// Selected Element Store
interface SelectedElementState {
  selectedElement: ElementType | null;
  setSelectedElement: (element: ElementType | null) => void;
  updateSelectedElement: (element: ElementType) => void;
}

export const useSelectedElementStore = create<SelectedElementState>((set) => ({
  selectedElement: null,
  setSelectedElement: (element) => set({ selectedElement: element }),
  updateSelectedElement: (element) => set({ selectedElement: element }),
}));

// Dashboard Store
interface DashboardState {
  dashboards: DashboardType[];
  activeDashboardId: string;
  elements: ElementType[]; // Elements of active dashboard
  setActiveDashboard: (id: string) => void;
  addDashboard: () => void;
  removeDashboard: (id: string) => void;
  addElement: (element: ElementType) => void;
  removeElement: (id: string) => void;
  updateElementPosition: (id: string, position: { x: number, y: number, width?: number, height?: number }) => void;
  updateElementContent: (id: string, content: any) => void;
  updateElementParent: (id: string, parentId?: string, parentType?: string) => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  dashboards: getDefaultDashboards(),
  activeDashboardId: getDefaultDashboards()[0].id,
  elements: [],
  
  setActiveDashboard: (id) => {
    const { dashboards } = get();
    const dashboard = dashboards.find(d => d.id === id);
    if (dashboard) {
      set({ 
        activeDashboardId: id,
        elements: dashboard.elements 
      });
    }
  },
  
  addDashboard: () => {
    const { dashboards } = get();
    const newDashboard = {
      id: generateId("dashboard-"),
      name: `Dashboard ${dashboards.length + 1}`,
      elements: []
    };
    
    set({ 
      dashboards: [...dashboards, newDashboard],
      activeDashboardId: newDashboard.id,
      elements: []
    });
  },
  
  removeDashboard: (id) => {
    const { dashboards, activeDashboardId } = get();
    if (dashboards.length <= 1) return;
    
    const filteredDashboards = dashboards.filter(d => d.id !== id);
    
    // If active dashboard is removed, select the first one
    let newActiveDashboardId = activeDashboardId;
    let newElements = get().elements;
    
    if (activeDashboardId === id) {
      newActiveDashboardId = filteredDashboards[0].id;
      newElements = filteredDashboards[0].elements;
    }
    
    set({ 
      dashboards: filteredDashboards,
      activeDashboardId: newActiveDashboardId,
      elements: newElements
    });
  },
  
  addElement: (element) => {
    const { dashboards, activeDashboardId, elements } = get();
    const newElements = [...elements, element];
    
    // Update dashboard elements
    const updatedDashboards = dashboards.map(dashboard => {
      if (dashboard.id === activeDashboardId) {
        return {
          ...dashboard,
          elements: newElements
        };
      }
      return dashboard;
    });
    
    set({ 
      dashboards: updatedDashboards,
      elements: newElements
    });
  },
  
  removeElement: (id) => {
    const { dashboards, activeDashboardId, elements } = get();
    const newElements = elements.filter(e => e.id !== id);
    
    // Update dashboard elements
    const updatedDashboards = dashboards.map(dashboard => {
      if (dashboard.id === activeDashboardId) {
        return {
          ...dashboard,
          elements: newElements
        };
      }
      return dashboard;
    });
    
    set({ 
      dashboards: updatedDashboards,
      elements: newElements
    });
  },
  
  updateElementPosition: (id, position) => {
    const { dashboards, activeDashboardId, elements } = get();
    
    const newElements = elements.map(element => {
      if (element.id === id) {
        return {
          ...element,
          position: {
            ...element.position,
            x: position.x,
            y: position.y,
            // Add width and height if they exist in the position object
            ...(position.width !== undefined && { width: position.width }),
            ...(position.height !== undefined && { height: position.height })
          }
        };
      }
      return element;
    });
    
    // Update dashboard elements
    const updatedDashboards = dashboards.map(dashboard => {
      if (dashboard.id === activeDashboardId) {
        return {
          ...dashboard,
          elements: newElements
        };
      }
      return dashboard;
    });
    
    set({ 
      dashboards: updatedDashboards,
      elements: newElements
    });
  },
  
  updateElementContent: (id, content) => {
    const { dashboards, activeDashboardId, elements } = get();
    
    const newElements = elements.map(element => {
      if (element.id === id) {
        return {
          ...element,
          content
        };
      }
      return element;
    });
    
    // Update dashboard elements
    const updatedDashboards = dashboards.map(dashboard => {
      if (dashboard.id === activeDashboardId) {
        return {
          ...dashboard,
          elements: newElements
        };
      }
      return dashboard;
    });
    
    set({ 
      dashboards: updatedDashboards,
      elements: newElements
    });
  },
  
  updateElementParent: (id, parentId, parentType) => {
    const { dashboards, activeDashboardId, elements } = get();
    
    const newElements = elements.map(element => {
      if (element.id === id) {
        if (parentId && parentType) {
          // Add parent relationship
          return {
            ...element,
            parentId,
            parentType
          };
        } else {
          // Remove parent relationship
          const { parentId, parentType, ...restElement } = element;
          return restElement;
        }
      }
      return element;
    });
    
    // Update dashboard elements
    const updatedDashboards = dashboards.map(dashboard => {
      if (dashboard.id === activeDashboardId) {
        return {
          ...dashboard,
          elements: newElements
        };
      }
      return dashboard;
    });
    
    set({ 
      dashboards: updatedDashboards,
      elements: newElements
    });
  }
}));

// Project Store
interface ProjectState {
  projectName: string;
  updateProjectName: (name: string) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projectName: "Dashboard Builder Project",
  updateProjectName: (name) => set({ projectName: name }),
}));
