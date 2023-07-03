import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Objekat } from '../models/objekat';
import { Prostorija } from '../models/prostorija';
import { Vrata } from '../models/vrata';
import { ObjektiService } from '../services/objekti.service';

@Component({
  selector: 'app-objekti',
  templateUrl: './objekti.component.html',
  styleUrls: ['./objekti.component.css']
})

export class ObjektiComponent implements OnInit {

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;  

  private ctx: CanvasRenderingContext2D;

  duzina : number; sirina : number; vrata : number; sirinaVrata : number;
  x : number; y : number; mode : number; orijentacija : number; dodavanjeObjekta : boolean;

  objekat : Objekat;
  selectedFile: File

  ok : number; cnt : number;
  message : string; showProstorije : boolean = true;

  objekti : Objekat[] = [];

  constructor(private servis : ObjektiService, private ruter : Router) { }

  ngOnInit(): void {
    this.servis.dovuciObjekat(sessionStorage.getItem("username")).subscribe((data: Objekat[])=>{
      this.objekti =  data;
    })
    this.dodavanjeObjekta = false;
    this.objekat = new Objekat();
    this.orijentacija = 1;
    this.objekat.prostorije = new Array<Prostorija>;
    this.objekat.svaVrata = new Array<Vrata>;
    this.objekat.klijent = sessionStorage.getItem("username");
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.duzina = 100; this.sirina = 100;
    this.mode = 1; this.cnt = 0; this.vrata = 0;

    this.canvas.nativeElement.addEventListener("click", (evt)=>{
      if(this.mode == 1 && this.ok == 1 && (this.cnt < this.objekat.brojProstorija)) {
        let mousePos = this.getMousePos(this.canvas.nativeElement, evt);
        this.x = mousePos.x; this.y = mousePos.y;

        this.ctx.lineWidth = 8;
        this.ctx.strokeRect(this.x,this.y,this.duzina,this.sirina);

        let tmp = new Prostorija();
        tmp.startX = this.x; tmp.startY = this.y; tmp.sirina = this.sirina; tmp.duzina = this.duzina;
        this.objekat.prostorije.push(tmp);

        this.cnt = this.cnt + 1;
      }
      if(this.mode == 2 && this.ok == 1) {
        let mousePos = this.getMousePos(this.canvas.nativeElement, evt);
        this.x = mousePos.x; this.y = mousePos.y;
        let clx = this.x - (this.sirinaVrata/2);
        let cly = this.y - (this.sirinaVrata/2);
        
        this.ctx.lineWidth = 1;
        this.ctx.clearRect(clx,cly,this.sirinaVrata,this.sirinaVrata);
        this.ctx.beginPath();

        let tmp = new Vrata();
        tmp.orijentacija = this.orijentacija; tmp.sirina = this.sirinaVrata; tmp.startX = this.x; tmp.startY = this.y;
        this.objekat.svaVrata.push(tmp);
        this.iscrtajVrata();
        
      }
    }, false);
    
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, "UTF-8");
    fileReader.onload = () => {
      this.objekat = JSON.parse(fileReader.result as string);
      console.log(JSON.parse(fileReader.result as string));
    }
    fileReader.onerror = (error) => {
      console.log(error);
    }
  }

  iscrtajDefault(broj) {
    if(broj == 3) {
      this.iscrtaj3();
    }
    if(broj == 2) {
      this.iscrtaj2();
    }
    if(broj == 1) {
      this.iscrtaj1();
    }
        
  }

  iscrtajVrata() {
    if(this.orijentacija == 1) {
      this.ctx.arc(this.x-this.sirinaVrata/2,this.y,this.sirinaVrata,1.5*Math.PI,2*Math.PI);
      this.ctx.moveTo(this.x - this.sirinaVrata/2, this.y - this.sirinaVrata);
      this.ctx.lineTo(this.x - this.sirinaVrata/2,this.y);
    }
    else if(this.orijentacija == 2) {
      this.ctx.moveTo(this.x + this.sirinaVrata/2, this.y + this.sirinaVrata);
      this.ctx.lineTo(this.x + this.sirinaVrata/2, this.y);
      this.ctx.arc(this.x+this.sirinaVrata/2,this.y,this.sirinaVrata,0.5*Math.PI,Math.PI);
      
    }
    else if (this.orijentacija == 3) {
      this.ctx.moveTo(this.x + this.sirinaVrata, this.y - this.sirinaVrata/2);
      this.ctx.lineTo(this.x, this.y - this.sirinaVrata/2);
      this.ctx.arc(this.x,this.y-this.sirinaVrata/2,this.sirinaVrata,0,0.5*Math.PI);
    }
    else {
      this.ctx.moveTo(this.x - this.sirinaVrata, this.y + this.sirinaVrata/2);
      this.ctx.lineTo(this.x, this.y + this.sirinaVrata/2);
      this.ctx.arc(this.x,this.y+this.sirinaVrata/2,this.sirinaVrata,Math.PI,1.5*Math.PI);
    }
    this.ctx.stroke();
    this.ctx.closePath();
  }

  obrisiCanvas() {
    this.ctx.clearRect(0,0,this.canvas.nativeElement.width,this.canvas.nativeElement.height);
    this.cnt = 0; this.duzina = 100; this.sirina = 100;
    this.mode = 1; this.cnt = 0; 
    this.objekat.prostorije = new Array<Prostorija>;
    this.objekat.svaVrata = new Array<Vrata>;
  }

  dodajObjekat() {
    this.servis.dodajObjekatCanvas(this.objekat).subscribe(respObj=>{
      if(respObj['Message'] == "Ok") {
        this.message = "Објекат успешно додат!"
        this.ctx.clearRect(0,0,this.canvas.nativeElement.width,this.canvas.nativeElement.height);
        this.cnt = 0; this.duzina = 100; this.sirina = 100;
        this.mode = 1; this.cnt = 0; this.ok = 0;
        this.objekat = new Objekat();
        this.objekat.prostorije = new Array<Prostorija>;
        this.objekat.svaVrata = new Array<Vrata>;

        this.servis.dovuciObjekat(sessionStorage.getItem("username")).subscribe((data: Objekat[])=>{
          this.objekti =  data;
        })
      } else {
        this.message = "Додавање објекта неуспешно."
      }
  });
  }

  okSet() {
    this.ok = 1;
    this.iscrtajDefault(this.objekat.brojProstorija);
  }

  pregledSkice(param) {
    sessionStorage.setItem('adresa',param);
    this.ruter.navigate(['skicaPregled']);
  }

  getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
    }

  goBack() {
      this.ruter.navigate(['klijent']);
  }

  logout() {
    sessionStorage.clear();
    this.ruter.navigate(['']);
  }

  setDodavanjeObjekta() {
    this.dodavanjeObjekta = true;
  }

  unsetDodavanjeObjekta() {
    this.dodavanjeObjekta = false;
  }

  iscrtaj3(){
    this.ctx.lineWidth = 8;
      this.ctx.strokeRect(0,0,200,300);
      let tmp = new Prostorija();
      tmp.startX = 0; tmp.startY = 0; tmp.sirina = 300; tmp.duzina = 200;
      this.objekat.prostorije.push(tmp);

      this.ctx.lineWidth = 8;
      this.ctx.strokeRect(200,0,200,300);
      tmp = new Prostorija();
      tmp.startX = 200; tmp.startY = 0; tmp.sirina = 300; tmp.duzina = 200;
      this.objekat.prostorije.push(tmp);

      this.ctx.lineWidth = 8;
      this.ctx.strokeRect(0,300,400,100);
      tmp = new Prostorija();
      tmp.startX = 0; tmp.startY = 300; tmp.sirina = 100; tmp.duzina = 400;
      this.objekat.prostorije.push(tmp);

      let tmp2 = new Vrata();
      tmp2.orijentacija = 1; tmp2.sirina = 50; tmp2.startX = 100; tmp2.startY = 300;
      this.objekat.svaVrata.push(tmp2);
      this.ctx.lineWidth = 1;
      this.ctx.clearRect(75,250,50,60);
      this.ctx.beginPath();
      this.ctx.arc(75,300,50,1.5*Math.PI,2*Math.PI);
      this.ctx.moveTo(75, 250);
      this.ctx.lineTo(75,300);
      this.ctx.stroke();
      this.ctx.closePath();

      tmp2 = new Vrata();
      tmp2.orijentacija = 3; tmp2.sirina = 50; tmp2.startX = 200; tmp2.startY = 150;
      this.objekat.svaVrata.push(tmp2);
      this.ctx.clearRect(175,125,50,50);
      this.ctx.beginPath();
      this.ctx.arc(200,125,50,0,0.5*Math.PI);
      this.ctx.moveTo(200, 125);
      this.ctx.lineTo(250,125);
      this.ctx.stroke();
      this.ctx.closePath();

      tmp2 = new Vrata();
      tmp2.orijentacija = 3; tmp2.sirina = 50; tmp2.startX = 0; tmp2.startY = 350;
      this.objekat.svaVrata.push(tmp2);
      this.ctx.clearRect(0,325,50,50);
      this.ctx.beginPath();
      this.ctx.arc(0,325,50,0,0.5*Math.PI);
      this.ctx.moveTo(0, 325);
      this.ctx.lineTo(50,325);
      this.ctx.stroke();
      this.ctx.closePath();
    
  }

  iscrtaj2() {
    this.ctx.lineWidth = 8;
    this.ctx.strokeRect(0,0,200,400);
    let tmp = new Prostorija();
    tmp.startX = 0; tmp.startY = 0; tmp.sirina = 400; tmp.duzina = 200;
    this.objekat.prostorije.push(tmp);

    this.ctx.lineWidth = 8;
    this.ctx.strokeRect(200,0,200,400);
    tmp = new Prostorija();
    tmp.startX = 200; tmp.startY = 0; tmp.sirina = 400; tmp.duzina = 200;
    this.objekat.prostorije.push(tmp);

    let tmp2 = new Vrata();
    tmp2.orijentacija = 3; tmp2.sirina = 50; tmp2.startX = 200; tmp2.startY = 150;
    this.objekat.svaVrata.push(tmp2);
    this.ctx.lineWidth = 1;
    this.ctx.clearRect(175,125,50,50);
    this.ctx.beginPath();
    this.ctx.arc(200,125,50,0,0.5*Math.PI);
    this.ctx.moveTo(200, 125);
    this.ctx.lineTo(250,125);
    this.ctx.stroke();
    this.ctx.closePath();

    tmp2 = new Vrata();
    tmp2.orijentacija = 3; tmp2.sirina = 50; tmp2.startX = 0; tmp2.startY = 350;
    this.objekat.svaVrata.push(tmp2);
    this.ctx.clearRect(0,325,50,50);
    this.ctx.beginPath();
    this.ctx.arc(0,325,50,0,0.5*Math.PI);
    this.ctx.moveTo(0, 325);
    this.ctx.lineTo(50,325);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  iscrtaj1(){
    this.ctx.lineWidth = 8;
    this.ctx.strokeRect(0,0,400,400);
    let tmp = new Prostorija();
    tmp.startX = 0; tmp.startY = 0; tmp.sirina = 400; tmp.duzina = 400;
    this.objekat.prostorije.push(tmp);

    let tmp2 = new Vrata();
    tmp2.orijentacija = 3; tmp2.sirina = 50; tmp2.startX = 0; tmp2.startY = 350;
    this.objekat.svaVrata.push(tmp2);
    this.ctx.clearRect(0,325,50,50);
    this.ctx.beginPath();
    this.ctx.arc(0,325,50,0,0.5*Math.PI);
    this.ctx.moveTo(0, 325);
    this.ctx.lineTo(50,325);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

