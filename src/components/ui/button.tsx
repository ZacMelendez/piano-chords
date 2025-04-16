import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  className?: string;
}

export function Button({ variant = 'default', className, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(
        clsx(
          'inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors duration-200',
          {
            'bg-indigo-600 text-white hover:bg-indigo-700': variant === 'default',
            'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300': variant === 'outline',
          },
          className
        )
      )}
      {...props}
    />
  );
}