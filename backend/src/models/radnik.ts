import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Radnik = new Schema({
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    agencija : {
        type: String
    },
    telefon : {
        type : Number
    },
    specijalizacija : {
        type : String
    },
    email : {
        type : String
    }
})

export default mongoose.model("RadnikModel", Radnik, 'radnici')