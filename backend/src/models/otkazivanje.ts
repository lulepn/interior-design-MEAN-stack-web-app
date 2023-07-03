import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Otkazivanje = new Schema({
    usernameObj : {
        type : String
    },
    adresaObj : {
        type: String
    },
    agencija : {
        type : String
    },
})

export default mongoose.model("OtkazivanjeModel", Otkazivanje, 'otkazivanje')