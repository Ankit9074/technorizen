import { Element } from "@/lib/types";

interface ElementItemProps {
  element: Element;
  onDrop: (elementType: string) => void;
}

export default function ElementItem({ element, onDrop }: ElementItemProps) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    // Set the element type as data to be transferred
    e.dataTransfer.setData("application/json", element.type);
    e.dataTransfer.effectAllowed = "copy";
  };
  
  return (
    <div
      className="flex flex-col gap-2 items-center hover:bg-gray-50 p-2 rounded cursor-move element-hover"
      draggable="true"
      onDragStart={handleDragStart}
    >
      <div className="h-16 w-16 bg-gray-100 flex items-center justify-center rounded mb-1">
        {element.icon}
      </div>
      <span className="text-xl text-gray-600">{element.label}</span>
    </div>
  );
}
