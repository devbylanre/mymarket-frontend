import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/util';
import { cva, VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'px-3 font-medium rounded-md inline-flex items-center gap-x-3 transition-all duration-200 ease-in-out shadow shadow-secondary/5',
  {
    variants: {
      variant: {
        default: 'text-secondary bg-primary hover:bg-primary/80',
        secondary: 'text-secondary bg-primary/30 hover:bg-primary/50',
        dark: 'bg-secondary text-white hover:bg-secondary/80',
        outline:
          'border bg-white border-zinc-200 text-zinc-600 hover:text-zinc-800 hover:bg-zinc-50',
        soft: 'bg-secondary/5 hover:bg-secondary/10',
        success: 'bg-green-500 text-white hover:bg-green-600',
        warning: 'bg-amber-500 text-white hover:bg-amber-600',
        danger: 'bg-red-500 text-white hover:bg-red-600',
      },
      size: {
        xs: 'h-7 text-xs',
        sm: 'h-8 text-sm',
        md: 'h-9 text-sm',
        lg: 'h-10 text-base',
        xl: 'h-12 text-base',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, ref) => {
    const { size, variant, className, ...rest } = props;
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...rest}
      />
    );
  }
);
