import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  children: React.ReactNode;
}

export function Icon({ children, className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}

// Layout Icons
export function SectionIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
      <line x1="3" y1="9" x2="21" y2="9" strokeWidth="1.5" />
    </Icon>
  );
}

export function ContainerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="1.5" />
      <rect x="7" y="7" width="10" height="10" rx="1" strokeWidth="1.5" />
    </Icon>
  );
}

export function GridIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="7" height="7" strokeWidth="1.5" />
      <rect x="14" y="3" width="7" height="7" strokeWidth="1.5" />
      <rect x="3" y="14" width="7" height="7" strokeWidth="1.5" />
      <rect x="14" y="14" width="7" height="7" strokeWidth="1.5" />
    </Icon>
  );
}

export function ColumnsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
      <line x1="9" y1="3" x2="9" y2="21" strokeWidth="1.5" />
      <line x1="15" y1="3" x2="15" y2="21" strokeWidth="1.5" />
    </Icon>
  );
}

export function ListIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
      <line x1="7" y1="8" x2="17" y2="8" strokeWidth="1.5" />
      <line x1="7" y1="12" x2="17" y2="12" strokeWidth="1.5" />
      <line x1="7" y1="16" x2="17" y2="16" strokeWidth="1.5" />
    </Icon>
  );
}

// Text Icons
export function HeadingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M4 6h16M4 12h16M4 18h7" strokeWidth="2" strokeLinecap="round" />
    </Icon>
  );
}

export function ParagraphIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M4 6h16M4 10h16M4 14h16M4 18h12" strokeWidth="1.5" strokeLinecap="round" />
    </Icon>
  );
}

export function LabelIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M7 7h10M7 12h5" strokeWidth="2" strokeLinecap="round" />
      <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="1.5" />
    </Icon>
  );
}

export function TableIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
      <line x1="3" y1="9" x2="21" y2="9" strokeWidth="1.5" />
      <line x1="3" y1="15" x2="21" y2="15" strokeWidth="1.5" />
      <line x1="9" y1="3" x2="9" y2="21" strokeWidth="1.5" />
      <line x1="15" y1="3" x2="15" y2="21" strokeWidth="1.5" />
    </Icon>
  );
}

export function TextBlockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
      <path d="M7 8h10M7 12h10M7 16h6" strokeWidth="1.5" strokeLinecap="round" />
    </Icon>
  );
}

export function TextLinkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  );
}

// UI Icons
export function DragHandleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M7 10L12 15L17 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Icon>
  );
}

export function CloseCrossIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </Icon>
  );
}

export function MenuDotsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
    </Icon>
  );
}

export function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
    </Icon>
  );
}

export function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
    </Icon>
  );
}

export function BurgerMenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
    </Icon>
  );
}

export function BuilderLogoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M13 6L19 12L13 18M5 6L11 12L5 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Icon>
  );
}

export function EmptyCanvasIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
    </Icon>
  );
}
