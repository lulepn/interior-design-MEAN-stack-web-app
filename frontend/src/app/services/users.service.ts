import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http : HttpClient) { }

  updateK(passOld, passNew, username) {
    const data = {
      passOld : passOld,
      passNew : passNew,
      username : username
    }
    return this.http.post('http://localhost:4000/users/updatePasswordK', data)
  }

  updateA(passOld, passNew, username) {
    const data = {
      passOld : passOld,
      passNew : passNew,
      username : username
    }
    return this.http.post('http://localhost:4000/users/updatePasswordA', data)
  }

  potvrdiK(username) {
    const data = {
      username : username
    }
    return this.http.post('http://localhost:4000/users/potvrdiK', data)
  }

  potvrdiA(username) {
    const data = {
      username : username
    }
    return this.http.post('http://localhost:4000/users/potvrdiA', data)
  }

  odbijK(username, email) {
    const data = {
      username : username,
      email : email
    }
    return this.http.post('http://localhost:4000/users/odbijK', data)
  }


  odbijA(username, email) {
    const data = {
      username : username,
      email : email
    }
    return this.http.post('http://localhost:4000/users/odbijA', data)
  }

  obrisiK(username) {
    const data = {
      username : username
    }
    return this.http.post('http://localhost:4000/users/obrisiK', data)
  }

  obrisiA(username) {
    const data = {
      username : username
    }
    return this.http.post('http://localhost:4000/users/obrisiA', data)
  }

  azurirajK(username, param, sta) {
    const data = {
      username : username,
      param : param,
      sta : sta
    }
    return this.http.post('http://localhost:4000/users/azurirajK', data)
  }

  azurirajA(username, param, sta) {
    const data = {
      username : username,
      param : param,
      sta : sta
    }
    return this.http.post('http://localhost:4000/users/azurirajA', data)
  }

  updateBrRadnika(username, brRadnika) {
    const data = {
      username : username,
      brojRadnika : brRadnika
    }
    return this.http.post('http://localhost:4000/users/updateBrojRadnika', data)
  }

  updateOdobrenBrRadnika(username, brRadnika) {
    const data = {
      username : username,
      odobreno : brRadnika
    }
    return this.http.post('http://localhost:4000/users/updateOdobrenBrojRadnika', data)
  }

  dodajRecenziju(agencija, recenzija) {
    const data = {
      agencija : agencija,
      recenzija : recenzija
    }
    return this.http.post('http://localhost:4000/users/dodajRecenziju', data)
  }

  obrisiRecenziju(agencija, recenzija) {
    const data = {
      agencija : agencija,
      recenzija : recenzija
    }
    return this.http.post('http://localhost:4000/users/obrisiRecenziju', data)
  }

  izmeniRecenziju(agencija, novaRecenzija, staraRecenzija) {
    const data = {
      agencija : agencija,
      novaRecenzija : novaRecenzija,
      staraRecenzija : staraRecenzija
    }
    return this.http.post('http://localhost:4000/users/izmeniRecenziju', data)
  }

  searchKlijent(username) {
    return this.http.get(`http://localhost:4000/users/getClient?param=${username}`)
  }

  searchAgencija(username) {
    return this.http.get(`http://localhost:4000/users/getAgencija?param=${username}`)
  }

  getAllK() {
    return this.http.get('http://localhost:4000/users/getAllK')
  }

  getAllAg() {
    return this.http.get('http://localhost:4000/users/getAllAg')
  }

  sviZabranjeni() {
    return this.http.get('http://localhost:4000/users/sviZabranjeni')
  }

  getSearchedAg(searchParam) {
    return this.http.get(`http://localhost:4000/users/getSearchedAg?param=${searchParam}`)
  }

  getSearchedAgAdr(searchParam) {
    return this.http.get(`http://localhost:4000/users/getSearchedAgAdr?param=${searchParam}`)
  }

  getSearchedAgNaAdr(searchParam) {
    return this.http.get(`http://localhost:4000/users/getSearchedAgNaAdr?param=${searchParam}`)
  }

  login(usernameFromForm, passwordFromForm, tipFromForm) {
    const data = {
      username : usernameFromForm,
      password : passwordFromForm
    }
    if(tipFromForm == 1)
      return this.http.post('http://localhost:4000/users/loginK', data);
    else 
      return this.http.post('http://localhost:4000/users/loginA', data);
  }

  loginAdmin(usernameFromForm, passwordFromForm) {
    const data = {
      username : usernameFromForm,
      password : passwordFromForm
    }
    return this.http.post('http://localhost:4000/users/adminLogin', data);
  }

  registerK(usernameFromForm, passwordFromForm, firstNameFromForm, lastNameFromForm, emailFromForm, telFromForm, imageSrcFromForm, registrovanFromForm) {
    const data = {
      username : usernameFromForm,
      password : passwordFromForm, 
      ime : firstNameFromForm,
      prezime : lastNameFromForm,
      telefon : telFromForm,
      email : emailFromForm,
      imageSrc : imageSrcFromForm,
      registrovan : registrovanFromForm
    }
    return this.http.post('http://localhost:4000/users/registerK', data);
  }

  registerA(usernameFromForm, passwordFromForm, emailFromForm, telFromForm, nazivFromForm, drzavaFromForm, gradFromForm, 
    ulicaFromForm, brojFromForm, maticniFromForm, opisFromForm, imageSrcFromForm,  registrovanFromForm) {
    const data = {
      username : usernameFromForm,
      password : passwordFromForm, 
      telefon : telFromForm,
      email : emailFromForm,
      naziv : nazivFromForm,
      drzava : drzavaFromForm,
      grad : gradFromForm,
      ulica : ulicaFromForm,
      broj : brojFromForm,
      maticni : maticniFromForm,
      opis : opisFromForm,
      imageSrc : imageSrcFromForm,
      registrovan : registrovanFromForm
    }
    return this.http.post('http://localhost:4000/users/registerA', data);
  }

}
