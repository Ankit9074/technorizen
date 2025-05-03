import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Element } from "@/lib/types";
import ElementItem from "./element-item";

interface ElementCategoryProps {
  title: string;
  elements: Element[];
  onElementDrop: (elementType: string) => void;
}

export default function ElementCategory({ title, elements, onElementDrop }: ElementCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  return (
    <div className="p-4 border-b border-gray-200">
      <div 
        className="flex justify-between items-center mb-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="font-medium text-gray-600">{title}</span>
        <button className="text-gray-500">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>
      
      {isExpanded && (
        <div className={`grid ${title === "Graphs" || title === "Filters" ? "grid-cols-2" : "grid-cols-3"} gap-4 mt-3`}>
          {elements.map((element) => (
            <ElementItem 
              key={element.type} 
              element={element} 
              onDrop={onElementDrop} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
