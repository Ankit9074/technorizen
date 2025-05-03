import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function generateId(prefix: string = ""): string {
  return `${prefix}${Math.random().toString(36).substring(2, 10)}`;
}

export const defaultDashboardData = {
  name: "Default Dashboard",
  elements: []
};

export function getPositionForDrop(clientOffset: { x: number, y: number }, containerRect: DOMRect) {
  if (!clientOffset || !containerRect) return { x: 0, y: 0 };
  
  // Calculate the position relative to the container
  let x = clientOffset.x - containerRect.left;
  let y = clientOffset.y - containerRect.top;
  
  // Adjust for container padding (usually 24px or 6px * 4)
  x -= 24;
  y -= 24;
  
  // Ensure the position is within the bounds of the container
  // Include a small margin to ensure element is fully visible
  const margin = 5;
  x = Math.max(margin, Math.min(x, containerRect.width - 100 - margin));
  y = Math.max(margin, Math.min(y, containerRect.height - 50 - margin));
  
  return { x, y };
}

export function getDefaultDashboards() {
  return [
    { id: generateId("dashboard-"), name: "Dashboard 1", elements: [] },
    { id: generateId("dashboard-"), name: "Dashboard 2", elements: [] },
    { id: generateId("dashboard-"), name: "Dashboard 3", elements: [] }
  ];
}
