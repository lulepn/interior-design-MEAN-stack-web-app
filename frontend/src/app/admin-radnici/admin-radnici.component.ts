import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agencija } from '../models/agencija';
import { Radnik } from '../models/radnik';
import { PosloviService } from '../services/poslovi.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-admin-radnici',
  templateUrl: './admin-radnici.component.html',
  styleUrls: ['./admin-radnici.component.css']
})
export class AdminRadniciComponent implements OnInit {

  constructor(private servis : UsersService, private servisP : PosloviService ,private router : Router) { }

  agencija : Agencija;
  radnici : Radnik[]; noviRadnik : Radnik;
  smanji : number; povecaj : number; 

  ngOnInit(): void {
    this.smanji = 0;
    this.povecaj = 0;
    this.servis.searchAgencija(sessionStorage.getItem('usernameK')).subscribe((data : Agencija)=>{
      delete this.agencija;
      this.agencija = data;
      this.servisP.dovuciSveRadnike(this.agencija.username).subscribe((data2 : Radnik[])=>{
        this.radnici = data2;
      })
    })
  }

  dodajRadnika() {
    console.log(this.agencija.username)
    sessionStorage.setItem('agencija',this.agencija.username.toString());
    this.router.navigate(['dodajRadnika']);
  }

  obrisiRadnika(radnik : Radnik) {
    this.servisP.obrisiRadnika(radnik.ime,radnik.prezime,radnik.telefon).subscribe((resp)=>{
      this.servis.updateBrRadnika(this.agencija.username,this.agencija.brRadnika-1).subscribe((resp)=>{
        this.ngOnInit();
      })
    })
  }

  azuriraj(radnik : Radnik) {
    sessionStorage.setItem('radnik', radnik.telefon.toString());
    sessionStorage.setItem('mod','1');
    this.router.navigate(['urediRadnika'])
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['admin']);
  }
  goBack() {
    this.router.navigate(['adminUlogovan']);
  }
}
