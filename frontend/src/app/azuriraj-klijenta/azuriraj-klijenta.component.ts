import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Klijent } from '../models/klijent';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-azuriraj-klijenta',
  templateUrl: './azuriraj-klijenta.component.html',
  styleUrls: ['./azuriraj-klijenta.component.css']
})
export class AzurirajKlijentaComponent implements OnInit {

  constructor(private servis : UsersService, private router : Router) { }

  klijent : Klijent;

  ngOnInit(): void {
    this.servis.searchKlijent(sessionStorage.getItem('usernameK')).subscribe((data : Klijent)=>{
      delete this.klijent;
      this.klijent = data;
    })
  }

  azuriraj(sta) {
    if(sta == 'username')
      this.servis.azurirajK(sessionStorage.getItem('usernameK'),this.klijent.username,sta).subscribe((resp)=>{
        this.goBack();
        
      })
    else if(sta == 'password')
      this.servis.azurirajK(sessionStorage.getItem('usernameK'),this.klijent.password,sta).subscribe((resp)=>{
        this.ngOnInit();
      })
    else if(sta == 'email')
      this.servis.azurirajK(sessionStorage.getItem('usernameK'),this.klijent.email,sta).subscribe((resp)=>{
        this.ngOnInit();
      })
    else if(sta == 'ime')
      this.servis.azurirajK(sessionStorage.getItem('usernameK'),this.klijent.ime,sta).subscribe((resp)=>{
        this.ngOnInit();
      })
    else if(sta == 'prezime')
      this.servis.azurirajK(sessionStorage.getItem('usernameK'),this.klijent.prezime,sta).subscribe((resp)=>{
        this.ngOnInit();
      })
    else if(sta == 'telefon')
      this.servis.azurirajK(sessionStorage.getItem('usernameK'),this.klijent.telefon,sta).subscribe((resp)=>{
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
