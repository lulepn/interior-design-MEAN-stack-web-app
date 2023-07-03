import express from 'express'
import { ObjekatController } from '../controllers/objekat.controller';

const objekatRouter = express.Router();

objekatRouter.route('/dodajObjekat').post((req,res)=>new ObjekatController().dodajObjekat(req,res)); 

objekatRouter.route('/dovuciObjekte').get((req,res)=> new ObjekatController().dovuciObjekteZaKlijenta(req,res)) 

objekatRouter.route('/dovuciObjekatAdresa').get((req,res)=> new ObjekatController().dovuciObjekatZaKlijentaAdresa(req,res)) 

objekatRouter.route('/obrisi').post((req,res)=> new ObjekatController().obrisi(req,res))

objekatRouter.route('/azurirajJedno').post((req,res)=> new ObjekatController().azurirajJedno(req,res))

export default objekatRouter;