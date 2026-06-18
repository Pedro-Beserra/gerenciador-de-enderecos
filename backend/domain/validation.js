export function validateAddress(data) {
    const errors = [];

    const requiredFields = [
        'pais', 
        'estado', 
        'cidade', 
        'bairro', 
        'rua', 
        'cep',
        'numero',
    ];

    console.log(requiredFields);

    for(const field of requiredFields) {
        const value = String(data[field] ?? '').trim();

        if (value === '') {
        errors.push(
            `O campo ${field} é obrigatório e não pode ser vazio.`
        );
        }
    }

    let normalizedCep = '';

    if(data.cep) {
        normalizedCep = String(data.cep).replace(/\D/g, '');

        if(normalizedCep.length !== 8){
            errors.push("O CEP deve conter exatamente 8 algarismos númericos");
        }
    }

    let normalizedNumero = '';
    if(data.numero) {
        normalizedNumero = String(data.numero).trim();
    }

    return {
        isValid: errors.length === 0,
        errors: errors,
        normalizedCep: normalizedCep,
        normalizedNumero: normalizedNumero
    };
}