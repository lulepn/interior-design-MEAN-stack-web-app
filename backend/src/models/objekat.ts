import mongoose from "mongoose";
import { Prostorija } from "./prostorija";
import { Vrata } from "./vrata";

const Schema = mongoose.Schema;

let Objekat = new Schema({
    vlasnik : {
        type : String
    },
    tip: {
        type: String
    },
    adresa: {
        type: String
    },
    brojProstorija: {
        type: String
    },
    kvadratura : {
        type: String
    },
    prostorije : {
        type : Array<Prostorija>
    },
    svaVrata : {
        type : Array<Vrata>
    }
})

export default mongoose.model("ObjekatModel", Objekat, 'objekti')