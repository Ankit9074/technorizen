import { ElementDefinition } from "@/types/dashboard";


import Icon1 from "@/assets/editor-icons/1.png"
import Icon2 from "@/assets/editor-icons/2.png"
import Icon3 from "@/assets/editor-icons/3.png"
import Icon4 from "@/assets/editor-icons/4.png"
import Icon5 from "@/assets/editor-icons/5.png"
import Icon6 from "@/assets/editor-icons/6.png"
import Icon7 from "@/assets/editor-icons/7.png"
import Icon8 from "@/assets/editor-icons/8.png"
import Icon9 from "@/assets/editor-icons/9.png"
import Icon10 from "@/assets/editor-icons/10.png"
import Icon11 from "@/assets/editor-icons/11.png"

export {default as Icon12} from "@/assets/editor-icons/12.png"
export {default as Icon13} from "@/assets/editor-icons/13.png"
export {default as Icon14} from "@/assets/editor-icons/14.png"
export {default as Icon15} from "@/assets/editor-icons/15.png"



// Layout Elements
export const layoutElements: ElementDefinition[] = [
  {
    id: "section",
    name: "Section",
    type: "section",
    icon: Icon1,
    category: "layout"
  },
  {
    id: "container",
    name: "Container",
    type: "container",
    icon: Icon2,
    category: "layout"
  },
  {
    id: "grid",
    name: "Grid",
    type: "grid",
    icon: Icon3,
    category: "layout"
  },
  {
    id: "columns",
    name: "Columns",
    type: "columns",
    icon: Icon4,
    category: "layout"
  },
  {
    id: "list",
    name: "List",
    type: "list",
    icon: Icon5,
    category: "layout"
  }
];

// Text Elements
export const textElements: ElementDefinition[] = [
  {
    id: "heading",
    name: "Heading",
    type: "heading",
    icon: Icon6,
    category: "text"
  },
  {
    id: "paragraph",
    name: "Paragraph",
    type: "paragraph",
    icon: Icon7,
    category: "text"
  },
  {
    id: "label",
    name: "Label",
    type: "label",
    icon: Icon8,
    category: "text"
  },
  {
    id: "table",
    name: "Table",
    type: "table",
    icon: Icon9,
    category: "text"
  },
  {
    id: "textBlock",
    name: "Text Block",
    type: "textBlock",
    icon: Icon10,
    category: "text"
  },
  {
    id: "textLink",
    name: "Text Link",
    type: "textLink",
    icon: Icon11,
    category: "text"
  }
];

// Element Categories
export const elementCategories = [
  {
    id: "layout",
    name: "Layout",
    elements: layoutElements
  },
  {
    id: "text",
    name: "Text",
    elements: textElements
  }
];

// Get all elements
export const allElements = [...layoutElements, ...textElements];

// Get element by ID
export const getElementById = (id: string): ElementDefinition | undefined => {
  return allElements.find(element => element.id === id);
};

// Get element by type
export const getElementByType = (type: string): ElementDefinition | undefined => {
  return allElements.find(element => element.type === type);
};
