import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-lg border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-background border-border",
        outline: "bg-transparent border-primary border-2",
        ghost:
          "bg-transparent border-transparent hover:bg-accent focus:bg-accent",
        glass: "glass-effect border-white/10",
      },
      size: {
        sm: "h-8 px-2 text-xs",
        default: "h-10 px-3",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      type,
      leftIcon,
      rightIcon,
      onRightIconClick,
      ...props
    },
    ref
  ) => {
    return (
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            inputVariants({ variant, size }),
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            className
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && (
          <div
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground",
              onRightIconClick &&
                "cursor-pointer hover:text-primary transition-colors"
            )}
            onClick={onRightIconClick}
          >
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

// Search Input Component
const SearchInput = React.forwardRef<
  HTMLInputElement,
  Omit<InputProps, "leftIcon"> & {
    onSearch?: (value: string) => void;
    onClear?: () => void;
    loading?: boolean;
  }
>(({ className, onSearch, onClear, loading = false, ...props }, ref) => {
  const [value, setValue] = React.useState(props.value || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(String(value));
  };

  const handleClear = () => {
    setValue("");
    onClear?.();
  };

  const searchIcon = (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );

  const clearIcon =
    value && !loading ? (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ) : null;

  const spinner = loading ? (
    <div className="animate-spin w-4 h-4 border-2 border-border border-t-primary rounded-full" />
  ) : null;

  return (
    <Input
      ref={ref}
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search for songs, artists, albums..."
      leftIcon={searchIcon}
      rightIcon={spinner || clearIcon}
      onRightIconClick={!loading && value ? handleClear : undefined}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onSearch?.(String(value));
        }
      }}
      className={cn("search-input", className)}
    />
  );
});
SearchInput.displayName = "SearchInput";

export { Input, SearchInput, inputVariants };
