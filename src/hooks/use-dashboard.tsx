import { useState, useCallback } from "react";
import { 
  Dashboard, 
  DashboardComponent, 
  Element, 
  ElementType, 
  Project 
} from "@/lib/types";
import { v4 as uuidv4 } from "uuid";
import { 
  Layout, 
  AlignLeft, 
  Table2, 
  Link, 
  LayoutGrid, 
  Columns3, 
  ListOrdered, 
  Heading1, 
  Text, 
  Tag, 
  PieChart, 
  LineChart, 
  BarChartHorizontal, 
  BarChart, 
  BarChart3, 
  BarChart2, 
  ChevronDownCircle, 
  Calendar,
  CalendarClock
} from "lucide-react";

// Generate element definitions for the sidebar
export function getLayoutElements(): Element[] {
  return [
    { id: "section", type: "section", category: "layout", label: "Section", icon: <Layout /> },
    { id: "container", type: "container", category: "layout", label: "Container", icon: <LayoutGrid /> },
    { id: "grid", type: "grid", category: "layout", label: "Grid", icon: <LayoutGrid /> },
    { id: "columns", type: "columns", category: "layout", label: "Columns", icon: <Columns3 /> },
    { id: "list", type: "list", category: "layout", label: "List", icon: <ListOrdered /> }
  ];
}

export function getTextElements(): Element[] {
  return [
    { id: "heading", type: "heading", category: "text", label: "Heading", icon: <Heading1 /> },
    { id: "paragraph", type: "paragraph", category: "text", label: "Paragraph", icon: <Text /> },
    { id: "label", type: "label", category: "text", label: "Label", icon: <Tag /> },
    { id: "table", type: "table", category: "text", label: "Table", icon: <Table2 /> },
    { id: "text-block", type: "text-block", category: "text", label: "Text Block", icon: <AlignLeft /> },
    { id: "text-link", type: "text-link", category: "text", label: "Text Link", icon: <Link /> }
  ];
}

export function getGraphElements(): Element[] {
  return [
    { id: "scorecard", type: "scorecard", category: "graphs", label: "Scorecard", icon: <BarChart /> },
    { id: "line-chart", type: "line-chart", category: "graphs", label: "Line Chart", icon: <LineChart /> },
    { id: "area-chart", type: "area-chart", category: "graphs", label: "Area Chart", icon: <LineChart /> },
    { id: "column-chart", type: "column-chart", category: "graphs", label: "Column Chart", icon: <BarChart /> },
    { id: "bar-chart", type: "bar-chart", category: "graphs", label: "Bar Chart", icon: <BarChartHorizontal /> },
    { id: "stacked-bar", type: "stacked-bar", category: "graphs", label: "Stacked Bar", icon: <BarChart3 /> },
    { id: "pie-chart", type: "pie-chart", category: "graphs", label: "Pie Chart", icon: <PieChart /> },
    { id: "funnel-chart", type: "funnel-chart", category: "graphs", label: "Funnel Chart", icon: <ChevronDownCircle /> }
  ];
}

export function getFilterElements(): Element[] {
  return [
    { id: "dropdown", type: "dropdown", category: "filters", label: "Dropdown", icon: <ChevronDownCircle /> },
    { id: "relative-date", type: "relative-date", category: "filters", label: "Relative Date", icon: <Calendar /> },
    { id: "date-range", type: "date-range", category: "filters", label: "Date Range", icon: <CalendarClock /> }
  ];
}

// Generate default data for components
const getDefaultPropertiesForType = (type: ElementType) => {
  // Sample data for charts
  const sampleTimeSeriesData = [
    { label: "Jan", value: 400 },
    { label: "Feb", value: 300 },
    { label: "Mar", value: 200 },
    { label: "Apr", value: 278 },
    { label: "May", value: 189 },
    { label: "Jun", value: 239 }
  ];
  
  const sampleCategoryData = [
    { label: "Category A", value: 400 },
    { label: "Category B", value: 300 },
    { label: "Category C", value: 200 },
    { label: "Category D", value: 278 },
    { label: "Category E", value: 189 }
  ];

  switch (type) {
    case "pie-chart":
      return {
        data: sampleCategoryData,
        fontFamily: "Inter",
        colors: ["#4338ca", "#818cf8", "#93c5fd", "#60a5fa", "#3b82f6"],
        showLegend: true,
        donut: false
      };
    case "line-chart":
      return {
        data: sampleTimeSeriesData,
        fontFamily: "Inter",
        color: "#4338ca",
        showGrid: true,
        showAxis: true,
        showTooltip: true
      };
    case "area-chart":
      return {
        data: sampleTimeSeriesData,
        fontFamily: "Inter",
        color: "#3b82f6",
        fillOpacity: 0.6,
        showGrid: true
      };
    case "bar-chart":
      return {
        data: sampleCategoryData,
        fontFamily: "Inter",
        color: "#8884d8",
        showGrid: true
      };
    case "column-chart":
      return {
        data: sampleTimeSeriesData,
        fontFamily: "Inter",
        color: "#82ca9d",
        showGrid: true
      };
    case "heading":
      return {
        content: "Heading Text",
        fontSize: "text-2xl",
        fontWeight: "font-bold",
        alignment: "text-center",
        color: "text-gray-900"
      };
    case "text-block":
      return {
        content: "This is a text block component. You can edit this text by clicking on it when the component is selected.",
        fontSize: "text-base",
        fontWeight: "font-normal",
        alignment: "text-left",
        color: "text-gray-700"
      };
    case "label":
      return {
        content: "Label",
        fontSize: "text-sm",
        fontWeight: "font-medium",
        color: "text-gray-500"
      };
    default:
      return {};
  }
};

