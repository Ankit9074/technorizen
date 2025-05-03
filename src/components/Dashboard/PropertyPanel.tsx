import React from "react";
import { MenuDotsIcon } from "../../components/ui/icon";
import { useSelectedElementStore } from "@/store/dashboard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowDownRight, Settings2, Share2 } from "lucide-react";
import { Icon12, Icon13, Icon14, Icon15 } from "@/lib/elements";

export function PropertyPanel() {
  const { selectedElement, updateSelectedElement } = useSelectedElementStore();

  // Stop propagation to prevent unselecting the element when clicking in the property panel
  const handlePanelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!selectedElement) {
    return (
      <div className="w-96 border-l border-neutral-light bg-white overflow-y-auto">
        <div className="p-3">
          <div className="flex justify-around items-center gap-2">
            <div className="flex justify-center items-center gap-2">
              <img
                src="#"
                alt="photo"
                className="!w-12 !h-12 bg-gray-200 rounded-full"
              />
              <p className="m-0 text-2xl">User Name</p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <p className="m-0 text-2xl">Share</p>
              <Share2 className="h-6 w-6" />
            </div>
          </div>
          <div className="bg-[#f9f9f9] !outline !outline-gray-100 rounded-lg flex justify-center items-center p-3 my-8">
            <input
              type="text"
              name="properties"
              id="properties"
              className="w-full outline-none text-xl"
              placeholder="Properties"
            />
            <Settings2 />
          </div>
          <div className="text-neutral-medium text-center p-6">
            Select an element to edit its properties
          </div>
        </div>
      </div>
    );
  }

  const handleStyleChange = (key: string, value: any) => {
    if (!selectedElement) return;

    updateSelectedElement({
      ...selectedElement,
      style: {
        ...selectedElement.style,
        [key]: value,
      },
    });
  };

  const handleContentChange = (key: string, value: any) => {
    if (!selectedElement) return;

    updateSelectedElement({
      ...selectedElement,
      content: {
        ...selectedElement.content,
        [key]: value,
      },
    });
  };

  const handlePositionChange = (key: string, value: any) => {
    if (!selectedElement) return;

    updateSelectedElement({
      ...selectedElement,
      position: {
        ...selectedElement.position,
        [key]: value,
      },
    });
  };

  const handleMarginChange = (side: string, value: string) => {
    if (!selectedElement) return;

    const margin = selectedElement.style.margin || {};

    updateSelectedElement({
      ...selectedElement,
      style: {
        ...selectedElement.style,
        margin: {
          ...margin,
          [side]: value,
        },
      },
    });
  };

  const handlePaddingChange = (side: string, value: string) => {
    if (!selectedElement) return;

    const padding = selectedElement.style.padding || {};

    updateSelectedElement({
      ...selectedElement,
      style: {
        ...selectedElement.style,
        padding: {
          ...padding,
          [side]: value,
        },
      },
    });
  };

  const positions = [
    { id: "left", name: "Left", icon: "left-position" },
    { id: "top", name: "Top", icon: "top-position" },
    { id: "right", name: "Right", icon: "right-position" },
    { id: "bottom", name: "Bottom", icon: "bottom-position" },
  ];

  const margin = selectedElement.style.margin || {};
  const padding = selectedElement.style.padding || {};
  const backgroundColor = selectedElement.style.backgroundColor || "";

  return (
    <div
      className="w-96 border-l border-neutral-light bg-white overflow-y-auto property-panel"
      onClick={handlePanelClick}
    >
      <div className="p-3">
        <div className="flex justify-around items-center gap-2">
          <div className="flex justify-center items-center gap-2">
            <img
              src="#"
              alt="photo"
              className="!w-12 !h-12 bg-gray-200 rounded-full"
            />
            <p className="m-0 text-2xl">User Name</p>
          </div>
          <div className="flex justify-center items-center gap-2">
            <p className="m-0 text-2xl">Share</p>
            <Share2 className="h-6 w-6" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="!outline !outline-gray-100 rounded-lg flex justify-center items-center p-3 my-8">
          <input type="text" name="properties" id="properties" className="w-full outline-none text-xl" placeholder="Properties"/>
          <Settings2/>
        </div>
        </div>

        {/* Properties Panel Content */}
        <div className="bg-white rounded-md">
          <div className="p-3">
            <h3 className="!text-2xl font-medium text-neutral-darkest mb-3 flex items-center justify-between">
              Design
              <ArrowDownRight className="h-6 w-6"/>
            </h3>
            <hr className="mb-4"/>

            {/* Position Controls */}
            <div className="mb-4">
              <Label className="text-xl text-neutral-dark block my-4">
                Position
              </Label>
              <div className="grid grid-cols-2 gap-6">
                {positions.map((position) => (
                  <div className="text-center" key={position.id}>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "w-full rounded border border-neutral-light p-4 hover:border-primary h-auto",
                        selectedElement.style.position === position.id &&
                          "border-primary"
                      )}
                      onClick={() => handleStyleChange("position", position.id)}
                    >
                      <div className="w-8 h-8 mx-auto flex items-center justify-center">
                          {position.id === "left" && (
                            <img src={Icon12} alt="left" className="h-full w-full" />
                          )}
                          {position.id === "top" && (
                            <img src={Icon13} alt="top" className="h-full w-full" />
                          )}
                          {position.id === "right" && (
                            <img src={Icon14} alt="right" className="h-full w-full" />
                          )}
                          {position.id === "bottom" && (
                            <img src={Icon15} alt="bottom" className="h-full w-full" />
                          )}
                      </div>
                      <span className="text-xl text-neutral-dark mt-1 block">
                        {position.name}
                      </span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Fill Controls */}
            <div className="mb-4">
              <Label className="text-xl text-neutral-dark block my-6">
                Fill
              </Label>
              <div className="flex items-center gap-2 bg-white border border-neutral-light rounded p-3">
                <div
                  className="w-12 h-12 rounded cursor-pointer"
                  style={{ backgroundColor: backgroundColor || "green" }}
                  onClick={() => {
                    const colors = [
                      "#22C55E",
                      "#3B82F6",
                      "#EC4899",
                      "#EAB308",
                      "#8B5CF6",
                    ];
                    const currentIndex = colors.indexOf(backgroundColor);
                    const nextIndex = (currentIndex + 1) % colors.length;
                    handleStyleChange("backgroundColor", colors[nextIndex]);
                  }}
                ></div>
                <span className="text-xl text-neutral-dark ml-2">
                  {backgroundColor ? backgroundColor : "Green"}
                </span>
              </div>
            </div>

            {/* Typography Controls */}
            <div className="mb-4">
              <Label className="text-xl text-neutral-dark block my-6">
                Typography
              </Label>
              <div className="flex items-center bg-white border border-neutral-light rounded p-3">
                <span className="text-xl text-neutral-dark">Inter</span>
                <svg
                  className="w-4 h-4 ml-auto text-neutral-medium"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>

            {/* Size Controls */}
            <div className="mb-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xl text-neutral-medium block my-6">
                    Width
                  </Label>
                  <Input
                    type="text"
                    value={
                      selectedElement.position.width
                        ? `${selectedElement.position.width}px`
                        : "100%"
                    }
                    onChange={(e) =>
                      handlePositionChange(
                        "width",
                        parseInt(e.target.value) || "100%"
                      )
                    }
                    className="w-full !text-xl border border-neutral-light rounded p-1.5 property-input"
                  />
                </div>
                <div>
                  <Label className="text-xl text-neutral-medium block my-6">
                    Height
                  </Label>
                  <Input
                    type="text"
                    value={
                      selectedElement.position.height
                        ? `${selectedElement.position.height}px`
                        : "Auto"
                    }
                    onChange={(e) =>
                      handlePositionChange(
                        "height",
                        parseInt(e.target.value) || "Auto"
                      )
                    }
                    className="w-full !text-xl border border-neutral-light rounded p-1.5 property-input"
                  />
                </div>
              </div>
            </div>

            {/* Margin Controls */}
            <div className="mb-4">
              <Label className="text-xl text-neutral-dark block my-6">
                Margin
              </Label>
              <div className="grid grid-cols-4 gap-4 place-items-center place-content-center">
                <div>
                  <Label className="text-lg text-neutral-medium block mb-2">
                    Top
                  </Label>
                  <Input
                    type="text"
                    value={margin.top || "0px"}
                    onChange={(e) => handleMarginChange("top", e.target.value)}
                    className="w-full !text-xl border border-neutral-light rounded p-1.5 property-input"
                  />
                </div>
                <div>
                  <Label className="text-lg text-neutral-medium block mb-1">
                    Right
                  </Label>
                  <Input
                    type="text"
                    value={margin.right || "0px"}
                    onChange={(e) =>
                      handleMarginChange("right", e.target.value)
                    }
                    className="w-full !text-xl border border-neutral-light rounded p-1.5 property-input"
                  />
                </div>
                <div>
                  <Label className="text-lg text-neutral-medium block mb-1">
                    Bottom
                  </Label>
                  <Input
                    type="text"
                    value={margin.bottom || "20px"}
                    onChange={(e) =>
                      handleMarginChange("bottom", e.target.value)
                    }
                    className="w-full !text-xl border border-neutral-light rounded p-1.5 property-input"
                  />
                </div>
                <div>
                  <Label className="text-lg text-neutral-medium block mb-1">
                    Left
                  </Label>
                  <Input
                    type="text"
                    value={margin.left || "0px"}
                    onChange={(e) => handleMarginChange("left", e.target.value)}
                    className="w-full !text-xl border border-neutral-light rounded p-1.5 property-input"
                  />
                </div>
              </div>
            </div>

            {/* Padding Controls */}
            <div className="mb-4">
              <Label className="text-xl text-neutral-dark block my-6">
                Padding
              </Label>
              <div className="grid grid-cols-4 gap-2 place-content-center place-items-center">
                <div>
                  <Label className="text-lg text-neutral-medium block mb-1">
                    Top
                  </Label>
                  <Input
                    type="text"
                    value={padding.top || "16px"}
                    onChange={(e) => handlePaddingChange("top", e.target.value)}
                    className="w-full !text-xl border border-neutral-light rounded p-1.5 property-input"
                  />
                </div>
                <div>
                  <Label className="text-lg text-neutral-medium block mb-1">
                    Right
                  </Label>
                  <Input
                    type="text"
                    value={padding.right || "16px"}
                    onChange={(e) =>
                      handlePaddingChange("right", e.target.value)
                    }
                    className="w-full !text-xl border border-neutral-light rounded p-1.5 property-input"
                  />
                </div>
                <div>
                  <Label className="text-lg text-neutral-medium block mb-1">
                    Bottom
                  </Label>
                  <Input
                    type="text"
                    value={padding.bottom || "16px"}
                    onChange={(e) =>
                      handlePaddingChange("bottom", e.target.value)
                    }
                    className="w-full !text-xl border border-neutral-light rounded p-1.5 property-input"
                  />
                </div>
                <div>
                  <Label className="text-lg text-neutral-medium block mb-1">
                    Left
                  </Label>
                  <Input
                    type="text"
                    value={padding.left || "16px"}
                    onChange={(e) =>
                      handlePaddingChange("left", e.target.value)
                    }
                    className="w-full !text-xl border border-neutral-light rounded p-1.5 property-input"
                  />
                </div>
              </div>
            </div>

            {/* Link URL field - Only show if the element is a text link */}
            {selectedElement.type === "textLink" && (
              <div className="mb-4">
                <Label className="text-xs text-neutral-dark block mb-2">
                  Link URL
                </Label>
                <Input
                  type="url"
                  value={selectedElement.content.url || ""}
                  onChange={(e) => handleContentChange("url", e.target.value)}
                  placeholder="https://example.com"
                  className="w-full text-sm border border-neutral-light rounded p-1.5 property-input"
                />
                <div className="text-xs text-neutral-medium mt-1">
                  Enter the full URL including https://
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
