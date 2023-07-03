import express from 'express'
import { ZahtevController } from '../controllers/zahtev.controller';

const zahtevRouter = express.Router(); 

zahtevRouter.route('/posaljiZahtev').post((req,res)=>new ZahtevController().dodajZahtev(req,res)); 

zahtevRouter.route('/dovuciZahteveZaKlijenta').get((req,res)=> new ZahtevController().dovuciZahteveZaKlijente(req,res)) 

zahtevRouter.route('/dovuciZahteveZaAgencije').get((req,res)=> new ZahtevController().dovuciZahteveZaAgencije(req,res)) 

zahtevRouter.route('/dovuciZahtev').post((req,res)=> new ZahtevController().dovuciZahtev(req,res)) 

zahtevRouter.route('/prihvacenPonuda').post((req,res)=>new ZahtevController().azurirajZahtev(req,res));

zahtevRouter.route('/obrisi').post((req,res)=> new ZahtevController().obrisi(req,res))

export default zahtevRouter;