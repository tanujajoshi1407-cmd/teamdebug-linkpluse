import { createApp } from './app.js';
import { config } from './config.js';
import { migrate } from './migrate.js';

if (config.isProd && process.env.RUN_MIGRATIONS_ON_START !== 'false') await migrate();

createApp().listen(config.port, () => {
  console.log(`LinkPulse API listening on http://localhost:${config.port}`);
  console.log(`Short links will look like ${config.shortBaseUrl}/abc1234`);
  if (!config.safeBrowsingKey) console.log('Threat intelligence: not configured (set GOOGLE_SAFE_BROWSING_API_KEY to enable).');
});
