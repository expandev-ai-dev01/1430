/**
 * @page EventCalendarPage
 * @summary Event calendar page displaying city events
 * @domain event
 * @type page-component
 * @category event-management
 *
 * @routing
 * - Path: /eventos
 * - Params: none
 * - Query: none
 * - Guards: none
 */

import { useNavigate } from 'react-router-dom';
import { EventCalendar, FeaturedEvents, Event } from '@/domain/event';

export const EventCalendarPage = () => {
  const navigate = useNavigate();

  const handleEventClick = (event: Event) => {
    navigate(`/eventos/${event.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Agenda de Eventos</h1>

      <FeaturedEvents onEventClick={handleEventClick} />

      <EventCalendar onEventClick={handleEventClick} />
    </div>
  );
};

export default EventCalendarPage;
