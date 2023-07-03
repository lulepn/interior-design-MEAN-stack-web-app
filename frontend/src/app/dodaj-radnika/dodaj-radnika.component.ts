import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agencija } from '../models/agencija';
import { Radnik } from '../models/radnik';
import { PosloviService } from '../services/poslovi.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-dodaj-radnika',
  templateUrl: './dodaj-radnika.component.html',
  styleUrls: ['./dodaj-radnika.component.css']
})
export class DodajRadnikaComponent implements OnInit {

  constructor(private router : Router, private servisU : UsersService, private servisP : PosloviService) { }

  noviRadnik : Radnik; agencija : Agencija; username : string;

  ngOnInit(): void {
    this.noviRadnik = new Radnik();
    this.username = sessionStorage.getItem('agencija');
    this.servisU.searchAgencija(this.username).subscribe((data : Agencija)=>{
      this.agencija = data;
      
    })
  }

  dodajNovogRadnika() {
    this.noviRadnik.agencija = this.username;
    this.servisP.dodajRadnika(this.noviRadnik).subscribe((resp)=>{
      if(this.agencija.brRadnika == null)
        this.agencija.brRadnika = 0;
      this.servisU.updateBrRadnika(this.username,this.agencija.brRadnika+1).subscribe((resp)=>{
        this.ngOnInit();
      })
    })
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['admin']);
  }
  goBack() {
    this.router.navigate(['adminRadnici']);
  }
}
