/**
 * @component EventCalendar
 * @summary Main calendar component for displaying events
 * @domain event
 * @type domain-component
 * @category display
 */

import { useState } from 'react';
import { useEventList } from '../../hooks/useEventList';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ErrorMessage } from '@/core/components/ErrorMessage';
import type { EventCalendarProps } from './types';
import type { EventListParams } from '../../types';

export const EventCalendar = ({ filters: initialFilters, onEventClick }: EventCalendarProps) => {
  const [filters, setFilters] = useState<EventListParams>(initialFilters || { format: 'mensal' });
  const { data: events, isLoading, error, refetch } = useEventList({ filters });

  const handleFormatChange = (format: 'mensal' | 'semanal' | 'lista') => {
    setFilters((prev) => ({ ...prev, format }));
  };

  const handleCategoryChange = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category?.includes(category)
        ? prev.category.filter((c) => c !== category)
        : [...(prev.category || []), category],
    }));
  };

  const handleSearchChange = (search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  };

  if (error) {
    return (
      <ErrorMessage title="Erro ao carregar eventos" message={error.message} onRetry={refetch} />
    );
  }

  if (isLoading) {
    return <LoadingSpinner size="large" />;
  }

  return (
    <div className="event-calendar">
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => handleFormatChange('mensal')}
            className={`px-4 py-2 rounded-md transition-colors ${
              filters.format === 'mensal'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            Mensal
          </button>
          <button
            onClick={() => handleFormatChange('semanal')}
            className={`px-4 py-2 rounded-md transition-colors ${
              filters.format === 'semanal'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            Semanal
          </button>
          <button
            onClick={() => handleFormatChange('lista')}
            className={`px-4 py-2 rounded-md transition-colors ${
              filters.format === 'lista'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            Lista
          </button>
        </div>

        <input
          type="text"
          placeholder="Buscar eventos..."
          value={filters.search || ''}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Categorias</h3>
        <div className="flex flex-wrap gap-2">
          {[
            'cultural',
            'cívico',
            'esportivo',
            'administrativo',
            'educacional',
            'saúde',
            'meio ambiente',
            'turístico',
          ].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filters.category?.includes(category)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events && events.length > 0 ? (
          events.map((event) => (
            <div
              key={event.id}
              onClick={() => onEventClick?.(event)}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {new Date(event.startDate).toLocaleDateString('pt-BR')}
              </p>
              <p className="text-sm text-gray-600 mb-2">{event.location}</p>
              <span
                className={`inline-block px-2 py-1 text-xs rounded-full ${
                  event.featured ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                }`}
              >
                {event.category}
              </span>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-600">
            Nenhum evento encontrado para os filtros selecionados.
          </div>
        )}
      </div>
    </div>
  );
};
