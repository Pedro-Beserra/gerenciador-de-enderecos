import React from 'react';
import './addressList.css';

export default function AddressList({ addresses, onEditClick, onDelete }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <h3>Meus Endereços</h3>

      {addresses.length === 0 ? (
        <p>Nenhum endereço encontrado.</p>
      ) : (
        addresses.map((address) => (
          <div
            key={address.id}
            style={{
              width: "400px",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >

            <h4>{address.apelido || "Endereço"}</h4>

            <div>
              <strong>País:</strong> {address.pais}
            </div>

            <div>
              <strong>Estado:</strong> {address.estado}
            </div>

            <div>
              <strong>Cidade:</strong> {address.cidade}
            </div>

            <div>
              <strong>Bairro:</strong> {address.bairro}
            </div>

            <div>
              <strong>Rua:</strong> {address.rua}
            </div>

            <div>
              <strong>Número:</strong> {address.numero}
            </div>

            <div>
              <strong>CEP:</strong> {address.cep}
            </div>

            <div>
              <strong>Complemento:</strong> {address.complemento}
            </div>


            <div
              style={{
                marginTop: "15px",
                display: "flex",
                gap: "10px",
              }}
            >
              <button onClick={() => onEditClick(address)}>
                Editar
              </button>

              <button onClick={() => onDelete(address.id)}>
                Deletar
              </button>
            </div>

          </div>
        ))
      )}
    </div>
  );
}