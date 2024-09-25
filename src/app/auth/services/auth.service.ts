import {Inject, inject, Injectable, PLATFORM_ID} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, TimeInterval} from "rxjs";
import {AuthResponse} from "../../models/auth-response.model";
import {RegistrationRequest} from "../../models/registration-request.model";
import {isPlatformBrowser} from "@angular/common";

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

  getErrorCode(code: number) {
    switch (code) {
      case 401:
        return "Richiesta non autorizzata";
      case 403:
        return "Accesso negato";
      case 404:
        return "Server non trovato";
      case 500:
        return "Errore interno del server";
      default:
        return "Errore non specificato";
    }
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
      const token = localStorage.getItem('token');
      const expirationDate = localStorage.getItem('tokenExpiration');

      if (!token || !expirationDate) {
        return null;
      }

      const currentTime = new Date().getTime();
      if (currentTime > +expirationDate) {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        return null;
      }

      return token;

    }
    return null;
  }
}


