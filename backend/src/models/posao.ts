import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Posao = new Schema({
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
    ugovorenaCena : {
        type: Number
    },
    agencija : {
        type : String
    },
    zavrsen : {
        type : Number
    },
    prostorija1status : {
        type : Number
    },
    prostorija2status : {
        type : Number
    },
    prostorija3status : {
        type : Number
    },
    brojRadnika : {
        type : Number
    }
})

export default mongoose.model("PosaoModel", Posao, 'poslovi')

