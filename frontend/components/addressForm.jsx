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
    <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4 bg-blue-500 w-120 rounded-2xl p-6 shadow-lg'>
      <h3 className='text-xl font-bold text-white mb-2'>{addressExist ? 'Editar Endereço' : 'Novo Endereço'}</h3>

      <div className='flex flex-col gap-2 border border-white rounded-lg p-3 w-full'>
        <input name="pais" placeholder="País" value={formData.pais} onChange={handleChange} required className='border rounded-r-2xl text-white font-bold py-2 px-2' />
        <input name="estado" placeholder="Estado" value={formData.estado} onChange={handleChange} required className='border rounded-r-2xl text-white font-bold py-2 px-2' />
        <input name="cidade" placeholder="Cidade" value={formData.cidade} onChange={handleChange} required className='border rounded-r-2xl text-white font-bold py-2 px-2' />
      
        <input name="bairro" placeholder="Bairro" value={formData.bairro} onChange={handleChange} required className='border rounded-r-2xl text-white font-bold py-2 px-2' />
        <input name="rua" placeholder="Rua" value={formData.rua} onChange={handleChange} required className='border rounded-r-2xl text-white font-bold py-2 px-2' />
        <input name="numero" placeholder="Numero" value={formData.numero} onChange={handleChange} required className='border rounded-r-2xl text-white font-bold py-2 px-2' />

        <input name="cep" placeholder="CEP" value={formData.cep} onChange={handleChange} required className='border rounded-r-2xl text-white font-bold py-2 px-2' />
        <input name="complemento" placeholder="Complemento" value={formData.complemento} onChange={handleChange} className='border rounded-r-2xl text-white font-bold py-2 px-2' />
        <input name="apelido" placeholder="Apelido (Ex: Casa)" value={formData.apelido} onChange={handleChange} className='border rounded-r-2xl text-white font-bold py-2 px-2' />
      </div>

      <div className='inline-flex'>
        <button className="text-white rounded-2xl bg-blue-600 px-2 py-1 hover:bg-blue-700" type="submit">{addressExist ? 'Atualizar' : 'Salvar'}</button>
        <button className="text-white rounded-2xl bg-blue-600 px-2 py-1 hover:bg-blue-700" type="button" onClick={onCancel} style={{ marginLeft: "10px" }}>Cancelar</button>
      </div>
    </form>
  );
}