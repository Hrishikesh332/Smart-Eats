import { ApplicationConfig } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { DatePipe, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { environment } from '../environments/environment';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withRouterConfig({})),
    { provide: LocationStrategy , useClass: PathLocationStrategy },
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
    provideAnimations(),
    provideHttpClient(),
    provideHttpClient(withFetch()),
    DatePipe
  ]
};