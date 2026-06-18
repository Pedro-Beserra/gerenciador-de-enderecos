import { createAddress } from "../../application/useCases/createAddress.js"
import { addressList } from "../../application/useCases/listAddress.js"
import { getId } from "../../application/useCases/getById.js"
import { addressDeleted } from "../../application/useCases/deleteAddress.js";
import { addressUpdate } from "../../application/useCases/updateAddress.js"

// Controller do create Address
const create = async (req, res) => {
    console.log("BODY:", req.body);

    try {
        const newAddress = await createAddress(req.body);
        
        return res.status(201).json({
            mensagem: "Endereço criado com sucesso", 
            data: newAddress
        });
    } catch(error) { 

         if (error.isValidationError) {
            return res.status(400).json({ 
                mensagem: error.message, 
                erros: error.errors 
            });
        }
        
        console.error("Erro no controller createAddress:", error);
        return res.status(500).json({ erro: "Erro interno ao processar a requisição"})
    }
};


// Controller de listar Addresses
const list = async (req, res) => {
    
    try {

        const { search, page, limit } = req.query;

        const listAddresses = await addressList( { 
            search: search ||'',
            page: page ? Number(page) : 1,
            limit: limit ? Number(limit) : 5
        });

        console.log("Dados obtidos");
        console.log("Search:", listAddresses);

        return res.status(200).json(listAddresses);

    } catch(error) {
        return res.status(500).json({ mensagem: "Erro ao listar endereços.", error});
    } 
}


// Controller de buscar por ID Address
const getById = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const getRows = await getId(id);

        if(!getRows) {
            return res.status(404).json({ mensagem: "Endereço não encontrado"});
        }

        return res.status(200).json(getRows);

    }  catch(error) {
        console.error("Erro no controller ao listar endereço por ID.", error)
        return res.status(500).json({ erro: "Erro intenro ao listar endereço"})
    }
}


// Controller do UPDATE Address
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { pais, estado, cidade, bairro, rua, numero, cep, complemento, apelido } = req.body;

        const updatedAddress = await addressUpdate(id, {
            pais, estado, cidade, bairro, rua, numero, cep, complemento, apelido
        });

        if(!updatedAddress) {
            return res.status(404).json({ mensagem: "Endereço não encontrado"});
        }

        return res.status(200).json({ mensagem: "Endereço atualizado.", dados: updatedAddress });
    } catch (error){

        console.error("Erro no controller ao atualizar endereço:", error.message || error);
        
        if(error.isValidationError){
            return res.status(400).json({ erro: error.message, detalhes: error.errors});
        }
        res.status(500).json({ erro: "Erro interno ao atualizar endereço.", error });
    }
}


// Controller do DELETE Address
const remove = async (req, res) => {

    try {
        const { id } = req.params;
        const deletado = await addressDeleted(id);

        if(!deletado) {
            res.status(404).json({ mensagem: "Endereço não encontrado" })
        }

        return res.status(204).send();
    } catch(error) {
        console.error("Erro no controller ao deletar endereço", error);
        res.status(500).json({ erro: "Erro interno ao deletar endereço." })
    }
}

export {
    create,
    list,
    getById,
    remove,
    update,
};