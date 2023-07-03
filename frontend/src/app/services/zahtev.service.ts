import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Zahtev } from '../models/zahtev';

@Injectable({
  providedIn: 'root'
})
export class ZahtevService {

  constructor(private http : HttpClient) { }

  posaljiZahtev(zahtev : Zahtev) {
    
    const data = {
      usernameObj : zahtev.usernameObj,
      adresaObj : zahtev.adresaObj,
      datumOd : zahtev.datumOd,
      datumDo : zahtev.datumDo,
      ponuda : zahtev.ponuda,
      agencija : zahtev.agencija,
      prihvacen : zahtev.prihvacen
    }
    return this.http.post('http://localhost:4000/zahtevi/posaljiZahtev', data);
  }

  dovuciZahteveZaKlijenta(searchParam) {
    return this.http.get(`http://localhost:4000/zahtevi/dovuciZahteveZaKlijenta?param=${searchParam}`)
  }

  dovuciZahteveZaAgencije(searchParam) {
    return this.http.get(`http://localhost:4000/zahtevi/dovuciZahteveZaAgencije?param=${searchParam}`)
  }

  delete(adresaObj,usernameObj) {
    const data = {
      adresa : adresaObj,
      username : usernameObj
    }
    return this.http.post('http://localhost:4000/zahtevi/obrisi', data)
  }

  dovuciZahtev(username, adresa, agencija) {
    
    const data = {
      klijent : username,
      adresa : adresa,
      agencija : agencija
    }
    return this.http.post('http://localhost:4000/zahtevi/dovuciZahtev', data);
  }


  prihvacenPonuda(username,adresa,prihvacen,ponuda) {
    const data = {
      usernameObj : username,
      adresaObj : adresa,
      prihvacen : prihvacen,
      ponuda : ponuda
    }
    return this.http.post('http://localhost:4000/zahtevi/prihvacenPonuda', data)
  }
}