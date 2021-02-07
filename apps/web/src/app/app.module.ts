import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import * as Sentry from '@sentry/angular';
import { AppComponent } from './app.component';
import { SessionComponent } from './session/session.component';
import { LoginComponent } from './login/login.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [AppComponent, SessionComponent, LoginComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ButtonModule,
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () =>
          import('./session/session.module').then((m) => m.SessionModule),
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ]),
  ],
  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: true,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
