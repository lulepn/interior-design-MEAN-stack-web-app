import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Klijent } from '../models/klijent';
import { Objekat } from '../models/objekat';
import { ObjektiService } from '../services/objekti.service';
import { UsersService } from '../services/users.service';
import { Prostorija } from '../models/prostorija';
import { Vrata } from '../models/vrata';
import { Router } from '@angular/router';
import { ZahtevService } from '../services/zahtev.service';
import { Zahtev } from '../models/zahtev';

@Component({
  selector: 'app-pregled-zahteva',
  templateUrl: './pregled-zahteva.component.html',
  styleUrls: ['./pregled-zahteva.component.css']
})
export class PregledZahtevaComponent implements OnInit {
  @ViewChild('canvas1', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;  

  private ctx: CanvasRenderingContext2D;

  klijent : Klijent; objekat : Objekat; zahtev : Zahtev; datumOd : string; datumDo : string;
  agencija : string; ponuda : number; message : string;

  constructor(private servisUser : UsersService, private servisObj : ObjektiService, private ruter : Router,
    private servisZahtev : ZahtevService) { }

  ngOnInit(): void {
    this.servisUser.searchKlijent(sessionStorage.getItem('klijent')).subscribe((data: Klijent)=>{
      this.klijent =  data;
      this.servisObj.dovuciObjekatAdresa(sessionStorage.getItem('adresa')).subscribe((data2: Objekat)=>{
        this.objekat = data2;
        this.agencija = sessionStorage.getItem('username');
        this.iscrtajCanvas();
        this.servisZahtev.dovuciZahtev(this.klijent.username,this.objekat.adresa,this.agencija).subscribe((data3: Zahtev)=>{
          this.zahtev = data3;
        })
      })
    })
  }

  prihvati(zahtev : Zahtev) {
    zahtev.prihvacen = 1;
    this.servisZahtev.prihvacenPonuda(zahtev.usernameObj,zahtev.adresaObj,zahtev.prihvacen,this.ponuda).subscribe(respObj=>{
      this.goBack();
    });
    this.message = "Понуда послата!"
   
  }
  odbij(zahtev : Zahtev) {
    zahtev.prihvacen = 2;
    this.servisZahtev.prihvacenPonuda(zahtev.usernameObj,zahtev.adresaObj,zahtev.prihvacen,zahtev.ponuda).subscribe(respObj=>{
      this.goBack();
    });
    this.message = "Захтев одбијен!"
  }

  goBack() {
    this.ruter.navigate(['agencijaPoslovi']);
  }

  iscrtajCanvas() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.lineWidth = 8;
    for(let i = 0; i < this.objekat.brojProstorija; i++) {
      let tmp = new Prostorija();
      tmp = this.objekat.prostorije[i];
      this.ctx.strokeRect(tmp.startX,tmp.startY,tmp.duzina,tmp.sirina);
    }
    let brVrata = this.objekat.svaVrata.length
    this.ctx.lineWidth = 1;
    for(let i = 0; i < brVrata; i++) {
      let tmp = new Vrata();
      tmp = this.objekat.svaVrata[i];
      this.iscrtajVrata(tmp.orijentacija,tmp.sirina,tmp.startX,tmp.startY);
    }
  }

  iscrtajVrata(orijentacija, sirinaVrata, x , y) {
    let clx = x - (sirinaVrata/2);
    let cly = y - (sirinaVrata/2);    
    this.ctx.clearRect(clx,cly,sirinaVrata,sirinaVrata);
    this.ctx.beginPath();
    if(orijentacija == 1) {
      this.ctx.arc(x-sirinaVrata/2,y,sirinaVrata,1.5*Math.PI,2*Math.PI);
      this.ctx.moveTo(x - sirinaVrata/2, y - sirinaVrata);
      this.ctx.lineTo(x - sirinaVrata/2, y);
    }
    else if(orijentacija == 2) {
      this.ctx.moveTo(x + sirinaVrata/2, y + sirinaVrata);
      this.ctx.lineTo(x + sirinaVrata/2, y);
      this.ctx.arc(x+sirinaVrata/2,y,sirinaVrata,0.5*Math.PI,Math.PI);
      
    }
    else if (orijentacija == 3) {
      this.ctx.moveTo(x + sirinaVrata, y - sirinaVrata/2);
      this.ctx.lineTo(x, y - sirinaVrata/2);
      this.ctx.arc(x,y-sirinaVrata/2,sirinaVrata,0,0.5*Math.PI);
    }
    else if (orijentacija == 4){
      this.ctx.moveTo(x - sirinaVrata, y + sirinaVrata/2);
      this.ctx.lineTo(x, y + sirinaVrata/2);
      this.ctx.arc(x,y+sirinaVrata/2,sirinaVrata,Math.PI,1.5*Math.PI);
    }
    this.ctx.stroke();
    this.ctx.closePath();
  }

}
