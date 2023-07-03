import { Recenzija } from "./recenzija";

export class Agencija {
    username: String;
    password: String;
    telefon: String;
    email: String;
    naziv: String;
    drzava: String;
    grad: String;
    ulica: String;
    broj: Number;
    maticni: Number;
    opis: String;
    imageSrc : String;
    adresa : String;
    recenzije : Array<Recenzija>;
    brRadnika : number;
    odobreno : number;
    registrovan : number;
}