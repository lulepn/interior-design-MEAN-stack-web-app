import express from "express"
import AgencijaModel from "../models/agencija"
import ZabranjeniModel from "../models/zabranjeni"

export class AgencijaController {

    getAllAg = (req : express.Request, res : express.Response)=> {
        AgencijaModel.find({},(err,agencija)=>{
            if(err)
                console.log(err);
            else
                res.json(agencija);
        })
    }

    findAgencija = (req : express.Request, res : express.Response)=>{
        let searchParam = req.query.param;

        AgencijaModel.findOne({'username':searchParam},(err,agencija)=>{
            if(err) console.log(err);
            else {
                res.json(agencija) 
            }
        })
    }

    getSomeAg = (req : express.Request, res : express.Response)=>{
        let searchParam = req.query.param;

        AgencijaModel.find({'naziv':{$regex: searchParam}},(err,klijent)=>{
            if(err) console.log(err);
            else {
                res.json(klijent) 
            }
        })
    }

    getSomeAgAdr = (req : express.Request, res : express.Response)=>{
        let searchParam = req.query.param;
        
        AgencijaModel.find({adresa:{$regex: searchParam}},(err,agencija)=>{
            if(err) console.log(err);
            else {
                res.json(agencija) 
            }
        })
    }

    getSomeAgNaAdr = (req : express.Request, res : express.Response)=>{
        let searchParam = req.query.param as string;
        let naziv = searchParam.substring(0,searchParam.indexOf(',')) as string;
        let adresa = searchParam.substring(searchParam.indexOf(',')+1) as string;

        AgencijaModel.find({naziv:{$regex: naziv},adresa:{$regex: adresa}}, (err,user)=> {
            if(err) {
                console.log(err);
            }
            else {
                res.json(user);
            }
        })
    }

    obrisiAgenciju = (req : express.Request, res : express.Response)=>{
        let searchParam = req.body.username;

        AgencijaModel.deleteOne({'username':searchParam},(err,klijent)=>{
            if(err) console.log(err);
            else {
                res.json(klijent) 
            }
        })
    }

    login = (req : express.Request, res : express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        AgencijaModel.findOne({ 'username' : username, 'password' : password }, (err,user)=> {
            if(err) {
                console.log(err);
            }
            else {
                res.json(user);
            }
        })
    }
    
    register = (req : express.Request, res : express.Response)=>{
        let klijent = new AgencijaModel({ 
            username : req.body.username,
            password : req.body.password,
            telefon : req.body.telefon,
            email : req.body.email,
            naziv : req.body.naziv,
            drzava : req.body.drzava,
            grad : req.body.grad,
            ulica : req.body.ulica,
            broj : req.body.broj,
            maticni : req.body.maticni,
            opis : req.body.opis,
            imageSrc : req.body.imageSrc,
            adresa : req.body.drzava + "," + req.body.grad + "," + req.body.ulica + "," + req.body.broj,
            registrovan : req.body.registrovan,
            brRadnika : 0,
            odobreno : 0
        });

        klijent.save((err,resp)=> {
            if(err) console.log(err);
            else res.json({"Message":"Ok"})
        });
    }

