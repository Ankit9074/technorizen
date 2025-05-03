import { ReactNode } from "react";

export type ElementType =
  | "section"
  | "container"
  | "grid"
  | "columns"
  | "list"
  | "heading"
  | "paragraph"
  | "label"
  | "table"
  | "text-block"
  | "text-link"
  | "scorecard"
  | "line-chart"
  | "area-chart"
  | "column-chart"
  | "bar-chart"
  | "stacked-bar"
  | "pie-chart"
  | "donut-chart"
  | "bubble-chart"
  | "funnel-chart"
  | "dropdown"
  | "relative-date"
  | "date-range";

export type ElementCategory = "layout" | "text" | "graphs" | "filters";

export interface Element {
  id: string;
  type: ElementType;
  category: ElementCategory;
  label: string;
  icon: ReactNode;
}

export interface DashboardComponent {
  id: string;
  elementType: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  properties: Record<string, any>;
}

export interface Dashboard {
  id: string;
  name: string;
  components: DashboardComponent[];
}

export interface Project {
  id: string;
  name: string;
  dashboards: Dashboard[];
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export type ChartData = ChartDataPoint[];

export interface PieChartProps {
  data: ChartData;
  colors?: string[];
}
