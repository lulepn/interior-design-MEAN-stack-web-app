import express from "express"

import ZahtevModel from "../models/zahtev"


export class ZahtevController {
 
    dodajZahtev = (req : express.Request, res : express.Response)=>{
        let zahtev = new ZahtevModel({
            usernameObj : req.body.usernameObj,
            adresaObj : req.body.adresaObj,
            datumOd : req.body.datumOd,
            datumDo : req.body.datumDo,
            ponuda : req.body.ponuda,
            agencija : req.body.agencija,
            prihvacen : req.body.prihvacen
        });
        
        zahtev.save((err,resp)=> {
            if(err) console.log(err);
            else res.json({"Message":"Ok"})
        });
    }

    dovuciZahteveZaAgencije = (req : express.Request, res : express.Response)=>{
        let searchParam = req.query.param;

        ZahtevModel.find({'agencija':searchParam},(err,objekat)=>{
            if(err) console.log(err);
            else {
                res.json(objekat) 
            }
        })
    }

    dovuciZahteveZaKlijente = (req : express.Request, res : express.Response)=>{
        let searchParam = req.query.param;

        ZahtevModel.find({'usernameObj':searchParam},(err,objekat)=>{
            if(err) console.log(err);
            else {
                res.json(objekat) 
            }
        })
    }

    dovuciZahtev = (req : express.Request, res : express.Response)=>{
        let klijent = req.body.klijent;
        let adresa = req.body.adresa;
        let agencija = req.body.agencija;

        ZahtevModel.findOne({'usernameObj':klijent,'adresaObj':adresa,'agencija':agencija},(err,objekat)=>{
            if(err) console.log(err);
            else {
                res.json(objekat) 
            }
        })
    }

    obrisi = (req : express.Request, res : express.Response)=>{
        let adresa = req.body.adresa;
        let username = req.body.username;
        ZahtevModel.deleteOne({'adresaObj': adresa,'usernameObj':username},(err,resp)=>{
            if(err) console.log(err);
            else res.json({'message':'ok'})
        })
    }
    

    azurirajZahtev = (req : express.Request, res : express.Response)=>{
        let usernameObj = req.body.usernameObj;
        let adresaObj = req.body.adresaObj;
        let prihvacen = req.body.prihvacen;
        let ponuda = req.body.ponuda;
        console.log(ponuda);

        if(prihvacen == 1) {
            ZahtevModel.updateOne({'adresaObj':adresaObj,'usernameObj':usernameObj},
            {$set:{"prihvacen":prihvacen}},(err,resp)=>{
                if(err) console.log(err);
            })
            ZahtevModel.updateOne({'adresaObj':adresaObj,'usernameObj':usernameObj},
            {$set:{"ponuda":ponuda}},(err,resp)=>{
                if(err) console.log(err);
            })
        }
        else if(prihvacen == 2) {
            ZahtevModel.updateOne({'adresaObj':adresaObj,'usernameObj':usernameObj},
            {$set:{"prihvacen":prihvacen}},(err,resp)=>{
                if(err) console.log(err);
            })
            ZahtevModel.updateOne({'adresaObj':adresaObj,'usernameObj':usernameObj},
            {$set:{"agencija":"/"}},(err,resp)=>{
                if(err) console.log(err);
            })
        }
            
    }

}