import express from 'express';
import cors from 'cors';
import addressRounting from "./infrastructure/http/addressRouting.js";
import { initDB } from './infrastructure/database/pglite.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/v1', addressRounting);

initDB()
.then(() => {
        app.listen(port, () => {
            console.log(`✓ Servidor rodando com sucesso na porta localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error('✗ Erro crítico na inicialização do servidor:', error);
        process.exit(1);
    });