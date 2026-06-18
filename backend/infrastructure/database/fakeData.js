import { PGlite } from '@electric-sql/pglite';
import { faker } from '@faker-js/faker';

let db;

async function generateFakeData() {

    db = await PGlite.create();

    await db.query(
        `
        CREATE TABLE enderecos (
        id TEXT PRIMARY KEY,
        pais VARCHAR(255) NOT NULL,
        estado VARCHAR(255) NOT NULL,
        cidade VARCHAR(255) NOT NULL,
        bairro VARCHAR(255) NOT NULL,
        rua VARCHAR(255) NOT NULL,
        CEP VARCHAR(8) NOT NULL,
        complemento VARCHAR(255),
        apelido VARCHAR(255),
        criado_em TIMESTAMP,
        atualizado_em TIMESTAMP
        )
    `);

        const REGISTROS = 10;
        
        for(let i = 0; i < REGISTROS; i++) {
            const dataPassada = faker.date.past().toISOString();

            await db.query(`INSERT INTO enderecos (id, pais, estado, cidade, bairro, rua, cep, complemento, apelido, criado_em, atualizado_em)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
        `, [

            faker.string.uuid(),                 // ID único (UUID)
            faker.location.country(),             // Fixo ou faker.location.country()
            faker.location.state(),             // Ex: São Paulo
            faker.location.city(),              // Ex: Campinas
            faker.location.county(),             // Nome de região/bairro fictício
            faker.location.street(),             // Ex: Rua das Flores
            faker.location.zipCode('########'),  // Gera 8 números limpos (Ex: 01311200)
            faker.location.secondaryAddress(), // Ex: Ap 42, Bloco B
            faker.person.firstName(),  
            dataPassada,
            dataPassada 
        ])

    }

    const resultado = await db.query(`SELECT * FROM enderecos;`);
    console.log(resultado.rows);
}

export { generateFakeData, db };

