import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-music-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-music-gradient text-white shadow-music hover:shadow-music-lg hover:scale-105 active:scale-95",
        destructive:
          "bg-red-500 text-white shadow-sm hover:bg-red-600 hover:shadow-lg",
        outline:
          "border-2 border-music-primary text-music-primary bg-transparent hover:bg-music-primary hover:text-white hover:shadow-glow",
        secondary:
          "bg-music-surface-light text-music-text-primary hover:bg-music-surface-lighter shadow-sm hover:shadow-md",
        ghost:
          "text-music-text-secondary hover:bg-music-surface-light hover:text-music-text-primary",
        link: "text-music-primary underline-offset-4 hover:underline hover:text-music-primary-light",
        gradient:
          "bg-music-gradient text-white shadow-music hover:shadow-glow hover:scale-105 active:scale-95",
        glass:
          "glass-effect text-music-text-primary hover:bg-opacity-90 border border-white/10",
        icon: "h-10 w-10 rounded-full bg-music-surface-light hover:bg-music-primary hover:text-white transition-all duration-300",
        play: "bg-music-primary text-white rounded-full shadow-glow hover:shadow-glow-lg hover:scale-110 active:scale-95",
        minimal:
          "text-music-text-secondary hover:text-music-primary transition-colors",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
        "icon-xl": "h-14 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <div className="spinner" />}
        {!loading && leftIcon && leftIcon}
        {children}
        {!loading && rightIcon && rightIcon}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
