import {ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection} from "@angular/core";
import {provideRouter} from "@angular/router";
import {routes} from "./app.routes";
import {provideClientHydration} from "@angular/platform-browser";
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "./auth/state/auth.effects";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {AuthService} from './services/auth.service';
import {rootReducer} from "./store/root.state";
import {authInterceptor} from "./interceptors/auth.interceptor";
import {PostsEffects} from "./posts/state/posts.effects";
import {PostsService} from "./services/posts.service";
import {provideAnimations} from "@angular/platform-browser/animations";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {appReducer, appStateKey} from "./store/app.state";
import {COUNTER_STATE} from "./counter/state/counter.state";
import {counterReducer} from "./counter/state/counter.reducer";
import {POSTS_STATE} from "./posts/state/posts.state";
import {postsReducer} from "./posts/state/posts.reducer";
import {serialize} from "node:v8";
import {CustomSerializer} from "./router/custom-serializer";
import {environment} from "../environments/environment.development";


export const appConfig: ApplicationConfig = {
  providers: [
    PostsService,
    AuthService,
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideStoreDevtools({maxAge: 25, logOnly: false}),
    importProvidersFrom(
      StoreModule.forRoot(rootReducer),
      EffectsModule.forRoot([AuthEffects]),
      EffectsModule.forFeature([PostsEffects]),
      StoreModule.forFeature(
        COUNTER_STATE, counterReducer
      ),
      StoreModule.forFeature(POSTS_STATE, postsReducer),
      StoreRouterConnectingModule.forRoot({
        serializer: CustomSerializer
      }),
    ),
    provideAnimations()
  ],

};
