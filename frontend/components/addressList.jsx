import React from 'react';
import './addressList.css';

export default function({ addresses, onEditClick, onDelete}) {

    return ( 
        <div className="address-list">
            <h3>Meus Endereços</h3>
            {addresses.length === 0 ? <p>Nenhum endereço encontrado.</p> : ( 
                <ul>
                    {addresses.map(address =>  (
                        <li key={address.id}>
                            <strong>Endereços</strong>: {`Pais: ${address.pais}`}, {`Estado: ${address.estado}`}, {`Cidade: ${address.cidade}`}, {`Bairro: ${address.bairro}`}, {`Rua: ${address.rua}`}, {`Número: ${address.numero}`}, {`CEP: ${address.cep}`}, {`Complemento: ${address.complemento}`}, {`Apelido: ${address.apelido}`}
                            <br />
                            <button onClick={() => onEditClick(address)}>Editar</button>
                            <button onClick={() => onDelete(address.id)}>Deletar</button>
                        </li>
                    ))}
                </ul>

                )}
        </div>
    );
}