export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  isToday: boolean;
}

export function getZodiacSign(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries ♈️';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus ♉️';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini ♊️';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer ♋️';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo ♌️';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo ♍️';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra ♎️';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio ♏️';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius ♐️';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn ♑️';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius ♒️';
  return 'Pisces ♓️';
}

export function getNextBirthdayDate(birthdayString: string): Date {
  const today = new Date();
  const bdayParts = birthdayString.split('-');
  const month = parseInt(bdayParts[1], 10) - 1; // 0-indexed
  const day = parseInt(bdayParts[2], 10);

  let nextBday = new Date(today.getFullYear(), month, day, 0, 0, 0);

  // If birthday already passed this year (and isn't today), set to next year
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (nextBday < startOfToday) {
    nextBday.setFullYear(today.getFullYear() + 1);
  }

  return nextBday;
}

export function calculateCountdown(birthdayString: string): CountdownTime {
  const now = new Date();
  const nextBday = getNextBirthdayDate(birthdayString);
  
  const diffMs = nextBday.getTime() - now.getTime();
  
  const isToday =
    now.getMonth() === nextBday.getMonth() &&
    now.getDate() === nextBday.getDate();

  if (isToday) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalDays: 0,
      isToday: true,
    };
  }

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    totalDays: days,
    isToday: false,
  };
}

export function formatBirthdayShort(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatBirthdayFull(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
}
