import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Agencija } from '../models/agencija';
import { Klijent } from '../models/klijent';
import { Otkazivanje } from '../models/otkazivanje';
import { Posao } from '../models/posao';
import { RadnaMesta } from '../models/radnamesta';
import { PosloviService } from '../services/poslovi.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-admin-ulogovan',
  templateUrl: './admin-ulogovan.component.html',
  styleUrls: ['./admin-ulogovan.component.css']
})
export class AdminUlogovanComponent implements OnInit {

  constructor(private router : Router, private servisP : PosloviService, private servisU : UsersService,
    private sanitizer:DomSanitizer) { }

  username : String; mod : number;
  poslovi : Posao[]; agencije : Agencija[]; klijenti : Klijent[]; zahteviK : Klijent[]; zahteviA : Agencija[]; 
  otkazivanja : Otkazivanje[]; radnamesta : RadnaMesta[];

  ngOnInit(): void {
    this.mod = 1;
    this.username = sessionStorage.getItem('username');
    this.servisU.getAllAg().subscribe((data : Agencija[])=>{
      let len = data.length;
      this.zahteviA = new Array<Agencija>;
      this.agencije = new Array<Agencija>;
      for(let i = 0; i < len; i++) {
        if(data[i].registrovan != 1)
          this.zahteviA.push(data[i]);
        else 
          this.agencije.push(data[i]);
      }
      this.servisU.getAllK().subscribe((klijenti : Klijent[])=>{
        let len = klijenti.length;
        this.zahteviK = new Array<Klijent>;
        this.klijenti = new Array<Klijent>;
        for(let i = 0; i < len; i++) {
          if(klijenti[i].registrovan != 1)
            this.zahteviK.push(klijenti[i]);
          else 
           this.klijenti.push(klijenti[i]);
        }
        this.servisP.dovuciSvePoslove().subscribe((poslovi : Posao[])=>{
          this.poslovi = poslovi;
          this.servisP.dovuciSvaOtkazivanja().subscribe((otkazivanja : Otkazivanje[])=>{
            this.otkazivanja = otkazivanja;
            this.servisP.dovuciSveZahteve().subscribe((data : RadnaMesta[])=>{
              this.radnamesta = data;
            })
          })
        })
      })
    })
  }

  prihvatiZahtev(zahtev : RadnaMesta) {
    this.servisU.searchAgencija(zahtev.agencija).subscribe((data : Agencija)=>{
      let trenutna = data;
      if(trenutna.odobreno == null)
        trenutna.odobreno = 0;
      this.servisU.updateOdobrenBrRadnika(zahtev.agencija,trenutna.odobreno + zahtev.broj).subscribe((resp)=>{
        this.servisP.obrisiZahtev(zahtev.agencija,zahtev.broj).subscribe((resp)=>{
          this.ngOnInit();
        })
      })
    })
  }

  odbijZahtev(zahtev : RadnaMesta) {
    this.servisP.obrisiZahtev(zahtev.agencija, zahtev.broj).subscribe((resp)=>{
      this.ngOnInit();
    })
  }

  potvrdiK(klijent : Klijent) {
    this.servisU.potvrdiK(klijent.username).subscribe((resp)=>{

    });
  }
  potvrdiA(agencija : Agencija) {
    this.servisU.potvrdiA(agencija.username).subscribe((resp)=>{
      
    });
  }

  odbijK(klijent : Klijent) {
    this.servisU.odbijK(klijent.username,klijent.email).subscribe((resp)=>{

    })
  }

  odbijA(agencija : Agencija) {
    this.servisU.odbijA(agencija.username,agencija.email).subscribe((resp)=>{
      
    })
  }

  obrisiK(klijent : Klijent) {
    this.servisU.obrisiK(klijent.username).subscribe((resp)=>{

    })
  }

  obrisiA(agencija : Agencija) {
    this.servisU.obrisiA(agencija.username).subscribe((resp)=>{

    })
  }

  azurirajK(klijent : Klijent) {
    sessionStorage.setItem('usernameK',klijent.username.toString());
    this.router.navigate(['azurirajKlijenta']);
  }

  azurirajA(agencija : Agencija) {
    sessionStorage.setItem('usernameK',agencija.username.toString());
    this.router.navigate(['azurirajAgenciju']);
  }

  radnici(agencija : Agencija) {
    sessionStorage.setItem('usernameK',agencija.username.toString());
    this.router.navigate(['adminRadnici']); 
  }

  dodajKlijenta() {
    sessionStorage.setItem('mod','1');
    this.router.navigate(['registerK']);
  }
  dodajAgenciju() {
    sessionStorage.setItem('mod','1');
    this.router.navigate(['registerA'])
  }

  prihvatiOtkazivanje(otkaz : Otkazivanje) {
    this.servisP.otkaziPosao(otkaz.usernameObj,otkaz.adresaObj,otkaz.agencija).subscribe((resp)=>{
      this.servisP.odbijOtkazivanje(otkaz).subscribe((resp)=>{
        
      })
    })
  }

  odbijOtkazivanje(otkaz : Otkazivanje) {
    this.servisP.odbijOtkazivanje(otkaz).subscribe((resp)=>{

    })
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['admin']);
  }

  sanitize( url:string ) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
