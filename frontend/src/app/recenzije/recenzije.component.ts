import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agencija } from '../models/agencija';
import { Recenzija } from '../models/recenzija';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-recenzije',
  templateUrl: './recenzije.component.html',
  styleUrls: ['./recenzije.component.css']
})
export class RecenzijeComponent implements OnInit {

  constructor(private servis : UsersService, private router : Router) { } 

  ovaAgencija : Agencija;
  klijent : string; ocena : number; komentar : string; agencija : string;
  vecOstavio : number; rezKom : string; rezOcn : number;

  ngOnInit(): void {
    this.ocena = 5;
    this.vecOstavio = 0;
    this.klijent = sessionStorage.getItem('username');
    this.agencija = sessionStorage.getItem('agencija');
    this.servis.searchAgencija(this.agencija).subscribe((data : Agencija)=>{
      this.ovaAgencija = data;
      for(let i = 0; i < this.ovaAgencija.recenzije.length; i++) {
        if(this.ovaAgencija.recenzije[i].klijent == this.klijent) {
          this.vecOstavio = 1;
          this.komentar = this.ovaAgencija.recenzije[i].komentar;
          this.ocena = this.ovaAgencija.recenzije[i].ocena;
          this.rezKom = this.komentar; this.rezOcn = this.ocena;
        } 
      }
    })
  }

  posaljiRecenziju() {
    let rec = new Recenzija();
    rec.klijent = this.klijent;
    rec.komentar = this.komentar;
    rec.ocena = this.ocena;
    this.servis.dodajRecenziju(this.agencija,rec).subscribe(resp=>{
      this.ocena = 5;
      this.komentar = "";
      this.router.navigate[('klijentPoslovi')];
    })
  }

  izmeniRecenziju() {
    let novaRec = new Recenzija();
    novaRec.klijent = this.klijent;
    novaRec.komentar = this.komentar;
    novaRec.ocena = this.ocena;
    let staraRec = new Recenzija();
    staraRec.klijent = this.klijent;
    staraRec.komentar = this.rezKom;
    staraRec.ocena = this.rezOcn;
    this.servis.izmeniRecenziju(this.agencija,novaRec,staraRec).subscribe(resp=>{
      this.ngOnInit();
    })
  }

  obrisiRecenziju() {
    let rec = new Recenzija();
    rec.klijent = this.klijent;
    rec.komentar = this.rezKom;
    rec.ocena = this.rezOcn;
    this.servis.obrisiRecenziju(this.agencija,rec).subscribe(resp=>{
      this.ocena = 5;
      this.komentar = "";
      this.vecOstavio = 0;
      this.router.navigate[('klijentPoslovi')];
    })
  }

  goBack() {
    this.router.navigate(['klijentPoslovi']);
  }

}
