import express from 'express'
import { AdminController } from '../controllers/admin.controller';
import { AgencijaController } from '../controllers/agencija.controller';
import { KlijentController } from '../controllers/klijent.controller';

const userRouter = express.Router();

userRouter.route('/registerK').post((req,res)=>new KlijentController().register(req,res)); // registracija klijent
userRouter.route('/registerA').post((req,res)=>new AgencijaController().register(req,res)); // registracija agencija

userRouter.route('/loginK').post((req,res)=>new KlijentController().login(req,res)); // login klijent
userRouter.route('/loginA').post((req,res)=>new AgencijaController().login(req,res)); // login agencija

userRouter.route('/getClient').get((req,res)=> new KlijentController().findClient(req,res)) // dohvati klijenta po username
userRouter.route('/getAgencija').get((req,res)=> new AgencijaController().findAgencija(req,res)) // dohvati agenciju po username

userRouter.route('/getAllK').get((req,res)=> new KlijentController().getAllK(req,res)) // dohvati sve klijente
userRouter.route('/getAllAg').get((req,res)=> new AgencijaController().getAllAg(req,res)) // dohvati sve agencije
userRouter.route('/getSearchedAg').get((req,res)=> new AgencijaController().getSomeAg(req,res)) // dohvati agencije po nazivu
userRouter.route('/getSearchedAgAdr').get((req,res)=> new AgencijaController().getSomeAgAdr(req,res)) // dohvati agencije po adresi
userRouter.route('/getSearchedAgNaAdr').get((req,res)=> new AgencijaController().getSomeAgNaAdr(req,res)) // po nazivu i adresi

userRouter.route('/updatePasswordK').post((req,res)=>{new KlijentController().update(req,res)}) // azuriraj lozinku klijentu
userRouter.route('/updatePasswordA').post((req,res)=>{new AgencijaController().update(req,res)}) // azuriraj lozinku agenciji

userRouter.route('/updateBrojRadnika').post((req,res)=>{new AgencijaController().updateBrRadnika(req,res)}) // azuriraj broj radnika agenciji
userRouter.route('/updateOdobrenBrojRadnika').post((req,res)=>{new AgencijaController().updateOdobrenBrRadnika(req,res)})

userRouter.route('/dodajRecenziju').post((req,res)=>{new AgencijaController().dodajRecenziju(req,res)}) // dodaj recenziju
userRouter.route('/obrisiRecenziju').post((req,res)=>{new AgencijaController().obrisiRecenziju(req,res)}) // obrisi recenziju
userRouter.route('/izmeniRecenziju').post((req,res)=>{new AgencijaController().izmeniRecenziju(req,res)}) // izmeni recenziju

userRouter.route('/adminLogin').post((req,res)=>{new AdminController().login(req,res)}) // login admin

userRouter.route('/potvrdiK').post((req,res)=>{new KlijentController().potvrdi(req,res)}) // potvrdi registraciju klijentu
userRouter.route('/potvrdiA').post((req,res)=>{new AgencijaController().potvrdi(req,res)}) // potvrdi registraciju agenciji

userRouter.route('/odbijK').post((req,res)=>{new KlijentController().odbij(req,res)}) // potvrdi registraciju klijentu
userRouter.route('/odbijA').post((req,res)=>{new AgencijaController().odbij(req,res)}) // potvrdi registraciju agenciji

userRouter.route('/obrisiK').post((req,res)=>{new KlijentController().obrisiKlijenta(req,res)}) // obrisi klijenta
userRouter.route('/obrisiA').post((req,res)=>{new AgencijaController().obrisiAgenciju(req,res)}) // obrisi agenciju

userRouter.route('/azurirajK').post((req,res)=>{new KlijentController().azurirajKlijenta(req,res)}) // azuriraj klijenta
userRouter.route('/azurirajA').post((req,res)=>{new AgencijaController().azurirajAgenciju(req,res)}) // azuriraj agenciju

userRouter.route('/sviZabranjeni').get((req,res)=> new KlijentController().sviZabranjeni(req,res)) // svi zabranjeni username-ovi

export default userRouter;