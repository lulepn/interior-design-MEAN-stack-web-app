import express from "express"

import PosaoModel from "../models/posao"
import OtkazivanjeModel from "../models/otkazivanje"


export class PosaoController {
 
    dodajPosao = (req : express.Request, res : express.Response)=>{
        let posao = new PosaoModel({
            usernameObj : req.body.usernameObj,
            adresaObj : req.body.adresaObj,
            datumOd : req.body.datumOd,
            datumDo : req.body.datumDo,
            ugovorenaCena : req.body.ponuda,
            agencija : req.body.agencija,
            prostorija1status : req.body.prostorija1status,
            prostorija2status : req.body.prostorija2status,
            prostorija3status : req.body.prostorija3status,
            zavrsen : req.body.zavrsen,
            brojRadnika : 0
        });
         
        posao.save((err,resp)=> {
            if(err) console.log(err);
            else res.json({"Message":"Ok"})
        });
    }

    dovuciPosloveZaAgencije = (req : express.Request, res : express.Response)=>{
        let searchParam = req.query.param;

        PosaoModel.find({'agencija':searchParam},(err,objekat)=>{
            if(err) console.log(err);
            else {
                res.json(objekat) 
            }
        })
    }

    dovuciPosloveZaKlijente = (req : express.Request, res : express.Response)=>{
        let searchParam = req.query.param;

        PosaoModel.find({'usernameObj':searchParam},(err,objekat)=>{
            if(err) console.log(err);
            else {
                res.json(objekat) 
            }
        })
    }

    dovuciPosao = (req : express.Request, res : express.Response)=>{
        let klijent = req.body.klijent;
        let adresa = req.body.adresa;
        let agencija = req.body.agencija;
        PosaoModel.findOne({'usernameObj':klijent,'adresaObj':adresa,'agencija':agencija},(err,objekat)=>{
            if(err) console.log(err);
            else {
                res.json(objekat) 
            }
        })
    }

    dodajOtkazivanje = (req : express.Request, res : express.Response)=>{
        let otkaz = new OtkazivanjeModel({
            usernameObj : req.body.usernameObj,
            adresaObj : req.body.adresaObj,
            agencija : req.body.agencija
        });
         
        otkaz.save((err,resp)=> {
            if(err) console.log(err);
            else res.json({"Message":"Ok"})
        });
    }

    odbijOtkazivanje = (req : express.Request, res : express.Response)=>{
        let klijent = req.body.klijent;
        let adresa = req.body.adresa;
        let agencija = req.body.agencija;

        OtkazivanjeModel.deleteOne({'usernameObj':klijent,'adresaObj':adresa,'agencija':agencija},(err,objekat)=>{
            if(err) console.log(err);
            else {
                res.json(objekat) 
            }
        })
    }

    dovuciSvaOtkazivanja = (req : express.Request, res : express.Response)=> {
        OtkazivanjeModel.find({},(err,agencija)=>{
            if(err)
                console.log(err);
            else
                res.json(agencija);
        })
    }

    otkaziPosao = (req : express.Request, res : express.Response)=>{
        let klijent = req.body.klijent;
        let adresa = req.body.adresa;
        let agencija = req.body.agencija;

        PosaoModel.deleteOne({'usernameObj':klijent,'adresaObj':adresa,'agencija':agencija},(err,objekat)=>{
            if(err) console.log(err);
            else {
                res.json(objekat) 
            }
        })
    }

    dovuciSvePoslove = (req : express.Request, res : express.Response)=> {
        PosaoModel.find({},(err,agencija)=>{
            if(err)
                console.log(err);
            else
                res.json(agencija);
        })
    }

    azurirajBrojRadnika = (req : express.Request, res : express.Response)=>{
        let klijent = req.body.klijent;
        let adresa = req.body.adresa;
        let agencija = req.body.agencija;
        let brojRadnika = req.body.brojRadnika;

        PosaoModel.updateOne({'usernameObj':klijent,'adresaObj':adresa,'agencija':agencija},{$set:{'brojRadnika':brojRadnika}},(err,objekat)=>{
            if(err) console.log(err);
            else {
                res.json(objekat) 
            }
        })
    }

    azurirajStatus = (req : express.Request, res : express.Response)=>{
        let klijent = req.body.klijent;
        let adresa = req.body.adresa;
        let agencija = req.body.agencija;
        let status = req.body.status;
        let prostorija = req.body.prostorija;

        if(prostorija == 1) {
            PosaoModel.updateOne({'usernameObj':klijent,'adresaObj':adresa,'agencija':agencija},{$set:{'prostorija1status':status}},(err,objekat)=>{
                if(err) console.log(err);
                else {
                    res.json(objekat) 
                }
            })
        }
        else if(prostorija == 2) {
            PosaoModel.updateOne({'usernameObj':klijent,'adresaObj':adresa,'agencija':agencija},{$set:{'prostorija2status':status}},(err,objekat)=>{
                if(err) console.log(err);
                else {
                    res.json(objekat) 
                }
            })
        }
        else if(prostorija == 3) {
            PosaoModel.updateOne({'usernameObj':klijent,'adresaObj':adresa,'agencija':agencija},{$set:{'prostorija3status':status}},(err,objekat)=>{
                if(err) console.log(err);
                else {
                    res.json(objekat) 
                }
            })
        }
        else if(prostorija == 4) {
            PosaoModel.updateOne({'usernameObj':klijent,'adresaObj':adresa,'agencija':agencija},{$set:{'zavrsen':status}},(err,objekat)=>{
                if(err) console.log(err);
                else {
                    res.json(objekat) 
                }
            })
        }
    }



    obrisi = (req : express.Request, res : express.Response)=>{
        let adresa = req.body.adresa;
        let username = req.body.username;

        PosaoModel.deleteOne({'adresa': adresa,'usernameObj':username},(err,resp)=>{
            if(err) console.log(err);
            else res.json({'message':'ok'})
        })
    }

}