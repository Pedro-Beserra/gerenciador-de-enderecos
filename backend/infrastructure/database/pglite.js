import { PGlite } from '@electric-sql/pglite'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.resolve(__dirname, '../../data');

let db;

async function initDB() {
    if(db){
        return db
    }

    db = await PGlite.create(DB_PATH);

     await db.query(`
        CREATE TABLE IF NOT EXISTS enderecos (
            id TEXT PRIMARY KEY,
            pais VARCHAR(50) NOT NULL,
            estado VARCHAR(10) NOT NULL,
            cidade VARCHAR(100) NOT NULL,
            bairro VARCHAR(100) NOT NULL,
            rua VARCHAR(150) NOT NULL,
            cep VARCHAR(8) NOT NULL,
            complemento VARCHAR(100),
            apelido VARCHAR(50),
            criado_em BIGINT,
            atualizado_em BIGINT
        )
    `);
        
    return db;
}

export { initDB }