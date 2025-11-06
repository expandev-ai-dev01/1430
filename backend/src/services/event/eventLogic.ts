import {
  EventEntity,
  EventListFilters,
  EventHistoryFilters,
  EventCreateRequest,
  EventUpdateRequest,
  PrintConfig,
} from './eventTypes';

let events: EventEntity[] = [];
let nextId = 1;

/**
 * @summary
 * Retrieves list of events with optional filters
 *
 * @function eventList
 * @module event
 *
 * @param {EventListFilters} filters - Filter parameters
 *
 * @returns {Promise<EventEntity[]>} List of events
 */
export async function eventList(filters: EventListFilters): Promise<EventEntity[]> {
  let filtered = events.filter((e) => e.status === 'aprovado');

  if (filters.category && filters.category.length > 0 && !filters.category.includes('todos')) {
    filtered = filtered.filter((e) => filters.category!.includes(e.category));
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (e) =>
        e.title.toLowerCase().includes(searchLower) ||
        e.description.toLowerCase().includes(searchLower) ||
        e.location.toLowerCase().includes(searchLower)
    );
  }

  if (filters.date) {
    filtered = filtered.filter((e) => {
      const eventDate = new Date(e.startDate).toLocaleDateString('pt-BR');
      return eventDate === filters.date;
    });
  }

  if (filters.location) {
    const locationLower = filters.location.toLowerCase();
    filtered = filtered.filter((e) => e.location.toLowerCase().includes(locationLower));
  }

  return filtered.map((e) => ({
    ...e,
    isPast: new Date(e.startDate) < new Date(),
  })) as any;
}

/**
 * @summary
 * Retrieves detailed information about a specific event
 *
 * @function eventGet
 * @module event
 *
 * @param {number} id - Event identifier
 *
 * @returns {Promise<EventEntity | null>} Event details or null if not found
 */
export async function eventGet(id: number): Promise<EventEntity | null> {
  const event = events.find((e) => e.id === id);
  return event || null;
}

/**
 * @summary
 * Creates a new event with pending approval status
 *
 * @function eventCreate
 * @module event
 *
 * @param {EventCreateRequest} data - Event data
 *
 * @returns {Promise<number>} Created event identifier
 */
export async function eventCreate(data: EventCreateRequest): Promise<number> {
  const now = new Date().toISOString();

  const newEvent: EventEntity = {
    id: nextId++,
    ...data,
    ticketInfo: data.ticketInfo ?? null,
    externalLink: data.externalLink ?? null,
    images: data.images || [],
    galleryConfig: data.galleryConfig || {
      displayType: 'carrossel',
      autoPlay: true,
      transitionInterval: 5,
    },
    featured: false,
    status: 'pendente',
    dateCreated: now,
    dateModified: now,
  };

  events.push(newEvent);
  return newEvent.id;
}

/**
 * @summary
 * Updates an existing event
 *
 * @function eventUpdate
 * @module event
 *
 * @param {number} id - Event identifier
 * @param {EventUpdateRequest} data - Updated event data
 *
 * @returns {Promise<EventEntity | null>} Updated event or null if not found
 */
export async function eventUpdate(
  id: number,
  data: EventUpdateRequest
): Promise<EventEntity | null> {
  const index = events.findIndex((e) => e.id === id);

  if (index === -1) {
    return null;
  }

  const updateData: any = { ...data };
  if ('ticketInfo' in data) {
    updateData.ticketInfo = data.ticketInfo ?? null;
  }
  if ('externalLink' in data) {
    updateData.externalLink = data.externalLink ?? null;
  }

  events[index] = {
    ...events[index],
    ...updateData,
    dateModified: new Date().toISOString(),
  };

  return events[index];
}

/**
 * @summary
 * Deletes an event
 *
 * @function eventDelete
 * @module event
 *
 * @param {number} id - Event identifier
 *
 * @returns {Promise<boolean>} True if deleted, false if not found
 */
export async function eventDelete(id: number): Promise<boolean> {
  const index = events.findIndex((e) => e.id === id);

  if (index === -1) {
    return false;
  }

  events.splice(index, 1);
  return true;
}

