import { useState } from "react";
import { 
  DashboardComponent, 
  ChartDataPoint 
} from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ChartPropertiesProps {
  component: DashboardComponent;
  updateProperties: (properties: Record<string, any>) => void;
}

export default function ChartProperties({ 
  component, 
  updateProperties 
}: ChartPropertiesProps) {
  const data = component.properties.data || [
    { label: "Jan", value: 400 },
    { label: "Feb", value: 300 },
    { label: "Mar", value: 200 },
    { label: "Apr", value: 278 },
    { label: "May", value: 189 }
  ];
  
  const handleDataPointChange = (index: number, field: keyof ChartDataPoint, value: string) => {
    const updatedData = [...data];
    
    if (field === 'value') {
      updatedData[index][field] = parseInt(value) || 0;
    } else {
      updatedData[index][field] = value;
    }
    
    updateProperties({ data: updatedData });
  };
  
  const handleFontFamilyChange = (value: string) => {
    updateProperties({ fontFamily: value });
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-xl font-medium text-gray-700 mb-4">Chart Data Points</label>
        
        {data.map((point, index) => (
          <div key={index} className="grid grid-cols-2 gap-2 mb-2">
            <input
              type="text"
              value={point.label}
              onChange={(e) => handleDataPointChange(index, 'label', e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-xl"
            />
            <input
              type="text"
              value={point.value}
              onChange={(e) => handleDataPointChange(index, 'value', e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-xl"
            />
          </div>
        ))}
      </div>
      
      <div className="mb-4">
        <label className="block text-xl font-medium text-gray-700 mb-4">Font Family</label>
        <Select 
          defaultValue={component.properties.fontFamily || "Inter"}
          onValueChange={handleFontFamilyChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue className="text-xl" placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Inter" className="text-xl">Inter</SelectItem>
            <SelectItem value="Roboto" className="text-xl">Roboto</SelectItem>
            <SelectItem value="Open Sans" className="text-xl">Open Sans</SelectItem>
            <SelectItem value="Lato" className="text-xl">Lato</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="mb-4">
        <label className="block text-xl font-medium text-gray-700 mb-4">Color</label>
        <div className="h-8 bg-gray-900 rounded-md"></div>
      </div>
    </div>
  );
}
