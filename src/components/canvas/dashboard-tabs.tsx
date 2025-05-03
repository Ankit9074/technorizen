import { Dashboard } from "@/lib/types";
import { Plus, X } from "lucide-react";

interface DashboardTabsProps {
  dashboards: Dashboard[];
  activeDashboard: Dashboard | null;
  onDashboardSelect: (dashboard: Dashboard) => void;
  onDashboardAdd: () => void;
  onDashboardRemove: (dashboardId: string) => void;
}

export default function DashboardTabs({
  dashboards,
  activeDashboard,
  onDashboardSelect,
  onDashboardAdd,
  onDashboardRemove
}: DashboardTabsProps) {
  return (
    <div className="bg-white px-4 border-b border-gray-200">
      <div className="flex space-x-1">
        {dashboards.map((dashboard) => (
          <div
            key={dashboard.id}
            className={`px-4 py-2 flex items-center space-x-2 cursor-pointer ${
              activeDashboard?.id === dashboard.id ? "tab-active" : ""
            }`}
            onClick={() => onDashboardSelect(dashboard)}
          >
            <span className="text-2xl text-black">{dashboard.name}</span>
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={(e) => {
                e.stopPropagation();
                onDashboardRemove(dashboard.id);
              }}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        ))}
        
        <button
          className="px-2 py-2 text-gray-500 hover:text-gray-700"
          onClick={onDashboardAdd}
        >
          <Plus className="h-6 w-6"/>
        </button>
      </div>
    </div>
  );
}
