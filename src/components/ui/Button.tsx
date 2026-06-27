import { forwardRef, type ButtonHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'md' | 'sm';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconRight?: LucideIcon;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon: Icon,
      iconRight: IconRight,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`${variantClass[variant]} ${size === 'sm' ? 'btn-sm' : ''} ${className}`}
        {...props}
      >
        {Icon && <Icon className="h-5 w-5 shrink-0" strokeWidth={2} />}
        {children}
        {IconRight && <IconRight className="h-5 w-5 shrink-0" strokeWidth={2} />}
      </button>
    );
  }
);

Button.displayName = 'Button';
