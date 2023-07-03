import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Agencija } from '../models/agencija';
import { Objekat } from '../models/objekat';
import { Posao } from '../models/posao';
import { Prostorija } from '../models/prostorija';
import { Vrata } from '../models/vrata';
import { ObjektiService } from '../services/objekti.service';
import { PosloviService } from '../services/poslovi.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-pregled-posla',
  templateUrl: './pregled-posla.component.html',
  styleUrls: ['./pregled-posla.component.css']
})
export class PregledPoslaComponent implements OnInit {

  @ViewChild('canvas1', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;  

  private ctx: CanvasRenderingContext2D;
  adresa : string; objekat : Objekat; agencija : Agencija; posao : Posao;
  dodajRadnikeBr : number;

  constructor(private servisO : ObjektiService, private servisP : PosloviService, private servisU : UsersService,
    private ruter : Router) { }

  ngOnInit(): void {
    this.adresa = sessionStorage.getItem('adresa');
    this.servisO.dovuciObjekatAdresa(this.adresa).subscribe((data: Objekat)=>{
      this.objekat = data ;
      this.servisU.searchAgencija(sessionStorage.getItem('username')).subscribe((data2 : Agencija)=>{
        this.agencija = data2;
        this.servisP.dovuciPosao(sessionStorage.getItem('klijent'),this.adresa,this.agencija.username).subscribe((data3 : Posao)=>{
          this.posao = data3;
          
          this.iscrtajCanvas();
          this.obojiProstorije();
        })
      })
    });
  }

  zavrsiPosao() {
    let flag = 0;
    if(this.objekat.brojProstorija == 1) {
      if(this.posao.prostorija1status == 1)
        flag = 1;
    }
    else if(this.objekat.brojProstorija == 2) {
      if(this.posao.prostorija1status == 1 && this.posao.prostorija2status == 1)
      flag = 1;
    } 
    else if(this.objekat.brojProstorija == 3) {
      if(this.posao.prostorija1status == 1 && this.posao.prostorija2status == 1 && this.posao.prostorija3status == 1)
        flag = 1;
    }
    if(flag == 1) {
      this.servisP.azurirajStatus(sessionStorage.getItem('klijent'),this.adresa,this.agencija.username,
      4,1).subscribe((data3 : Posao)=>{
        this.servisU.updateBrRadnika(sessionStorage.getItem('username'), this.agencija.brRadnika + this.posao.brojRadnika).subscribe(resp=>{
        this.servisP.azurirajBrojRadnika(sessionStorage.getItem('klijent'),this.adresa,this.agencija.username,0).subscribe((data3 : Posao)=>{
          this.ngOnInit();
        })
      })
      })
    }
  }

  zavrsi(n) {
    if(n == 1) {
      this.posao.prostorija1status = 1;
    }
    else if(n == 2) {
      this.posao.prostorija2status = 1;
    }
    else if(n == 3) {
      this.posao.prostorija3status = 1;
    }
    this.servisP.azurirajStatus(sessionStorage.getItem('klijent'),this.adresa,this.agencija.username,
    n,1).subscribe((data3 : Posao)=>{
      this.ngOnInit();
    })
  }

  zapocni(n) {
    if(n == 1) {
      this.posao.prostorija1status = 2;
    }
    else if(n == 2) {
      this.posao.prostorija2status = 2;
    }
    else if(n == 3) {
      this.posao.prostorija3status = 2;
    }
    this.servisP.azurirajStatus(sessionStorage.getItem('klijent'),this.adresa,this.agencija.username,
    n,2).subscribe((data3 : Posao)=>{
      this.ngOnInit();
      this.iscrtajCanvas();
      this.obojiProstorije();
    })
  }

  azurirajBrojRadnika() {
    let n = this.agencija.brRadnika - this.dodajRadnikeBr
    this.servisU.updateBrRadnika(sessionStorage.getItem('username'), n).subscribe(resp=>{
      this.servisP.azurirajBrojRadnika(sessionStorage.getItem('klijent'),this.adresa,this.agencija.username,this.dodajRadnikeBr).subscribe((data3 : Posao)=>{
        this.iscrtajCanvas();
        this.obojiProstorije();
      })
    })
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
      this.iscrtajVrata(tmp.orijentacija,tmp.sirina,tmp.startX,tmp.startY,0);
    }
  }

  obojiProstorije() {
    if(this.posao.brojRadnika >= 3 || this.posao.brojRadnika == 0 && this.agencija.brRadnika >= this.objekat.brojProstorija) {
      for(let i = 0; i < this.objekat.brojProstorija; i++) {
        let tmp = new Prostorija();
        tmp = this.objekat.prostorije[i];
        if(i == 0) {
          if(this.posao.prostorija1status == 1) {
            this.ctx.fillStyle = "lightgreen";
            this.ctx.fillRect(tmp.startX+5,tmp.startY+5,tmp.duzina-10,tmp.sirina-10);
          }
          else if(this.posao.prostorija1status == 2) {
            this.ctx.fillStyle = "crimson";
            this.ctx.fillRect(tmp.startX+5,tmp.startY+5,tmp.duzina-10,tmp.sirina-10);
          }
        }
        else if (i == 1) {
          if(this.posao.prostorija2status == 1) {
            this.ctx.fillStyle = "lightgreen";
            this.ctx.fillRect(tmp.startX+5,tmp.startY+5,tmp.duzina-10,tmp.sirina-10);
          }
          else if(this.posao.prostorija2status == 2) {
            
            this.ctx.fillStyle = "crimson";
            this.ctx.fillRect(tmp.startX+5,tmp.startY+5,tmp.duzina-10,tmp.sirina-10);
          }
        }
        else if (i == 2) {
          if(this.posao.prostorija3status == 1) {
            this.ctx.fillStyle = "lightgreen";
            this.ctx.fillRect(tmp.startX+5,tmp.startY+5,tmp.duzina-10,tmp.sirina-10);
          }
          else if(this.posao.prostorija3status == 2) {
            this.ctx.fillStyle = "crimson";
            this.ctx.fillRect(tmp.startX+5,tmp.startY+5,tmp.duzina-10,tmp.sirina-10);
          }
        }
      }
    } 
    else {
      for(let i = 0; i < this.objekat.brojProstorija; i++) {
        let tmp = new Prostorija();
        tmp = this.objekat.prostorije[i];
        this.ctx.fillStyle = "yellow";
        this.ctx.fillRect(tmp.startX+5,tmp.startY+5,tmp.duzina-10,tmp.sirina-10);
      }
    }
    let brVrata = this.objekat.svaVrata.length
    this.ctx.lineWidth = 1;
    for(let i = 0; i < brVrata; i++) {
      let tmp = new Vrata();
      tmp = this.objekat.svaVrata[i];
      this.iscrtajVrata(tmp.orijentacija,tmp.sirina,tmp.startX,tmp.startY,1);
    }
  }

  iscrtajVrata(orijentacija, sirinaVrata, x , y, mode) {
    let clx = x - (sirinaVrata/2);
    let cly = y - (sirinaVrata/2);    
    if(mode != 1) this.ctx.clearRect(clx,cly,sirinaVrata,sirinaVrata);
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

  goBack() {
    this.ruter.navigate(['agencijaPoslovi']);
  }

}
