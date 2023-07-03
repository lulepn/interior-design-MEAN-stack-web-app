import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Zahtev = new Schema({
    usernameObj : {
        type : String
    },
    adresaObj : {
        type: String
    },
    datumOd : {
        type: Date
    },
    datumDo : {
        type: Date
    },
    ponuda : {
        type: Number
    },
    agencija : {
        type : String
    },
    prihvacen : {
        type : Number
    }
})

export default mongoose.model("ZahtevModel", Zahtev, 'zahtevi')