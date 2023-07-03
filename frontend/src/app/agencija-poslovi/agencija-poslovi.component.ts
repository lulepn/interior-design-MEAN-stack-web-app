import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Zahtev } from '../models/zahtev';
import { ZahtevService } from '../services/zahtev.service';
import {formatDate} from '@angular/common';
import { Posao } from '../models/posao';
import { PosloviService } from '../services/poslovi.service';

@Component({
  selector: 'app-agencija-poslovi',
  templateUrl: './agencija-poslovi.component.html',
  styleUrls: ['./agencija-poslovi.component.css']
})
export class AgencijaPosloviComponent implements OnInit {

  constructor(private ruter : Router, private servis : ZahtevService, private servisP : PosloviService) { }

  message : string;
  zahtevi : Zahtev[]; prihvaceni : Zahtev[]; neprihvaceni : Zahtev[];
  poslovi : Posao[]; aktivni : Posao[]; zavrseni : Posao[];

  ngOnInit(): void {
    this.servis.dovuciZahteveZaAgencije(sessionStorage.getItem("username")).subscribe((data: Zahtev[])=>{
      this.zahtevi =  data;
      this.prihvaceni = new Array<Zahtev>;
      this.neprihvaceni = new Array<Zahtev>;
      let len = this.zahtevi.length;
      for(let i = 0; i < len; i++) {
        if(this.zahtevi[i].prihvacen == 1) 
          this.prihvaceni.push(this.zahtevi[i]);
        else 
          this.neprihvaceni.push(this.zahtevi[i])
      }
      this.servisP.dovuciPosloveZaAgencije(sessionStorage.getItem("username")).subscribe((data: Posao[])=>{
        this.poslovi =  data;
        this.aktivni = new Array<Posao>;
        this.zavrseni = new Array<Posao>;
        let len = this.poslovi.length;
        console.log(len);
        for(let i = 0; i < len; i++) {
          if(this.poslovi[i].zavrsen == 0) 
            this.aktivni.push(this.poslovi[i]);
          else 
            this.zavrseni.push(this.poslovi[i])
        } 
      }) 
    })
    
  }

  pregledaj(zahtev : Zahtev) {
    sessionStorage.setItem("adresa",zahtev.adresaObj);
    sessionStorage.setItem("klijent",zahtev.usernameObj);
    sessionStorage.setItem("datumOd",this.formatirajDatum(zahtev.datumOd));
    sessionStorage.setItem("datumDo",this.formatirajDatum(zahtev.datumDo));
    this.ruter.navigate(['pregledajZahtev']);
  }

  pregledajPosao(posao : Posao) {
    sessionStorage.setItem("adresa",posao.adresaObj);
    sessionStorage.setItem("klijent",posao.usernameObj);
    this.ruter.navigate(['pregledajPosao']);
  }

  posaljiPonudu(zahtev : Zahtev) {
    this.servis.prihvacenPonuda(zahtev.usernameObj,zahtev.adresaObj,zahtev.prihvacen,zahtev.ponuda).subscribe(respObj=>{
      let ind = this.zahtevi.indexOf(zahtev);
      this.zahtevi.splice(ind,1);
      this.prihvaceni.push(zahtev);
      window.location.reload();
    });
  }

  prihvati(zahtev : Zahtev) {
    zahtev.prihvacen = 1;
    
  }
  odbij(zahtev : Zahtev) {
    zahtev.prihvacen = 2;
    this.servis.prihvacenPonuda(zahtev.usernameObj,zahtev.adresaObj,zahtev.prihvacen,zahtev.ponuda).subscribe(respObj=>{
        this.message = "Објекат успешно додат!"
        window.location.reload();
    });
  }
  formatirajDatum(date) {
    let str = date.substring(0,10);
    str = str.substring(8,10) + "/" + str.substring(5,7) + "/" + str.substring(0,4);
    return str;
  }

  goBack() {
    this.ruter.navigate(['agencija']);
  }
}
