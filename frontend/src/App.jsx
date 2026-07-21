import React from 'react';
import { useState, useEffect, useRef } from 'react';
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
    <div className='flex h-screen bg-blue-400 items-center justify-center flex-col gap-3'>
      <h1 className='text-white text-2xl font-bold'>Gerenciador de Endereços</h1>

      {/* Condicional para alternar o que é exibido na tela */}
      {currentScreen === 'listar' && (
        <>
        <div className='flex flex-col justify-center gap-3 '>
          <button onClick={() => { setAddressEdit(null); setCurrentScreen('criar'); }} className="text-white rounded-2xl bg-blue-500 px-2 py-1 hover:bg-blue-600">
            + Adicionar Novo Endereço
          </button>

          <input 
          type="text" 
          placeholder='Busca por cidade, bairro, rua...'
          value={searchTerm}
          onChange={handleSearchChange}
          className='border rounded-2xl py-2 px-5 w-2xs text-white font-bold'
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
                <div className='flex space-x-4 items-center '>
                  <button 
                    onClick={() => setPage(old => Math.max(old - 1, 1))} 
                    disabled={page === 1}
                    className="text-white rounded-2xl bg-blue-500 px-2 py-1 hover:bg-blue-600"
                  >
                    Anterior
                  </button>
                  
                  <span className='text-white text-[15px]'>Página <b>{page}</b> (Total de {totalRecords} itens)</span>
                    
                  <button 
                    onClick={() => setPage(old => old + 1)} 
                    disabled={!nextPageExist}
                    className="text-white rounded-2xl bg-blue-500 px-2 py-1 hover:bg-blue-600"
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
