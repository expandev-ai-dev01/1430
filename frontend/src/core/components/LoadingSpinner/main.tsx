import { getLoadingSpinnerClassName } from './variants';
import type { LoadingSpinnerProps } from './types';

/**
 * @component LoadingSpinner
 * @summary Loading spinner component for async operations
 * @domain core
 * @type ui-component
 * @category feedback
 */
export const LoadingSpinner = ({ size = 'medium', className }: LoadingSpinnerProps) => {
  return (
    <div className="flex items-center justify-center p-4">
      <div
        className={getLoadingSpinnerClassName({ size, className })}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
