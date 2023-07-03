import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agencija } from '../models/agencija';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-agencija-ulogovana',
  templateUrl: './agencija-ulogovana.component.html',
  styleUrls: ['./agencija-ulogovana.component.css']
})
export class AgencijaUlogovanaComponent implements OnInit {

  constructor(private servis : UsersService, private ruter : Router) { }

  username : string;
  agencija : Agencija;
 
  profil() {
    this.ruter.navigate(['agencijaProfil']);
  }

  poslovi() {
    this.ruter.navigate(['agencijaPoslovi']);
  }

  radnici() {
    this.ruter.navigate(['agencijaRadnici']);
  }
 
  ngOnInit(): void {
    this.username = sessionStorage.getItem("username");
    this.servis.searchAgencija(this.username).subscribe((data: Agencija)=>{
      this.agencija = data;
    })
  }

  logout() {
    sessionStorage.clear();
    this.ruter.navigate(['']);
  }

}
