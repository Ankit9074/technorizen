import { useState } from "react";
import { ArrowDownToLine, Briefcase, UserCircle, Sparkles } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NavbarProps {
  projectName: string;
  onProjectNameChange: (name: string) => void;
}

export default function Navbar({
  projectName,
  onProjectNameChange,
}: NavbarProps) {
  return (
    <nav className="bg-white border-b border-gray-200 flex justify-between items-center py-2 px-4">
      <div className="flex items-center p-2">
        <div className="h-8 w-8 mr-2 flex items-center justify-center rounded bg-blue-100 text-blue-500">
          <Briefcase className="h-5 w-5" />
        </div>
        <input
          type="text"
          value={projectName}
          onChange={(e) => onProjectNameChange(e.target.value)}
          className="border-0 text-2xl focus:ring-0 focus:outline-none"
        />
      </div>

      <div className="flex items-center space-x-3">

        <div className="relative">
          <button className="flex items-center space-x-2">
            <UserCircle className="h-8 w-8 rounded-full" />
          </button>
        </div>
      </div>
    </nav>
  );
}
