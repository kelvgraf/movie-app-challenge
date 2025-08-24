"use client";

import { cn } from "@/utils/utils";
import { Label } from "@/components/forms/label";
import { Icons, LetsIconNames } from "@/components/icons/icons";
import { Input as InputUI } from "@/components/ui/input";
import type { InputProps as InputUIProps } from "@/components/ui/input";

interface InputProps extends InputUIProps {
  label?: string;
  id?: string;
  name?: string;
  errorMsg?: string;
  successMsg?: string;
  warningMsg?: string;
  iconLeft?: LetsIconNames;
  iconRight?: LetsIconNames;
  onClickIcon?: () => void;
  size?: "sm" | "md" | "lg";
}

function Input({
  id,
  name,
  label,
  type = "text",
  className,
  placeholder,
  iconLeft,
  iconRight,
  onClickIcon,
  size = "md",
  ...rest
}: InputProps) {
  return (
    <div className={`flex flex-col gap-1  ${className || ""}`}>
      {label && <Label label={label} id={id || name} />}

      <div className="relative flex items-center">
        {/* Left Icon */}
        {iconLeft && (
          <span
            onClick={onClickIcon}
            className={cn(
              "absolute left-3 flex items-center justify-center",
              onClickIcon && "cursor-pointer"
            )}
          >
            <Icons name={iconLeft} size={18} className="text-gray-500" />
          </span>
        )}

        {/* Input field */}
        <InputUI
          id={id || name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={cn(
            iconLeft && "pl-9",
            iconRight && "pr-9",
            size === "sm" && "h-8 text-sm",
            size === "md" && "h-10 text-base",
            size === "lg" && "h-12 text-lg",
            className
          )}
          {...rest}
        />

        {/* Right Icon */}
        {iconRight && (
          <span
            onClick={onClickIcon}
            className={cn(
              "absolute right-3 flex items-center justify-center",
              onClickIcon && "cursor-pointer"
            )}
          >
            <Icons name={iconRight} size={24} className="text-gray-500" />
          </span>
        )}
      </div>
    </div>
  );
}

export { Input };
export type { InputProps };
