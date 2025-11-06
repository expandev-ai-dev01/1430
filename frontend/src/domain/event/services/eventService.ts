/**
 * @service eventService
 * @summary Event management service for authenticated endpoints
 * @domain event
 * @type rest-service
 * @apiContext internal
 *
 * @description
 * All methods in this service use authenticatedClient which targets:
 * /api/v1/internal/event/...
 *
 * Authentication token is automatically added by interceptor.
 */

import { authenticatedClient } from '@/core/lib/api';
import type {
  Event,
  EventListParams,
  EventHistoryParams,
  CreateEventDto,
  UpdateEventDto,
  ShareEventParams,
  PrintEventParams,
} from '../types';
import type { ApiResponse, PaginatedResponse } from '@/core/types';

export const eventService = {
  /**
   * @endpoint GET /api/v1/internal/event
   * @summary Fetches list of events with filters
   */
  async list(params?: EventListParams): Promise<Event[]> {
    const response = await authenticatedClient.get<ApiResponse<Event[]>>('/event', { params });
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/internal/event/:id
   * @summary Fetches single event by ID
   */
  async getById(id: number): Promise<Event> {
    const response = await authenticatedClient.get<ApiResponse<Event>>(`/event/${id}`);
    return response.data.data;
  },

  /**
   * @endpoint POST /api/v1/internal/event
   * @summary Creates new event
   */
  async create(data: CreateEventDto): Promise<{ id: number }> {
    const response = await authenticatedClient.post<ApiResponse<{ id: number }>>('/event', data);
    return response.data.data;
  },

  /**
   * @endpoint PUT /api/v1/internal/event/:id
   * @summary Updates existing event
   */
  async update(id: number, data: UpdateEventDto): Promise<Event> {
    const response = await authenticatedClient.put<ApiResponse<Event>>(`/event/${id}`, data);
    return response.data.data;
  },

  /**
   * @endpoint DELETE /api/v1/internal/event/:id
   * @summary Deletes event
   */
  async delete(id: number): Promise<void> {
    await authenticatedClient.delete(`/event/${id}`);
  },

  /**
   * @endpoint GET /api/v1/internal/event/featured
   * @summary Fetches featured events
   */
  async listFeatured(): Promise<Event[]> {
    const response = await authenticatedClient.get<ApiResponse<Event[]>>('/event/featured');
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/internal/event/history
   * @summary Fetches past events with pagination
   */
  async listHistory(
    params: EventHistoryParams
  ): Promise<PaginatedResponse<Event> & { data: Event[] }> {
    const response = await authenticatedClient.get<
      ApiResponse<PaginatedResponse<Event> & { data: Event[] }>
    >('/event/history', { params });
    return response.data.data;
  },

  /**
   * @endpoint POST /api/v1/internal/event/:id/share
   * @summary Generates sharing URL
   */
  async generateShareUrl(id: number, params: ShareEventParams): Promise<string> {
    const response = await authenticatedClient.post<ApiResponse<{ url: string }>>(
      `/event/${id}/share`,
      params
    );
    return response.data.data.url;
  },

  /**
   * @endpoint POST /api/v1/internal/event/:id/print
   * @summary Generates print version
   */
  async generatePrintVersion(id: number, params: PrintEventParams): Promise<any> {
    const response = await authenticatedClient.post<ApiResponse<any>>(`/event/${id}/print`, params);
    return response.data.data;
  },
};
