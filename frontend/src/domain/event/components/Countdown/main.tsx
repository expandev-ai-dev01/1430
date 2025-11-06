/**
 * @component Countdown
 * @summary Countdown timer for events
 * @domain event
 * @type domain-component
 * @category display
 */

import { useState, useEffect } from 'react';
import type { CountdownProps } from './types';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown = ({
  targetDate,
  format = 'completo',
  showSeconds = true,
}: CountdownProps) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeRemaining(null);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeRemaining) {
    return null;
  }

  const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const shouldShow = target - now <= thirtyDaysInMs;

  if (!shouldShow) {
    return null;
  }

  if (format === 'compacto') {
    if (timeRemaining.days > 0) {
      return (
        <div className="text-sm font-semibold text-blue-600">
          Faltam {timeRemaining.days} {timeRemaining.days === 1 ? 'dia' : 'dias'}
        </div>
      );
    }
    if (timeRemaining.hours > 0) {
      return (
        <div className="text-sm font-semibold text-blue-600">
          Faltam {timeRemaining.hours} {timeRemaining.hours === 1 ? 'hora' : 'horas'}
        </div>
      );
    }
    return (
      <div className="text-sm font-semibold text-blue-600">
        Faltam {timeRemaining.minutes} {timeRemaining.minutes === 1 ? 'minuto' : 'minutos'}
      </div>
    );
  }

  return (
    <div className="flex gap-4 text-center">
      <div>
        <div className="text-2xl font-bold text-blue-600">{timeRemaining.days}</div>
        <div className="text-xs text-gray-600">dias</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-blue-600">{timeRemaining.hours}</div>
        <div className="text-xs text-gray-600">horas</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-blue-600">{timeRemaining.minutes}</div>
        <div className="text-xs text-gray-600">min</div>
      </div>
      {showSeconds && (
        <div>
          <div className="text-2xl font-bold text-blue-600">{timeRemaining.seconds}</div>
          <div className="text-xs text-gray-600">seg</div>
        </div>
      )}
    </div>
  );
};
