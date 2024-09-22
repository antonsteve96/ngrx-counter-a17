import {ApplicationConfig, isDevMode, provideZoneChangeDetection} from "@angular/core";
import {provideRouter} from "@angular/router";
import {routes} from "./app.routes";
import {provideClientHydration} from "@angular/platform-browser";
import {provideHttpClient, withFetch} from "@angular/common/http";
import {provideStore} from "@ngrx/store";
import {counterReducer} from "./counter/state/counter.reducer";
import {postsReducer} from "./posts/state/posts.reducer";
import {authReducer} from "./auth/state/auth.reducer";
import {provideEffects} from "@ngrx/effects";
import {AuthEffects} from "./auth/state/auth.effects";
import {provideStoreDevtools} from "@ngrx/store-devtools";


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(),
    provideHttpClient(withFetch()),
    provideStore({
      counter: counterReducer,
      posts: postsReducer,
      auth: authReducer,
    }),
    provideEffects(AuthEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
