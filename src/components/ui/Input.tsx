import { cn } from "@/lib/cn";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const containerVariants = cva(
  "flex w-full items-center gap-2 border bg-surface text-text outline-none transition-all duration-200 focus-within:ring-2",
  {
    variants: {
      variant: {
        outline:
          "border-border focus-within:border-primary focus-within:ring-primary/20",
        filled:
          "border-transparent bg-surface-secondary focus-within:ring-primary/20 focus-within:bg-surface",
        ghost: "border-transparent bg-transparent focus-within:ring-primary/20",
      },
      Size: {
        sm: "h-8 px-2.5 text-xs",
        md: "h-10 px-3.5 text-sm",
        lg: "h-12 px-4.5 text-base",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      error: {
        true: "border-danger focus-within:border-danger focus-within:ring-danger/20",
      },
      success: {
        true: "border-success focus-within:border-success focus-within:ring-success/20",
      },
      Disabled: {
        true: "opacity-50 cursor-not-allowed bg-surface-secondary text-text-muted",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "outline",
      Size: "md",
      rounded: "lg",
    },
  },
);

export interface InputProps
  extends
  React.InputHTMLAttributes<HTMLInputElement>,
  VariantProps<typeof containerVariants> {
  id?: string;
  label?: string;
  helperText?: string;
  successText?: string;
  errorText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant,
      Size,
      rounded,
      error,
      success,
      Disabled,
      disabled,
      fullWidth,
      label,
      helperText,
      successText,
      errorText,
      leftIcon,
      rightIcon,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    const isDisabled = Disabled || disabled;
    const isError = !!error || !!errorText;
    const isSuccess = !!success || !!successText;

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-[11px] font-bold text-text-secondary uppercase tracking-wider select-none"
          >
            {label}
          </label>
        )}
        <div
          className={cn(
            containerVariants({
              variant,
              Size,
              rounded,
              fullWidth,
              Disabled: isDisabled,
              error: isError,
              success: isSuccess,
            }),
            className,
          )}
        >
          {leftIcon && (
            <div className="text-text-secondary flex items-center justify-center shrink-0">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            disabled={isDisabled || undefined}
            className="w-full bg-transparent outline-none h-full border-none p-0 text-inherit placeholder:text-text-secondary/60 disabled:cursor-not-allowed"
            {...props}
          />
          {rightIcon && (
            <div className="text-text-secondary flex items-center justify-center shrink-0">
              {rightIcon}
            </div>
          )}
        </div>
        {errorText && (
          <p className="text-xs text-danger font-medium tracking-wide">
            {errorText}
          </p>
        )}
        {successText && (
          <p className="text-xs text-success font-medium tracking-wide">
            {successText}
          </p>
        )}
        {helperText && !errorText && !successText && (
          <p className="text-xs text-text-secondary font-medium tracking-wide">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
