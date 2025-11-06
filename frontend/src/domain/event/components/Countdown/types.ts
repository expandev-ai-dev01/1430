/**
 * @module event/components/Countdown/types
 * @summary Type definitions for Countdown component
 */

export interface CountdownProps {
  targetDate: string;
  format?: 'completo' | 'compacto';
  showSeconds?: boolean;
}
