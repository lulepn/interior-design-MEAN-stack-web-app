import { Prostorija } from "./prostorija";
import { Vrata } from "./vrata";

export class Objekat {
    klijent : string;
    tip : string;
    adresa : string;
    brojProstorija : number;
    kvadratura : number;
    prostorije : Array<Prostorija>;
    svaVrata : Array<Vrata>;
}