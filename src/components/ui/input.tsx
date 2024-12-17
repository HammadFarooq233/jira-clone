import * as React from "react";

import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    // password toggle state
    const [passwordVisible, setPasswordVisible] = React.useState(false);

    return (
      <div className="relative">
        <input
          type={
            type === "password" ? (passwordVisible ? "text" : "password") : type
          }
          className={cn(
            "flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 disabled:cursor-not-allowed disabled:opacity-50",
            type === "password" && "pr-12",
            className,
          )}
          ref={ref}
          {...props}
        />

        {/* password icon */}
        {type === "password" && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
            {!passwordVisible ? (
              <EyeIcon
                className={cn("size-5 text-neutral-500")}
                onClick={() => setPasswordVisible(true)}
              />
            ) : (
              <EyeOffIcon
                className={cn("size-5 text-neutral-500")}
                onClick={() => setPasswordVisible(false)}
              />
            )}
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
