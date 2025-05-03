import { useRef, useState, useEffect } from "react";
import { 
  Copy, 
  Trash, 
  GripVertical,
  MoveUpRight,
  Calendar,
  CalendarRange,
  Edit,
  List,
  LayoutGrid
} from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import { DashboardComponent } from "@/lib/types";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis, 
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  FunnelChart,
  Funnel,
  LabelList,
} from "recharts";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";

interface DashboardComponentDisplayProps {
  component: DashboardComponent;
  isSelected: boolean;
  onClick: () => void;
  onUpdate: (component: DashboardComponent) => void;
  onRemove?: (componentId: string) => void;
  onDuplicate?: (component: DashboardComponent) => void;
}

export default function DashboardComponentDisplay({
  component,
  isSelected,
  onClick,
  onUpdate,
  onRemove,
  onDuplicate
}: DashboardComponentDisplayProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: component.id,
    data: { type: "component" }
  });
  
  const resizeHandleRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState({ width: 0, height: 0 });
  
  // Get style properties from component.properties
  const padding = component.properties.padding || { top: 0, right: 0, bottom: 0, left: 0 };
  const margin = component.properties.margin || { top: 0, right: 0, bottom: 0, left: 0 };
  const paddingStyle = `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`;
  const marginStyle = `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`;
  const backgroundColor = component.properties.backgroundColor || "white";
  const textAlign = component.properties.textAlign || "left";
  const color = component.properties.color || "black";
  const fontFamily = component.properties.fontFamily || "Inter";
  const fontSize = component.properties.fontSize || "16px";
  const borderWidth = component.properties.borderWidth || 0;
  const borderColor = component.properties.borderColor || "#e5e7eb";
  const borderRadius = component.properties.borderRadius || 0;
  
  const style = {
    position: "absolute" as const,
    top: `${component.y}px`,
    left: `${component.x}px`,
    width: `${component.width}px`,
    height: `${component.height}px`,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    backgroundColor,
    color,
    fontFamily,
    fontSize,
    textAlign,
    borderWidth: `${borderWidth}px`,
    borderColor,
    borderRadius: `${borderRadius}px`,
    borderStyle: borderWidth > 0 ? "solid" : "none",
  };
  
  // Global mouse event handlers for resizing
  useEffect(() => {
    if (isResizing) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        const dx = e.clientX - startPoint.x;
        const dy = e.clientY - startPoint.y;
        
        onUpdate({
          ...component,
          width: Math.max(200, startSize.width + dx),
          height: Math.max(100, startSize.height + dy)
        });
      };
      
      const handleGlobalMouseUp = () => {
        setIsResizing(false);
      };
      
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isResizing, component, onUpdate, startPoint, startSize]);
  
  // Global mouse event handlers for dragging
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        const dx = e.clientX - startPoint.x;
        const dy = e.clientY - startPoint.y;
        
        onUpdate({
          ...component,
          x: component.x + dx,
          y: component.y + dy
        });
        
        setStartPoint({ x: e.clientX, y: e.clientY });
      };
      
      const handleGlobalMouseUp = () => {
        setIsDragging(false);
      };
      
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, component, onUpdate, startPoint]);
  
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if we're clicking on the resize handle
    if (resizeHandleRef.current && resizeHandleRef.current.contains(e.target as Node)) {
      e.stopPropagation(); // Prevent triggering component selection
      setIsResizing(true);
      setStartPoint({ x: e.clientX, y: e.clientY });
      setStartSize({ width: component.width, height: component.height });
    }
  };
  
  const handleDragHandleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering component selection
    setIsDragging(true);
    setStartPoint({ x: e.clientX, y: e.clientY });
  };
  
  const renderComponentContent = () => {
    switch(component.elementType) {
      case "pie-chart":
        return renderPieChart();
      case "line-chart":
        return renderLineChart();
      case "area-chart":
        return renderAreaChart();
      case "bar-chart":
        return renderBarChart();
      case "column-chart":
        return renderColumnChart();
      case "funnel-chart":
        return renderFunnelChart();
      case "stacked-bar":
        return renderStackedBarChart();
      case "scorecard":
        return renderScorecard();
      case "table":
        return renderTable();
      case "heading":
        return renderHeading();
      case "paragraph":
        return renderParagraph();
      case "text-block":
        return renderTextBlock();
      case "text-link":
        return renderTextLink();
      case "dropdown":
        return renderDropdown();
      case "relative-date":
        return renderRelativeDate();
      case "date-range":
        return renderDateRange();
      case "section":
        return renderSection();
      case "container":
        return renderContainer();
      case "grid":
        return renderGrid();
      case "columns":
        return renderColumns();
      case "list":
        return renderList();
      default:
        return <div className="text-center p-4 h-full flex items-center justify-center">{component.name}</div>;
    }
  };
  
  const handleContentEdit = (value: string) => {
    if (component.elementType === "heading" || component.elementType === "text-block") {
      onUpdate({
        ...component,
        properties: {
          ...component.properties,
          content: value
        }
      });
    }
  };
  
  const renderHeading = () => {
    const content = component.properties.content || "Heading";
    const fontWeight = component.properties.fontWeight || "font-bold";
    const alignment = component.properties.alignment || "text-center";
    
    return (
      <div 
        className={`h-full flex items-center ${alignment} ${fontWeight}`}
        style={{ justifyContent: textAlign === 'center' ? 'center' : textAlign === 'right' ? 'flex-end' : 'flex-start' }}
        contentEditable={isSelected}
        suppressContentEditableWarning={true}
        onBlur={(e) => handleContentEdit(e.currentTarget.textContent || "")}
      >
        {content}
      </div>
    );
  };
  
  const renderTextBlock = () => {
    const content = component.properties.content || "Text content goes here. Click to edit.";
    const alignment = component.properties.alignment || "text-left";
    
    return (
      <div 
        className={`h-full overflow-auto ${alignment}`}
        contentEditable={isSelected}
        suppressContentEditableWarning={true}
        onBlur={(e) => handleContentEdit(e.currentTarget.textContent || "")}
      >
        {content}
      </div>
    );
  };
  
  const renderParagraph = () => {
    const content = component.properties.content || "Paragraph text goes here. Click to edit.";
    const alignment = component.properties.alignment || "text-left";
    
    return (
      <div 
        className={`h-full overflow-auto ${alignment}`}
        contentEditable={isSelected}
        suppressContentEditableWarning={true}
        onBlur={(e) => handleContentEdit(e.currentTarget.textContent || "")}
      >
        {content}
      </div>
    );
  };
  
  const renderPieChart = () => {
    const data = component.properties.data || [];
    const COLORS = ['#4338ca', '#818cf8', '#93c5fd', '#60a5fa', '#3b82f6'];
    
    return (
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="label"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderLineChart = () => {
    const data = component.properties.data || [];
    
    return (
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  const renderAreaChart = () => {
    const data = component.properties.data || [];
    
    return (
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  const renderBarChart = () => {
    const data = component.properties.data || [];
    
    return (
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="label" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  const renderColumnChart = () => {
    const data = component.properties.data || [];
    
    return (
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  const renderFunnelChart = () => {
    const data = component.properties.funnelSteps || [
      { name: 'Jan', value: 400 },
      { name: 'Feb', value: 300 },
      { name: 'Mar', value: 200 },
      { name: 'Apr', value: 278 },
      { name: 'May', value: 189 }
    ];
    
    return (
      <div className="h-full">
        <div className="mb-2">
          <h3 className="text-lg font-bold">{component.properties.title || "Title goes here"}</h3>
        </div>
        <ResponsiveContainer width="100%" height="85%">
          <FunnelChart>
            <Funnel
              dataKey="value"
              nameKey="name"
              data={data}
              isAnimationActive
            >
              <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
              <LabelList position="center" fill="#fff" stroke="none" dataKey="value" />
            </Funnel>
            <Tooltip />
          </FunnelChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderStackedBarChart = () => {
    const data = component.properties.data || [];
    
    return (
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" stackId="a" fill="#8884d8" />
            <Bar dataKey="value2" stackId="a" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  const renderScorecard = () => {
    const value = component.properties.value || "0";
    const label = component.properties.label || "Metric";
    const trend = component.properties.trend || 0;
    
    return (
      <div className="h-full flex flex-col justify-center items-center p-4">
        <div className="text-4xl font-bold">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
        {trend !== 0 && (
          <div className={`flex items-center mt-2 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend > 0 ? <MoveUpRight className="h-4 w-4 mr-1" /> : <MoveUpRight className="h-4 w-4 mr-1 transform rotate-90" />}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
    );
  };
  
  const renderDropdown = () => {
    const options = component.properties.options || [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' }
    ];
    
    const handleSelectChange = (value: string) => {
      onUpdate({
        ...component,
        properties: {
          ...component.properties,
          selectedValue: value
        }
      });
    };
    
    return (
      <div className="h-full p-2">
        <div className="mb-2">{component.properties.label || "My dropdown"}</div>
        <Select 
          value={component.properties.selectedValue || options[0].value}
          onValueChange={handleSelectChange}
          disabled={!isSelected}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            {options.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  };
  
  // This function is already defined above, so we'll remove this duplicate
  
  const renderTextLink = () => {
    const text = component.properties.text || "Click here";
    const url = component.properties.url || "#";
    
    const handleTextEdit = (newText: string) => {
      onUpdate({
        ...component,
        properties: {
          ...component.properties,
          text: newText
        }
      });
    };
    
    return (
      <div className="h-full flex items-center p-2">
        <a 
          href={url}
          className="text-blue-500 hover:underline cursor-pointer"
          contentEditable={isSelected}
          suppressContentEditableWarning={true}
          onBlur={(e) => handleTextEdit(e.currentTarget.textContent || "")}
          onClick={(e) => isSelected && e.preventDefault()}
        >
          {text}
        </a>
      </div>
    );
  };
  
  const renderRelativeDate = () => {
    const value = component.properties.value || 3;
    const unit = component.properties.unit || "Months";
    
    return (
      <div className="h-full flex items-center p-2">
        <div className="flex items-center">
          <span className="mr-2">Last</span>
          <div className="border p-2 rounded bg-gray-50 min-w-[50px] text-center">
            {value}
          </div>
          <Select 
            value={unit}
            onValueChange={(newUnit) => {
              onUpdate({
                ...component,
                properties: {
                  ...component.properties,
                  unit: newUnit
                }
              });
            }}
            disabled={!isSelected}
          >
            <SelectTrigger className="ml-2 bg-gray-50">
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Days">Days</SelectItem>
              <SelectItem value="Weeks">Weeks</SelectItem>
              <SelectItem value="Months">Months</SelectItem>
              <SelectItem value="Years">Years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };
  
  const renderDateRange = () => {
    // Use current date as default
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    const startDate = component.properties.startDate || today.toLocaleDateString();
    const endDate = component.properties.endDate || nextWeek.toLocaleDateString();
    
    return (
      <div className="h-full flex items-center p-2">
        <div className="flex items-center">
          <CalendarRange className="h-5 w-5 mr-2" />
          <div className="border py-1 px-2 rounded bg-gray-50">
            {startDate} - {endDate}
          </div>
        </div>
      </div>
    );
  };
  
  const renderSection = () => {
    return (
      <section className="h-full border-2 border-dashed border-gray-300 rounded p-4 flex items-center justify-center">
        <div className="text-center text-gray-500">
          {component.properties.content || "Section Component"}
        </div>
      </section>
    );
  };
  
  const renderContainer = () => {
    return (
      <div className="h-full border-2 border-dashed border-gray-300 rounded p-4 flex items-center justify-center">
        <div className="text-center text-gray-500">
          {component.properties.content || "Container Component"}
        </div>
      </div>
    );
  };
  
  const renderGrid = () => {
    return (
      <div className="h-full border-2 border-dashed border-gray-300 rounded p-4">
        <div className="grid grid-cols-3 gap-4 h-full">
          <div className="border border-gray-300 rounded flex items-center justify-center">1</div>
          <div className="border border-gray-300 rounded flex items-center justify-center">2</div>
          <div className="border border-gray-300 rounded flex items-center justify-center">3</div>
          <div className="border border-gray-300 rounded flex items-center justify-center">4</div>
          <div className="border border-gray-300 rounded flex items-center justify-center">5</div>
          <div className="border border-gray-300 rounded flex items-center justify-center">6</div>
        </div>
      </div>
    );
  };
  
  const renderColumns = () => {
    return (
      <div className="h-full border-2 border-dashed border-gray-300 rounded p-4">
        <div className="flex h-full">
          <div className="flex-1 border border-gray-300 rounded mr-2 flex items-center justify-center">Column 1</div>
          <div className="flex-1 border border-gray-300 rounded mx-2 flex items-center justify-center">Column 2</div>
          <div className="flex-1 border border-gray-300 rounded ml-2 flex items-center justify-center">Column 3</div>
        </div>
      </div>
    );
  };
  
  const renderList = () => {
    const items = component.properties.items || [
      'List item 1',
      'List item 2',
      'List item 3',
      'List item 4',
      'List item 5'
    ];
    
    return (
      <div className="h-full p-2 overflow-auto">
        <ul className="list-disc pl-5">
          {items.map((item, index) => (
            <li 
              key={index}
              className="mb-2"
              contentEditable={isSelected}
              suppressContentEditableWarning={true}
              onBlur={(e) => {
                if (isSelected) {
                  const newItems = [...items];
                  newItems[index] = e.currentTarget.textContent || item;
                  onUpdate({
                    ...component,
                    properties: {
                      ...component.properties,
                      items: newItems
                    }
                  });
                }
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  const renderTable = () => {
    const tableData = component.properties.tableData || [
      { name: 'Jan', value: '400' },
      { name: 'Feb', value: '300' },
      { name: 'Mar', value: '200' },
      { name: 'Apr', value: '278' },
      { name: 'May', value: '189' }
    ];
    
    const columns = component.properties.columns || ['name', 'value'];
    
    const handleCellEdit = (rowIndex: number, colKey: string, newValue: string) => {
      const newTableData = [...tableData];
      newTableData[rowIndex] = {
        ...newTableData[rowIndex],
        [colKey]: newValue
      };
      
      onUpdate({
        ...component,
        properties: {
          ...component.properties,
          tableData: newTableData
        }
      });
    };
    
    return (
      <div className="h-full p-2 overflow-auto">
        <div className="mb-2">
          <h3 className="text-lg font-bold mb-2">{component.properties.title || "My table"}</h3>
          {isSelected && (
            <button className="px-3 py-1 bg-gray-100 rounded text-sm mb-2 hover:bg-gray-200">
              Edit Columns
            </button>
          )}
        </div>
        <table className="w-full border-collapse">
          <thead className="bg-purple-100">
            <tr>
              {columns.map((col, colIndex) => (
                <th key={colIndex} className="border p-2 text-purple-700">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td 
                    key={`${rowIndex}-${colIndex}`} 
                    className="border p-2"
                    contentEditable={isSelected}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleCellEdit(rowIndex, col, e.currentTarget.textContent || "")}
                  >
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  return (
    <div
      ref={setNodeRef}
      className={`resizable absolute bg-white border border-gray-200 rounded-md shadow-sm ${
        isSelected ? "selected-element" : ""
      }`}
      style={style}
      onClick={onClick}
    >
      {/* Component content takes full height */}
      <div 
        className="w-full h-full overflow-hidden"
        style={{
          padding: paddingStyle,
          margin: marginStyle,
        }}
      >
        {renderComponentContent()}
      </div>
      
      {/* Control buttons that only show when selected */}
      {isSelected && (
        <div className="absolute top-0 right-0 bg-white border border-gray-200 rounded-bl-md shadow-sm flex items-center z-10">
          <div 
            className="drag-handle p-2 cursor-move"
            onMouseDown={handleDragHandleMouseDown}
          >
            <GripVertical className="h-6 w-6 text-gray-400" />
          </div>
          <button 
            className="p-1 text-gray-400 hover:text-gray-600"
            title="Duplicate"
            onClick={(e) => {
              e.stopPropagation();
              if (onDuplicate) {
                onDuplicate(component);
              }
            }}
          >
            <Copy className="h-6 w-6" />
          </button>
          <button 
            className="p-1 text-gray-400 hover:text-red-600"
            title="Delete"
            onClick={(e) => {
              e.stopPropagation();
              if (onRemove) {
                onRemove(component.id);
              }
            }}
          >
            <Trash className="h-6 w-6" />
          </button>
        </div>
      )}
      
      {/* Resize handle that only shows when selected */}
      {isSelected && (
        <div 
          ref={resizeHandleRef} 
          className="resize-handle resize-handle-se"
          onMouseDown={(e) => {
            e.stopPropagation();
            setIsResizing(true);
            setStartPoint({ x: e.clientX, y: e.clientY });
            setStartSize({ width: component.width, height: component.height });
          }}
        />
      )}
    </div>
  );
}
