/**
 * @hook useEventDetail
 * @summary Hook for fetching event details
 * @domain event
 * @type domain-hook
 * @category data
 */

import { useQuery } from '@tanstack/react-query';
import { eventService } from '../../services/eventService';
import type { UseEventDetailOptions, UseEventDetailReturn } from './types';

export const useEventDetail = (options: UseEventDetailOptions): UseEventDetailReturn => {
  const { eventId, enabled = true } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['event', eventId],
    queryFn: () => eventService.getById(eventId),
    enabled: enabled && !!eventId,
    staleTime: 2 * 60 * 1000,
  });

  return {
    event: data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
