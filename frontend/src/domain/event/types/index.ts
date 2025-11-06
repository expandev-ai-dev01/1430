/**
 * @module event/types
 * @summary Type definitions for event domain
 * @domain event
 */

export interface Event {
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
  category:
    | 'cultural'
    | 'cívico'
    | 'esportivo'
    | 'administrativo'
    | 'educacional'
    | 'saúde'
    | 'meio ambiente'
    | 'turístico';
  howToGetThere: string;
  ticketInfo?: string;
  externalLink?: string;
  images?: string[];
  galleryConfig?: {
    displayType: 'carrossel' | 'grade' | 'slideshow';
    autoPlay: boolean;
    transitionInterval: number;
  };
  featured: boolean;
}

export interface EventListParams {
  format?: 'mensal' | 'semanal' | 'lista';
  month?: string;
  category?: string[];
  search?: string;
  date?: string;
  location?: string;
}

export interface EventHistoryParams {
  startDate: string;
  endDate: string;
  category?: string[];
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface CreateEventDto {
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
  category:
    | 'cultural'
    | 'cívico'
    | 'esportivo'
    | 'administrativo'
    | 'educacional'
    | 'saúde'
    | 'meio ambiente'
    | 'turístico';
  howToGetThere: string;
  ticketInfo?: string;
  externalLink?: string;
  images?: string[];
  galleryConfig?: {
    displayType: 'carrossel' | 'grade' | 'slideshow';
    autoPlay: boolean;
    transitionInterval: number;
  };
}

export interface UpdateEventDto {
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
  category?:
    | 'cultural'
    | 'cívico'
    | 'esportivo'
    | 'administrativo'
    | 'educacional'
    | 'saúde'
    | 'meio ambiente'
    | 'turístico';
  howToGetThere?: string;
  ticketInfo?: string;
  externalLink?: string;
  images?: string[];
  galleryConfig?: {
    displayType: 'carrossel' | 'grade' | 'slideshow';
    autoPlay: boolean;
    transitionInterval: number;
  };
  featured?: boolean;
}

export interface ShareEventParams {
  platform: 'facebook' | 'twitter' | 'whatsapp' | 'email' | 'calendario';
  calendarFormat?: 'google' | 'outlook' | 'ical';
}

export interface PrintEventParams {
  format: 'completo' | 'resumido';
  includeMap?: boolean;
  includeImages?: boolean;
  layout?: 'padrao' | 'compacto' | 'detalhado';
  paperSize?: 'A4' | 'Carta' | 'A5';
  orientation?: 'retrato' | 'paisagem';
}
