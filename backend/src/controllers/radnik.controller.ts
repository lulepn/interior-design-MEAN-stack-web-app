import express from "express"

import RadnikModel from "../models/radnik"
import RadnaMestaModel from "../models/radnamesta"


export class RadnikController {
 
    dodajRadnika = (req : express.Request, res : express.Response)=>{
        let radnik = new RadnikModel({
            ime : req.body.ime,
            prezime : req.body.prezime,
            email : req.body.email,
            telefon : req.body.telefon,
            specijalizacija : req.body.specijalizacija,
            agencija : req.body.agencija
        });

        radnik.save((err,resp)=> {
            if(err) console.log(err);
            else res.json({"Message":"Ok"})
        });
    }

    dovuciSveRadnike = (req : express.Request, res : express.Response)=> {
        let agencija = req.query.param;
        RadnikModel.find({'agencija':agencija},(err,agencija)=>{
            if(err)
                console.log(err);
            else
                res.json(agencija);
        })
    }

    obrisiRadnika = (req : express.Request, res : express.Response)=>{
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let telefon = req.body.telefon;

        RadnikModel.deleteOne({'ime': ime,'prezime':prezime,'telefon':telefon},(err,resp)=>{
            if(err) console.log(err);
            else res.json({'message':'ok'})
        })
    }

    dovuciRadnika = (req : express.Request, res : express.Response)=>{
        let telefon = req.body.telefon;

        RadnikModel.findOne({'telefon':telefon},(err,klijent)=>{
            if(err) console.log(err);
            else {
                res.json(klijent) 
            }
        })
    }

    urediRadnika = (req : express.Request, res : express.Response)=>{
        let telefon = req.body.telefon;
        let param = req.body.param;
        let sta = req.body.sta;

        RadnikModel.findOne({'telefon':telefon},(err,klijent)=>{
            if(klijent) {
                if(sta == 'specijalizacija') {
                    RadnikModel.updateOne({'telefon':telefon},{$set:{'specijalizacija':param}},(err,resp)=>{
                        if(err) console.log(err);
                        else {
                            res.json({'message':'Лозинка промењена!'})
                        }
                    }) 
                }
                else if(sta == 'ime') {
                    RadnikModel.updateOne({'telefon':telefon},{$set:{'ime':param}},(err,resp)=>{
                        if(err) console.log(err);
                        else {
                            res.json({'message':'Лозинка промењена!'})
                        }
                    }) 
                }
                else if(sta == 'prezime') {
                    RadnikModel.updateOne({'telefon':telefon},{$set:{'prezime':param}},(err,resp)=>{
                        if(err) console.log(err);
                        else {
                            res.json({'message':'Лозинка промењена!'})
                        }
                    }) 
                }
                else if(sta == 'telefon') {
                    RadnikModel.updateOne({'telefon':telefon},{$set:{'telefon':param}},(err,resp)=>{
                        if(err) console.log(err);
                        else {
                            res.json({'message':'Лозинка промењена!'})
                        }
                    }) 
                }
                else if(sta == 'email') {
                    RadnikModel.updateOne({'telefon' : telefon},{$set:{'email':param}},(err,resp)=>{
                        if(err) console.log(err);
                        else {
                            res.json({'message':'Лозинка промењена!'})
                        }
                    }) 
                }
            }
            else {
                res.json({'message':'Greska'})
            }
        }) 
    }

    dodajZahtev = (req : express.Request, res : express.Response)=>{
        let zahtev = new RadnaMestaModel({
            agencija : req.body.agencija,
            broj : req.body.broj
        });

        zahtev.save((err,resp)=> {
            if(err) console.log(err);
            else res.json({"Message":"Ok"})
        });
    }

    dovuciSveZahteve = (req : express.Request, res : express.Response)=> {
        RadnaMestaModel.find({},(err,agencija)=>{
            if(err)
                console.log(err);
            else
                res.json(agencija);
        })
    }

    obrisiZahtev = (req : express.Request, res : express.Response)=>{
        let agencija = req.body.agencija;
        let broj = req.body.broj;

        RadnaMestaModel.deleteOne({'agencija': agencija,'broj':broj},(err,resp)=>{
            if(err) console.log(err);
            else res.json({'message':'ok'})
        })
    }

}