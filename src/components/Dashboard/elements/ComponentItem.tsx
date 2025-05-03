import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { ElementDefinition } from "@/types/dashboard";

interface ComponentItemProps {
  element: ElementDefinition;
}

export function ComponentItem({ element }: ComponentItemProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `draggable-${element.id}`,
    data: {
      type: element.type,
      element
    }
  });

  const Icon = element.icon;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={cn("component-item group cursor-grab", isDragging && "opacity-50")}
    >
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-white rounded border border-neutral-light hover:border-primary flex items-center justify-center mb-1 relative">
          <div className="text-primary">
          <img src={element.icon} alt={element.name} className="!w-14 !h-14 object-contain" />
          </div>
          <div className="component-drag-handle absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-white flex items-center justify-center opacity-0 transition-opacity">
          <img src={element.icon} alt={element.name} className="w-14 h-14 object-contain" />          </div>
        </div>
        <span className="text-xl text-neutral-dark">{element.name}</span>
      </div>
    </div>
  );
}
