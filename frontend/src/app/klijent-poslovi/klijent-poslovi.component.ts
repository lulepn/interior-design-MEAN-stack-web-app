import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Posao } from '../models/posao';
import { Zahtev } from '../models/zahtev';
import { PosloviService } from '../services/poslovi.service';
import { ZahtevService } from '../services/zahtev.service';

@Component({
  selector: 'app-klijent-poslovi',
  templateUrl: './klijent-poslovi.component.html',
  styleUrls: ['./klijent-poslovi.component.css']
})
export class KlijentPosloviComponent implements OnInit {

  constructor(private ruter : Router, private servis : ZahtevService, private servisP : PosloviService) { }

  zahtevi : Zahtev[]; aktivni : Posao[]; zavrseni : Posao[]; poslovi : Posao[];
  filter : string;

  ngOnInit(): void {
    this.filter = "sve";
    this.servis.dovuciZahteveZaKlijenta(sessionStorage.getItem("username")).subscribe((data: Zahtev[])=>{
      this.zahtevi =  data;
      this.aktivni = new Array<Posao>;
      this.zavrseni = new Array<Posao>;
      this.servisP.dovuciPosloveZaKlijenta(sessionStorage.getItem("username")).subscribe((data: Posao[])=>{
        this.poslovi =  data;
        let len = this.poslovi.length;
        console.log(this.poslovi[0].zavrsen)
        console.log(len);
        for(let i = 0; i < len; i++) {
          if(this.poslovi[i].zavrsen == 0 || this.poslovi[i].zavrsen == 1) 
            this.aktivni.push(this.poslovi[i]);
          else if(this.poslovi[i].zavrsen == 2)
            this.zavrseni.push(this.poslovi[i])
        } 
      })
    })
  }

  prihvati(zahtev : Zahtev) {
    let posao = new Posao();
    posao.adresaObj = zahtev.adresaObj; posao.agencija = zahtev.agencija; posao.datumDo = zahtev.datumDo;
    posao.datumOd = zahtev.datumOd; posao.prostorija1status = 0; posao.prostorija2status = 0; posao.prostorija3status = 0;
    posao.ugovorenaCena = zahtev.ponuda; posao.usernameObj = zahtev.usernameObj; posao.zavrsen = 0;
    this.servisP.posaljiPosao(posao).subscribe(respObj=>{
      this.servis.delete(zahtev.adresaObj,zahtev.usernameObj).subscribe(respObj=>{});
  });
  }

  odbij(zahtev : Zahtev) {
    this.servis.delete(zahtev.adresaObj,zahtev.usernameObj).subscribe(respObj=>{});
  }

  recenzija(posao : Posao) {
    sessionStorage.setItem('agencija',posao.agencija);
    this.ruter.navigate(['recenzija']);
  }

  goBack() {
    this.ruter.navigate(['klijent']);
  }

  logout() {
    sessionStorage.clear();
    this.ruter.navigate(['']);
  }

  pregledajPosao(posao : Posao) {
    sessionStorage.setItem("adresa",posao.adresaObj);
    sessionStorage.setItem("klijent",posao.usernameObj);
    sessionStorage.setItem("agencija",posao.agencija);
    this.ruter.navigate(['pregledajPosaoKlijent']);
  }

  formatirajDatum(date) {
    let str = date.substring(0,10);
    str = str.substring(8,10) + "/" + str.substring(5,7) + "/" + str.substring(0,4);
    return str;
  }

  formatirajStatus(status) {
    if(status =="1")
      return "ПРИХВАЋЕН" 
    else if(status == "2")
      return "ОДБИЈЕН"
    else {
      return "У разматрању"
    }
  }

}
