import { clsx } from 'clsx';

export interface ErrorMessageVariantProps {
  variant?: 'default' | 'compact';
}

export function getErrorMessageClassName(props: ErrorMessageVariantProps): string {
  const { variant = 'default' } = props;

  return clsx('flex items-center justify-center', {
    'min-h-screen p-4': variant === 'default',
    'p-4': variant === 'compact',
  });
}
