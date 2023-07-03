import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Klijent } from '../models/klijent';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-uredi-profil-kl',
  templateUrl: './uredi-profil-kl.component.html',
  styleUrls: ['./uredi-profil-kl.component.css']
})
export class UrediProfilKlComponent implements OnInit {

  constructor(private servis : UsersService, private router : Router, private sanitizer:DomSanitizer) { }

  klijent : Klijent;
  imageSrc : ArrayBuffer;

  async ngOnInit(): Promise<void> {
    this.servis.searchKlijent(sessionStorage.getItem('username')).subscribe((data : Klijent)=>{
      delete this.klijent;
      this.klijent = data;
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
      this.servis.azurirajK(sessionStorage.getItem('username'),this.klijent.username,sta).subscribe((resp)=>{
        this.goBack();
        
      })
    else if(sta == 'password')
      this.servis.azurirajK(sessionStorage.getItem('username'),this.klijent.password,sta).subscribe((resp)=>{
        this.ngOnInit();
      })
    else if(sta == 'email')
      this.servis.azurirajK(sessionStorage.getItem('username'),this.klijent.email,sta).subscribe((resp)=>{
        this.ngOnInit();
      })
    else if(sta == 'ime')
      this.servis.azurirajK(sessionStorage.getItem('username'),this.klijent.ime,sta).subscribe((resp)=>{
        this.ngOnInit();
      })
    else if(sta == 'prezime')
      this.servis.azurirajK(sessionStorage.getItem('username'),this.klijent.prezime,sta).subscribe((resp)=>{
        this.ngOnInit();
      })
    else if(sta == 'imageSrc')
      this.servis.azurirajK(sessionStorage.getItem('username'),this._arrayBufferToBase64(this.imageSrc),sta).subscribe((resp)=>{
        this.ngOnInit();
      })
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  goBack() {
    this.router.navigate(['klijentProfil']);
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
