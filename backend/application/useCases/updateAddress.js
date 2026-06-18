import { initDB } from '../../infrastructure/database/pglite.js';
import { validateAddress } from '../../domain/validation.js';

const addressUpdate = async (id, data) => {

    const db = await initDB();

    const validate = validateAddress(data);

    if(!validate) {
        const error = new Error("Falha na validação dos dados ao atualizar");
        error.errors = validate.errors;
        error.isValidError = true;
        throw error;
    }

    const textQuery = `UPDATE enderecos SET pais = $1, estado = $2, cidade = $3, bairro = $4, rua = $5, numero = $6, cep = $7, complemento = $8, apelido = $9, atualizado_em = $10 WHERE id = $11 RETURNING *`;
    const cleanId = String(id).trim();

    const values = [data.pais, data.estado, data.cidade, data.bairro, data.rua, validate.normalizedNumero, validate.normalizedCep, data.complemento || null, data.apelido || null, new Date(), cleanId];

    const result = await db.query(textQuery, values);

    return result.rows[0];
}

export { addressUpdate };