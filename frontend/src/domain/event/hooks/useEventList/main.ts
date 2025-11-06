/**
 * @hook useEventList
 * @summary Hook for fetching and managing event list
 * @domain event
 * @type domain-hook
 * @category data
 *
 * @dependencies
 * - @tanstack/react-query: For data fetching and caching
 * - eventService: For API calls
 */

import { useQuery } from '@tanstack/react-query';
import { eventService } from '../../services/eventService';
import type { UseEventListOptions, UseEventListReturn } from './types';

export const useEventList = (options: UseEventListOptions = {}): UseEventListReturn => {
  const { filters, enabled = true } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['events', filters],
    queryFn: () => eventService.list(filters),
    enabled,
    staleTime: 2 * 60 * 1000,
  });

  return {
    data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
