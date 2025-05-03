import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ResolutionSelectorProps {
  value: string;
  resolutions: {
    name: string;
    width: number;
    height: number;
  }[];
  onChange: (value: string) => void;
}

export const ResolutionSelector = ({
  value,
  resolutions,
  onChange,
}: ResolutionSelectorProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-12 bg-[#3f0c83] text-white rounded-lg text-2xl p-4">
        <SelectValue placeholder="Select resolution" />
      </SelectTrigger>
      <SelectContent>
        {resolutions.map((resolution) => (
          <SelectItem key={resolution.name} value={resolution.name} className="text-sm">
            {resolution.name} ({resolution.width}×{resolution.height})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};