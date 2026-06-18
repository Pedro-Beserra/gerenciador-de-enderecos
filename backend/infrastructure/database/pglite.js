import {PGlite} from '@electric-sql/pglite'

let db;

async function initDB() {
    if(db){
        return db
    }

    db = await PGlite.create('../../data');

    // 1. Cria a tabela com a estrutura antiga/nova se não existir
    await db.query(`
        CREATE TABLE IF NOT EXISTS enderecos (
            id TEXT PRIMARY KEY,
            pais VARCHAR(10) NOT NULL,
            estado VARCHAR(10) NOT NULL,
            cidade VARCHAR(15) NOT NULL,
            bairro VARCHAR(15) NOT NULL,
            rua VARCHAR(20) NOT NULL,
            cep VARCHAR(8) NOT NULL,
            complemento VARCHAR(20) NULL,
            apelido VARCHAR(15) NULL,
            criado_em BIGINT, 
            atualizado_em BIGINT
        )
    `);
    
    return db;
}

export { initDB }