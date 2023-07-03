import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Agencija } from '../models/agencija';
import { Objekat } from '../models/objekat';
import { Zahtev } from '../models/zahtev';
import { ObjektiService } from '../services/objekti.service';
import { UsersService } from '../services/users.service';
import { ZahtevService } from '../services/zahtev.service';

@Component({
  selector: 'app-pregled-agencije',
  templateUrl: './pregled-agencije.component.html',
  styleUrls: ['./pregled-agencije.component.css']
})
export class PregledAgencijeComponent implements OnInit {

  constructor(private servis : UsersService, private servis1 : ObjektiService, private servis2 : ZahtevService,
     private ruter : Router, private sanitizer : DomSanitizer) { }

  agencija : Agencija; zahtev : Zahtev;
  objekti : Objekat[];
  username : string; mode : string; zahtevano : number; izabraniObj : string; message : string;
  datumO : string; datumD : string;


  ngOnInit(): void {
    this.zahtevano = 0;
    this.servis.searchAgencija(sessionStorage.getItem('usernameAg')).subscribe((data: Agencija )=>{
      this.agencija = data;
      this.username = sessionStorage.getItem('username')
      this.mode = sessionStorage.getItem('mode');
    }) 
    this.servis1.dovuciObjekat(sessionStorage.getItem("username")).subscribe((data: Objekat[])=>{
      this.objekti =  data;
    })
  }

  zahtevZaSaradnju() {
    if(this.zahtevano == 0) {
      this.zahtevano = 1;
      this.zahtev = new Zahtev();
      this.zahtev.usernameObj = this.username;
      this.zahtev.agencija = sessionStorage.getItem('usernameAg');
      this.zahtev.ponuda = 0;
      this.zahtev.prihvacen = 0;
    }
  }

  posaljiZahtev() {
    let msec = Date.parse(this.datumO);
    this.zahtev.datumOd = new Date(msec + 7200000);
    msec = Date.parse(this.datumD);
    this.zahtev.datumDo = new Date(msec + 7200000);
    this.servis2.posaljiZahtev(this.zahtev).subscribe(respObj=>{
      if(respObj['Message'] == "Ok") {
        this.message = "Захтев успешно додат!"
        this.zahtevano = 0;
      } else {
        this.message = "Додавање захтева неуспешно."
      }
  });
  }

  goBack() {
    this.ruter.navigate(['noregister']);
  }

  sanitize( url:string ) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
