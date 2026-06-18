import React from 'react';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addressService } from '../services/addressService.js';
import AddressList from '../components/addressList.jsx';
import AddressForm from '../components/AddressForm.jsx';

export function App() {

  const queryClient = useQueryClient();
  const [currentScreen, setCurrentScreen] = useState('listar'); // Pode ser: 'listar', 'criar', 'editar' 
  const [addressEdit, setAddressEdit] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

  const [page, setPage] = useState(1);
  const itemsByPage = 5;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  }

    const {
      data: paginationData = { results: [], total: 0},
      isLoading,
      error
    } = useQuery({
      queryKey: ['addresses', searchTerm, page],
      queryFn: () => addressService.getAll(searchTerm, page, itemsByPage)
    });

    const addresses = paginationData.results;
    const totalRecords = paginationData.total;

    const nextPageExist = page * itemsByPage < totalRecords;


  // DELETE: Apaga o registro
  const deleteMutation = useMutation({
      mutationFn: addressService.delete,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['addresses']
        });
      }
  })

  const removeAddress = async (id) => {
    if(!confirm('Deseja excluir?')) return;
    deleteMutation.mutate(id);
  };


  // Mutação de criação
  const createMutation = useMutation({
    mutationFn: addressService.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['addresses']
      });
    setCurrentScreen('listar');
    }
  });

  // Mutação de atualizar
  const updateMutation = useMutation({
    mutationFn: addressService.update,

    onSuccess: () => {
      queryClient.invalidateQueries({
      queryKey: ['addresses']
    });
    setCurrentScreen('listar');
    }
  });

  // Junta mutation de criar e atualizar com verificação.
  const saveForm = (dataForm) => {
    if(currentScreen === 'editar') {
      updateMutation.mutate({
        id: addressEdit.id,
        data: dataForm
      });
      return;
    }
    createMutation.mutate(dataForm);
  }

  // Função auxiliar para ativar o modo de edição
  const initEdit = (address) => {
    setAddressEdit(address);
    setCurrentScreen('editar');
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Gerenciador de Endereços</h1>

      {/* Condicional para alternar o que é exibido na tela */}
      {currentScreen === 'listar' && (
        <>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: "15px", flexDirection: 'column' }}>
          <button onClick={() => { setAddressEdit(null); setCurrentScreen('criar'); }} style={{ marginBottom: "15px", width: '200px', height: '40px' }}>
            + Adicionar Novo Endereço
          </button>

          <input 
          type="text" 
          placeholder='Busca por cidade, bairro, rua...'
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ padding: "6px", flex: 1, borderRadius: "4px", border: "1px solid #ccc" }}
          />
          </div>

          {isLoading ? <p>Carregando Endereços</p> : (
            <>
            <AddressList 
            addresses={addresses} 
            onDelete={removeAddress} 
            onEditClick={initEdit} 
            />

            {totalRecords > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                  <button 
                    onClick={() => setPage(old => Math.max(old - 1, 1))} 
                    disabled={page === 1}
                    style={{ padding: "8px 16px", cursor: page === 1 ? "not-allowed" : "pointer" }}
                  >
                    Anterior
                  </button>
                  
                  <span>Página <b>{page}</b> (Total de {totalRecords} itens)</span>
                  
                  <button 
                    onClick={() => setPage(old => old + 1)} 
                    disabled={!nextPageExist}
                    style={{ padding: "8px 16px", cursor: !nextPageExist ? "not-allowed" : "pointer" }}
                  >
                    Próxima
                  </button>
                </div>
              )}
          </>
          )}
        </>
      )}

      {(currentScreen === 'criar' || currentScreen === 'editar') && (
        <AddressForm 
          onSave={saveForm}
          addressExist={addressEdit}
          onCancel={() => setCurrentScreen('listar')} 
        />
      )}
    </div>
  );
}
