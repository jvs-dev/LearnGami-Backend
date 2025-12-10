# LearnGami - Backend

Backend da aplicação de gestão de cursos de Origami com autenticação JWT.

## Requisitos

- Node.js 16+
- npm ou yarn

## Instalação

```bash
# Clonar o repositório
git clone <seu-repositorio>
cd algoritmo-humano-backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Executar migrations do Prisma
npm run prisma:migrate
```

## Estrutura do Projeto

```
src/
├── controllers/       # Lógica de negócio
│   ├── authController.js
│   └── courseController.js
├── middlewares/       # Middlewares do Express
│   └── auth.js
├── routes/           # Definição de rotas
│   ├── authRoutes.js
│   ├── courseRoutes.js
│   └── index.js
├── services/         # Serviços (para futuras expansões)
├── utils/            # Utilitários
│   ├── jwt.js
│   └── password.js
└── server.js         # Arquivo principal

prisma/
├── schema.prisma     # Schema do banco de dados
└── migrations/       # Histórico de migrations
```

## Iniciando o Servidor

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

O servidor estará rodando em `http://localhost:3001`

## Endpoints da API

### Autenticação (Públicos)

#### Registrar Usuário
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "name": "Nome do Usuário",
  "password": "senha123"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

### Cursos (Protegidos)

Todos os endpoints de cursos (exceto `/api/courses/public`) requerem autenticação via JWT.

**Header necessário:**
```
Authorization: Bearer <seu_token_jwt>
```

#### Listar Cursos Públicos (Sem autenticação)
```
GET /api/courses/public
```

#### Criar Curso
```
POST /api/courses
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Título do Curso",
  "description": "Descrição do curso",
  "duration": 40,
  "imageUrl": "https://exemplo.com/imagem.jpg",
  "status": true
}
```

#### Listar Meus Cursos
```
GET /api/courses
Authorization: Bearer <token>
```

#### Obter Curso por ID
```
GET /api/courses/:id
Authorization: Bearer <token>
```

#### Atualizar Curso
```
PUT /api/courses/:id
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Novo título",
  "description": "Nova descrição",
  "duration": 50,
  "imageUrl": "https://novo-url.com/img.jpg",
  "status": true
}
```

#### Deletar Curso
```
DELETE /api/courses/:id
Authorization: Bearer <token>
```

## Autenticação

A aplicação usa **JWT (JSON Web Tokens)** para autenticação. Após o login ou registro bem-sucedido, você receberá um token que deve ser enviado em todas as requisições protegidas no header `Authorization: Bearer <token>`.

O token expira em **7 dias**.

## Banco de Dados

O projeto usa **SQLite** com **Prisma ORM** para gerenciar o banco de dados.

### Tabelas

- **User**: Usuários do sistema
  - id (PK)
  - email (único)
  - name
  - password (hash)
  - createdAt
  - updatedAt

- **Course**: Cursos criados pelos usuários
  - id (PK)
  - title
  - description
  - duration
  - imageUrl
  - status (ativo/inativo)
  - createdAt
  - updatedAt
  - userId (FK)

## Tecnologias Utilizadas

- **Express.js**: Framework web
- **Prisma**: ORM para banco de dados
- **JWT**: Autenticação segura
- **SQLite**: Banco de dados
- **CORS**: Controle de requisições cross-origin
- **dotenv**: Gerencimento de variáveis de ambiente

## Notas de Desenvolvimento

- Senhas são armazenadas como hash SHA-256
- Tokens JWT expiram em 7 dias
- O banco de dados SQLite é salvo em `prisma/dev.db`
- Utilize `npm run prisma:migrate` quando adicionar novas mudanças ao schema

## Próximas Etapas

- [ ] Implementar paginação nos endpoints
- [ ] Adicionar filtros de busca em cursos
- [ ] Implementar upload real de imagens
- [ ] Adicionar testes unitários
- [ ] Expandir modelo com módulos e aulas
- [ ] Deploy em produção

---

**Desenvolvido com ❤️ para o desafio Algoritmo Humano**

## Funcionalidades

### Página Principal (Home)

- Introdução ao conceito de Economia Circular
- Ilustrações dos princípios: **Reduzir, Reutilizar, Reciclar**
- **Carrossel vertical de imagens** com Swiper.js
- **Formulário de contato** com validação básica e feedback visual

