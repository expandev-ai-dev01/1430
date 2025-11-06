/**
 * @module event/hooks/useFeaturedEvents/types
 * @summary Type definitions for useFeaturedEvents hook
 */

import type { Event } from '../../types';

export interface UseFeaturedEventsReturn {
  events: Event[] | undefined;
  isLoading: boolean;
  error: Error | null;
}
