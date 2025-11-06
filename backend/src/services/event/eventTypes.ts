/**
 * @interface EventEntity
 * @description Represents an event entity in the system
 *
 * @property {number} id - Unique event identifier
 * @property {string} title - Event title
 * @property {string} description - Event description
 * @property {string} startDate - Event start date and time
 * @property {string} endDate - Event end date and time
 * @property {string} location - Event location
 * @property {string} address - Full address
 * @property {object} coordinates - Geographic coordinates
 * @property {string} organizer - Organizer name
 * @property {string} contact - Contact information
 * @property {string} category - Event category
 * @property {string} howToGetThere - Instructions on how to get there
 * @property {string | null} ticketInfo - Ticket information
 * @property {string | null} externalLink - External link
 * @property {string[]} images - Array of image URLs
 * @property {object} galleryConfig - Gallery display configuration
 * @property {boolean} featured - Featured flag
 * @property {string} status - Approval status
 * @property {string} dateCreated - Creation timestamp
 * @property {string} dateModified - Last modification timestamp
 */
export interface EventEntity {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  organizer: string;
  contact: string;
  category: EventCategory;
  howToGetThere: string;
  ticketInfo: string | null;
  externalLink: string | null;
  images: string[];
  galleryConfig: GalleryConfig;
  featured: boolean;
  status: EventStatus;
  dateCreated: string;
  dateModified: string;
}

export type EventCategory =
  | 'cultural'
  | 'cívico'
  | 'esportivo'
  | 'administrativo'
  | 'educacional'
  | 'saúde'
  | 'meio ambiente'
  | 'turístico';

export type EventStatus = 'pendente' | 'aprovado' | 'rejeitado' | 'revisão_solicitada';

export interface GalleryConfig {
  displayType: 'carrossel' | 'grade' | 'slideshow';
  autoPlay: boolean;
  transitionInterval: number;
}

export interface EventListFilters {
  format?: 'mensal' | 'semanal' | 'lista';
  month?: string;
  category?: string[];
  search?: string;
  date?: string;
  location?: string;
}

export interface EventHistoryFilters {
  startDate: string;
  endDate: string;
  category?: string[];
  search?: string;
  page: number;
  pageSize: number;
}

export interface EventCreateRequest {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  organizer: string;
  contact: string;
  category: EventCategory;
  howToGetThere: string;
  ticketInfo?: string | null;
  externalLink?: string | null;
  images?: string[];
  galleryConfig?: GalleryConfig;
}

export interface EventUpdateRequest {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  address?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  organizer?: string;
  contact?: string;
  category?: EventCategory;
  howToGetThere?: string;
  ticketInfo?: string | null;
  externalLink?: string | null;
  images?: string[];
  galleryConfig?: GalleryConfig;
  featured?: boolean;
}

export interface PrintConfig {
  format: 'completo' | 'resumido';
  includeMap: boolean;
  includeImages: boolean;
  layout: 'padrao' | 'compacto' | 'detalhado';
  paperSize: 'A4' | 'Carta' | 'A5';
  orientation: 'retrato' | 'paisagem';
}
