import React from "react";
import { cn } from "@/lib/utils";
import { useDashboardStore } from "@/store/dashboard";
import { CloseCrossIcon, PlusIcon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

export function DashboardTabs() {
  const { 
    dashboards, 
    activeDashboardId, 
    setActiveDashboard, 
    addDashboard, 
    removeDashboard 
  } = useDashboardStore();

  return (
    <div className="px-3 py-2 border-b border-neutral-light bg-white flex items-center">
      {dashboards.map((dashboard) => (
        <div 
          key={dashboard.id}
          className={cn(
            "dashboard-tab flex items-center px-3 py-1.5 border-b-2 text-neutral-darkest font-medium text-xl mr-2",
            activeDashboardId === dashboard.id ? "border-primary" : "border-transparent hover:border-neutral-medium text-neutral-dark"
          )}
          onClick={() => setActiveDashboard(dashboard.id)}
        >
          <span>{dashboard.name}</span>
          <button 
            className="ml-2 text-neutral-medium hover:text-neutral-dark"
            onClick={(e) => {
              e.stopPropagation();
              removeDashboard(dashboard.id);
            }}
          >
            <CloseCrossIcon className="w-6 h-6" />
          </button>
        </div>
      ))}
      
      <Button
        variant="ghost"
        className="text-primary hover:text-primary-light flex items-center text-sm font-medium p-1"
        onClick={addDashboard}
      >
        <PlusIcon className="!w-6 !h-6" />
      </Button>
    </div>
  );
}
