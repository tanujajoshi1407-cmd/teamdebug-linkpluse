import 'dotenv/config';

function bool(v: string | undefined, fallback: boolean) {
  if (v === undefined || v === '') return fallback;
  return ['1', 'true', 'yes', 'on'].includes(v.toLowerCase());
}

const isProd = process.env.NODE_ENV === 'production';
const port = Number(process.env.PORT ?? 4000);

export const config = {
  isProd,
  isTest: process.env.NODE_ENV === 'test',
  port,
  databaseUrl: process.env.DATABASE_URL ?? 'postgres://postgres:postgres@localhost:5432/linkpulse',
  databaseSsl: bool(process.env.DATABASE_SSL, false),
  /** Origin of the web app (used for CSRF origin checks). */
  appOrigin: (process.env.APP_ORIGIN ?? `http://localhost:5173`).replace(/\/$/, ''),
  /** Public base URL that short codes are appended to, e.g. https://lpulse.example.com */
  shortBaseUrl: (process.env.SHORT_BASE_URL ?? `http://localhost:${port}`).replace(/\/$/, ''),
  sessionTtlDays: Number(process.env.SESSION_TTL_DAYS ?? 14),
  cookieSecure: bool(process.env.COOKIE_SECURE, isProd),
  bcryptCost: Number(process.env.BCRYPT_COST ?? 12),
  trustProxy: process.env.TRUST_PROXY ?? (isProd ? '1' : 'false'),
  safeBrowsingKey: process.env.GOOGLE_SAFE_BROWSING_API_KEY ?? '',
  blocklistDomains: (process.env.BLOCKLIST_DOMAINS ?? '')
    .split(',')
    .map((d) => d.trim().toLowerCase())
    .filter(Boolean),
  /** Set RATE_LIMIT_DISABLED=true only in automated tests. */
  rateLimitDisabled: bool(process.env.RATE_LIMIT_DISABLED, false),
};
