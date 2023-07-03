import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Radnik } from '../models/radnik';
import { PosloviService } from '../services/poslovi.service';

@Component({
  selector: 'app-uredi-radnika',
  templateUrl: './uredi-radnika.component.html',
  styleUrls: ['./uredi-radnika.component.css']
})
export class UrediRadnikaComponent implements OnInit {

  constructor(private servis : PosloviService, private router : Router) { }
  mod : string;
  radnik : Radnik; 

  ngOnInit(): void {
    this.mod = sessionStorage.getItem('mod');
    this.servis.dovuciRadnika(sessionStorage.getItem('radnik')).subscribe((data : Radnik)=>{
      this.radnik = data;
    })
  }

  azuriraj(sta) {
    if(sta == 'telefon')
      this.servis.urediRadnika(sessionStorage.getItem('radnik'),this.radnik.telefon,sta).subscribe((resp)=>{
        this.goBack();
      })
    else if(sta == 'specijalizacija')
      this.servis.urediRadnika(sessionStorage.getItem('radnik'),this.radnik.specijalizacija,sta).subscribe((resp)=>{
        this.ngOnInit();
      })
    else if(sta == 'email')
      this.servis.urediRadnika(sessionStorage.getItem('radnik'),this.radnik.email,sta).subscribe((resp)=>{
        this.ngOnInit();
      })
    else if(sta == 'ime')
      this.servis.urediRadnika(sessionStorage.getItem('radnik'),this.radnik.ime,sta).subscribe((resp)=>{
        this.ngOnInit();
      })
    else if(sta == 'prezime')
      this.servis.urediRadnika(sessionStorage.getItem('radnik'),this.radnik.prezime,sta).subscribe((resp)=>{
        this.ngOnInit();
      })
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  goBack() {
    this.router.navigate(['agencijaRadnici']);
  }

  goBackAdmin() {
    this.router.navigate(['adminRadnici']);
  }
}
