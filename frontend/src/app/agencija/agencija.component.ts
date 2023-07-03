import { ImageLoader, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import {DomSanitizer} from '@angular/platform-browser';
import { Zabranjeni } from '../models/zabranjeni';

@Component({
  selector: 'app-agencija',
  templateUrl: './agencija.component.html',
  styleUrls: ['./agencija.component.css']
})
export class AgencijaComponent implements OnInit {

  constructor(private servis : UsersService, private router : Router, private sanitizer:DomSanitizer) { }

  mod : string;
  username : String; password : String; passwordAgain : String;
  telefon : String; email : String; naziv : String;
  drzava : String; grad : String; ulica : String; broj : Number;
  maticni : Number; opis : String;
  zabranjeni : Zabranjeni[];
  message : String;

  imageSrc : ArrayBuffer;

  async ngOnInit(): Promise<void> {
    const reader = new FileReader();
    const file = await this.convertRelativeUriToFile("./assets/profilepicture.jpg", "profilepicture.jpg");
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      this.imageSrc = reader.result as ArrayBuffer;
    };
    this.mod = sessionStorage.getItem('mod');
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

  register() {
    this.servis.sviZabranjeni().subscribe((data : Zabranjeni[])=>{
      this.zabranjeni = data;
      let len = this.zabranjeni.length;
      for(let i = 0; i < len; i++) {
        if(this.zabranjeni[i].username == this.username || this.zabranjeni[i].email == this.email) {
          this.message = "Забрањено корисничко име или/и и-мејл!"
          return;
          }
        }
        if(this.password != this.passwordAgain) {
          this.message = "Лозинке се не поклапају!"
          return;
        }
        if(this.password.length > 12) {
          this.message = "Лозинка не сме бити дужа од 12 карактера!"
          return;
        }
        if(this.password.length < 7) {
          this.message = "Лозинка не сме бити краћа од 7 карактера!"
          return;
        }
        let ok = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if(!ok.test(this.password.toString())) {
          this.message = "Лозинка мора да садржи бар једно велико слово, специјалан знак и број!"
          return;
        }
        this.servis.registerA(this.username,this.password, this.email, this.telefon, this.naziv,this.drzava,this.grad,
          this.ulica,this.broj,this.maticni,this.opis,  this._arrayBufferToBase64(this.imageSrc), 0).subscribe(respObj=>{
          if(respObj['Message'] == "Ok") {
            this.message = "Успешно сте се регистровали!"
          } else {
            this.message = "Регистрација неуспешна."
          } 
        });
    }) 
  }
 
  goBack() {
    this.router.navigate(['']);
  }

  goBackAdmin() {
    this.router.navigate(['adminUlogovan']);
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
