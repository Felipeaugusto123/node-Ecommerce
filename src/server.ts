import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/main';

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use('/api', router);

server.listen(3000, () => {
    console.log("servidor iniciado");
});