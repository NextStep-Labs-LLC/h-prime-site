'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Dynamic number insertion for ChatGPT Ads traffic. Visitors arriving with an
// OpenAI click token (oppref) or utm_source=chatgpt see the GHL tracking number
// instead of the main Workiz line, so their calls can be attributed to the
// channel and fed back to OpenAI as conversions. The swap is client-side only:
// server HTML keeps the main number, so crawlers (Google, OAI-AdsBot) always
// see consistent NAP data.
const DNI_TEL = '+19832122955';
const DNI_DISPLAY = '(983) 212-2955';
const MAIN_DIGITS = '7207846766';
const MAIN_TEXT_RE = /\(720\)\s*784-6766|\+?1?[\s. -]?720[\s.-]?784[\s.-]?6766/g;
const STORE_KEY = 'hp_dni_chatgpt';
const REPORT_KEY = 'hp_dni_reported';
// Matches the 30-day attribution window on the OpenAI conversion event.
const TTL_MS = 30 * 24 * 60 * 60 * 1000;
const WEBHOOK =
  'https://webhook-processor-production-ae2b.up.railway.app/webhook/hprime-chatgpt-swap';

type SwapState = { oppref: string; ts: number };

function readState(): SwapState | null {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as SwapState;
    if (!s || typeof s.ts !== 'number' || Date.now() - s.ts > TTL_MS) {
      localStorage.removeItem(STORE_KEY);
      return null;
    }
    return s;
  } catch {
    return null;
  }
}

function swapDom() {
  document.querySelectorAll(`a[href*="${MAIN_DIGITS}"]`).forEach((a) => {
    a.setAttribute('href', `tel:${DNI_TEL}`);
  });
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const hits: Text[] = [];
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    if (node.nodeValue && MAIN_TEXT_RE.test(node.nodeValue)) hits.push(node);
    MAIN_TEXT_RE.lastIndex = 0;
  }
  hits.forEach((node) => {
    node.nodeValue = node.nodeValue!.replace(MAIN_TEXT_RE, DNI_DISPLAY);
  });
}

function reportSession(oppref: string) {
  try {
    if (sessionStorage.getItem(REPORT_KEY) === oppref) return;
    const payload = JSON.stringify({
      oppref,
      url: window.location.href.slice(0, 1000),
      ua: navigator.userAgent.slice(0, 300),
    });
    // sendBeacon survives immediate navigation into the dialer; string payload
    // goes out as text/plain, so no CORS preflight is involved.
    if (!(navigator.sendBeacon && navigator.sendBeacon(WEBHOOK, payload))) {
      fetch(WEBHOOK, { method: 'POST', body: payload, keepalive: true }).catch(() => {});
    }
    sessionStorage.setItem(REPORT_KEY, oppref);
  } catch {
    /* storage unavailable — swap still works, session just is not logged */
  }
}

export default function PhoneSwap() {
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const oppref = (params.get('oppref') || '').slice(0, 800);
    const fromAd =
      oppref.length > 0 || (params.get('utm_source') || '').toLowerCase() === 'chatgpt';

    if (fromAd) {
      const prev = readState();
      try {
        localStorage.setItem(
          STORE_KEY,
          JSON.stringify({ oppref: oppref || prev?.oppref || '', ts: Date.now() }),
        );
      } catch {
        /* private mode */
      }
      if (oppref) reportSession(oppref);
    }

    if (!fromAd && !readState()) return;

    swapDom();
    // Client-side navigation and lazy content re-render parts of the DOM with
    // the original number; re-swap on changes. Converges because swapDom only
    // mutates nodes that still contain the main number.
    let pending = 0;
    const observer = new MutationObserver(() => {
      if (pending) return;
      pending = window.setTimeout(() => {
        pending = 0;
        swapDom();
      }, 100);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      if (pending) window.clearTimeout(pending);
    };
  }, [pathname]);

  return null;
}
