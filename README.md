# Movie App Challenge

Este projeto foi desenvolvido como um desafio para consumir a [API do The Movie Database (TMDb)](https://developer.themoviedb.org/docs/getting-started), exibindo informações sobre filmes e permitindo que o usuário filtre por nome ou gênero.

A aplicação foi criada utilizando **React / Next.js**, com integração à API via **Axios**, e estilização com **TailwindCSS**.

Escolhi essas stacks para aproveitar o desafio e também estudar coisas novas, explorando ferramentas modernas do ecossistema JavaScript e boas práticas de desenvolvimento.

---

## Funcionalidades

- Buscar filmes na API do TMDb.
- Listar os principais filmes na tela inicial.
- Filtrar filmes por **nome**.
- Filtrar filmes por **gênero** (ex: Ação, Drama, Comédia, etc).
- Estrutura organizada de **services** para chamadas à API.

---

## Tecnologias Utilizadas

- [React](https://react.dev/) ou [Next.js](https://nextjs.org/)
- [Axios](https://axios-http.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [The Movie Database API (TMDb)](https://developer.themoviedb.org/)

---

## Como Rodar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/movie-app-challenge.git
cd movie-app-challenge
```

### 2. Instalar dependências

```bash
npm install
# ou
yarn install
```

### 3.Crie um arquivo .env.local na raiz do projeto e adicione sua chave da API do TMDb:

```bash
NEXT_PUBLIC_TMDB_API_KEY=coloque_sua_api_key_aqui
```

### 4. Rodar o servidor de desenvolvimento

```bash
npm run dev

# ou

yarn dev
```

## Estrutura do Projeto

```bash
movie-app-challenge/
├── src/
│   ├── app/
│   ├── components/
│   ├── services/
│   ├── middleware/
│   └── utils/
├── public/
├── .env.local.example
├── package.json
└── README.md
```

Desenvolvido por Kelvin Almeida
