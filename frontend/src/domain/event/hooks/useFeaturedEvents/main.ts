/**
 * @hook useFeaturedEvents
 * @summary Hook for fetching featured events
 * @domain event
 * @type domain-hook
 * @category data
 */

import { useQuery } from '@tanstack/react-query';
import { eventService } from '../../services/eventService';
import type { UseFeaturedEventsReturn } from './types';

export const useFeaturedEvents = (): UseFeaturedEventsReturn => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['events', 'featured'],
    queryFn: () => eventService.listFeatured(),
    staleTime: 5 * 60 * 1000,
  });

  return {
    events: data,
    isLoading,
    error: error as Error | null,
  };
};
