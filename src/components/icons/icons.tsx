// components/icons/Icons.tsx
"use client";

import { LetsIcons, LetsIconNames } from "./index";

interface IconsProps {
  name: LetsIconNames;
  className?: string;
  size?: number;
  color?: string;
}

export function Icons({
  name,
  className,
  size = 24,
  color = "currentColor",
}: IconsProps) {
  const IconComponent = LetsIcons[name];

  if (!IconComponent) {
    throw new Error(`Icon ${name} not found`);
  }

  return (
    <IconComponent
      className={className}
      width={size}
      height={size}
      fill={color}
    />
  );
}

export type { LetsIconNames };
