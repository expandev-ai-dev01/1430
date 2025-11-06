/**
 * @component FeaturedEvents
 * @summary Displays featured events with countdown
 * @domain event
 * @type domain-component
 * @category display
 */

import { useFeaturedEvents } from '../../hooks/useFeaturedEvents';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { Countdown } from '../Countdown';
import type { FeaturedEventsProps } from './types';

export const FeaturedEvents = ({ onEventClick }: FeaturedEventsProps) => {
  const { events, isLoading, error } = useFeaturedEvents();

  if (isLoading) {
    return <LoadingSpinner size="large" />;
  }

  if (error || !events || events.length === 0) {
    return null;
  }

  return (
    <div className="featured-events bg-blue-50 p-8 rounded-lg mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Eventos em Destaque</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => onEventClick?.(event)}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
              <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                Destaque
              </span>
            </div>
            <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
            <div className="text-sm text-gray-600 mb-4">
              <p className="mb-1">
                <strong>Data:</strong> {new Date(event.startDate).toLocaleDateString('pt-BR')}
              </p>
              <p>
                <strong>Local:</strong> {event.location}
              </p>
            </div>
            <Countdown targetDate={event.startDate} />
          </div>
        ))}
      </div>
    </div>
  );
};
