import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agencija } from '../models/agencija';
import { Radnik } from '../models/radnik';
import { PosloviService } from '../services/poslovi.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-radnici',
  templateUrl: './radnici.component.html',
  styleUrls: ['./radnici.component.css']
})
export class RadniciComponent implements OnInit {

  constructor(private servis : PosloviService, private router : Router, private servisU : UsersService) { }

  radnici : Radnik[]; username : string; agencija : Agencija; noviRadnik : Radnik;
  brojRadnihMesta : number;

  ngOnInit(): void {
    this.noviRadnik = new Radnik();
    this.username = sessionStorage.getItem('username');
    this.servisU.searchAgencija(this.username).subscribe((data : Agencija)=>{
      this.agencija = data;
      this.servis.dovuciSveRadnike(this.username).subscribe((data : Radnik[])=>{
        this.radnici = data;
      })
    })
  }

  zahtevZaRadnaMesta() {
    this.servis.dodajZahtev(this.username,this.brojRadnihMesta).subscribe((resp)=>{
      this.brojRadnihMesta = 0;
    })
  }

  dodajNovogRadnika() {
    this.noviRadnik.agencija = this.username;
    this.servis.dodajRadnika(this.noviRadnik).subscribe((resp)=>{
      this.servisU.updateBrRadnika(this.username,this.agencija.brRadnika+1).subscribe((resp)=>{
        this.ngOnInit();
      })
    })
  }

  obrisiRadnika(radnik : Radnik) {
    this.servis.obrisiRadnika(radnik.ime,radnik.prezime,radnik.telefon).subscribe((resp)=>{
      this.servisU.updateBrRadnika(this.username,this.agencija.brRadnika-1).subscribe((resp)=>{
        this.ngOnInit();
      })
    })
  }

  goBack() {
    this.router.navigate(['agencija'])
  }

  azuriraj(radnik : Radnik) {
    sessionStorage.setItem('radnik', radnik.telefon.toString());
    sessionStorage.setItem('mod','0');
    this.router.navigate(['urediRadnika'])
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