### Backend (API RESTful)

- Endpoint `POST /api/submissions`: recebe, salva e envia e-mail com os dados do formulário
- Endpoint `GET /api/submissions`: retorna todas as submissões
- Envio de e-mails com **Nodemailer + Brevo**
- Armazenamento em banco **PostgreSQL**

### Página de Dados (Tabela)

- Tabela responsiva exibindo: Nome, E-mail, Mensagem e Data de Cadastro

---

## Tecnologias Utilizadas

### Frontend

- **React** + **Vite.js**
- **React Router DOM**
- **Styled Components**
- **Swiper.js** (carrossel)
- **Fetch API**, **Google Fonts**, **Ionicons**, **Bootstrap Icons**

### Backend

- **Node.js** + **Express**
- **PostgreSQL** com o driver `pg`
- **Nodemailer**
- **dotenv**, **cors**

---

## Estrutura do Projeto

```
eco-recitec-desafio/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── styles/
│   │   │   ├── MailForm.jsx
│   │   │   ├── MessageBox.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── styles/
│   │   │   ├── DataPage.jsx
│   │   │   └── HomePage.jsx
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.development
│   ├── .env.production
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── src/
│   │   ├── routes.js
│   │   └── server.js
│   ├── .env
│   ├── package.json
│   └── nodemon.json
├── .gitignore
├── README.md
└── docker-compose.yml (opcional)
```

---

## Como Rodar Localmente

### Pré-requisitos

- Node.js
- npm
- PostgreSQL
- Conta na Brevo (Sendinblue) ou outro SMTP

### 1. Backend

```bash
cd backend
npm install
```

Crie `.env` com:

```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
SMTP_HOST="smtp-relay.brevo.com"
SMTP_PORT="587"
SMTP_USER="seu_email@dominio.com"
SMTP_PASS="sua_chave_api"
EMAIL_FROM="seu_email@dominio.com"
```

Crie o banco e a tabela `submissions`:

```sql
CREATE TABLE submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

Inicie o servidor:

```bash
npm run dev
```

Acesse: http://localhost:3001

---

### 2. Frontend

```bash
cd frontend
npm install
npm install swiper
```

Crie `.env.development`:

```
VITE_API_URL="http://localhost:3001"
```

Importe fontes e ícones em `public/index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&family=Poppins:wght@400;500;700;800&display=swap"
/>
<script
  type="module"
  src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
></script>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
/>
```

Inicie:

```bash
npm run dev
```

Acesse: http://localhost:5173

---

## Deploy

### Frontend (Vercel ou Netlify)

- `build command`: `npm run build`
- `publish directory`: `dist`
- Variável `VITE_API_URL`: https://ecorecitecbackend.onrender.com

### Backend (Render)

- Conecte o repositório (pasta `backend`)
- `build command`: `npm install`
- `start command`: `node src/server.js`
- Configure variáveis de ambiente

---

## API - Documentação

### POST `/api/submissions`

#### Corpo:

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "message": "Mensagem aqui"
}
```

#### Respostas:

- `201`: Sucesso
- `400`: Campos obrigatórios
- `500`: Erro interno

---

### GET `/api/submissions`

#### Resposta:

```json
[
  {
    "id": 1,
    "name": "Maria",
    "email": "maria@example.com",
    "message": "Interessada em parcerias.",
    "created_at": "2025-07-04T12:05:30.000Z"
  }
]
```

---

## Critérios Atendidos

- Funcionalidade completa do fluxo: formulário → banco → e-mail → exibição
- UI/UX responsiva e temática
- Código modular, limpo e com boas práticas
- Deploy funcional (pronto para Render + Vercel/Netlify)
- Validações e tratamento de erros
- Documentação clara neste `README.md`

---

## Versionamento

Todo o projeto está versionado e disponível no GitHub:

🔗 **Repositórios**:\
Repositório FrontEnd: *https://github.com/jvs-dev/EcoRecitecFront*\
Repositório BackEnd: *https://github.com/jvs-dev/EcoRecitecBackend*

---

## Contato

**Seu Nome:** João Vitor Santana da Silva  
**E-mail:** jvssilv4@gmail.com  
**LinkedIn:** [https://linkedin.com/in/joão-vitor-dev](https://linkedin.com/in/joão-vitor-dev)

---
