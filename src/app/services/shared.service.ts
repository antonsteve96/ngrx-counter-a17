import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})

export class SharedService {
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

}
