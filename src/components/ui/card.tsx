import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-lg border text-card-foreground shadow-sm transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-card border-border",
        glass: "bg-card/50 backdrop-blur-sm border-border/50",
        gradient:
          "bg-gradient-to-br from-primary to-secondary border-transparent text-white",
        outline: "bg-transparent border-primary border-2",
        secondary: "bg-secondary border-border",
        flat: "bg-muted border-transparent shadow-none",
      },
      hover: {
        none: "",
        lift: "hover:shadow-lg transform transition-transform duration-200",
        glow: "hover:shadow-xl hover:border-primary/50",
        scale: "hover:scale-105 hover:shadow-lg",
      },
      padding: {
        none: "p-0",
        sm: "p-3",
        default: "p-4",
        lg: "p-6",
        xl: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      hover: "lift",
      padding: "default",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, hover, padding, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        className={cn(cardVariants({ variant, hover, padding, className }))}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-semibold leading-none tracking-tight text-foreground",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// Music specific card components
const AlbumCard = React.forwardRef<
  HTMLDivElement,
  CardProps & {
    imageUrl?: string;
    title: string;
    artist: string;
    isPlaying?: boolean;
    onPlay?: () => void;
  }
>(
  (
    { className, imageUrl, title, artist, isPlaying = false, onPlay, ...props },
    ref
  ) => (
    <Card
      ref={ref}
      variant="secondary"
      hover="scale"
      padding="sm"
      className={cn("group cursor-pointer", className)}
      onClick={onPlay}
      {...props}
    >
      <div className="relative aspect-square overflow-hidden rounded-lg mb-3">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className={cn(
              "w-full h-full object-cover transition-all duration-300 group-hover:scale-110",
              isPlaying && "spin-slow"
            )}
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <svg
              className="w-8 h-8 text-muted-foreground"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
        )}
        {isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-white rounded-full animate-pulse"
                  style={{ height: "20px", animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <div>
        <h4 className="font-medium text-foreground truncate">{title}</h4>
        <p className="text-sm text-muted-foreground truncate">{artist}</p>
      </div>
    </Card>
  )
);
AlbumCard.displayName = "AlbumCard";

const PlaylistCard = React.forwardRef<
  HTMLDivElement,
  CardProps & {
    imageUrl?: string;
    title: string;
    description?: string;
    songCount?: number;
  }
>(({ className, imageUrl, title, description, songCount, ...props }, ref) => (
  <Card
    ref={ref}
    variant="secondary"
    hover="lift"
    padding="none"
    className={cn("group cursor-pointer overflow-hidden", className)}
    {...props}
  >
    <div className="relative aspect-square overflow-hidden">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <svg
            className="w-12 h-12 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z" />
          </svg>
        </div>
      )}
    </div>
    <div className="p-4">
      <h4 className="font-medium text-foreground truncate mb-1">{title}</h4>
      {description && (
        <p className="text-sm text-muted-foreground truncate mb-2">
          {description}
        </p>
      )}
      {songCount && (
        <p className="text-xs text-muted-foreground">{songCount} songs</p>
      )}
    </div>
  </Card>
));
PlaylistCard.displayName = "PlaylistCard";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  AlbumCard,
  PlaylistCard,
  cardVariants,
};
