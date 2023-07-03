import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Klijent } from '../models/klijent';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-klijent-ulogovan',
  templateUrl: './klijent-ulogovan.component.html',
  styleUrls: ['./klijent-ulogovan.component.css']
})
export class KlijentUlogovanComponent implements OnInit {

  constructor(private servis : UsersService, private ruter : Router) { }

  username : string;
  klijent : Klijent;
  
  profil() {
    this.ruter.navigate(['klijentProfil']);
  }

  objekti() {
    this.ruter.navigate(['objekti']);
  }

  agencije() {
    sessionStorage.setItem('mode',"ulogovan");
    this.ruter.navigate(['noregister'])
  }

  poslovi() {
    this.ruter.navigate(['klijentPoslovi']);
  }
 
  ngOnInit(): void {
    this.username = sessionStorage.getItem("username");
    this.servis.searchKlijent(this.username).subscribe((data: Klijent)=>{
      this.klijent = data;
    })
  }

  logout() {
    sessionStorage.clear();
    this.ruter.navigate(['']);
  }
 
}
