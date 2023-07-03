import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Klijent } from '../models/klijent';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-klijent-profil',
  templateUrl: './klijent-profil.component.html',
  styleUrls: ['./klijent-profil.component.css']
})
export class KlijentProfilComponent implements OnInit {

  constructor(private ruter : Router, private servis : UsersService, private sanitizer:DomSanitizer) { }

  username : string;
  klijent : Klijent;

  oldPass : string;
  newPass : string;
  newPassAgain : string;

  message : string;

  updatePassword() {
    if(this.newPass != this.newPassAgain) {
      this.message = "Лозинке се не подударају!";
      return;
    }

    this.servis.updateK(this.oldPass,this.newPass, this.username).subscribe(resp=>{
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
    this.servis.searchKlijent(this.username).subscribe((data: Klijent)=>{
      this.klijent = data;
    })
  }

  sanitize( url:string ) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  goBack() {
    this.ruter.navigate(['klijent']);
  }

  uredi() {
    this.ruter.navigate(['urediProfilKl']);
  }

}
