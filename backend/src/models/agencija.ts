import { BSONSymbol, BSONType } from "mongodb";
import mongoose from "mongoose";
import { Recenzija } from "./recenzija";

const Schema = mongoose.Schema;

let Agencija = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    telefon: {
        type: String
    },
    email: {
        type: String
    },
    naziv: {
        type : String
    },
    drzava : {
        type : String
    },
    grad : {
        type : String
    },
    ulica : {
        type : String
    },
    broj : {
        type : Number
    },
    maticni : {
        type : Number
    },
    opis : {
        type : String
    },
    imageSrc : {
        type : String
    },
    adresa : {
        type : String
    },
    recenzije : {
        type : Array<Recenzija>
    },
    brRadnika : {
        type : Number
    },
    registrovan : {
        type : Number
    },
    odobreno : {
        type : Number
    }
})

export default mongoose.model("AgencijaModel", Agencija, 'agencije')