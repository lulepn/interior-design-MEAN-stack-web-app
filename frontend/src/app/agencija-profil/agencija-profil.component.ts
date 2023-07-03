import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Agencija } from '../models/agencija';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-agencija-profil',
  templateUrl: './agencija-profil.component.html',
  styleUrls: ['./agencija-profil.component.css']
})
export class AgencijaProfilComponent implements OnInit {

  constructor(private ruter : Router, private servis : UsersService, private sanitizer:DomSanitizer) { }

  username : string;
  agencija : Agencija;

  oldPass : string;
  newPass : string;
  newPassAgain : string;

  message : string;

  updatePassword() {
    if(this.newPass != this.newPassAgain) {
      this.message = "Лозинке се не подударају!";
      return;
    }

    this.servis.updateA(this.oldPass,this.newPass, this.username).subscribe(resp=>{
      this.message = resp['message'];
      if(this.message == "Лозинка промењена!") {
        alert(this.message+"\n"+"Пријавите се поново са новом лозинком.");
        this.logout();
      }
    })
    
  }
  
  logout() {
    sessionStorage.clear();
    this.ruter.navigate(['']);
  }

  ngOnInit(): void {
    this.username = sessionStorage.getItem("username");
    this.servis.searchAgencija(this.username).subscribe((data: Agencija)=>{
      this.agencija = data;
    })
  }

  sanitize( url:string ) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  goBack() {
    this.ruter.navigate(['agencija']);
  }

  uredi() {
    this.ruter.navigate(['urediProfilAg']);
  }

}
