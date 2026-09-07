// Shared detection for ChatGPT Ads (OpenAI) visitors.
//
// Two components need the same answer and must not drift apart: PhoneSwap swaps
// in the GHL tracking number for these visitors, and PromoPopup stays hidden for
// them (the ChatGPT landing experience is call-first — a "SAVE $35" interstitial
// covers the CTA and hurts the only conversion path that campaign has).

export const DNI_STORE_KEY = 'hp_dni_chatgpt';
// Matches the 30-day attribution window on the OpenAI conversion event.
export const DNI_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export type DniState = { oppref: string; ts: number };

/** Reads the PhoneSwap flag, dropping it once it is past the 30-day window. */
export function readDniState(): DniState | null {
  try {
    const raw = localStorage.getItem(DNI_STORE_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as DniState;
    if (!s || typeof s.ts !== 'number' || Date.now() - s.ts > DNI_TTL_MS) {
      localStorage.removeItem(DNI_STORE_KEY);
      return null;
    }
    return s;
  } catch {
    return null;
  }
}

/**
 * True when the current URL carries an OpenAI click token or a ChatGPT source.
 * `utm_source` is matched loosely because campaigns tag it both as `chatgpt`
 * and as the referrer host `chatgpt.com`.
 */
export function isChatGptUrl(search: string): boolean {
  try {
    const params = new URLSearchParams(search);
    if ((params.get('oppref') || '').length > 0) return true;
    return (params.get('utm_source') || '').toLowerCase().startsWith('chatgpt');
  } catch {
    return false;
  }
}

/** URL check plus the remembered flag, so the whole 30-day visit counts. */
export function isChatGptVisitor(): boolean {
  if (typeof window === 'undefined') return false;
  return isChatGptUrl(window.location.search) || readDniState() !== null;
}
