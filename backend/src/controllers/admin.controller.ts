import express from "express"
import AdminModel from "../models/admin"

export class AdminController {

    login = (req : express.Request, res : express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        AdminModel.findOne({'username' : username, 'password' : password }, (err,user)=> {
            if(err) {
                console.log(err);
            }
            else {
                res.json(user);
            }
        })
    }
}