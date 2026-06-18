import { initDB } from '../../infrastructure/database/pglite.js';

const addressList = async ({ search, page = 1, limit = 5 }) => {
    
    const db = await initDB();
    
    // Calcula quantas linhas pular baseado na página atual
    const offset = (page - 1) * limit;

    if (!search) {
        
        // Usamos COUNT(*) OVER() para saber o total geral da tabela sem limitar o resultado do COUNT
        const textQuery = `
            SELECT *, COUNT(*) OVER() as total_registros 
            FROM enderecos 
            ORDER BY criado_em DESC
            LIMIT $1 OFFSET $2
        `;
        
        const resultado = await db.query(textQuery, [limit, offset]);
        
        if (resultado.rows.length === 0) {
            return { results: [], total: 0 };
        }

        // O 'total_registros' vem como string/número em todas as linhas, capturamos da primeira
        const total = Number(resultado.rows[0].total_registros);

        return {
            results: resultado.rows,
            total: total
        };
    }


    // Inserimos o COUNT(*) OVER() e as cláusulas LIMIT/OFFSET na query filtrada
    const textQuery = `
    SELECT *, COUNT(*) OVER() as total_registros 
    FROM enderecos 
        WHERE pais ILIKE $1 
           OR estado ILIKE $1 
           OR cidade ILIKE $1 
           OR bairro ILIKE $1 
           OR rua ILIKE $1 
           OR numero ILIKE $1
           OR cep ILIKE $1
        ORDER BY criado_em DESC
        LIMIT $2 OFFSET $3
    `;

    const values = [`%${search}%`, limit, offset];
    const result = await db.query(textQuery, values);

    if (result.rows.length === 0) {
        return { results: [], total: 0 };
    }

    const total = Number(result.rows[0].total_registros);

    return {
        results: result.rows,
        total: total
    };
}

export { addressList };
