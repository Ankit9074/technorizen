import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ElementCategory from "./element-category";
import { DashboardComponent } from "@/lib/types";
import { getLayoutElements, getTextElements, getGraphElements, getFilterElements } from "@/hooks/use-dashboard";

interface SidebarProps {
  onElementDrop: (elementType: string) => void;
}

export default function Sidebar({ onElementDrop }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const layoutElements = getLayoutElements();
  const textElements = getTextElements();
  const graphElements = getGraphElements();
  const filterElements = getFilterElements();
  
  const filteredLayoutElements = layoutElements.filter(element => 
    element.label.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredTextElements = textElements.filter(element => 
    element.label.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredGraphElements = graphElements.filter(element => 
    element.label.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredFilterElements = filterElements.filter(element => 
    element.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
      {/* Search and Filter */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-10">
          <h5 className="font-medium text-gray-800 text-2xl">Add Project Name</h5>
          <button className="text-gray-500 hover:text-gray-700">
            <Plus className="h-10 w-10 bg-[#3f0c83] text-white font-bold rounded-md" />
          </button>
        </div>
        
        <div className="flex items-center bg-gray-100 rounded-md">
          <Input
            type="text"
            placeholder="Element"
            className="bg-transparent border-0 flex-1 py-8 px-3 focus:ring-0 !text-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="text-gray-500 pr-2">
            <Search className="h-8 w-8" />
          </button>
        </div>
      </div>
      
      {/* Element Categories */}
      <div className="overflow-y-auto flex-1">
        <ElementCategory 
          title="Layout" 
          elements={filteredLayoutElements} 
          onElementDrop={onElementDrop} 
        />
        
        <ElementCategory 
          title="Text" 
          elements={filteredTextElements} 
          onElementDrop={onElementDrop} 
        />
        
        <ElementCategory 
          title="Graphs" 
          elements={filteredGraphElements} 
          onElementDrop={onElementDrop} 
        />
        
        <ElementCategory 
          title="Filters" 
          elements={filteredFilterElements} 
          onElementDrop={onElementDrop} 
        />
      </div>
    </div>
  );
}
