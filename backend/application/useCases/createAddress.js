import database from "mime-db";
import { initDB } from '../../infrastructure/database/pglite.js';
import { validateAddress } from "../../domain/validation.js";

const createAddress = async (addressData) => {
    
    const db = await initDB();
    
     const validation = validateAddress(addressData);

    // Se falhar na validação, lança um erro customizado para o controller capturar
    if (!validation.isValid) {
        const error = new Error("Falha na validação dos dados.");
        error.errors = validation.errors; 
        error.isValidationError = true;  
        throw error;
    }

    try {
    const id = crypto.randomUUID();
    const now = Date.now();

    const textQuery = `INSERT INTO enderecos(id, pais, estado, cidade, bairro, rua, numero, cep, complemento, apelido, criado_em, atualizado_em )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 ) RETURNING *
    `;

    const values = [
            id, 
            addressData.pais, 
            addressData.estado, 
            addressData.cidade, 
            addressData.bairro, 
            addressData.rua, 
            validation.normalizedNumero,
            validation.normalizedCep, // Usa o CEP normalizado e limpo pelo validador
            addressData.complemento || null, 
            addressData.apelido || null, 
            now, 
            now
        ];

    const resultado = await db.query(textQuery, values);

    return resultado.rows[0];
    
    } catch(error) {
        console.error("Erro ao salvar endereço no PGlite:", error);
        throw error;
    }
}

export { createAddress };