import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routers/user.routes';
import objekatRouter from './routers/objekat.routes';
import zahtevRouter from './routers/zahtev.routes';
import posaoRouter from './routers/posao.routes';

const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1/prostorDB')
const connection = mongoose.connection
connection.once('open',()=>{console.log('db connected')})

const router = express.Router();
router.use('/users',userRouter);
router.use('/objekti',objekatRouter)
router.use('/zahtevi',zahtevRouter)
router.use('/poslovi',posaoRouter)

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));