import { useState } from "react";
import { DashboardComponent } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import ChartProperties from "./chart-properties";

interface PropertiesPanelProps {
  selectedComponent: DashboardComponent | null;
  onComponentUpdate: (component: DashboardComponent) => void;
  onComponentRemove: (componentId: string) => void;
}

export default function PropertiesPanel({
  selectedComponent,
  onComponentUpdate,
  onComponentRemove
}: PropertiesPanelProps) {
  const [activeTab, setActiveTab] = useState("elements");

  const handleComponentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedComponent) {
      onComponentUpdate({
        ...selectedComponent,
        name: e.target.value
      });
    }
  };
  
  // Fix all inputs to make them controlled components
  const handleInputChange = (property: string, value: any) => {
    if (selectedComponent) {
      onComponentUpdate({
        ...selectedComponent,
        properties: {
          ...selectedComponent.properties,
          [property]: value
        }
      });
    }
  };
  
  const handleRemoveComponent = () => {
    if (selectedComponent) {
      onComponentRemove(selectedComponent.id);
    }
  };
  
  const updateComponentProperties = (properties: Record<string, any>) => {
    if (selectedComponent) {
      onComponentUpdate({
        ...selectedComponent,
        properties: {
          ...selectedComponent.properties,
          ...properties
        }
      });
    }
  };
  
  const renderPropertiesForComponentType = () => {
    if (!selectedComponent) return null;
    
    switch (selectedComponent.elementType) {
      case "pie-chart":
      case "line-chart":
      case "area-chart":
      case "bar-chart":
      case "column-chart":
      case "stacked-bar":
        return (
          <ChartProperties
            component={selectedComponent}
            updateProperties={updateComponentProperties}
          />
        );
      case "funnel-chart":
        return renderFunnelChartProperties();
      case "scorecard":
        return renderScorecardProperties();
      case "table":
        return renderTableProperties();
      case "heading":
        return renderHeadingProperties();
      case "paragraph":
      case "text-block":
        return renderTextBlockProperties();
      case "text-link":
        return renderTextLinkProperties();
      case "dropdown":
        return renderDropdownProperties();
      case "relative-date":
        return renderRelativeDateProperties();
      case "date-range":
        return renderDateRangeProperties();
      case "section":
      case "container":
      case "columns":
      case "grid":
        return renderLayoutProperties();
      case "list":
        return renderListProperties();
      default:
        return <p className="text-xl text-gray-500 text-center py-8">No additional properties available for this element type</p>;
    }
  };
  
  const renderFunnelChartProperties = () => {
    if (!selectedComponent) return null;
    
    const funnelSteps = selectedComponent.properties.funnelSteps || [
      { name: 'Jan', value: 400 },
      { name: 'Feb', value: 300 },
      { name: 'Mar', value: 200 },
      { name: 'Apr', value: 278 },
      { name: 'May', value: 189 }
    ];
    
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="chart-title !text-xl">Chart Title</Label>
          <Input
            id="chart-title"
            value={selectedComponent.properties.title || ""}
            onChange={(e) => updateComponentProperties({ title: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Funnel Steps</Label>
            <button 
              className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
              onClick={() => {
                const newSteps = [...funnelSteps, { name: `Step ${funnelSteps.length + 1}`, value: 100 }];
                updateComponentProperties({ funnelSteps: newSteps });
              }}
            >
              Add Step
            </button>
          </div>
          
          {funnelSteps.map((step, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <Input
                placeholder="Label"
                value={step.name}
                onChange={(e) => {
                  const newSteps = [...funnelSteps];
                  newSteps[index] = { ...newSteps[index], name: e.target.value };
                  updateComponentProperties({ funnelSteps: newSteps });
                }}
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="Value"
                value={step.value}
                onChange={(e) => {
                  const newSteps = [...funnelSteps];
                  newSteps[index] = { ...newSteps[index], value: parseInt(e.target.value) || 0 };
                  updateComponentProperties({ funnelSteps: newSteps });
                }}
                className="flex-1"
              />
              <button 
                className="text-gray-500 hover:text-red-500"
                onClick={() => {
                  if (funnelSteps.length > 1) {
                    const newSteps = [...funnelSteps];
                    newSteps.splice(index, 1);
                    updateComponentProperties({ funnelSteps: newSteps });
                  }
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const renderScorecardProperties = () => {
    if (!selectedComponent) return null;
    
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="scorecard-value" className="text-xl">Value</Label>
          <Input
            id="scorecard-value"
             className="!text-xl"
            value={selectedComponent.properties.value || "0"}
            onChange={(e) => updateComponentProperties({ value: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="scorecard-label" className="text-xl">Label</Label>
          <Input
            id="scorecard-label"
             className="!text-xl"
            value={selectedComponent.properties.label || "Metric"}
            onChange={(e) => updateComponentProperties({ label: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="scorecard-trend" className="text-xl">Trend (%)</Label>
          <Input
            id="scorecard-trend"
            type="number"
             className="!text-xl"
            value={selectedComponent.properties.trend || 0}
            onChange={(e) => updateComponentProperties({ trend: parseInt(e.target.value) || 0 })}
          />
        </div>
      </div>
    );
  };
  
  const renderTableProperties = () => {
    if (!selectedComponent) return null;
    
    const tableData = selectedComponent.properties.tableData || [
      { name: 'Jan', value: '400' },
      { name: 'Feb', value: '300' },
      { name: 'Mar', value: '200' },
      { name: 'Apr', value: '278' },
      { name: 'May', value: '189' }
    ];
    
    const columns = selectedComponent.properties.columns || ['name', 'value'];
    
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="table-title" className="text-xl">Title</Label>
          <Input
            id="table-title"
             className="!text-xl"
            value={selectedComponent.properties.title || "My table"}
            onChange={(e) => updateComponentProperties({ title: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xl">Table Columns</Label>
            <button 
              className="text-xl bg-blue-500 text-white px-2 py-1 rounded"
              onClick={() => {
                const newColumns = [...columns, `column${columns.length + 1}`];
                // Also update the tableData to include the new column
                const newTableData = tableData.map(row => ({
                  ...row,
                  [`column${columns.length + 1}`]: ''
                }));
                updateComponentProperties({ 
                  columns: newColumns,
                  tableData: newTableData
                });
              }}
            >
              Add Column
            </button>
          </div>
          
          {columns.map((column, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <Input
                value={column}
                onChange={(e) => {
                  const newColumns = [...columns];
                  const oldColName = newColumns[index];
                  const newColName = e.target.value;
                  newColumns[index] = newColName;
                  
                  // Update table data to rename the column key
                  const newTableData = tableData.map(row => {
                    const newRow = { ...row };
                    newRow[newColName] = newRow[oldColName];
                    if (oldColName !== newColName) {
                      delete newRow[oldColName];
                    }
                    return newRow;
                  });
                  
                  updateComponentProperties({ 
                    columns: newColumns,
                    tableData: newTableData
                  });
                }}
                className="flex-1"
              />
              <button 
                className="text-gray-500 text-xl hover:text-red-500"
                onClick={() => {
                  if (columns.length > 1) {
                    const newColumns = [...columns];
                    const removedColumn = newColumns[index];
                    newColumns.splice(index, 1);
                    
                    // Remove this column from the table data
                    const newTableData = tableData.map(row => {
                      const newRow = { ...row };
                      delete newRow[removedColumn];
                      return newRow;
                    });
                    
                    updateComponentProperties({ 
                      columns: newColumns,
                      tableData: newTableData
                    });
                  }
                }}
                disabled={columns.length <= 1}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xl">Table Rows</Label>
            <button 
              className="text-xl bg-blue-500 text-white px-2 py-1 rounded"
              onClick={() => {
                const newRow = {};
                columns.forEach(col => {
                  newRow[col] = '';
                });
                const newTableData = [...tableData, newRow];
                updateComponentProperties({ tableData: newTableData });
              }}
            >
              Add Row
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  const renderTextLinkProperties = () => {
    if (!selectedComponent) return null;
    
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="link-text" className="text-xl">Link Text</Label>
          <Input
            id="link-text"
             className="!text-xl"
            value={selectedComponent.properties.text || "Click here"}
            onChange={(e) => updateComponentProperties({ text: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="link-url" className="text-xl">URL</Label>
          <Input
            id="link-url"
             className="!text-xl"
            value={selectedComponent.properties.url || "#"}
            onChange={(e) => updateComponentProperties({ url: e.target.value })}
          />
        </div>
      </div>
    );
  };
  
  const renderDropdownProperties = () => {
    if (!selectedComponent) return null;
    
    const label = selectedComponent.properties.label ?? "My dropdown";
    const options = selectedComponent.properties.options ?? [];
  
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="dropdown-label" className="text-xl">Label</Label>
          <Input
            id="dropdown-label"
             className="!text-xl"
            value={selectedComponent.properties.label || "My dropdown"}
            onChange={(e) => updateComponentProperties({ label: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xl">Dropdown Options</Label>
            <button 
              className="text-xl bg-blue-500 text-white px-2 py-1 rounded"
              onClick={() => {
                const newOptions = [...options, { 
                  value: `option${options.length + 1}`, 
                  label: `Option ${options.length + 1}` 
                }];
                updateComponentProperties({ options: newOptions });
              }}
            >
              Add Option
            </button>
          </div>
          
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <Input
                placeholder="Label"
                value={option.label}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index].label = e.target.value;
                  updateComponentProperties({ options: newOptions });
                }}
                className="flex-1 !text-xl"
              />
              <Input
                placeholder="Value"
                value={option.value}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index] = { ...newOptions[index], value: e.target.value };
                  updateComponentProperties({ options: newOptions });
                }}
                className="flex-1 !text-xl"
              />
              <button 
                className="text-gray-500 text-xl hover:text-red-500"
                onClick={() => {
                  if (options.length > 1) {
                    const newOptions = [...options];
                    newOptions.splice(index, 1);
                    updateComponentProperties({ options: newOptions });
                  }
                }}
                disabled={options.length <= 1}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const renderRelativeDateProperties = () => {
    if (!selectedComponent) return null;
    
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="relative-date-value" className="text-xl">Value</Label>
          <Input
            id="relative-date-value"
            type="number"
             className="!text-xl"
            value={selectedComponent.properties.value || 3}
            onChange={(e) => updateComponentProperties({ value: parseInt(e.target.value) || 1 })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="relative-date-unit" className="text-xl">Unit</Label>
          <Select 
            value={selectedComponent.properties.unit || "Months"} 
            onValueChange={(value) => updateComponentProperties({ unit: value })}
          >
            <SelectTrigger id="relative-date-unit">
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Days" className="text-xl">Days</SelectItem>
              <SelectItem value="Weeks" className="text-xl">Weeks</SelectItem>
              <SelectItem value="Months" className="text-xl">Months</SelectItem>
              <SelectItem value="Years" className="text-xl">Years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };
  
  const renderDateRangeProperties = () => {
    if (!selectedComponent) return null;
    
    // Use current date as default
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    const startDate = selectedComponent.properties.startDate || today.toLocaleDateString();
    const endDate = selectedComponent.properties.endDate || nextWeek.toLocaleDateString();
    
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="date-range-start" className="text-xl">Start Date</Label>
          <Input
            id="date-range-start"
            type="date"
             className="!text-xl"
            value={startDate}
            onChange={(e) => updateComponentProperties({ startDate: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="date-range-end" className="text-xl">End Date</Label>
          <Input
            id="date-range-end"
             className="!text-xl"
            type="date"
            value={endDate}
            onChange={(e) => updateComponentProperties({ endDate: e.target.value })}
          />
        </div>
      </div>
    );
  };
  
  const renderLayoutProperties = () => {
    if (!selectedComponent) return null;
    
    const content = selectedComponent.properties.content || `${selectedComponent.elementType.charAt(0).toUpperCase() + selectedComponent.elementType.slice(1)} Component`;
    
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="layout-content" className="text-xl">Content</Label>
          <Input
            id="layout-content"
            value={content}
             className="!text-xl"
            onChange={(e) => updateComponentProperties({ content: e.target.value })}
          />
        </div>
        
        {selectedComponent.elementType === "grid" && (
          <div className="space-y-2">
            <Label htmlFor="grid-columns" className="text-xl">Number of Columns</Label>
            <Input
              id="grid-columns"
              type="number"
              min="1"
              max="12"
               className="!text-xl"
              value={selectedComponent.properties.columns || 3}
              onChange={(e) => updateComponentProperties({ columns: parseInt(e.target.value) || 3 })}
            />
          </div>
        )}
        
        {selectedComponent.elementType === "columns" && (
          <div className="space-y-2">
            <Label htmlFor="columns-count" className="text-xl">Number of Columns</Label>
            <Input
              id="columns-count"
              type="number"
              min="1"
              max="6"
               className="!text-xl"
              value={selectedComponent.properties.columnCount || 3}
              onChange={(e) => updateComponentProperties({ columnCount: parseInt(e.target.value) || 3 })}
            />
          </div>
        )}
      </div>
    );
  };
  
  const renderListProperties = () => {
    if (!selectedComponent) return null;
    
    const items = selectedComponent.properties.items || [
      'List item 1',
      'List item 2',
      'List item 3',
      'List item 4',
      'List item 5'
    ];
    
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xl">List Items</Label>
            <button 
              className="text-xl bg-blue-500 text-white px-2 py-1 rounded"
              onClick={() => {
                const newItems = [...items, `List item ${items.length + 1}`];
                updateComponentProperties({ items: newItems });
              }}
            >
              Add Item
            </button>
          </div>
          
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <Input
                value={item}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index] = e.target.value;
                  updateComponentProperties({ items: newItems });
                }}
                className="flex-1 !text-xl"
              />
              <button 
                className="text-gray-500 text-xl hover:text-red-500"
                onClick={() => {
                  if (items.length > 1) {
                    const newItems = [...items];
                    newItems.splice(index, 1);
                    updateComponentProperties({ items: newItems });
                  }
                }}
                disabled={items.length <= 1}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="list-type" className="text-xl">List Type</Label>
          <Select 
            value={selectedComponent.properties.listType || "disc"} 
            onValueChange={(value) => updateComponentProperties({ listType: value })}
          >
            <SelectTrigger id="list-type">
              <SelectValue placeholder="Select list type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="disc" className="text-xl">Disc</SelectItem>
              <SelectItem value="circle" className="text-xl">Circle</SelectItem>
              <SelectItem value="square" className="text-xl">Square</SelectItem>
              <SelectItem value="decimal" className="text-xl">Decimal</SelectItem>
              <SelectItem value="none" className="text-xl">None</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };
  
  const renderHeadingProperties = () => {
    if (!selectedComponent) return null;
    
    const content = selectedComponent.properties.content || "";
    const fontSize = selectedComponent.properties.fontSize || "text-2xl";
    const fontWeight = selectedComponent.properties.fontWeight || "font-bold";
    const alignment = selectedComponent.properties.alignment || "text-center";
    
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="heading-text" className="text-xl">Text Content</Label>
          <Input
            id="heading-text"
             className="!text-xl"
            value={content}
            onChange={(e) => handleInputChange("content", e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="font-size" className="text-xl">Font Size</Label>
          <Select 
            value={fontSize} 
            onValueChange={(value) => handleInputChange("fontSize", value)}
          >
            <SelectTrigger id="font-size">
              <SelectValue placeholder="Select font size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text-sm" className="text-xl">Small</SelectItem>
              <SelectItem value="text-base" className="text-xl">Medium</SelectItem>
              <SelectItem value="text-xl" className="text-xl">Large</SelectItem>
              <SelectItem value="text-2xl" className="text-xl">X-Large</SelectItem>
              <SelectItem value="text-3xl" className="text-xl">XX-Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="font-weight" className="text-xl">Font Weight</Label>
          <Select 
            value={fontWeight} 
            onValueChange={(value) => handleInputChange("fontWeight", value)}
          >
            <SelectTrigger id="font-weight">
              <SelectValue placeholder="Select font weight" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="font-normal" className="text-xl">Normal</SelectItem>
              <SelectItem value="font-medium" className="text-xl">Medium</SelectItem>
              <SelectItem value="font-semibold" className="text-xl">Semi Bold</SelectItem>
              <SelectItem value="font-bold" className="text-xl">Bold</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="text-alignment" className="text-xl">Text Alignment</Label>
          <Select 
            value={alignment} 
            onValueChange={(value) => handleInputChange("alignment", value)}
          >
            <SelectTrigger id="text-alignment">
              <SelectValue placeholder="Select alignment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text-left" className="text-xl">Left</SelectItem>
              <SelectItem value="text-center" className="text-xl">Center</SelectItem>
              <SelectItem value="text-right" className="text-xl">Right</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };
  
  const renderTextBlockProperties = () => {
    if (!selectedComponent) return null;
    
    const content = selectedComponent.properties.content || "";
    const fontSize = selectedComponent.properties.fontSize || "text-base";
    const alignment = selectedComponent.properties.alignment || "text-left";
    
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="text-content" className="text-xl">Text Content</Label>
          <Input
            id="text-content"
            value={content}
            onChange={(e) => handleInputChange("content", e.target.value)}
            className="min-h-[100px] !text-xl"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="font-size" className="text-xl">Font Size</Label>
          <Select 
            value={fontSize} 
            onValueChange={(value) => handleInputChange("fontSize", value)}
          >
            <SelectTrigger id="font-size">
              <SelectValue placeholder="Select font size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text-xs" className="text-xl">Extra Small</SelectItem>
              <SelectItem value="text-sm" className="text-xl">Small</SelectItem>
              <SelectItem value="text-base" className="text-xl">Medium</SelectItem>
              <SelectItem value="text-lg" className="text-xl">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="text-alignment" className="text-xl">Text Alignment</Label>
          <Select 
            value={alignment} 
            onValueChange={(value) => handleInputChange("alignment", value)}
          >
            <SelectTrigger id="text-alignment">
              <SelectValue placeholder="Select alignment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text-left" className="text-xl">Left</SelectItem>
              <SelectItem value="text-center" className="text-xl">Center</SelectItem>
              <SelectItem value="text-right" className="text-xl">Right</SelectItem>
              <SelectItem value="text-justify" className="text-xl">Justify</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };

  const renderFontSection = () => {
    if (!selectedComponent) return null;
    
    const fontFamily = selectedComponent.properties.fontFamily || "Inter";
    const color = selectedComponent.properties.color || "#000000";
    const fontSize = selectedComponent.properties.fontSize || "16px";
    
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="font-family" className="text-xl">Font Family</Label>
          <Select 
            value={fontFamily} 
            onValueChange={(value) => handleInputChange("fontFamily", value)}
          >
            <SelectTrigger id="font-family">
              <SelectValue placeholder="Select font family" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="text-xl" value="Inter">Inter</SelectItem>
              <SelectItem className="text-xl" value="Arial">Arial</SelectItem>
              <SelectItem className="text-xl" value="Helvetica">Helvetica</SelectItem>
              <SelectItem className="text-xl" value="Times New Roman">Times New Roman</SelectItem>
              <SelectItem className="text-xl" value="Georgia">Georgia</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="color" className="text-xl">Color</Label>
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded border border-gray-300 overflow-hidden">
              <input 
                type="color" 
                value={color} 
                onChange={(e) => handleInputChange("color", e.target.value)}
                className="h-12 w-12 transform -translate-y-1 -translate-x-1 cursor-pointer"
              />
            </div>
            <Input 
              id="color"
              value={color}
              onChange={(e) => handleInputChange("color", e.target.value)}
              className="flex-1 !text-xl"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="fontSize" className="text-xl">Font Size</Label>
          <Input
            id="fontSize"
            className="!text-xl"
            type="text"
            value={fontSize}
            onChange={(e) => handleInputChange("fontSize", e.target.value)}
          />
          <div className="flex items-center space-x-2 mt-4">
            <button 
              onClick={() => {
                const currentSize = parseInt(fontSize);
                if (currentSize > 8) {
                  handleInputChange("fontSize", `${currentSize - 1}px`);
                }
              }}
              className="h-10 w-10 rounded border border-gray-300 flex items-center justify-center"
            >
              -
            </button>
            <div className="flex-1 text-center text-xl">{fontSize}</div>
            <button 
              onClick={() => {
                const currentSize = parseInt(fontSize);
                handleInputChange("fontSize", `${currentSize + 1}px`);
              }}
              className="h-10 w-10 rounded border border-gray-300 flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  const renderSpacingSection = () => {
    if (!selectedComponent) return null;
    
    const padding = selectedComponent.properties.padding || {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    
    const margin = selectedComponent.properties.margin || {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Label className="text-xl">Padding (px)</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="padding-top" className="text-lg text-gray-500">Top</Label>
              <Input 
                id="padding-top"
                type="number"
                 className="!text-xl"
                value={padding.top}
                onChange={(e) => handleInputChange("padding", { 
                  ...padding, 
                  top: parseInt(e.target.value) || 0 
                })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="padding-right" className="text-lg text-gray-500">Right</Label>
              <Input 
                id="padding-right"
                 className="!text-xl"
                type="number"
                value={padding.right}
                onChange={(e) => handleInputChange("padding", { 
                  ...padding, 
                  right: parseInt(e.target.value) || 0 
                })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="padding-bottom" className="text-lg text-gray-500">Bottom</Label>
              <Input 
                id="padding-bottom"
                type="number"
                 className="!text-xl"
                value={padding.bottom}
                onChange={(e) => handleInputChange("padding", {
                  ...padding, 
                  bottom: parseInt(e.target.value) || 0 
                })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="padding-left" className="text-lg text-gray-500">Left</Label>
              <Input 
                id="padding-left"
                type="number"
                 className="!text-xl"
                value={padding.left}
                onChange={(e) => handleInputChange("padding", {
                  ...padding, 
                  left: parseInt(e.target.value) || 0
                })}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-xl">Margin (px)</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="margin-top" className="text-lg text-gray-500">Top</Label>
              <Input 
                id="margin-top"
                type="number"
                 className="!text-xl"
                value={margin.top}
                onChange={(e) => handleInputChange("margin", {
                  ...margin, 
                  top: parseInt(e.target.value) || 0 
                })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="margin-right" className="text-lg text-gray-500">Right</Label>
              <Input 
                id="margin-right"
                type="number"
                 className="!text-xl"
                value={margin.right}
                onChange={(e) => handleInputChange("margin", {
                  ...margin,
                  right: parseInt(e.target.value) || 0
                })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="margin-bottom" className="text-lg text-gray-500">Bottom</Label>
              <Input 
                id="margin-bottom"
                type="number"
                 className="!text-xl"
                value={margin.bottom}
                onChange={(e) => handleInputChange("margin", {
                  ...margin,
                  bottom: parseInt(e.target.value) || 0 
                })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="margin-left" className="text-lg text-gray-500">Left</Label>
              <Input 
                id="margin-left"
                type="number"
                 className="!text-xl"
                value={margin.left}
                onChange={(e) => handleInputChange("margin", {
                  ...margin,
                  left: parseInt(e.target.value) || 0
                })}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderTextAlignmentSection = () => {
    if (!selectedComponent) return null;
    
    const textAlign = selectedComponent.properties.textAlign || "left";
    
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-xl">Text Alignment</Label>
          <div className="grid grid-cols-4 gap-2">
            <button 
              className={`h-8 text-xl rounded border ${textAlign === 'left' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'} flex items-center justify-center`}
              onClick={() => handleInputChange("textAlign", 'left')}
            >
              Left
            </button>
            <button 
              className={`h-8 text-xl rounded border ${textAlign === 'center' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'} flex items-center justify-center`}
              onClick={() => handleInputChange("textAlign", 'center')}
            >
              Center
            </button>
            <button 
              className={`h-8 text-xl rounded border ${textAlign === 'right' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'} flex items-center justify-center`}
              onClick={() => handleInputChange("textAlign", 'right')}
            >
              Right
            </button>
            <button 
              className={`h-8 text-xl rounded border ${textAlign === 'justify' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'} flex items-center justify-center`}
              onClick={() => handleInputChange("textAlign", 'justify')}
            >
              Justify
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-medium">Properties</span>
        </div>
        <button 
          className="text-gray-500 hover:text-red-500 text-xl"
          onClick={handleRemoveComponent}
          disabled={!selectedComponent}
        >
          Remove
        </button>
      </div>
      
      {selectedComponent ? (
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-xl font-medium text-gray-700 mb-4">Component Name</label>
            <Input
              type="text"
              value={selectedComponent.name}
              onChange={handleComponentNameChange}
              className="w-full !text-xl py-6"
            />
          </div>

          <Tabs defaultValue="elements" value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b border-gray-200 mb-4">
              <TabsList className="flex w-full bg-transparent p-0">
                <TabsTrigger 
                  value="elements" 
                  className="py-2 px-4 text-xl font-medium flex-1 data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-700 data-[state=active]:shadow-none"
                >
                  Content
                </TabsTrigger>
                <TabsTrigger 
                  value="style" 
                  className="py-2 px-4 text-xl font-medium flex-1 data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-700 data-[state=active]:shadow-none"
                >
                  Style
                </TabsTrigger>
                <TabsTrigger 
                  value="layout" 
                  className="py-2 px-4 text-xl font-medium flex-1 data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-700 data-[state=active]:shadow-none"
                >
                  Layout
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="elements" className="mt-0">
              {renderPropertiesForComponentType()}
            </TabsContent>
            
            <TabsContent value="style" className="mt-0 space-y-6">
              {renderFontSection()}
              {renderTextAlignmentSection()}
              
              <div className="space-y-2">
                <Label htmlFor="bg-color" className="text-xl">Background Color</Label>
                <div className="flex items-center space-x-2">
                  <div className="h-10 w-10 rounded border border-gray-300 overflow-hidden">
                    <input 
                      type="color" 
                      value={selectedComponent.properties.backgroundColor || "#ffffff"} 
                      onChange={(e) => handleInputChange("backgroundColor", e.target.value)}
                      className="h-12 w-12 transform -translate-y-1 -translate-x-1 cursor-pointer"
                    />
                  </div>
                  <Input 
                    id="bg-color"
                    value={selectedComponent.properties.backgroundColor || "#ffffff"}
                    onChange={(e) => handleInputChange("backgroundColor", e.target.value)}
                    className="flex-1 !text-xl"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="border-color" className="text-xl">Border Color</Label>
                <div className="flex items-center space-x-2">
                  <div className="h-10 w-10 rounded border border-gray-300 overflow-hidden">
                    <input 
                      type="color" 
                      value={selectedComponent.properties.borderColor || "#e5e7eb"} 
                      onChange={(e) => handleInputChange("borderColor", e.target.value)}
                      className="h-12 w-12 transform -translate-y-1 -translate-x-1 cursor-pointer"
                    />
                  </div>
                  <Input 
                    id="border-color"
                    value={selectedComponent.properties.borderColor || "#e5e7eb"}
                    onChange={(e) => handleInputChange("borderColor", e.target.value)}
                    className="flex-1 !text-xl"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="border-width" className="text-xl">Border Width</Label>
                <Input 
                  id="border-width"
                   className="!text-xl"
                  type="number"
                  value={selectedComponent.properties.borderWidth || 0}
                  onChange={(e) => handleInputChange("borderWidth", parseInt(e.target.value) || 0)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="border-radius" className="text-xl">Border Radius</Label>
                <Input 
                  id="border-radius"
                   className="!text-xl"
                  type="number"
                  value={selectedComponent.properties.borderRadius || 0}
                  onChange={(e) => handleInputChange("borderRadius", parseInt(e.target.value) || 0)}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="layout" className="mt-0">
              {renderSpacingSection()}
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div>
          <p className="text-xl text-gray-500 text-center py-8">Select an element to edit its properties</p>
        </div>
      )}
    </div>
  );
}
