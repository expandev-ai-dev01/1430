/**
 * @page EventDetailPage
 * @summary Event detail page displaying full event information
 * @domain event
 * @type detail-page
 * @category event-management
 *
 * @routing
 * - Path: /eventos/:id
 * - Params: { id: string }
 * - Query: none
 * - Guards: none
 */

import { useParams, useNavigate } from 'react-router-dom';
import { useEventDetail, Event } from '@/domain/event';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ErrorMessage } from '@/core/components/ErrorMessage';

export const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const eventId = id ? parseInt(id, 10) : 0;

  const { event, isLoading, error } = useEventDetail({ eventId });

  if (error) {
    return (
      <ErrorMessage
        title="Erro ao carregar evento"
        message={error.message}
        onBack={() => navigate('/eventos')}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!event) {
    return (
      <ErrorMessage
        title="Evento não encontrado"
        message="O evento que você está procurando não existe ou foi removido."
        onBack={() => navigate('/eventos')}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/eventos')}
        className="mb-6 text-blue-600 hover:text-blue-700 font-medium"
      >
        ← Voltar para agenda
      </button>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-start justify-between mb-6">
          <h1 className="text-4xl font-bold text-gray-900">{event.title}</h1>
          {event.featured && (
            <span className="inline-block px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800">
              Destaque
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Informações</h2>
            <div className="space-y-3">
              <div>
                <strong className="text-gray-700">Data de Início:</strong>
                <p className="text-gray-600">{new Date(event.startDate).toLocaleString('pt-BR')}</p>
              </div>
              <div>
                <strong className="text-gray-700">Data de Término:</strong>
                <p className="text-gray-600">{new Date(event.endDate).toLocaleString('pt-BR')}</p>
              </div>
              <div>
                <strong className="text-gray-700">Local:</strong>
                <p className="text-gray-600">{event.location}</p>
              </div>
              <div>
                <strong className="text-gray-700">Endereço:</strong>
                <p className="text-gray-600">{event.address}</p>
              </div>
              <div>
                <strong className="text-gray-700">Categoria:</strong>
                <p className="text-gray-600">{event.category}</p>
              </div>
              <div>
                <strong className="text-gray-700">Organizador:</strong>
                <p className="text-gray-600">{event.organizer}</p>
              </div>
              <div>
                <strong className="text-gray-700">Contato:</strong>
                <p className="text-gray-600">{event.contact}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Descrição</h2>
            <p className="text-gray-600 whitespace-pre-wrap">{event.description}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Como Chegar</h2>
          <p className="text-gray-600 whitespace-pre-wrap">{event.howToGetThere}</p>
        </div>

        {event.ticketInfo && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Informações sobre Ingressos</h2>
            <p className="text-gray-600 whitespace-pre-wrap">{event.ticketInfo}</p>
          </div>
        )}

        {event.externalLink && (
          <div className="mb-8">
            <a
              href={event.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Mais Informações →
            </a>
          </div>
        )}

        {event.images && event.images.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Galeria</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {event.images.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`${event.title} - Imagem ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetailPage;
