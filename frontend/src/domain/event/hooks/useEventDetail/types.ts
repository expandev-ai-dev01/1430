/**
 * @module event/hooks/useEventDetail/types
 * @summary Type definitions for useEventDetail hook
 */

import type { Event } from '../../types';

export interface UseEventDetailOptions {
  eventId: number;
  enabled?: boolean;
}

export interface UseEventDetailReturn {
  event: Event | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
