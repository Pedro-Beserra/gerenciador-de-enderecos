# Address Manager

Gerenciador de endereços com cadastro, edição e exclusão. Construído com PGlite, Express e React.

## Tecnologias

**Backend:** Node.js, Express, PGlite  
**Frontend:** React

## Funcionalidades

- Listar endereços cadastrados
- Criar novo endereço
- Editar endereço existente
- Excluir endereço
- Paginação
- Normalização automática de CEP (remove símbolos, valida 8 dígitos)

## Estrutura

```
address-manager/
├── backend/
│   └── src/
│       ├── application/useCases/   # lógica por operação (create, list, getById, update, delete)
│       ├── domain/                 # validação e normalização de CEP
│       ├── infrastructure/
│       │   ├── database/           # instância do PGlite e migration
│       │   └── http/               # controller e routing
│       └── index.js
└── frontend/
    └── src/
        ├── components/             # AddressForm, AddressList
        ├── services/               # chamadas à API
        └── App.jsx
```

## Como rodar

**Pré-requisito:** Node.js 18+

```bash
# Backend
cd backend
npm install
npm run dev
# Servidor em http://localhost:3000

# Frontend (outro terminal)
cd frontend
npm install
npm start
# App em http://localhost:5137
```

## API

Base URL: `http://localhost:3000/v1`

| Método | Rota            | Descrição          |
|--------|-----------------|--------------------|
| GET    | /addresses      | Listar todos       |
| GET    | /addresses/:id  | Buscar por ID      |
| POST   | /addresses      | Criar endereço     |
| PUT    | /addresses/:id  | Atualizar endereço |
| DELETE | /addresses/:id  | Excluir endereço   |

### Exemplo de corpo (POST/PUT)

```json
{
  "pais": "Brasil",
  "estado": "Paraná (PR)",
  "cidade": "Curitiba",
  "bairro": "Centro",
  "rua": "Praça Tiradentes",
  "numero": "276",
  "cep": "80020-100",
  "apelido": "Catedral de Curitiba",
  "complemento": null
}
```

CEP aceita `11702000`, `11702-000` ou `11702 000` — normalizado automaticamente para `11702000`.