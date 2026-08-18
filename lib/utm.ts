// Captures Google Ads UTM params and maps them to a Workiz booking `ad_group`,
// so leads in Workiz CRM show which campaign they came from.

const STORAGE_KEY = 'hp_ads_campaign';

// utm_campaign value ({campaignid} or {_campaign}) → Workiz ad_group code.
// Codes match the lead-tracking sheet: PMAX / GARD / BSRD / BSRD-N / TR-DM / GER-DM.
const CAMPAIGN_TO_AD_GROUP: Record<string, string> = {
  '23624394945': 'GARD',
  '23629853246': 'BSRD',
  '23952499632': 'BSRD-N',
  '23744418940': 'PMAX',
  '23738369681': 'TR-DM',
  '23742990874': 'GER-DM',
  '24095002203': 'FORT-WORTH',
  'chatgpt_denver_test': 'CHATGPT',
};

const WORKIZ_BASE =
  'https://online-booking.workiz.com/?ac=83c5b14b03e62f92f919b8b4eeb24b5d79e56eebb87e6461f45b9b3a4f852d4e';
const DEFAULT_AD_GROUP = 'Appliance Repair';

// Call on every navigation: remembers the ads campaign for the session,
// so the booking form is attributed even if the user browses around first.
export function captureUtm(search: string): void {
  try {
    const params = new URLSearchParams(search);
    // google = Google Ads, chatgpt = ChatGPT Ads (OpenAI) test campaign
    if (!['google', 'chatgpt'].includes(params.get('utm_source') ?? '') || params.get('utm_medium') !== 'cpc') return;
    const campaign = params.get('utm_campaign');
    if (campaign) sessionStorage.setItem(STORAGE_KEY, campaign);
  } catch {
    // sessionStorage unavailable (privacy mode) — booking falls back to default
  }
}

export function getWorkizBookingUrl(): string {
  let adGroup = DEFAULT_AD_GROUP;
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      adGroup = CAMPAIGN_TO_AD_GROUP[stored] ?? `GADS ${stored}`.slice(0, 60);
    }
  } catch {
    // keep default
  }
  return `${WORKIZ_BASE}&ad_group=${encodeURIComponent(adGroup)}`;
}
