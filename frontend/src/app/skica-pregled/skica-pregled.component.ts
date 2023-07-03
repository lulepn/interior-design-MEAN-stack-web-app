import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Objekat } from '../models/objekat';
import { ObjektiService } from '../services/objekti.service';
import { Prostorija } from '../models/prostorija';
import { Vrata } from '../models/vrata';

@Component({
  selector: 'app-skica-pregled',
  templateUrl: './skica-pregled.component.html',
  styleUrls: ['./skica-pregled.component.css']
})
export class SkicaPregledComponent implements OnInit {

  @ViewChild('canvas1', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;  

  private ctx: CanvasRenderingContext2D;

  constructor(private servis : ObjektiService, private ruter : Router) { }
  messageA : string; messageB : string; messageC : string; messageD : string;
  adresa : string; objekat : Objekat = new Objekat(); mode : number; podaci : number;
  pvFlag : number; trenutnaProst : number; trenutnaVrata : number;
  mouseX : number; mouseY : number;
  x : number; y : number; d : number; s : number;
  novaPozX : number; novaPozY : number; novaD: number; novaS : number; novOri : number;
  novaAdresa : string; noviTip : string; novaKvadratura : string; noviBrojProstorija : string;

  ngOnInit(): void {
    this.adresa = sessionStorage.getItem('adresa'); this.mode = 0; this.pvFlag = 1; this.trenutnaProst = 3; this.podaci = 0;
    this.servis.dovuciObjekatAdresa(this.adresa).subscribe((data: Objekat)=>{
      this.objekat = data ;
      this.iscrtajCanvas();

      this.canvas.nativeElement.addEventListener("click", (evt)=>{
        let mousePos = this.getMousePos(this.canvas.nativeElement, evt);
        this.mouseX = mousePos.x; this.mouseY = mousePos.y;
        if(this.pvFlag == 1 && this.mode == 1) {
          this.obrisiCanvas();
          this.iscrtajCanvas();
          for(let i = 0; i < this.objekat.brojProstorija; i++) {
            let tmp = new Prostorija();
            tmp = this.objekat.prostorije[i];
            this.x = tmp.startX; this.y = tmp.startY; this.d = +tmp.duzina + +this.x; this.s = +tmp.sirina + +this.y;
            
            if((this.mouseX > this.x) && (this.mouseY > this.y) && (this.mouseX < this.d) && (this.mouseY < this.s)) {
                if(this.trenutnaProst == i) {
                  this.obrisiCanvas();
                  this.iscrtajCanvas();
                  this.trenutnaProst = 3;
                  break;
                } else {
                  this.trenutnaProst = i;
                  console.log(this.trenutnaProst);
                  this.ctx.fillStyle = "lightgreen";
                  console.log(this.x + "," + this.y + "," + this.d + "," + this.s)
                  this.ctx.fillRect(this.x + 10,this.y + 10,this.d - this.x - 20,this.s - this.y - 20);
                  break;
                }                
              } 
          }
        }
        if(this.pvFlag == 2 && this.mode == 1) {
          this.obrisiCanvas();
          this.iscrtajCanvas();     
          for(let i = 0; i < this.objekat.svaVrata.length; i++) {
            let tmp = new Vrata();
            tmp = this.objekat.svaVrata[i];
           
            [this.x, this.y] = this.kordinateZaOdabirVrata(tmp.orijentacija,tmp.sirina,tmp.startX,tmp.startY);
            this.d = +tmp.sirina + +this.x; this.s = +tmp.sirina + +this.y;
            
            
            if((this.mouseX > this.x) && (this.mouseY > this.y) && (this.mouseX < this.d) && (this.mouseY < this.s)) {
                if(this.trenutnaVrata == i) {
                  this.obrisiCanvas();
                  this.iscrtajCanvas();
                  this.trenutnaVrata = this.objekat.svaVrata.length + 1;
                  break;
                } else {
                  this.trenutnaVrata = i;
                  console.log(this.trenutnaVrata);
                  this.ctx.fillStyle = "lightgreen";
                  this.ctx.fillRect(this.x ,this.y,tmp.sirina,tmp.sirina);
                  this.novaPozX = tmp.startX; this.novaPozY = tmp.startY; this.novaS = tmp.sirina; this.novOri = tmp.orijentacija;
                  break;
                }                
              } 
          }
        }
      }, false);
    })
    
  }

  urediProstoriju() {
    if(this.trenutnaProst != 3) {
      this.objekat.prostorije[this.trenutnaProst].startX = +this.novaPozX;
      this.objekat.prostorije[this.trenutnaProst].startY = +this.novaPozY;
      this.objekat.prostorije[this.trenutnaProst].duzina = +this.novaD;
      this.objekat.prostorije[this.trenutnaProst].sirina = +this.novaS;
      this.obrisiCanvas();
      this.iscrtajCanvas();
      this.trenutnaProst = 3;
    }
  }

  urediVrata() {
    console.log(+this.novaPozX,+this.novaPozY,+this.novaS,+this.novOri)
    this.objekat.svaVrata[this.trenutnaVrata].startX = +this.novaPozX;
    this.objekat.svaVrata[this.trenutnaVrata].startY = +this.novaPozY;
    this.objekat.svaVrata[this.trenutnaVrata].sirina = +this.novaS;
    this.objekat.svaVrata[this.trenutnaVrata].orijentacija = +this.novOri;
    this.obrisiCanvas();
    this.iscrtajCanvas();
    this.trenutnaVrata = this.objekat.svaVrata.length + 1;
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

  obrisiCanvas() {
    this.ctx.clearRect(0,0,this.canvas.nativeElement.width,this.canvas.nativeElement.height);
  }

  kordinateZaOdabirVrata(orijentacija, sirinaVrata, x , y) {
    if(orijentacija == 1) {
      x = x - sirinaVrata/2;
      y = y - sirinaVrata;
    }
    else if(orijentacija == 2) {
      x = x - sirinaVrata/2;
    }
    else if (orijentacija == 3) {
      y = y - sirinaVrata/2;
    }
    else if (orijentacija == 4){
      x = x - sirinaVrata;
      y = y - sirinaVrata/2;
    }
    return [x,y];
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

  getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
    }

  setMode() {
    this.mode = 1;
  }

  setPodaci() {
    this.podaci = 1;
  }
  unsetPodaci() {
    this.podaci = 0;
  }
  goBack() {
    this.ruter.navigate(['objekti']);
  }

  obrisi() {
    this.servis.delete(this.objekat.adresa).subscribe(resp=>{
      alert(resp['message']);
      this.ruter.navigate(['objekti']);
    })
  }

  azuriraj(sta) {
    if(sta == 1) {
      this.objekat.tip = this.noviTip;
      this.servis.update("tip",this.objekat.adresa,this.noviTip).subscribe(resp=>{
        this.messageA = "Тип промењен."
      })
    } else if(sta == 2) {
      let adr = this.objekat.adresa;
      this.objekat.adresa = this.novaAdresa;
      this.servis.update("adresa",adr,this.novaAdresa).subscribe(resp=>{
        this.messageB = "Адреса промењена."
      })
    } else if(sta == 3) {
      this.objekat.kvadratura = parseInt(this.novaKvadratura);
      this.servis.update("kvadratura",this.objekat.adresa,this.novaKvadratura).subscribe(resp=>{
        this.messageC = "Квадратура промењена."
      })
    } else if(sta == 4) {
      this.objekat.brojProstorija = parseInt(this.noviBrojProstorija);
      this.servis.update("brojProstorija",this.objekat.adresa,this.noviBrojProstorija).subscribe(resp=>{
        this.messageD = "Број просторија промењен."
      })
    }
  }

  azurirajSve() {
    this.servis.delete(this.objekat.adresa).subscribe(resp=>{
      this.objekat.klijent = sessionStorage.getItem('username');
      this.servis.dodajObjekatCanvas(this.objekat).subscribe(respObj=>{
        alert("Објекат ажуриран!");
        this.ruter.navigate(['objekti']);
      })
    })
  }
}
