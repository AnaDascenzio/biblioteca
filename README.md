# 📚 Biblioteca Virtual - API REST

Uma aplicação backend robusta para gerenciamento de uma biblioteca virtual, desenvolvida com **Express**, **TypeORM** e **PostgreSQL**.

## 🎯 Visão Geral

Esta API fornece um sistema completo de CRUD (Create, Read, Update, Delete) para gerenciar livros e editoras em uma biblioteca digital. O projeto implementa boas práticas de arquitetura em camadas, validação de dados e tratamento de erros.

### ✨ Principais Características

- ✅ **API RESTful** completa com endpoints bem definidos
- ✅ **Banco de dados relacional** com PostgreSQL
- ✅ **ORM TypeORM** para manipulação de dados
- ✅ **Validação robusta** de inputs
- ✅ **Tratamento de erros** estruturado
- ✅ **Logging** de operações
- ✅ **Relacionamentos** entre Livros e Editoras
- ✅ **Docker** para facilitar o deployment

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| **Node.js** | LTS | Runtime JavaScript |
| **TypeScript** | 5.2.2 | Tipagem estática |
| **Express.js** | 4.18.2 | Framework web |
| **TypeORM** | 0.3.16 | ORM para banco de dados |
| **PostgreSQL** | 15 | Banco de dados relacional |
| **Docker** | - | Containerização |
| **ts-node** | 10.9.1 | Execução direta de TypeScript |

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (v16 ou superior)
- **npm** ou **yarn**
- **Docker** e **Docker Compose** (opcional, para banco de dados)
- **PostgreSQL** (v15 ou superior, se não usar Docker)

### Verificar Instalações

```bash
# Node.js
node --version

# npm
npm --version

# Docker (opcional)
docker --version
docker-compose --version
```

---

## 🚀 Instalação e Configuração

### 1️⃣ Clonar o Repositório

```bash
git clone <seu-repositorio>
cd projeto-biblioteca
```

### 2️⃣ Instalar Dependências

```bash
npm install
```

### 3️⃣ Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=biblioteca_db

# Aplicação
NODE_ENV=development
API_PORT=3000
```

### 4️⃣ Iniciar o Banco de Dados (Docker)

Se você tem Docker Compose instalado:

```bash
docker-compose up -d
```

Isso iniciará um container PostgreSQL com as configurações pré-definidas.

Se preferir usar um PostgreSQL local, certifique-se de que ele está rodando na porta 5432 e ajuste as variáveis de ambiente conforme necessário.

---

## 🎮 Executando o Projeto

### Modo Desenvolvimento

```bash
npm run dev
```

Este comando inicia a aplicação em modo desenvolvimento com auto-reload usando `ts-node`.

**Saída esperada:**
```
Banco de dados conectado!

Servidor rodando em http://localhost:3000

=== DOCUMENTAÇÃO DA API ===

LIVROS:
  POST   http://localhost:3000/api/livros
  GET    http://localhost:3000/api/livros
  GET    http://localhost:3000/api/livros/:id
  GET    http://localhost:3000/api/livros/autor/:autor
  PUT    http://localhost:3000/api/livros/:id
  DELETE http://localhost:3000/api/livros/:id

EDITORAS:
  POST   http://localhost:3000/api/editoras
  GET    http://localhost:3000/api/editoras
  GET    http://localhost:3000/api/editoras/:id
  GET    http://localhost:3000/api/editoras/nome/:nome
  GET    http://localhost:3000/api/editoras/:id/livros-count
  PUT    http://localhost:3000/api/editoras/:id
  DELETE http://localhost:3000/api/editoras/:id

HEALTH CHECK:
  GET    http://localhost:3000/health