/**
 * @summary
 * Retrieves list of featured events with countdown configuration
 *
 * @function eventListFeatured
 * @module event
 *
 * @returns {Promise<any[]>} List of featured events (max 5)
 */
export async function eventListFeatured(): Promise<any[]> {
  const now = new Date();
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  const featured = events
    .filter((e) => e.featured && e.status === 'aprovado' && new Date(e.startDate) > now)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 5);

  return featured.map((e) => {
    const eventDate = new Date(e.startDate);
    const showCountdown = eventDate <= thirtyDaysFromNow;

    return {
      ...e,
      showCountdown,
      countdownConfig: {
        displayFormat: 'completo',
        highlightColor: '#FF4500',
        showSeconds: true,
      },
    };
  });
}

/**
 * @summary
 * Retrieves paginated list of past events
 *
 * @function eventListHistory
 * @module event
 *
 * @param {EventHistoryFilters} filters - Filter and pagination parameters
 *
 * @returns {Promise<{data: EventEntity[], metadata: any}>} Paginated past events
 */
export async function eventListHistory(
  filters: EventHistoryFilters
): Promise<{ data: EventEntity[]; metadata: any }> {
  const now = new Date();
  let filtered = events.filter((e) => e.status === 'aprovado' && new Date(e.startDate) < now);

  if (filters.category && filters.category.length > 0 && !filters.category.includes('todos')) {
    filtered = filtered.filter((e) => filters.category!.includes(e.category));
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (e) =>
        e.title.toLowerCase().includes(searchLower) ||
        e.description.toLowerCase().includes(searchLower) ||
        e.location.toLowerCase().includes(searchLower)
    );
  }

  filtered.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

  const total = filtered.length;
  const start = (filters.page - 1) * filters.pageSize;
  const end = start + filters.pageSize;
  const data = filtered.slice(start, end);

  return {
    data,
    metadata: {
      page: filters.page,
      pageSize: filters.pageSize,
      total,
      hasNext: end < total,
      hasPrevious: filters.page > 1,
    },
  };
}

/**
 * @summary
 * Generates sharing URL for specified platform
 *
 * @function eventGenerateShareUrl
 * @module event
 *
 * @param {number} id - Event identifier
 * @param {string} platform - Sharing platform
 * @param {string} [calendarFormat] - Calendar format
 *
 * @returns {Promise<string | null>} Generated sharing URL or null if event not found
 */
export async function eventGenerateShareUrl(
  id: number,
  platform: string,
  calendarFormat?: string
): Promise<string | null> {
  const event = events.find((e) => e.id === id);

  if (!event) {
    return null;
  }

  const baseUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/event/${id}`;
  const encodedTitle = encodeURIComponent(event.title);
  const encodedUrl = encodeURIComponent(baseUrl);

  switch (platform) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case 'twitter':
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    case 'whatsapp':
      return `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
    case 'email':
      return `mailto:?subject=${encodedTitle}&body=${encodedUrl}`;
    case 'calendario':
      if (calendarFormat === 'google') {
        const startDate =
          new Date(event.startDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        const endDate =
          new Date(event.endDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
          event.description
        )}&location=${encodeURIComponent(event.location)}`;
      }
      return baseUrl;
    default:
      return baseUrl;
  }
}

/**
 * @summary
 * Generates printable version of event details
 *
 * @function eventGeneratePrintVersion
 * @module event
 *
 * @param {number} id - Event identifier
 * @param {PrintConfig} config - Print configuration
 *
 * @returns {Promise<any | null>} Print data or null if event not found
 */
export async function eventGeneratePrintVersion(
  id: number,
  config: PrintConfig
): Promise<any | null> {
  const event = events.find((e) => e.id === id);

  if (!event) {
    return null;
  }

  const baseUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/event/${id}`;

  return {
    event:
      config.format === 'completo'
        ? event
        : {
            id: event.id,
            title: event.title,
            startDate: event.startDate,
            endDate: event.endDate,
            location: event.location,
            address: event.address,
          },
    config,
    qrCode: baseUrl,
    includeMap: config.includeMap,
    includeImages: config.includeImages && event.images.length > 0,
    images: config.includeImages ? event.images : [],
  };
}
