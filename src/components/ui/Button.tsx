import { cn } from "@/lib/cn";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer [&_svg]:pointer-events-none [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary-hover shadow-sm hover:shadow-md",
        success: "bg-success text-white hover:bg-success/90 shadow-sm hover:shadow-md",
        outline:
          "border border-border text-text bg-transparent hover:bg-surface-secondary hover:border-border-light",
        ghost: "text-text-secondary hover:text-text hover:bg-surface-secondary",
        danger: "bg-danger text-white hover:bg-danger/90 shadow-sm hover:shadow-md",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: "lg",
    },
  },
);

interface ButtonProps
  extends
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  asChild?: boolean;
  loadingText?: string;
}

export default function Button({
  className,
  variant,
  size,
  rounded,
  fullWidth,
  children,
  isLoading = false,
  asChild = false,
  loadingText,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        buttonVariants({ variant, size, rounded, fullWidth }),
        className,
      )}
      disabled={isLoading || props.disabled}
      aria-busy={isLoading}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {isLoading && (
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          )}
          {isLoading && loadingText ? loadingText : children}
        </>
      )}
    </Comp>
  );
}