```

### Build para Produção

```bash
npm run build
```

Compila o TypeScript para JavaScript na pasta `dist/`.

### Executar em Produção

```bash
npm start
```

Inicia a aplicação a partir dos arquivos compilados em `dist/`.

---

## 📡 Documentação da API

### Health Check

Verifica se o servidor está funcionando.

```http
GET /health
```

**Resposta (200 OK):**
```json
{
  "status": "✅ OK",
  "timestamp": "2024-04-04T10:30:45.123Z"
}
```

---

## 📚 Endpoints de Livros

### 1. Criar Livro

```http
POST /api/livros
```

**Body (JSON):**
```json
{
  "titulo": "Dom Casmurro",
  "autor": "Machado de Assis",
  "isbn": "978-8535902778",
  "anoPublicacao": 1899,
  "editoraId": "uuid-da-editora"
}
```

**Resposta (201 Created):**
```json
{
  "sucesso": true,
  "mensagem": "Livro criado com sucesso!",
  "dados": {
    "id": "uuid-gerado",
    "titulo": "Dom Casmurro",
    "autor": "Machado de Assis",
    "isbn": "978-8535902778",
    "anoPublicacao": 1899,
    "editoraId": "uuid-da-editora",
    "editora": { ... }
  }
}
```

**Validações:**
- ❌ Título: obrigatório, mínimo 3 caracteres
- ❌ Autor: obrigatório
- ❌ ISBN: obrigatório, mínimo 10 dígitos
- ❌ editoraId: obrigatório

---

### 2. Listar Todos os Livros

```http
GET /api/livros
```

**Resposta (200 OK):**
```json
{
  "sucesso": true,
  "total": 15,
  "dados": [
    {
      "id": "uuid-1",
      "titulo": "Dom Casmurro",
      "autor": "Machado de Assis",
      "isbn": "978-8535902778",
      "anoPublicacao": 1899,
      "editora": { ... }
    },
    // ... mais livros
  ]
}
```

---

### 3. Buscar Livro por ID

```http
GET /api/livros/:id
```

**Exemplo:**
```http
GET /api/livros/550e8400-e29b-41d4-a716-446655440000
```

**Resposta (200 OK):**
```json
{
  "sucesso": true,
  "dados": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "titulo": "Dom Casmurro",
    "autor": "Machado de Assis",
    "isbn": "978-8535902778",
    "anoPublicacao": 1899,
    "editora": { ... }
  }
}
```

**Resposta (404 Not Found):**
```json
{
  "sucesso": false,
  "mensagem": "Livro com ID 550e8400-e29b-41d4-a716-446655440000 não encontrado"
}
```

---

### 4. Buscar Livros por Autor

```http
GET /api/livros/autor/:autor
```

**Exemplo:**
```http
GET /api/livros/autor/Machado%20de%20Assis
```

**Resposta (200 OK):**
```json
{
  "sucesso": true,
  "total": 3,
  "dados": [
    {
      "id": "uuid-1",
      "titulo": "Dom Casmurro",
      "autor": "Machado de Assis",
      "isbn": "978-8535902778",
      "anoPublicacao": 1899,
      "editora": { ... }
    },
    // ... mais livros do autor
  ]
}
```

---

### 5. Atualizar Livro

```http
PUT /api/livros/:id
```

**Body (JSON):**
```json
{
  "titulo": "Dom Casmurro (Edição Revisada)",
  "autor": "Machado de Assis",
  "isbn": "978-8535902779"
}
```

**Resposta (200 OK):**
```json
{
  "sucesso": true,
  "mensagem": "Livro atualizado com sucesso!",
  "dados": { ... }
}
```

---

### 6. Deletar Livro

```http
DELETE /api/livros/:id
```

**Exemplo:**
```http
DELETE /api/livros/550e8400-e29b-41d4-a716-446655440000
```

**Resposta (200 OK):**
```json
{
  "sucesso": true,
  "mensagem": "Livro deletado com sucesso!"
}
```

---

## 🏢 Endpoints de Editoras

### 1. Criar Editora

```http
POST /api/editoras
```

**Body (JSON):**
```json
{
  "nome": "Companhia das Letras",
  "endereco": "São Paulo, SP"
}
```

**Resposta (201 Created):**
```json
{
  "sucesso": true,
  "mensagem": "Editora criada com sucesso!",
  "dados": {
    "id": "uuid-gerado",
    "nome": "Companhia das Letras",
    "endereco": "São Paulo, SP",
    "livros": []
  }
}
```

**Validações:**
- ❌ Nome: obrigatório, mínimo 3 caracteres
- ⚠️ Endereço: opcional

---

### 2. Listar Todas as Editoras

```http
GET /api/editoras
```

**Resposta (200 OK):**
```json
{
  "sucesso": true,
  "total": 5,
  "dados": [
    {
      "id": "uuid-1",
      "nome": "Companhia das Letras",
      "endereco": "São Paulo, SP",
      "livros": [ ... ]
    },
    // ... mais editoras
  ]
}
```

---

### 3. Buscar Editora por ID

```http
GET /api/editoras/:id
```

**Resposta (200 OK):**
```json
{
  "sucesso": true,
  "dados": {
    "id": "uuid-1",
    "nome": "Companhia das Letras",
    "endereco": "São Paulo, SP",
    "livros": [ ... ]
  }
}
```

---

### 4. Buscar Editoras por Nome

```http
GET /api/editoras/nome/:nome
```

**Exemplo:**
```http
GET /api/editoras/nome/Companhia
```

**Resposta (200 OK):**
```json
{
  "sucesso": true,
  "total": 2,
  "dados": [
    {
      "id": "uuid-1",
      "nome": "Companhia das Letras",
      "endereco": "São Paulo, SP",
      "livros": [ ... ]
    }
  ]
}
```

---

### 5. Contar Livros da Editora

```http
GET /api/editoras/:id/livros-count
```

**Resposta (200 OK):**
```json
{
  "sucesso": true,
  "dados": {
    "editoraId": "uuid-1",
    "editoraNome": "Companhia das Letras",
    "totalLivros": 12
  }
}
```

---

### 6. Atualizar Editora

```http
PUT /api/editoras/:id
```

**Body (JSON):**
```json
{
  "nome": "Companhia das Letras (Brasil)",
  "endereco": "Rio de Janeiro, RJ"
}
```

**Resposta (200 OK):**
```json
{
  "sucesso": true,
  "mensagem": "Editora atualizada com sucesso!",
  "dados": { ... }
}
```

---

### 7. Deletar Editora

```http
DELETE /api/editoras/:id
```

**Resposta (200 OK):**
```json
{
  "sucesso": true,
  "mensagem": "Editora deletada com sucesso!"
}
```

**Resposta (400 Bad Request):**
```json
{
  "sucesso": false,
  "mensagem": "Não é possível deletar editora com 5 livro(s). Delete os livros primeiro!"
}
```

⚠️ **Nota:** Editoras com livros associados não podem ser deletadas.

---

## 🏗️ Arquitetura do Projeto

O projeto segue o padrão de **arquitetura em camadas**, garantindo separação de responsabilidades:

```
src/
├── index.ts                 # Ponto de entrada da aplicação
├── routes/
│   └── index.ts            # Definição de rotas
├── controllers/            # Camada de controle (HTTP)
│   ├── livroController.ts
│   └── editoraController.ts
├── services/               # Camada de negócio (regras)
│   ├── livroService.ts
│   ├── editoraService.ts
│   └── validator/          # Validações
│       ├── livroValidator.ts
│       └── editoraValidator.ts
├── repositories/           # Camada de acesso a dados
│   ├── livroRepository.ts
│   └── editoraRepository.ts
├── entities/               # Modelos de banco de dados
│   ├── livro.ts
│   └── editora.ts
├── interfaces/             # Tipos TypeScript
│   ├── livro.ts
│   └── editora.ts
└── database/
    └── dataSource.ts       # Configuração do banco
