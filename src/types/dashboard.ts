
export interface ElementDefinition {
  id: string;
  name: string;
  type: string;
  icon: string;
  category: string;
}

export interface CanvasPosition {
  x: number;
  y: number;
  width?: number;
  height?: number;
}

export interface ElementStyle {
  backgroundColor?: string;
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  margin?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  padding?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  display?: string;
  flexDirection?: string;
  gridTemplateColumns?: string;
  gap?: string;
  border?: string;
  borderCollapse?: string;
  textDecoration?: string;
  position?: string;
}

export interface ElementContent {
  text?: string;
  url?: string;
  items?: string[];
  headers?: string[];
  rows?: string[][];
  [key: string]: any;
}

export interface ResizeHandle {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}
