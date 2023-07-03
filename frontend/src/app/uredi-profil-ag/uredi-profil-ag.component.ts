import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Agencija } from '../models/agencija';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-uredi-profil-ag',
  templateUrl: './uredi-profil-ag.component.html',
  styleUrls: ['./uredi-profil-ag.component.css']
})
export class UrediProfilAgComponent implements OnInit {

  constructor(private servis : UsersService, private router : Router, private sanitizer:DomSanitizer) { }

  agencija : Agencija;
  imageSrc : ArrayBuffer;

  async ngOnInit(): Promise<void> {
    this.servis.searchAgencija(sessionStorage.getItem('username')).subscribe((data : Agencija)=>{
      delete this.agencija;
      this.agencija = data;
    })
    const reader = new FileReader();
    const file = await this.convertRelativeUriToFile("./assets/profilepicture.jpg", "profilepicture.jpg");
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      this.imageSrc = reader.result as ArrayBuffer;
    };
  }

  azuriraj(sta) {
    if(sta == 'username')
      this.servis.azurirajA(sessionStorage.getItem('username'),this.agencija.username,sta).subscribe((resp)=>{
        this.goBack();
      })
    else if(sta == 'password')
      this.servis.azurirajA(sessionStorage.getItem('username'),this.agencija.password,sta).subscribe((resp)=>{
        this.ngOnInit();
      })
    else if(sta == 'email')
      this.servis.azurirajA(sessionStorage.getItem('username'),this.agencija.email,sta).subscribe((resp)=>{
        this.ngOnInit();
      })
    else if(sta == 'naziv')
      this.servis.azurirajA(sessionStorage.getItem('username'),this.agencija.naziv,sta).subscribe((resp)=>{
        this.ngOnInit();
      })
    else if(sta == 'opis')
      this.servis.azurirajA(sessionStorage.getItem('username'),this.agencija.opis,sta).subscribe((resp)=>{
        this.ngOnInit();
      })
    else if(sta == 'telefon')
      this.servis.azurirajA(sessionStorage.getItem('username'),this.agencija.telefon,sta).subscribe((resp)=>{
        this.ngOnInit();
      })
      else if(sta == 'adresa')
      this.servis.azurirajA(sessionStorage.getItem('username'),this.agencija.adresa,sta).subscribe((resp)=>{
        this.ngOnInit();
      })
      else if(sta == 'maticni')
      this.servis.azurirajA(sessionStorage.getItem('username'),this.agencija.maticni,sta).subscribe((resp)=>{
        this.ngOnInit();
      })
      else if(sta == 'imageSrc')
      this.servis.azurirajA(sessionStorage.getItem('username'),this._arrayBufferToBase64(this.imageSrc),sta).subscribe((resp)=>{
        this.ngOnInit();
      })
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  goBack() {
    this.router.navigate(['agencijaProfil']);
  }

  async convertRelativeUriToFile(filePath: string, fileName: string) {
    const imageUrl = await fetch(filePath);
    const buffer = await imageUrl.arrayBuffer();
    return new File([buffer], fileName);
  }



  onFileChange(event) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        this.imageSrc = reader.result as ArrayBuffer;
      };
      
    }
  }

  _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
       binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }

  sanitize( url:string ) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}



