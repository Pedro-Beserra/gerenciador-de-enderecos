import { initDB } from '../../infrastructure/database/pglite.js';

const addressDeleted = async (id) => {
    const db = await initDB();
    
    try {
        if(!id) {
            throw new Error("O ID do endereço é obrigatório");
        }

        const textQuery = `DELETE FROM enderecos WHERE id = $1 RETURNING *`;
        const resultado = await db.query(textQuery, [id]);

        if(resultado.rows === 0) return null;

        return resultado.rows[0];
    } catch(error) {
        console.error("Erro no ao deletar endereço", error)
        throw error;
    }
}

export { addressDeleted };