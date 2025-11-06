/**
 * @module event/hooks/useEventList/types
 * @summary Type definitions for useEventList hook
 */

import type { Event, EventListParams } from '../../types';

export interface UseEventListOptions {
  filters?: EventListParams;
  enabled?: boolean;
}

export interface UseEventListReturn {
  data: Event[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
