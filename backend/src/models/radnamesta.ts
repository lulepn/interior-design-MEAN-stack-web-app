import mongoose from "mongoose";

const Schema = mongoose.Schema;

let RadnaMesta = new Schema({
    agencija: {
        type: String
    },
    broj: {
        type: Number
    }
})

export default mongoose.model("RadnaMestaModel", RadnaMesta, 'radnamesta')