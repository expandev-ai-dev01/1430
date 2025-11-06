/**
 * @module event/components/FeaturedEvents/types
 * @summary Type definitions for FeaturedEvents component
 */

import type { Event } from '../../types';

export interface FeaturedEventsProps {
  onEventClick?: (event: Event) => void;
}