// Get the default name for a component
const getDefaultNameForType = (type: ElementType) => {
  switch (type) {
    case "pie-chart":
      return "My pie-chart";
    case "line-chart":
      return "My line chart";
    case "bar-chart":
      return "My bar chart";
    case "area-chart":
      return "My area chart";
    case "column-chart":
      return "My column chart";
    case "stacked-bar":
      return "My stacked bar";
    case "funnel-chart":
      return "My funnel chart";
    default:
      return `My ${type.replace(/-/g, " ")}`;
  }
};

// Initialize a new dashboard
const createDefaultDashboard = (id: string, name: string): Dashboard => ({
  id,
  name,
  components: []
});

// Initialize a new project
const createDefaultProject = (): Project => ({
  id: uuidv4(),
  name: "Add Project Name",
  dashboards: [
    createDefaultDashboard(uuidv4(), "Dashboard 1")
  ]
});

export function useDashboard() {
  const [project, setProject] = useState<Project>(createDefaultProject());
  const [activeDashboard, setActiveDashboard] = useState<Dashboard | null>(project.dashboards[0]);
  
  const updateProjectName = useCallback((name: string) => {
    setProject(prev => ({ ...prev, name }));
  }, []);
  
  const addDashboard = useCallback(() => {
    const newDashboard = createDefaultDashboard(
      uuidv4(), 
      `Dashboard ${project.dashboards.length + 1}`
    );
    
    setProject(prev => ({
      ...prev,
      dashboards: [...prev.dashboards, newDashboard]
    }));
    
    setActiveDashboard(newDashboard);
  }, [project.dashboards.length]);
  
  const removeDashboard = useCallback((dashboardId: string) => {
    // Don't allow deleting the last dashboard
    if (project.dashboards.length <= 1) return;
    
    const updatedDashboards = project.dashboards.filter(d => d.id !== dashboardId);
    
    setProject(prev => ({
      ...prev,
      dashboards: updatedDashboards
    }));
    
    // If the active dashboard was removed, set the first dashboard as active
    if (activeDashboard?.id === dashboardId) {
      setActiveDashboard(updatedDashboards[0]);
    }
  }, [project.dashboards, activeDashboard]);
  
  const addComponent = useCallback((elementType: string) => {
    if (!activeDashboard) return;
    
    const newComponent: DashboardComponent = {
      id: uuidv4(),
      elementType: elementType as ElementType,
      x: 50,
      y: 50,
      width: 320,
      height: 240,
      name: getDefaultNameForType(elementType as ElementType),
      properties: getDefaultPropertiesForType(elementType as ElementType),
    };
    
    const updatedDashboard = {
      ...activeDashboard,
      components: [...activeDashboard.components, newComponent]
    };
    
    setProject(prev => ({
      ...prev,
      dashboards: prev.dashboards.map(d => 
        d.id === activeDashboard.id ? updatedDashboard : d
      )
    }));
    
    setActiveDashboard(updatedDashboard);
  }, [activeDashboard]);
  
  const updateComponent = useCallback((updatedComponent: DashboardComponent) => {
    if (!activeDashboard) return;
    
    const updatedDashboard = {
      ...activeDashboard,
      components: activeDashboard.components.map(c => 
        c.id === updatedComponent.id ? updatedComponent : c
      )
    };
    
    setProject(prev => ({
      ...prev,
      dashboards: prev.dashboards.map(d => 
        d.id === activeDashboard.id ? updatedDashboard : d
      )
    }));
    
    setActiveDashboard(updatedDashboard);
  }, [activeDashboard]);
  
  const removeComponent = useCallback((componentId: string) => {
    if (!activeDashboard) return;
    
    const updatedDashboard = {
      ...activeDashboard,
      components: activeDashboard.components.filter(c => c.id !== componentId)
    };
    
    setProject(prev => ({
      ...prev,
      dashboards: prev.dashboards.map(d => 
        d.id === activeDashboard.id ? updatedDashboard : d
      )
    }));
    
    setActiveDashboard(updatedDashboard);
  }, [activeDashboard]);
  
  return {
    project,
    activeDashboard,
    setActiveDashboard,
    updateProjectName,
    addDashboard,
    removeDashboard,
    addComponent,
    updateComponent,
    removeComponent,
  };
}
