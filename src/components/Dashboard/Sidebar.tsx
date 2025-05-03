import { ComponentItem } from "../../components/dashboard/elements/ComponentItem";
import { elementCategories } from "@/lib/elements";
import { Plus, Settings2 } from "lucide-react";

export function Sidebar() {
  return (
    <div className="w-96 border-r border-neutral-light bg-white overflow-y-auto flex flex-col">
      <div className="flex flex-col p-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="!text-2xl font-medium text-neutral-darkest text-black !m-0">Add Project Name</h2>
          <button className="text-neutral-medium hover:text-neutral-dark !rounded-xl overflow-hidden">
            <Plus className="w-10 h-10 bg-[#3f0c83] text-white" />
          </button>
        </div>

        <div className="!outline !outline-gray-100 rounded-lg flex justify-center items-center p-3">
          <input type="text" name="element" id="element" className="w-full outline-none text-xl" placeholder="Element"/>
          <Settings2/>
        </div>
        
        {elementCategories.map((category) => (
          <div className="my-6" key={category.id}>
            <h3 className="!text-2xl font-medium text-black text-neutral-dark mb-4">{category.name}</h3>
            <hr className="mb-4"/>
            <div className="grid grid-cols-3 gap-6">
              {category.elements.map((element) => (
                <ComponentItem 
                  key={element.id}
                  element={element}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
