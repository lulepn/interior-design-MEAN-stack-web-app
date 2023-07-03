import { BSONSymbol } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Klijent = new Schema({
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
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
    imageSrc : {
        type : String
    },
    registrovan : {
        type : Number
    }
})

export default mongoose.model("KlijentModel", Klijent, 'klijenti')