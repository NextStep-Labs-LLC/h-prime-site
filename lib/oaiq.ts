// OpenAI Ads (ChatGPT Ads) measurement pixel — H-Prime ad account.
// Docs: https://developers.openai.com/ads/measurement-pixel

const SDK_URL = 'https://bzrcdn.openai.com/sdk/oaiq.min.js';
const OAI_PIXEL_ID = 'W7nvpKXsUymTmqDxQc8tRb';

type OaiqFn = {
  (...args: unknown[]): void;
  q: IArguments[];
};

declare global {
  interface Window {
    oaiq?: OaiqFn;
  }
}

/**
 * Boots the pixel queue + SDK exactly once and returns the command function.
 * Mirrors the official snippet, but runs from React so ordering with our own
 * measure() calls is guaranteed (an afterInteractive <Script> can lose the race
 * against hydration effects).
 */
function ensureOaiq(): OaiqFn | null {
  if (typeof window === 'undefined') return null;
  if (window.oaiq) return window.oaiq;

  const q = function () {
    // eslint-disable-next-line prefer-rest-params
    q.q.push(arguments);
  } as unknown as OaiqFn;
  q.q = [];
  window.oaiq = q;

  const js = document.createElement('script');
  js.async = true;
  js.src = SDK_URL;
  document.head.appendChild(js);

  q('init', { pixelId: OAI_PIXEL_ID });
  return q;
}

// The SDK does not auto-track page views; fire on every route change.
export function measurePageView() {
  ensureOaiq()?.('measure', 'page_viewed', { type: 'contents' });
}

// Conversion event setting "Lead form submit" (lead_created) in the H-Prime ad
// account. Fired on /thank-you-page — the Workiz booking form is a cross-origin
// iframe, so the redirect landing is the only submit signal we can observe.
export function measureLead() {
  ensureOaiq()?.('measure', 'lead_created', { type: 'customer_action' });
}

/**
 * A phone click is intent, not a conversation, so it no longer counts as a
 * conversion: tapping the number fires only the custom phone_call event, which
 * stays useful for spotting a tracking gap but feeds no bidding. Same
 * convention Boost has run since 2026-08-24.
 *
 * Real calls become lead_created server-side instead — the DNI bridge forwards
 * confirmed conversations over CAPI. Conversions in the campaign are therefore
 * exactly two things: a submitted form, or a call someone actually had.
 */
export function measurePhoneCall() {
  ensureOaiq()?.('measure', 'custom', { type: 'custom' }, { custom_event_name: 'phone_call' });
}
