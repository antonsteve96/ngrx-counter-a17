import {ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection} from "@angular/core";
import {provideRouter} from "@angular/router";
import {routes} from "./app.routes";
import {provideClientHydration} from "@angular/platform-browser";
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch} from "@angular/common/http";
import {provideStore, StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "./auth/state/auth.effects";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {AuthService} from './auth/services/auth.service';
import {counterReducer} from "./counter/state/counter.reducer";
import {COUNTER_STATE} from "./counter/state/counter.state";
import {POSTS_STATE} from "./posts/state/posts.state";
import {postsReducer} from "./posts/state/posts.reducer";
import {rootReducer} from "./store/root.state";
import {appReducer} from "./store/app.state";
import {reduce} from "rxjs";
import {AuthInterceptor} from "./auth/interceptor/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthService,
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideStoreDevtools({maxAge: 25, logOnly: !isDevMode()}),
    importProvidersFrom(
      StoreModule.forRoot(rootReducer),
      EffectsModule.forRoot([AuthEffects]),
      StoreModule.forFeature(COUNTER_STATE, counterReducer),
      StoreModule.forFeature(POSTS_STATE, postsReducer)
    )
  ],

};
