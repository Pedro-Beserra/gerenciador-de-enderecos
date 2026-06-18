import * as React from 'react'; // CORREÇÃO COMPATÍVEL COM WEBPACK MANUAL
import { useState, useEffect } from 'react';

export default function AddressForm({ onSave, addressExist, onCancel }) {
  const [formData, setFormData] = useState({
    pais: '', estado: '', bairro: '', cidade: '', rua: '', numero: '', cep: '', apelido: '', complemento: ''
  });

  useEffect(() => {
    if (addressExist) {
      setFormData(addressExist);
    }
  }, [addressExist]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); 
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: "1px solid #000", padding: "15px", margin: "15px 0" }}>
      <h3>{addressExist ? 'Editar Endereço' : 'Novo Endereço'}</h3>
      
      <input name="pais" placeholder="País" value={formData.pais} onChange={handleChange} required /><br />
      <input name="estado" placeholder="Estado" value={formData.estado} onChange={handleChange} required /><br />
      <input name="cidade" placeholder="Cidade" value={formData.cidade} onChange={handleChange} required /><br />
    
      <input name="bairro" placeholder="Bairro" value={formData.bairro} onChange={handleChange} required /><br />
      <input name="rua" placeholder="Rua" value={formData.rua} onChange={handleChange} required /><br />
      <input name="numero" placeholder="Numero" value={formData.numero} onChange={handleChange} required /><br />

      <input name="cep" placeholder="CEP" value={formData.cep} onChange={handleChange} required /><br />
      <input name="complemento" placeholder="Complemento" value={formData.complemento} onChange={handleChange} /><br />
      <input name="apelido" placeholder="Apelido (Ex: Casa)" value={formData.apelido} onChange={handleChange} /><br />

      <button type="submit">{addressExist ? 'Atualizar' : 'Salvar'}</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: "10px" }}>Cancelar</button>
    </form>
  );
}

