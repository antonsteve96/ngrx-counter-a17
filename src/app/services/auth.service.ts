import {Inject, inject, Injectable, PLATFORM_ID} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthResponse} from "../models/auth-response.model";
import {RegistrationRequest} from "../models/registration-request.model";
import {isPlatformBrowser} from "@angular/common";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})

export class AuthService{
  apiUrl: string = environment.apiUrl;
  apiPort: string = environment.apiPort;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}


  private http = inject(HttpClient);

  login(email: string, password: string): Observable<AuthResponse> {
    const url: string = `http://${this.apiUrl}:${this.apiPort}/api/v1/auth/authenticate`;
    console.log(url);
    return this.http.post<AuthResponse>(url,{
      email,
      password,
    })
  }

  confirmAccount(token: string) {
    const url: string = `http://${this.apiUrl}:${this.apiPort}/api/v1/auth/activate-account`;
    return this.http.get(url, { params: { token }})
  }

  signup(registrationRequest: RegistrationRequest) {
    const url: string = `http://${this.apiUrl}:${this.apiPort}/api/v1/auth/register`;
    return this.http.post(url,
      registrationRequest
    )

  }

  setTokenInLocalStorage(token: string) {
    localStorage.setItem('token', token);
    const expirationDate = new Date().getTime() + 3600000; // Scadenza tra 1 ora
    localStorage.setItem('tokenExpiration', expirationDate.toString());
  }

  getTokenFromLocalStorage(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('tokenExpiration');

        // Controlla se token o expiration date sono nulli
        if (!token || !expirationDate) {
          return "";
        }

        // Converte expirationDate in un numero
        const currentTime = new Date().getTime();
        const expirationTime = Number(expirationDate); // +expirationDate può essere ambiguo, meglio esplicito

        // Verifica se il token è scaduto
        if (currentTime > expirationTime) {
          // Rimuove il token scaduto
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpiration');
          return null;
        }

        // Restituisce il token se tutto è valido
        return token;

      } catch (error) {
        console.error('Errore durante l\'accesso a localStorage:', error);
        return "";
      }
    }

    return ""; // Non siamo nel contesto del browser
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
  }

}


