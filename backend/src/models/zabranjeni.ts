import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Zabranjeni = new Schema({
    username: {
        type: String
    },
    email : {
        type : String
    }
})

export default mongoose.model("ZabranjeniModel", Zabranjeni, 'zabranjeni')