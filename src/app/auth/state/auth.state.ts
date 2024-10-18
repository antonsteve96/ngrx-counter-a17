import {patchState, signalStore, withMethods, withState} from "@ngrx/signals";
import {inject} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {AuthResponse} from "../../models/auth-response.model";
import {Router} from "@angular/router";
import {RegistrationRequest} from "../../models/registration-request.model";
import {async} from "rxjs";

type AuthState = {
  token: string | null | undefined,
  loading: boolean,
  error: string | null | undefined

}

export const initialState: AuthState = {
  token: "",
  loading: false,
  error: ""
}

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (store, authService = inject(AuthService), router = inject(Router)) => ({
      async login(username: string, password: string) {
        console.log('login() chiamato');  // Log per il debug
        patchState(store, { loading: true, error: null }); // Reset error

        try {
          const response: AuthResponse = await authService.login(username, password); // Ottieni AuthResponse
          patchState(store, { token: response.token, loading: false }); // Usa response.token
          console.log('Loading:', store.loading());// Log per verificare i dati
          // Esegui il reindirizzamento alla home page
          await router.navigate(['/']); // Cambia '/home' con il percorso della tua home page
        } catch (error) {
          console.error('Errore durante il login:', error);
          patchState(store, { loading: false, error: 'Login fallito' }); // Gestisci l'errore
        }
      },
      async signup(registrationRequest: RegistrationRequest) {
        console.log('login() chiamato');  // Log per il debug
        patchState(store, { loading: true, error: null }); // Reset error
        try {
          await authService.signup(registrationRequest);
          patchState(store, {loading: false})
          await router.navigate(['/login']);
        } catch (error) {
          console.error('Errore durante il login:', error);
          patchState(store, { loading: false, error: 'Registrazione fallita' }); // Gestisci l'errore
        }
      },
      async logout() {
        console.log('logout() chiamato');// Log per il debug
        authService.logout();
        patchState(store, { token: null }); // Resetta il token
        await router.navigate(['/login']); // Reindirizza l'utente alla pagina di login
      },
      async autoLogin() {
        console.log('autoLogin() chiamato');
        const token = authService.getTokenFromLocalStorage();

        if (token) {
          // Se il token esiste, aggiorna lo stato
          patchState(store, { token: token, loading: false, error: null });
          console.log('Token trovato:', token);
        } else {
          // Se non esiste un token, gestisci lo stato di non autenticazione
          patchState(store, { token: null, loading: false, error: 'Token non trovato' });
          console.log('Nessun token trovato, l\'utente non è autenticato.');
        }
      }
    })
  )
);
