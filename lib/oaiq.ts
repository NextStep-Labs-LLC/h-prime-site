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

// A phone click counts as a full conversion (same convention as Google Ads
// Click to Call): lead_created is the standard event that feeds campaign
// conversion totals and future oCPC optimization; the custom phone_call event
// only breaks out calls vs forms in reporting — total conversions = lead_created.
export function measurePhoneCall() {
  const q = ensureOaiq();
  q?.('measure', 'lead_created', { type: 'customer_action' });
  q?.('measure', 'custom', { type: 'custom' }, { custom_event_name: 'phone_call' });
}
