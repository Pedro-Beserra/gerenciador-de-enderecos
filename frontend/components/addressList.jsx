import React from 'react';

export default function AddressList({ addresses, onEditClick, onDelete }) {
  return (
    <div className='flex flex-col items-center gap-3'>
      <h3 className='text-white text-xl font-bold mb-2'>Meus Endereços</h3>

      {addresses.length === 0 ? (
        <p>Nenhum endereço encontrado.</p>
      ) : (
        addresses.map((address) => (
          <div
            key={address.id}
            className='bg-blue-500 w-100 border border-white px-5 py-3 rounded-2xl'
          >

            <h4 className='text-lg font-bold text-white mb-2'>{address.apelido || "Endereço"}</h4>

            <div className='text-white'>
              <strong className='text-white'>País:</strong> {address.pais}
            </div>

            <div className='text-white'>
              <strong>Estado:</strong> {address.estado}
            </div>

            <div className='text-white'>
              <strong>Cidade:</strong> {address.cidade}
            </div>

            <div className='text-white'>
              <strong>Bairro:</strong> {address.bairro}
            </div >

            <div className='text-white'>
              <strong>Rua:</strong> {address.rua}
            </div>

            <div className='text-white'>
              <strong>Número:</strong> {address.numero}
            </div>

            <div className='text-white'>
              <strong>CEP:</strong> {address.cep}
            </div>

            <div className='text-white'>
              <strong>Complemento:</strong> {address.complemento}
            </div>


            <div
            className='flex gap-2 py-2'
            >
              <button onClick={() => onEditClick(address)} className="text-white rounded-2xl bg-blue-600 px-2 py-1 hover:bg-blue-700">
                Editar
              </button>

              <button onClick={() => onDelete(address.id)} className="text-white rounded-2xl bg-blue-600 px-2 py-1 hover:bg-blue-700">
                Deletar
              </button>
            </div>

          </div>
        ))
      )}
    </div>
  );
}