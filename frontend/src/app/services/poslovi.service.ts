import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Otkazivanje } from '../models/otkazivanje';
import { Posao } from '../models/posao';
import { Radnik } from '../models/radnik';

@Injectable({
  providedIn: 'root'
})
export class PosloviService {

  constructor(private http : HttpClient) { }

  posaljiPosao(posao : Posao) {
    const data = {
      usernameObj : posao.usernameObj,
      adresaObj : posao.adresaObj,
      datumOd : posao.datumOd,
      datumDo : posao.datumDo,
      ponuda : posao.ugovorenaCena,
      agencija : posao.agencija,
      prostorija1status : posao.prostorija1status,
      prostorija2status : posao.prostorija2status,
      prostorija3status : posao.prostorija3status,
      zavrsen : posao.zavrsen,
    }
    return this.http.post('http://localhost:4000/poslovi/posaljiPosao', data);
  }

  dodajOtkazivanje(otkazivanje : Otkazivanje) {
    const data = {
      usernameObj : otkazivanje.usernameObj,
      adresaObj : otkazivanje.adresaObj,
      agencija : otkazivanje.agencija
    }
    return this.http.post('http://localhost:4000/poslovi/dodajOtkazivanje', data);
  }

  dovuciSvaOtkazivanja() {
    return this.http.get('http://localhost:4000/poslovi/dovuciSvaOtkazivanja')
  }

  odbijOtkazivanje(otkaz : Otkazivanje) {
    const data = {
      klijent : otkaz.usernameObj,
      adresa : otkaz.adresaObj,
      agencija : otkaz.agencija
    }
    return this.http.post('http://localhost:4000/poslovi/odbijOtkazivanje', data);
  }

  otkaziPosao(username, adresa, agencija) {
    const data = {
      klijent : username,
      adresa : adresa,
      agencija : agencija
    }
    return this.http.post('http://localhost:4000/poslovi/otkaziPosao', data);
  }

  dovuciSvePoslove() {
    return this.http.get('http://localhost:4000/poslovi/dovuciSvePoslove')
  }

  dovuciPosloveZaKlijenta(searchParam) {
    return this.http.get(`http://localhost:4000/poslovi/dovuciPosloveZaKlijenta?param=${searchParam}`)
  }

  dovuciPosloveZaAgencije(searchParam) {
    return this.http.get(`http://localhost:4000/poslovi/dovuciPosloveZaAgencije?param=${searchParam}`)
  }

  azurirajBrojRadnika(username, adresa, agencija, brojRadnika) {
    const data = {
      klijent : username,
      adresa : adresa,
      agencija : agencija,
      brojRadnika : brojRadnika
    }
    return this.http.post('http://localhost:4000/poslovi/azurirajBrojRadnika', data);
  }

  azurirajStatus(username, adresa, agencija, prostorija, status) {
    const data = {
      klijent : username,
      adresa : adresa,
      agencija : agencija,
      prostorija : prostorija,
      status : status
    }
    return this.http.post('http://localhost:4000/poslovi/azurirajStatus', data);
  }

  dovuciPosao(username, adresa, agencija) {
    const data = {
      klijent : username,
      adresa : adresa,
      agencija : agencija
    }
    return this.http.post('http://localhost:4000/poslovi/dovuciPosao', data);
  }

  dovuciSveRadnike(agencija) {
    return this.http.get(`http://localhost:4000/poslovi/dovuciSveRadnike?param=${agencija}`)
  }

  dodajRadnika(radnik : Radnik) {
    const data = {
      ime : radnik.ime,
      prezime : radnik.prezime,
      email : radnik.email,
      telefon : radnik.telefon,
      specijalizacija : radnik.specijalizacija,
      agencija : radnik.agencija
    }
    return this.http.post('http://localhost:4000/poslovi/dodajRadnika', data);
  }

  obrisiRadnika(ime, prezime, telefon) {
    const data = {
      ime : ime,
      prezime : prezime,
      telefon : telefon
    }
    return this.http.post('http://localhost:4000/poslovi/obrisiRadnika', data);
  }

  dodajZahtev(agencija, broj) {
    const data = {
      agencija : agencija,
      broj : broj
    }
    return this.http.post('http://localhost:4000/poslovi/dodajZahtevZaRadnaMesta', data);
  }

  dovuciSveZahteve() {
    return this.http.get('http://localhost:4000/poslovi/dovuciSveZahteve')
  }

  obrisiZahtev(agencija, broj) {
    const data = {
      agencija : agencija,
      broj : broj
    }
    return this.http.post('http://localhost:4000/poslovi/obrisiZahtevZaRadnaMesta', data);
  }

  dovuciRadnika(telefon) {
    const data = {
      telefon : telefon
    }
    return this.http.post('http://localhost:4000/poslovi/dovuciRadnika', data);
  }

  urediRadnika(telefon, param, sta) {
    const data = {
      telefon : telefon,
      param : param,
      sta : sta
    }
    return this.http.post('http://localhost:4000/poslovi/urediRadnika', data)
  }

}
