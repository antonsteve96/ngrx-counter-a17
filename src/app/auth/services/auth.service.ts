import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {AuthResponse} from "../../models/auth-response.model";

@Injectable({
  providedIn: 'root'
})

export class AuthService{
  apiUrl: string = environment.apiUrl;
  apiPort: string = environment.apiPort;

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<AuthResponse> {
    const url: string = `http://${this.apiUrl}:${this.apiPort}/api/v1/auth/authenticate`;
    console.log(url);
    return this.http.post<AuthResponse>(url,{
      email,
      password,
    })
  }

}
