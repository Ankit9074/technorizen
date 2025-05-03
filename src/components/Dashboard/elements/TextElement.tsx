import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useDashboardStore } from "@/store/dashboard";

interface TextElementProps {
  element: ElementType;
  isHeading?: boolean;
  isLabel?: boolean;
  isBlock?: boolean;
  isLink?: boolean;
}

export function TextElement({ 
  element, 
  isHeading = false,
  isLabel = false,
  isBlock = false,
  isLink = false
}: TextElementProps) {
  const { updateElementContent } = useDashboardStore();
  const [editing, setEditing] = useState(false);
  const contentEditableRef = useRef<HTMLElement>(null);
  
  const text = element.content.text || (
    isHeading 
      ? "Heading Text" 
      : isLabel 
        ? "Label" 
        : isLink 
          ? "Link Text"
          : "This is a paragraph of text that demonstrates how you can edit content directly in the canvas. Simply click on any text to edit it inline."
  );

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
    
    if (contentEditableRef.current) {
      updateElementContent(element.id, {
        ...element.content,
        text: contentEditableRef.current.innerText || text
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      contentEditableRef.current?.blur();
    }
  };

  useEffect(() => {
    if (editing && contentEditableRef.current) {
      contentEditableRef.current.focus();
      // Set cursor at the end
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(contentEditableRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [editing]);

  if (isHeading) {
    return (
      <h2
        ref={contentEditableRef as React.RefObject<HTMLHeadingElement>}
        className={cn("text-2xl font-semibold mb-2")}
        contentEditable={editing}
        suppressContentEditableWarning
        onClick={handleClick}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      >
        {text}
      </h2>
    );
  }
  
  if (isLabel) {
    return (
      <label
        ref={contentEditableRef as React.RefObject<HTMLLabelElement>}
        className={cn("text-sm font-medium block")}
        contentEditable={editing}
        suppressContentEditableWarning
        onClick={handleClick}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      >
        {text}
      </label>
    );
  }
  
  if (isLink) {
    // For links, we need to prevent the default link behavior when editing
    const handleLinkClick = (e: React.MouseEvent) => {
      if (!editing) {
        // Only follow the link if we're not in editing mode and have a proper URL
        if (!element.content.url || element.content.url === '#') {
          e.preventDefault();
          setEditing(true);
        }
      } else {
        e.preventDefault();
      }
    };

    return (
      <a
        ref={contentEditableRef as React.RefObject<HTMLAnchorElement>}
        className={cn("text-primary underline cursor-pointer", 
          !element.content.url || element.content.url === '#' ? "text-gray-400" : ""
        )}
        href={element.content.url || "#"}
        target="_blank"
        rel="noopener noreferrer"
        contentEditable={editing}
        suppressContentEditableWarning
        onClick={(e) => {
          e.stopPropagation();
          handleLinkClick(e);
        }}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      >
        {text}
        {(!element.content.url || element.content.url === '#') && 
          <span className="ml-1 text-xs text-gray-400">(Set URL in properties)</span>
        }
      </a>
    );
  }
  
  if (isBlock) {
    return (
      <div
        ref={contentEditableRef as React.RefObject<HTMLDivElement>}
        className={cn("text-neutral-dark p-3 bg-neutral-lightest rounded")}
        contentEditable={editing}
        suppressContentEditableWarning
        onClick={handleClick}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      >
        {text}
      </div>
    );
  }
  
  return (
    <p
      ref={contentEditableRef as React.RefObject<HTMLParagraphElement>}
      className={cn("text-neutral-dark mb-3")}
      contentEditable={editing}
      suppressContentEditableWarning
      onClick={handleClick}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      {text}
    </p>
  );
}
