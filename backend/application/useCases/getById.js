import { initDB } from '../../infrastructure/database/pglite.js';

const getId = async (id) => {
    
    const db = await initDB();

    const textQuery = `SELECT * FROM enderecos WHERE id = $1`;

    const getById = await db.query(textQuery, [id]);
        return getById.rows[0];
}

export { getId };