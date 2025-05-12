import { useState, useEffect } from "react";
import Navbar from "@/components/navbar/navbar";
import SidebarOld from "@/components/dashboard/sidebar/Sidebar";
import CanvasArea from "@/components/canvas/canvas-area";
import PropertiesPanel from "@/components/properties/properties-panel";
import { useDashboard } from "@/hooks/use-dashboard";
import { DashboardComponent } from "@/lib/types";
import { DashboardOldHeader } from "@/components/dashboard/header/Old_DashboardHeader copy";
import Sidebar from "@/components/sidebar/sidebar";
import { supabase } from "@/integrations/supabase/client";

export default function DashboardBuilder() {
  const {
    project,
    activeDashboard,
    setActiveDashboard,
    addDashboard,
    removeDashboard,
    addComponent,
    updateComponent,
    removeComponent,
    updateProjectName,
  } = useDashboard();

  const [selectedComponent, setSelectedComponent] =
    useState<DashboardComponent | null>(null);

  // Listen for the custom add-component event from the canvas
  useEffect(() => {
    const handleAddComponent = (event: CustomEvent) => {
      console.log("Received add-component event", event.detail);
      if (event.detail && event.detail.type) {
        addComponent(event.detail.type);
      }
    };

    window.addEventListener(
      "add-component",
      handleAddComponent as EventListener
    );

    return () => {
      window.removeEventListener(
        "add-component",
        handleAddComponent as EventListener
      );
    };
  }, [addComponent]);

  useEffect(() => {
    if (!activeDashboard) return;
    const stillExists = activeDashboard.components.find(
      (comp) => comp.id === selectedComponent?.id
    );
    if (stillExists) {
      setSelectedComponent(stillExists);
    } else {
      setSelectedComponent(activeDashboard.components[0] || null);
    }
  }, [activeDashboard, selectedComponent?.id]);

  const handleSubmit = async () => {
    const payload = {
      projectName: project.name,
      dashboards: project.dashboards,
      activeDashboardId: activeDashboard?.id,
    };

    console.log("Payload:", payload);

    try {
      const { data, error } = await supabase
        .from("projects")
        .insert([payload]);

      if (error) {
        console.error("Error inserting payload:", error);
        alert("Failed to submit data.");
      } else {
        console.log("Payload successfully submitted:", data);
        alert("Data submitted successfully!");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div className="!h-screen !flex !flex-col !overflow-hidden">
      <DashboardOldHeader
        selectedResolution={null}
        deviceResolutions={[]}
        onResolutionChange={() => {}}
        templateCategories={[]}
        onSelectTemplate={() => {}}
      />

      <div className="!flex !flex-1 !overflow-hidden">
        <SidebarOld />
        <Sidebar onElementDrop={addComponent} />

        <CanvasArea
          dashboards={project.dashboards}
          activeDashboard={activeDashboard}
          onDashboardSelect={setActiveDashboard}
          onDashboardAdd={addDashboard}
          onDashboardRemove={removeDashboard}
          selectedComponent={selectedComponent}
          onComponentSelect={setSelectedComponent}
          onComponentUpdate={updateComponent}
          onComponentRemove={removeComponent}
        />

        <PropertiesPanel
          selectedComponent={selectedComponent}
          onComponentUpdate={updateComponent}
          onComponentRemove={removeComponent}
        />
      </div>

      {/* Submit Button */}
      <div className="!p-4 !flex !justify-end">
        <button
          className="!bg-blue-500 !text-white !px-4 !py-2 !rounded hover:!bg-blue-600"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
