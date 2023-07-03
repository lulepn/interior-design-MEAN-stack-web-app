import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agencija } from '../models/agencija';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-azuriraj-agenciju',
  templateUrl: './azuriraj-agenciju.component.html',
  styleUrls: ['./azuriraj-agenciju.component.css']
})
export class AzurirajAgencijuComponent implements OnInit {

  constructor(private servis : UsersService, private router : Router) { }

  agencija : Agencija;

  ngOnInit(): void {
    this.servis.searchAgencija(sessionStorage.getItem('usernameK')).subscribe((data : Agencija)=>{
      delete this.agencija;
      this.agencija = data;
    })
  }

  azuriraj(sta) {
    if(sta == 'username')
      this.servis.azurirajA(sessionStorage.getItem('usernameK'),this.agencija.username,sta).subscribe((resp)=>{
        this.goBack();
      })
    else if(sta == 'password')
      this.servis.azurirajA(sessionStorage.getItem('usernameK'),this.agencija.password,sta).subscribe((resp)=>{
        this.ngOnInit();
      })
    else if(sta == 'email')
      this.servis.azurirajA(sessionStorage.getItem('usernameK'),this.agencija.email,sta).subscribe((resp)=>{
        this.ngOnInit();
      })
    else if(sta == 'naziv')
      this.servis.azurirajA(sessionStorage.getItem('usernameK'),this.agencija.naziv,sta).subscribe((resp)=>{
        this.ngOnInit();
      })
    else if(sta == 'opis')
      this.servis.azurirajA(sessionStorage.getItem('usernameK'),this.agencija.opis,sta).subscribe((resp)=>{
        this.ngOnInit();
      })
    else if(sta == 'telefon')
      this.servis.azurirajA(sessionStorage.getItem('usernameK'),this.agencija.telefon,sta).subscribe((resp)=>{
        this.ngOnInit();
      })
      else if(sta == 'adresa')
      this.servis.azurirajA(sessionStorage.getItem('usernameK'),this.agencija.adresa,sta).subscribe((resp)=>{
        this.ngOnInit();
      })
      else if(sta == 'maticni')
      this.servis.azurirajA(sessionStorage.getItem('usernameK'),this.agencija.maticni,sta).subscribe((resp)=>{
        this.ngOnInit();
      })
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['admin']);
  }

  goBack() {
    this.router.navigate(['adminUlogovan']);
  }

}
