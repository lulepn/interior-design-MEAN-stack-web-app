import { Component, OnInit } from '@angular/core';
import { Agencija } from '../models/agencija';
import { UsersService } from '../services/users.service';
import {DomSanitizer} from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-neregistrovan',
  templateUrl: './neregistrovan.component.html',
  styleUrls: ['./neregistrovan.component.css']
})
export class NeregistrovanComponent implements OnInit {

  constructor(private servis : UsersService, private sanitizer:DomSanitizer, private ruter : Router) { }

  agencije : Agencija[] = [];
  mode : string;

  ngOnInit(): void {
    this.servis.getAllAg().subscribe((data: Agencija[])=>{
      this.agencije = data;
      this.mode = sessionStorage.getItem('mode');
    })
    this.nana = 1;
    this.nanaSort = 1;
    this.ascdesc = 1;
  }

  goBack() {
    if(this.mode == "ulogovan")
      this.ruter.navigate(['klijent']);
    else 
      this.ruter.navigate(['']);
  }

  searchParam : String;
  searchParamA : String;
  searchParamAN : String;
  id : Number;
  nana : Number;
  nanaSort : Number;
  ascdesc : Number;

  pregledAgencije(username) {
    sessionStorage.setItem('usernameAg',username);
    this.ruter.navigate(['pregledAgencije']);
  }

  search() {
    if(this.nana == 1)
      this.searchAg();
    else if(this.nana == 2)
      this.searchAgAdr();
    else if(this.nana == 3)
      this.searchAgNaAdr();
  }

  sort() {
    if(this.nanaSort == 1) {
      if(this.ascdesc == 1)
        this.sortNazivAsc();
      else if(this.ascdesc == 2)
        this.sortNazivDesc();
    }
    else if(this.nanaSort == 2) {
      if(this.ascdesc == 1)
        this.sortAdresaAsc();
      else if(this.ascdesc == 2)
        this.sortAdresaDesc();
    }
    else if(this.nanaSort == 3) {
      if(this.ascdesc == 1)
        this.sortNazivAdresaAsc();
      else if(this.ascdesc == 2)
        this.sortNazivAdresaDesc();
    }  
  }

  searchAg() {
    this.servis.getSearchedAg(this.searchParam).subscribe((data: Agencija[])=>{
      this.agencije = data;
    })
  }

  searchAgAdr() {
    this.servis.getSearchedAgAdr(this.searchParam).subscribe((data: Agencija[])=>{
      this.agencije = data;
    })
  }

  searchAgNaAdr() {
    this.servis.getSearchedAgNaAdr(this.searchParam).subscribe((data: Agencija[])=>{
      this.agencije = data;
    })
  }

  sortNazivAsc() {
    this.agencije.sort((agencija1,agencija2)=>{
      if(agencija1.naziv < agencija2.naziv) return -1;
      else return 1;
    });
  }

  sortNazivDesc() {
    this.agencije.sort((agencija1,agencija2)=>{
      if(agencija1.naziv > agencija2.naziv) return -1;
      else  return 1;
    });
  }

  sortAdresaAsc() {
    this.agencije.sort((agencija1,agencija2)=>{
      if(agencija1.adresa < agencija2.adresa) return -1;
      else return 1;
    });
  }

  sortAdresaDesc() {
    this.agencije.sort((agencija1,agencija2)=>{
      if(agencija1.adresa > agencija2.adresa) return -1;
      else return 1;
    });
  }

  sortNazivAdresaAsc() {
    this.agencije.sort((agencija1,agencija2)=>{
      if((agencija1.naziv.toString()+','+agencija1.adresa.toString()) < (agencija2.naziv.toString()+','+agencija2.adresa.toString())) return -1;
      else return 1;
    });
  }

  sortNazivAdresaDesc() {
    this.agencije.sort((agencija1,agencija2)=>{
      if((agencija1.naziv.toString()+','+agencija1.adresa.toString()) > (agencija2.naziv.toString()+','+agencija2.adresa.toString())) return -1;
      else return 1;
    });
  }

  /*
  _arrayBufferToBase64( buffer ) {
    buffer = this.str2ab(buffer);
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
       binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }
  */

  sanitize( url:string ) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  /*
  str2ab(str) {
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
  */
}
