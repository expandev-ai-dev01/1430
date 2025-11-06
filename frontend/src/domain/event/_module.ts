/**
 * @module event
 * @summary Event management domain for city events calendar
 * @domain functional
 * @dependencies @tanstack/react-query, axios, react-router-dom
 * @version 1.0.0
 * @author Development Team
 * @lastModified 2024-01-15
 */

export * from './components/EventCalendar';
export * from './components/FeaturedEvents';
export * from './components/Countdown';

export * from './hooks/useEventList';
export * from './hooks/useEventDetail';
export * from './hooks/useFeaturedEvents';

export * from './services/eventService';

export * from './types';

export const moduleMetadata = {
  name: 'event',
  domain: 'functional',
  version: '1.0.0',
  publicComponents: ['EventCalendar', 'FeaturedEvents', 'Countdown'],
  publicHooks: ['useEventList', 'useEventDetail', 'useFeaturedEvents'],
  publicServices: ['eventService'],
  dependencies: {
    internal: ['@/core/components', '@/core/lib', '@/core/types'],
    external: ['react', 'react-router-dom', '@tanstack/react-query', 'axios'],
    domains: [],
  },
  exports: {
    components: ['EventCalendar', 'FeaturedEvents', 'Countdown'],
    hooks: ['useEventList', 'useEventDetail', 'useFeaturedEvents'],
    services: ['eventService'],
    types: [
      'Event',
      'EventListParams',
      'EventHistoryParams',
      'CreateEventDto',
      'UpdateEventDto',
      'ShareEventParams',
      'PrintEventParams',
    ],
  },
} as const;