```

### 📊 Fluxo de Dados

```
HTTP Request
    ↓
Router (routes/index.ts)
    ↓
Controller (controllers/*.ts)
    ↓
Service (services/*.ts) → Validator (services/validator/*.ts)
    ↓
Repository (repositories/*.ts)
    ↓
Database (PostgreSQL)
    ↓
HTTP Response
```

---

## 🔑 Modelos de Dados

### Livro

```typescript
{
  id: string;              // UUID gerado automaticamente
  titulo: string;          // Título do livro
  autor: string;           // Autor
  isbn: string;            // Código ISBN
  anoPublicacao: number;   // Ano de publicação
  editoraId: string;       // Referência à editora
  editora: Editora;        // Objeto da editora relacionada
}
```

### Editora

```typescript
{
  id: string;              // UUID gerado automaticamente
  nome: string;            // Nome da editora
  endereco?: string;       // Endereço (opcional)
  livros: Livro[];         // Array de livros publicados
}
```

### Relacionamento

- **Um para Muitos**: Uma Editora pode ter vários Livros
- **Muitos para Um**: Cada Livro pertence a uma Editora

---

## 💻 Exemplos de Uso com cURL

### Criar uma Editora

```bash
curl -X POST http://localhost:3000/api/editoras \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Companhia das Letras",
    "endereco": "São Paulo, SP"
  }'
```

### Criar um Livro

```bash
curl -X POST http://localhost:3000/api/livros \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Dom Casmurro",
    "autor": "Machado de Assis",
    "isbn": "978-8535902778",
    "anoPublicacao": 1899,
    "editoraId": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

### Listar Todos os Livros

```bash
curl http://localhost:3000/api/livros
```

### Buscar Livro por ID

```bash
curl http://localhost:3000/api/livros/550e8400-e29b-41d4-a716-446655440001
```

### Buscar Livros por Autor

```bash
curl http://localhost:3000/api/livros/autor/Machado%20de%20Assis
```

### Atualizar um Livro

```bash
curl -X PUT http://localhost:3000/api/livros/550e8400-e29b-41d4-a716-446655440001 \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Dom Casmurro (Edição Especial)"
  }'
```

### Deletar um Livro

```bash
curl -X DELETE http://localhost:3000/api/livros/550e8400-e29b-41d4-a716-446655440001
```

---

## 🐛 Tratamento de Erros

A API retorna códigos HTTP apropriados:

| Código | Descrição | Exemplo |
|--------|-----------|---------|
| **200** | OK | Requisição bem-sucedida |
| **201** | Created | Recurso criado com sucesso |
| **400** | Bad Request | Erro de validação |
| **404** | Not Found | Recurso não encontrado |
| **500** | Server Error | Erro interno do servidor |

**Exemplo de Erro:**
```json
{
  "sucesso": false,
  "mensagem": "Título deve ter no mínimo 3 caracteres"
}
```

---

## 🔍 Logging

A aplicação registra todas as operações importantes:

```
 POST /api/livros
Controller: POST /api/livros
Service: Criando livro com validações
📝 Validando dados do livro...
Dados do livro validados com sucesso
Criando livro: Dom Casmurro
[Repository] Salvando livro no banco...
```

---

## 🧪 Próximos Passos (Sugestões)

- [ ] Implementar testes unitários com Jest
- [ ] Adicionar autenticação JWT
- [ ] Implementar paginação na listagem
- [ ] Adicionar filtros avançados de busca
- [ ] Implementar soft delete
- [ ] Adicionar documentação Swagger/OpenAPI
- [ ] Implementar caching com Redis
- [ ] Adicionar testes de integração
- [ ] Melhorar tratamento de erros
- [ ] Adicionar rate limiting

---

## 📝 Notas Importantes

### Banco de Dados

- As tabelas are criadas **automaticamente** graças ao `synchronize: true` no TypeORM
- Os IDs são do tipo **UUID** (gerados automaticamente)
- Existe uma **restrição de integridade referencial**: livros precisam de uma editora válida

### Validações

- Todas as validações são executadas na camada **Service**
- Mensagens de erro são **específicas** e **informativas**
- IDs inválidos retornam erros **404 Not Found**

### Performance

- Queries utilizam **LEFT JOIN** para evitar N+1 queries
- Dados são **ordenados** (ASC) por padrão
- Relacionamentos são **carregados eagerly** quando necessário

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está licenciado sob a Licença ISC. Veja o arquivo `package.json` para mais detalhes.

---

## 👤 Autor

- **Ana Dascenzio**
- **Projeto**: Pós-Graduação
- **Descrição**: CRUD Biblioteca Virtual

---

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique se o PostgreSQL está rodando
2. Confirme as variáveis de ambiente no `.env`
3. Verifique os logs da aplicação
4. Consulte a documentação do TypeORM: https://typeorm.io/

---

## 🗓️ Últimas Atualizações

- ✅ Estrutura base completa
- ✅ CRUD de Livros e Editoras
- ✅ Validações robustas
- ✅ Tratamento de erros
- ✅ Documentação da API

**Versão Atual**: 1.0.0

---

**Desenvolvido com ❤️ usando Express, TypeORM e PostgreSQL**
