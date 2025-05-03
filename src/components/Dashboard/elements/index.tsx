import { 
  SectionIcon, 
  ContainerIcon, 
  GridIcon, 
  ColumnsIcon, 
  ListIcon,
  HeadingIcon,
  ParagraphIcon,
  LabelIcon,
  TableIcon,
  TextBlockIcon,
  TextLinkIcon
} from "@/components/ui/icon";

export { ComponentItem } from "./ComponentItem";
export { CanvasElement } from "./CanvasElement";
export { TextElement } from "./TextElement";

export const ELEMENT_ICONS = {
  section: SectionIcon,
  container: ContainerIcon,
  grid: GridIcon,
  columns: ColumnsIcon,
  list: ListIcon,
  heading: HeadingIcon,
  paragraph: ParagraphIcon,
  label: LabelIcon,
  table: TableIcon,
  textBlock: TextBlockIcon,
  textLink: TextLinkIcon
};

export function createElement(type: string, position: { x: number, y: number }): ElementType {
  const id = `el-${Date.now()}`;
  
  let content = {};
  let style = {};
  
  switch (type) {
    case 'heading':
      content = { text: 'Welcome to your Dashboard' };
      style = { fontWeight: 'bold', fontSize: '24px' };
      break;
    case 'paragraph':
      content = { text: 'This is a paragraph of text. Click to edit.' };
      style = { fontSize: '16px' };
      break;
    case 'label':
      content = { text: 'Label' };
      style = { fontSize: '14px', fontWeight: 'medium' };
      break;
    case 'textBlock':
      content = { text: 'This is a text block with multiple lines of content.' };
      style = { padding: { top: '8px', right: '8px', bottom: '8px', left: '8px' }, backgroundColor: '#f8f9fa' };
      break;
    case 'textLink':
      content = { text: 'Click this link', url: '#' };
      style = { color: '#5E42D6', textDecoration: 'underline' };
      break;
    case 'section':
      style = { 
        padding: { top: '16px', right: '16px', bottom: '16px', left: '16px' }, 
        width: 400,
        border: '1px solid #e2e8f0'
      };
      break;
    case 'container':
      style = { 
        padding: { top: '12px', right: '12px', bottom: '12px', left: '12px' }, 
        width: 300,
        border: '1px solid #e2e8f0',
        backgroundColor: '#ffffff'
      };
      break;
    case 'grid':
      style = {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '8px',
        width: 400,
        padding: { top: '8px', right: '8px', bottom: '8px', left: '8px' }
      };
      break;
    case 'columns':
      style = {
        display: 'flex',
        flexDirection: 'row',
        gap: '8px',
        width: 400,
        padding: { top: '8px', right: '8px', bottom: '8px', left: '8px' }
      };
      break;
    case 'list':
      style = {
        padding: { top: '8px', right: '8px', bottom: '8px', left: '8px' },
        width: 300
      };
      content = { items: ['Item 1', 'Item 2', 'Item 3'] };
      break;
    case 'table':
      style = {
        width: 400,
        border: '1px solid #e2e8f0',
        borderCollapse: 'collapse'
      };
      content = { 
        headers: ['Column 1', 'Column 2'],
        rows: [
          ['Row 1, Cell 1', 'Row 1, Cell 2'],
          ['Row 2, Cell 1', 'Row 2, Cell 2']
        ]
      };
      break;
    default:
      break;
  }
  
  return {
    id,
    type,
    content,
    position,
    style
  };
}
