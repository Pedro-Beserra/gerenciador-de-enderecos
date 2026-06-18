const API_PATH = "http://localhost:3000/v1/addresses";

export const addressService = {

    // Get All
    async getAll(search, page = 1, limit = 5) {

        const url = new URL(API_PATH, window.location.origin);

        if(search){
            url.searchParams.append('search', search);
        }
        url.searchParams.append('page', page);
        url.searchParams.append('limit', limit);

        const response = await fetch(url.toString());
        if(!response.ok) {
            throw new Error("Erro ao buscar endereços.");
        }
        return response.json();
    },

    // Get By ID
    async getById(id) {
        
        const response = await fetch(`${API_PATH}/${id}`);
        if(!response.ok) {
            throw new Error("Endereço não encontrado");
        }
        return response.json();
     },

     // Create
     async create(data) {
        const response = await fetch(API_PATH, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error("Erro ao criar endereço.");
        }
        return response.json();
     },

    // UPDATE
     async update({ id, data }) {
        const response = await fetch(`${API_PATH}/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if(!response.ok) {
            throw new Error("Erro ao atualizar endereço");
        }
        return response.json();
    },

    // DELETE
    async delete(id) {
        const response = await fetch(`${API_PATH}/${id}`, {
            method: 'DELETE'
        });
        if(!response.ok) {
            throw new Error("Erro ao deletar endereço");
        }
        return true;
    }
}
