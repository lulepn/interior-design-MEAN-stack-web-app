import express from "express"
import KlijentModel from "../models/klijent"
import ZabranjeniModel from "../models/zabranjeni"

export class KlijentController {

    update = (req : express.Request, res : express.Response)=>{
        let passOld = req.body.passOld;
        let passNew = req.body.passNew;
        let username = req.body.username;

        KlijentModel.findOne({'password':passOld, 'username' : username},(err,klijent)=>{
            if(klijent) {
                KlijentModel.updateOne({'password':passOld, 'username' : username},{$set:{'password':passNew}},(err,resp)=>{
                    if(err) console.log(err);
                    else {
                        res.json({'message':'Лозинка промењена!'})
                    }
                }) 
            }
            else {
                res.json({'message':'Погрешна лозинка!'})
            }
        })
        
    }

    potvrdi = (req : express.Request, res : express.Response)=>{
        let username = req.body.username;

        KlijentModel.findOne({'username' : username},(err,klijent)=>{
            if(klijent) {
                KlijentModel.updateOne({'username' : username},{$set:{'registrovan':1}},(err,resp)=>{
                    if(err) console.log(err);
                    else {
                        res.json({'message':'Потврђена регистрација!'})
                    }
                }) 
            }
            else {
                res.json({'message':'Грешка'})
            }
        })
    }

    odbij = (req : express.Request, res : express.Response)=>{
        let username = req.body.username;
        let email = req.body.email;
        KlijentModel.deleteOne({'username':username},(err,resp)=>{
            if(err) console.log(err);
            else {
                let zabranjeni = new ZabranjeniModel({
                    username : req.body.username,
                    email : req.body.email
                });
                zabranjeni.save((err,resp)=> {
                    if(err) console.log(err);
                    else res.json({"Message":"Ok"})
                });
            }
        })
    }

    login = (req : express.Request, res : express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        KlijentModel.findOne({ 'username' : username, 'password' : password }, (err,user)=> {
            if(err) {
                console.log(err);
            }
            else {
                res.json(user);
            }
        })
    }
    
    register = (req : express.Request, res : express.Response)=>{
        let klijent = new KlijentModel({
            ime : req.body.ime,
            prezime : req.body.prezime,
            username : req.body.username,
            password : req.body.password,
            telefon : req.body.telefon,
            email : req.body.email,
            imageSrc : req.body.imageSrc,
            registrovan : req.body.registrovan
        });

        klijent.save((err,resp)=> {
            if(err) console.log(err);
            else res.json({"Message":"Ok"})
        });
    }

    findClient = (req : express.Request, res : express.Response)=>{
        let searchParam = req.query.param;

        KlijentModel.findOne({'username':searchParam},(err,klijent)=>{
            if(err) console.log(err);
            else {
                res.json(klijent) 
            }
        })
    }

    obrisiKlijenta = (req : express.Request, res : express.Response)=>{
        let searchParam = req.body.username;

        KlijentModel.deleteOne({'username':searchParam},(err,klijent)=>{
            if(err) console.log(err);
            else {
                res.json(klijent) 
            }
        })
    }

    getAllK = (req : express.Request, res : express.Response)=> {
        KlijentModel.find({},(err,agencija)=>{
            if(err)
                console.log(err);
            else
                res.json(agencija);
        })
    }

    sviZabranjeni = (req : express.Request, res : express.Response)=> {
        ZabranjeniModel.find({},(err,agencija)=>{
            if(err)
                console.log(err);
            else
                res.json(agencija);
        })
    }

    azurirajKlijenta = (req : express.Request, res : express.Response)=>{
        let username = req.body.username;
        let param = req.body.param;
        let sta = req.body.sta;

        KlijentModel.findOne({'username' : username},(err,klijent)=>{
            if(klijent) {
                if(sta == 'username') {
                    KlijentModel.updateOne({'username' : username},{$set:{'username':param}},(err,resp)=>{
                        if(err) console.log(err);
                        else {
                            res.json({'message':'Лозинка промењена!'})
                        }
                    }) 
                }
                else if(sta == 'password') {
                    KlijentModel.updateOne({'username' : username},{$set:{'password':param}},(err,resp)=>{
                        if(err) console.log(err);
                        else {
                            res.json({'message':'Лозинка промењена!'})
                        }
                    }) 
                }
                else if(sta == 'ime') {
                    KlijentModel.updateOne({'username' : username},{$set:{'ime':param}},(err,resp)=>{
                        if(err) console.log(err);
                        else {
                            res.json({'message':'Лозинка промењена!'})
                        }
                    }) 
                }
                else if(sta == 'prezime') {
                    KlijentModel.updateOne({'username' : username},{$set:{'prezime':param}},(err,resp)=>{
                        if(err) console.log(err);
                        else {
                            res.json({'message':'Лозинка промењена!'})
                        }
                    }) 
                }
                else if(sta == 'telefon') {
                    KlijentModel.updateOne({'username' : username},{$set:{'telefon':param}},(err,resp)=>{
                        if(err) console.log(err);
                        else {
                            res.json({'message':'Лозинка промењена!'})
                        }
                    }) 
                }
                else if(sta == 'email') {
                    KlijentModel.updateOne({'username' : username},{$set:{'email':param}},(err,resp)=>{
                        if(err) console.log(err);
                        else {
                            res.json({'message':'Лозинка промењена!'})
                        }
                    }) 
                }
                else if(sta == 'imageSrc') {
                    KlijentModel.updateOne({'username' : username},{$set:{'imageSrc':param}},(err,resp)=>{
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
}