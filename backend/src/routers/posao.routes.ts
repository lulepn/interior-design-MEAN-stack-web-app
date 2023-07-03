import express from 'express'
import { RadnikController } from '../controllers/radnik.controller';
import { PosaoController } from '../controllers/posao.controller';

const posaoRouter = express.Router();  

posaoRouter.route('/posaljiPosao').post((req,res)=>new PosaoController().dodajPosao(req,res)); 

posaoRouter.route('/dovuciPosloveZaKlijenta').get((req,res)=> new PosaoController().dovuciPosloveZaKlijente(req,res)) 

posaoRouter.route('/dovuciPosloveZaAgencije').get((req,res)=> new PosaoController().dovuciPosloveZaAgencije(req,res))

posaoRouter.route('/dovuciSvePoslove').get((req,res)=> new PosaoController().dovuciSvePoslove(req,res))

posaoRouter.route('/dovuciSvaOtkazivanja').get((req,res)=> new PosaoController().dovuciSvaOtkazivanja(req,res))

posaoRouter.route('/dovuciPosao').post((req,res)=> new PosaoController().dovuciPosao(req,res)) 

posaoRouter.route('/otkaziPosao').post((req,res)=> new PosaoController().otkaziPosao(req,res)) 

posaoRouter.route('/dodajOtkazivanje').post((req,res)=> new PosaoController().dodajOtkazivanje(req,res)) 

posaoRouter.route('/odbijOtkazivanje').post((req,res)=> new PosaoController().odbijOtkazivanje(req,res)) 

posaoRouter.route('/azurirajBrojRadnika').post((req,res)=> new PosaoController().azurirajBrojRadnika(req,res)) 

posaoRouter.route('/azurirajStatus').post((req,res)=> new PosaoController().azurirajStatus(req,res)) 

posaoRouter.route('/obrisi').post((req,res)=> new PosaoController().obrisi(req,res))

posaoRouter.route('/dodajRadnika').post((req,res)=> new RadnikController().dodajRadnika(req,res))

posaoRouter.route('/dovuciSveRadnike').get((req,res)=> new RadnikController().dovuciSveRadnike(req,res))

posaoRouter.route('/obrisiRadnika').post((req,res)=> new RadnikController().obrisiRadnika(req,res))

posaoRouter.route('/urediRadnika').post((req,res)=> new RadnikController().urediRadnika(req,res))

posaoRouter.route('/dovuciRadnika').post((req,res)=> new RadnikController().dovuciRadnika(req,res))

posaoRouter.route('/dodajZahtevZaRadnaMesta').post((req,res)=> new RadnikController().dodajZahtev(req,res))

posaoRouter.route('/dovuciSveZahteve').get((req,res)=> new RadnikController().dovuciSveZahteve(req,res))

posaoRouter.route('/obrisiZahtevZaRadnaMesta').post((req,res)=> new RadnikController().obrisiZahtev(req,res))

export default posaoRouter;