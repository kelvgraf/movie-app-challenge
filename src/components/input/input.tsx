// components/ui/Input.tsx
"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/utils"; // função helper p/ concatenar classes

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full gap-1">
        {label && (
          <label
            htmlFor={props.id}
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          className={cn(
            "w-full rounded-xl border border-gray-300 px-3 py-2 text-sm shadow-sm outline-none transition",
            "focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20",
            "dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100",
            error && "border-red-500 focus:ring-red-500/20",
            className
          )}
          {...props}
        />

        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