    update = (req : express.Request, res : express.Response)=>{
        let passOld = req.body.passOld;
        let passNew = req.body.passNew;
        let username = req.body.username;

        AgencijaModel.findOne({'password':passOld, 'username' : username},(err,agencija)=>{
            if(agencija) {
                AgencijaModel.updateOne({'password':passOld, 'username' : username},{$set:{'password':passNew}},(err,resp)=>{
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

        AgencijaModel.findOne({'username' : username},(err,klijent)=>{
            if(klijent) {
                AgencijaModel.updateOne({'username' : username},{$set:{'registrovan':1}},(err,resp)=>{
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
        AgencijaModel.deleteOne({'username':username},(err,resp)=>{
            if(err) console.log(err);
            else {
                let zabranjeni = new ZabranjeniModel({
                    username : req.body.username
                });
                zabranjeni.save((err,resp)=> {
                    if(err) console.log(err);
                    else res.json({"Message":"Ok"})
                });
            }
        })
    }

    updateBrRadnika = (req : express.Request, res : express.Response)=>{
        let username = req.body.username;
        let brojRadnika = req.body.brojRadnika;

        AgencijaModel.findOne({'username' : username},(err,agencija)=>{
            if(agencija) {
                AgencijaModel.updateOne({'username' : username},{$set:{'brRadnika':brojRadnika}},(err,resp)=>{
                    if(err) console.log(err);
                    else {
                        res.json({'message':'Број радника промењен!'})
                    }
                })
            }
            else {
                res.json({'message':'Погрешна лозинка!'})
            }
        })  
    }

    updateOdobrenBrRadnika = (req : express.Request, res : express.Response)=>{
        let username = req.body.username;
        let odobreno = req.body.odobreno;

        AgencijaModel.findOne({'username' : username},(err,agencija)=>{
            if(agencija) {
                AgencijaModel.updateOne({'username' : username},{$set:{'odobreno':odobreno}},(err,resp)=>{
                    if(err) console.log(err);
                    else {
                        res.json({'message':'Број радника промењен!'})
                    }
                })
            }
            else {
                res.json({'message':'Погрешна лозинка!'})
            }
        })  
    }

    dodajRecenziju = (req : express.Request, res : express.Response)=>{
        let agencija = req.body.agencija;
        let recenzija = req.body.recenzija;

        AgencijaModel.findOne({'username' : agencija}, (err, agen)=> {
            if(err) console.log(err);
            else {
                if(agen) {
                    AgencijaModel.updateOne({'username': agencija},{$push:{'recenzije':recenzija}}, (err,resp)=> {
                        if(err) console.log(err);
                    })
                }
                else {
                    res.json({'message':'error'})
                }
            }
        })
    }

    obrisiRecenziju = (req : express.Request, res : express.Response)=>{
        let agencija = req.body.agencija;
        let recenzija = req.body.recenzija;

        AgencijaModel.findOne({'username' : agencija}, (err, agen)=> {
            if(err) console.log(err);
            else {
                if(agen) {
                    AgencijaModel.updateOne({'username': agencija},{$pull:{'recenzije':recenzija}}, (err,resp)=> {
                        if(err) console.log(err);
                    })
                }
                else {
                    res.json({'message':'error'})
                }
            }
        })
    }

    izmeniRecenziju = (req : express.Request, res : express.Response)=>{
        let agencija = req.body.agencija;
        let staraRecenzija = req.body.staraRecenzija;
        let novaRecenzija = req.body.novaRecenzija;

        AgencijaModel.findOne({'username' : agencija}, (err, agen)=> {
            if(err) console.log(err);
            else {
                if(agen) {
                    AgencijaModel.updateOne({'username': agencija},{$pull:{'recenzije':staraRecenzija}}, (err,resp)=> {
                        if(err) console.log(err);
                    })
                    AgencijaModel.updateOne({'username': agencija},{$push:{'recenzije':novaRecenzija}}, (err,resp)=> {
                        if(err) console.log(err);
                    })
                }
                else {
                    res.json({'message':'error'})
                }
            }
        })
    }

    azurirajAgenciju = (req : express.Request, res : express.Response)=>{
        let username = req.body.username;
        let param = req.body.param;
        let sta = req.body.sta;

        AgencijaModel.findOne({'username' : username},(err,klijent)=>{
            if(klijent) {
                if(sta == 'username') {
                    AgencijaModel.updateOne({'username' : username},{$set:{'username':param}},(err,resp)=>{
                        if(err) console.log(err);
                        else {
                            res.json({'message':'Лозинка промењена!'})
                        }
                    }) 
                }
                else if(sta == 'password') {
                    AgencijaModel.updateOne({'username' : username},{$set:{'password':param}},(err,resp)=>{
                        if(err) console.log(err);
                        else {
                            res.json({'message':'Лозинка промењена!'})
                        }
                    }) 
                }
                else if(sta == 'naziv') {
                    AgencijaModel.updateOne({'username' : username},{$set:{'naziv':param}},(err,resp)=>{
                        if(err) console.log(err);
                        else {
                            res.json({'message':'Лозинка промењена!'})
                        }
                    }) 
                }
                else if(sta == 'adresa') {
                    AgencijaModel.updateOne({'username' : username},{$set:{'adresa':param}},(err,resp)=>{
                        if(err) console.log(err);
                        else {
                            res.json({'message':'Лозинка промењена!'})
                        }
                    }) 
                }
                else if(sta == 'telefon') {
                    AgencijaModel.updateOne({'username' : username},{$set:{'telefon':param}},(err,resp)=>{
                        if(err) console.log(err);
                        else {
                            res.json({'message':'Лозинка промењена!'})
                        }
                    }) 
                }
                else if(sta == 'email') {
                    AgencijaModel.updateOne({'username' : username},{$set:{'email':param}},(err,resp)=>{
                        if(err) console.log(err);
                        else {
                            res.json({'message':'Лозинка промењена!'})
                        }
                    }) 
                }
                else if(sta == 'opis') {
                    AgencijaModel.updateOne({'username' : username},{$set:{'opis':param}},(err,resp)=>{
                        if(err) console.log(err);
                        else {
                            res.json({'message':'Лозинка промењена!'})
                        }
                    }) 
                }
                else if(sta == 'maticni') {
                    AgencijaModel.updateOne({'username' : username},{$set:{'maticni':param}},(err,resp)=>{
                        if(err) console.log(err);
                        else {
                            res.json({'message':'Лозинка промењена!'})
                        }
                    }) 
                }
                else if(sta == 'imageSrc') {
                    AgencijaModel.updateOne({'username' : username},{$set:{'imageSrc':param}},(err,resp)=>{
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