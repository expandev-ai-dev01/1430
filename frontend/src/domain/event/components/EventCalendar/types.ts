/**
 * @module event/components/EventCalendar/types
 * @summary Type definitions for EventCalendar component
 */

import type { Event, EventListParams } from '../../types';

export interface EventCalendarProps {
  filters?: EventListParams;
  onEventClick?: (event: Event) => void;
}
