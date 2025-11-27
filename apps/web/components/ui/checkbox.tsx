"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="flex items-start gap-3">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            id={inputId}
            ref={ref}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              "flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded border-2 border-border transition-all",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
              "peer-checked:border-accent peer-checked:bg-accent",
              "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
              "hover:border-accent/70",
              className
            )}
            onClick={() => {
              const input = document.getElementById(inputId) as HTMLInputElement;
              if (input && !input.disabled) {
                input.click();
              }
            }}
          >
            <Check
              className={cn(
                "h-3.5 w-3.5 text-accent-foreground opacity-0 transition-opacity",
                "peer-checked:opacity-100"
              )}
            />
          </div>
        </div>
        {(label || description) && (
          <div className="grid gap-1 leading-none">
            {label && (
              <label
                htmlFor={inputId}
                className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };

