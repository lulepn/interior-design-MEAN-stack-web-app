import express from "express"
import { Vrata } from "../models/vrata";
import objekat from "../models/objekat";
import ObjekatModel from "../models/objekat"
import { Prostorija }from "../models/prostorija"

export class ObjekatController {

    dovuciObjekteZaKlijenta = (req : express.Request, res : express.Response)=>{
        let searchParam = req.query.param;

        ObjekatModel.find({'vlasnik':searchParam},(err,objekat)=>{
            if(err) console.log(err);
            else {
                res.json(objekat) 
            }
        })
    }

    dovuciObjekatZaKlijentaAdresa = (req : express.Request, res : express.Response)=>{
        let searchParam = req.query.param;

        ObjekatModel.findOne({'adresa':searchParam},(err,objekat)=>{
            if(err) console.log(err);
            else {
                res.json(objekat) 
            }
        })
    }
 
    dodajObjekat = (req : express.Request, res : express.Response)=>{
        let objekat = new ObjekatModel({
            vlasnik : req.body.vlasnik,
            adresa : req.body.adresa,
            tip : req.body.tip,
            kvadratura : req.body.kvadratura,
            brojProstorija : req.body.brojProstorija,
        });
        
        objekat.prostorije = new Array<Prostorija>;
        objekat.prostorije[0] = req.body.prostorija1;
        if(req.body.prostorija2 != undefined)
            objekat.prostorije[1] = req.body.prostorija2;
        if(req.body.prostorija3 != undefined)
            objekat.prostorije[2] = req.body.prostorija3;

        objekat.svaVrata = new Array<Vrata>;
        let tmp = req.body.svaVrata.length;
        for(let i = 0; i < tmp; i++) {
            objekat.svaVrata.push(req.body.svaVrata.pop());
        }
        objekat.save((err,resp)=> {
            if(err) console.log(err);
            else res.json({"Message":"Ok"})
        });
    }


    obrisi = (req : express.Request, res : express.Response)=>{
        let adresa = req.body.adresa;

        ObjekatModel.deleteOne({'adresa': adresa},(err,resp)=>{
            if(err) console.log(err);
            else res.json({'message':'ok'})
        })
    }

    azurirajJedno = (req : express.Request, res : express.Response)=>{
        let sta = req.body.sta;
        let adresa = req.body.adresa;
        let noviPod = req.body.noviPod;

        if(sta == "tip") 
            ObjekatModel.updateOne({'adresa':adresa},{$set:{"tip":noviPod}},(err,resp)=>{
                if(err) console.log(err);
                else res.json({'message':'updated'})
            })
        else if(sta == "adresa")
            ObjekatModel.updateOne({'adresa':adresa},{$set:{"adresa":noviPod}},(err,resp)=>{
                if(err) console.log(err);
                else res.json({'message':'updated'})
            })
        else if(sta == "kvadratura")
            ObjekatModel.updateOne({'adresa':adresa},{$set:{"kvadratura":noviPod}},(err,resp)=>{
                if(err) console.log(err);
                else res.json({'message':'updated'})
            })
        else if(sta == "brojProstorija")
            ObjekatModel.updateOne({'adresa':adresa},{$set:{"brojProstorija":noviPod}},(err,resp)=>{
                if(err) console.log(err);
                else res.json({'message':'updated'})
            })
    }
}