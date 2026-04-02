import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => capitalize(word))
    .join(' ');
}

export const PHONE_NUMBER = '+17207846766';
export const PHONE_DISPLAY = '(720) 784-6766';
export const BUSINESS_EMAIL = 'h.prime.usa@gmail.com';
export const BUSINESS_NAME = 'H-Prime Appliance Repair Services';
export const BUSINESS_ADDRESS = 'Denver, CO';
export const GOOGLE_RATING = 5.0;
export const GOOGLE_REVIEW_COUNT = '100';
export const GOOGLE_BUSINESS_PROFILE_URL = 'https://h-prime-co.com';
export const SERVICE_CALL_FEE = '$69';

// Professional icons (Lucide React style)
export const icons = {
  phone: '📞',
  calendar: '📅',
  checkCircle: '✓',
  star: '⭐',
  clock: '⏱️',
  shield: '🛡️',
  award: '🏆',
  wrench: '🔧',
};

