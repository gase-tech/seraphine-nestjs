import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

Sentry.init({
  dsn:
    'https://ba2d5fe2c0d548e5b283b6de8fa65b65@o320170.ingest.sentry.io/5604024',
  autoSessionTracking: true,
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ['localhost', 'https://yourserver.io/api'],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => console.log(`Bootstrap success`))
  .catch((err) => console.error(err));
