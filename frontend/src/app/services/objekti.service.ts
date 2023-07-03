import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Objekat } from '../models/objekat';
import { Prostorija } from '../models/prostorija';

@Injectable({
  providedIn: 'root'
})
export class ObjektiService {

  constructor(private http : HttpClient) { } 

  dovuciObjekat(searchParam) {
    return this.http.get(`http://localhost:4000/objekti/dovuciObjekte?param=${searchParam}`)
  }

  dovuciObjekatAdresa(searchParam) {
    return this.http.get(`http://localhost:4000/objekti/dovuciObjekatAdresa?param=${searchParam}`)
  }

  dodajObjekatCanvas(objekat : Objekat) {
    
    const data = {
      vlasnik : objekat.klijent,
      adresa : objekat.adresa,
      kvadratura : objekat.kvadratura,
      brojProstorija : objekat.brojProstorija,
      tip : objekat.tip,
      prostorija1 : objekat.prostorije[0],
      prostorija2 : objekat.prostorije[1],
      prostorija3 : objekat.prostorije[2],
      svaVrata : objekat.svaVrata
    }
    return this.http.post('http://localhost:4000/objekti/dodajObjekat', data);
  }

  update(sta, adresa, noviPod) {
    const data = {
      sta : sta,
      adresa : adresa,
      noviPod : noviPod
    }
    return this.http.post('http://localhost:4000/objekti/azurirajJedno', data)
  }

  delete(adresaObj) {
    const data = {
      adresa : adresaObj
    }
    return this.http.post('http://localhost:4000/objekti/obrisi', data)
  }
}
