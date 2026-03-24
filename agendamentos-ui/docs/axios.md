# Guia de Axios

Este guia explica como usar o Axios para comunicar o frontend (React) com o backend (API) neste projeto.

---

## Índice

1. [O que é o Axios?](#o-que-é-o-axios)
2. [Como a comunicação frontend ↔ backend funciona](#como-a-comunicação-frontend--backend-funciona)
3. [A instância configurada do projeto](#a-instância-configurada-do-projeto)
4. [Métodos HTTP — GET, POST, PUT, DELETE](#métodos-http--get-post-put-delete)
5. [Tratamento de erros](#tratamento-de-erros)
6. [async/await vs .then()](#asyncawait-vs-then)
7. [Padrão completo: componente com busca, loading e erro](#padrão-completo-componente-com-busca-loading-e-erro)
8. [Criando um serviço de API organizado](#criando-um-serviço-de-api-organizado)
9. [Interceptors — tratamento global de erros e tokens](#interceptors--tratamento-global-de-erros-e-tokens)
10. [Resumo rápido](#resumo-rápido)

---

## O que é o Axios?

O Axios é uma biblioteca para fazer **requisições HTTP** — ou seja, enviar e receber dados de um servidor (API).

Imagine que o frontend é o **garçom** e o backend é a **cozinha**:

```
Frontend (garçom)         ←→  Axios (o pedido)  ←→  Backend (cozinha)

"Quero a lista de              GET /agendamentos        Banco de dados
 agendamentos"                                          processa e retorna
                                                        os dados

"Crie um novo                  POST /agendamentos       Banco de dados
 agendamento"                  { titulo: "Consulta" }   salva e confirma
```

O Axios é o mecanismo que leva o "pedido" do frontend ao backend e traz a "resposta" de volta.

---

## Como a comunicação frontend ↔ backend funciona

Quando o Axios faz uma requisição, acontece o seguinte:

```
1. O código JavaScript chama api.get("/agendamentos")
         ↓
2. O Axios monta uma requisição HTTP:
   GET http://localhost:8080/agendamentos
         ↓
3. A requisição viaja pela rede até o servidor backend
         ↓
4. O backend processa (consulta o banco, aplica regras de negócio)
         ↓
5. O backend retorna uma RESPOSTA com:
   - Status: 200 (sucesso), 404 (não encontrado), 500 (erro), etc.
   - Body: os dados em formato JSON
         ↓
6. O Axios recebe a resposta e a disponibiliza no código
         ↓
7. O React usa os dados para atualizar a tela
```

### A estrutura de uma resposta do Axios

Quando uma requisição é bem-sucedida, o Axios retorna um objeto com várias propriedades:

```js
const resposta = await api.get("/agendamentos");

resposta.data;    // Os dados retornados pelo backend (o que você mais vai usar)
resposta.status;  // Código HTTP (200, 201, 404, 500...)
resposta.headers; // Cabeçalhos da resposta
```

Na **grande maioria das vezes**, você só precisa do `resposta.data`.

---

## A instância configurada do projeto

O arquivo `src/api/api.js` contém uma instância do Axios já configurada:

```js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export default api;
```

### O que é `baseURL`?

É o **endereço base** do servidor backend. Com ela configurada, você não precisa repetir o endereço completo em cada chamada:

```js
// Sem baseURL — precisa escrever o endereço completo toda vez
axios.get("http://localhost:8080/agendamentos");
axios.post("http://localhost:8080/agendamentos", dados);
axios.delete("http://localhost:8080/agendamentos/1");

// Com baseURL — muito mais limpo
api.get("/agendamentos");
api.post("/agendamentos", dados);
api.delete("/agendamentos/1");
```

Se o endereço do backend mudar (ex: para produção), você altera **em um lugar só**.

### Como importar nos componentes

```js
import api from "../api/api";
```

> O caminho `../api/api` pode variar dependendo de onde está o arquivo que importa. Se estiver em `src/pages/Home.jsx`, é `"../api/api"`. Se estiver em `src/components/Lista.jsx`, também é `"../api/api"`.

---

## Métodos HTTP — GET, POST, PUT, DELETE

Cada método HTTP corresponde a uma **ação diferente** no backend:

| Método   | Ação                  | Exemplo                                     |
| -------- | --------------------- | ------------------------------------------- |
| `GET`    | Buscar dados          | Listar agendamentos, ver detalhes de um     |
| `POST`   | Criar novo recurso    | Criar um novo agendamento                   |
| `PUT`    | Atualizar um recurso  | Editar um agendamento existente             |
| `DELETE` | Remover um recurso    | Excluir um agendamento                      |

### GET — Buscar dados

```jsx
// Buscar TODOS os agendamentos
const resposta = await api.get("/agendamentos");
console.log(resposta.data); // [{ id: 1, titulo: "Consulta" }, ...]

// Buscar UM agendamento pelo ID
const resposta = await api.get("/agendamentos/1");
console.log(resposta.data); // { id: 1, titulo: "Consulta", ... }

// Buscar com filtros (query params)
const resposta = await api.get("/agendamentos", {
  params: {
    status: "pendente",
    data: "2026-04-01",
  },
});
// URL final: GET http://localhost:8080/agendamentos?status=pendente&data=2026-04-01
```

### POST — Criar

```jsx
const novoAgendamento = {
  titulo: "Consulta Médica",
  data: "2026-04-15T14:00:00",
  descricao: "Checkup anual",
};

const resposta = await api.post("/agendamentos", novoAgendamento);
console.log(resposta.data);   // O objeto criado, geralmente com o ID gerado
console.log(resposta.status); // 201 (Created)
```

### PUT — Atualizar

```jsx
const dadosAtualizados = {
  titulo: "Consulta Médica - Atualizada",
  data: "2026-04-16T15:00:00",
  descricao: "Checkup anual (remarcado)",
};

const resposta = await api.put("/agendamentos/1", dadosAtualizados);
console.log(resposta.data); // O objeto atualizado
```

### DELETE — Remover

```jsx
await api.delete("/agendamentos/1");
// Geralmente o DELETE não retorna dados, apenas o status 200 ou 204
```

---

## Tratamento de erros

Nem sempre as requisições dão certo. O servidor pode estar fora do ar, os dados podem ser inválidos, ou o recurso pode não existir. É **fundamental** tratar erros.

### Com try/catch (recomendado com async/await)

```jsx
async function criarAgendamento(dados) {
  try {
    const resposta = await api.post("/agendamentos", dados);
    return resposta.data;
  } catch (erro) {
    if (erro.response) {
      // O servidor respondeu com um status de erro (4xx, 5xx)
      console.error("Status:", erro.response.status);
      console.error("Dados:", erro.response.data);

      if (erro.response.status === 400) {
        alert("Dados inválidos. Verifique os campos.");
      } else if (erro.response.status === 404) {
        alert("Recurso não encontrado.");
      } else if (erro.response.status === 500) {
        alert("Erro interno do servidor. Tente novamente mais tarde.");
      }
    } else if (erro.request) {
      // A requisição foi feita, mas não houve resposta (servidor offline)
      console.error("Sem resposta do servidor");
      alert("Não foi possível conectar ao servidor. Verifique sua conexão.");
    } else {
      // Algo deu errado ao montar a requisição
      console.error("Erro:", erro.message);
    }
  }
}
```

### Entendendo o objeto de erro

```
erro.response  → existe quando o servidor RESPONDEU com erro (400, 404, 500)
  ├── erro.response.status  → código HTTP (400, 404, 500...)
  ├── erro.response.data    → corpo da resposta (mensagem de erro do backend)
  └── erro.response.headers → cabeçalhos da resposta

erro.request   → existe quando a requisição foi ENVIADA mas não houve resposta
                  (servidor offline, timeout, problema de rede)

erro.message   → mensagem genérica de erro
```

---

## async/await vs .then()

Existem duas formas de lidar com requisições assíncronas. Ambas funcionam, mas `async/await` é mais legível.

### Usando .then() (estilo mais antigo)

```jsx
function buscarAgendamentos() {
  api
    .get("/agendamentos")
    .then((resposta) => {
      setAgendamentos(resposta.data);
    })
    .catch((erro) => {
      console.error(erro);
    })
    .finally(() => {
      setCarregando(false);
    });
}
```

### Usando async/await (recomendado)

```jsx
async function buscarAgendamentos() {
  try {
    const resposta = await api.get("/agendamentos");
    setAgendamentos(resposta.data);
  } catch (erro) {
    console.error(erro);
  } finally {
    setCarregando(false);
  }
}
```

O `await` "pausa" a execução da função até a requisição completar. Isso torna o código mais linear e fácil de ler.

### Usando async/await dentro do useEffect

O `useEffect` **não aceita** funções assíncronas diretamente. A solução é criar uma função async interna:

```jsx
useEffect(() => {
  // ❌ ERRADO — useEffect não pode receber async diretamente
  // useEffect(async () => { ... })

  // ✅ CORRETO — cria uma função async dentro do useEffect e chama ela
  async function carregarDados() {
    try {
      const resposta = await api.get("/agendamentos");
      setAgendamentos(resposta.data);
    } catch (erro) {
      setErro("Falha ao carregar dados.");
    } finally {
      setCarregando(false);
    }
  }

  carregarDados();
}, []);
```

---

## Padrão completo: componente com busca, loading e erro

Este é o padrão mais comum que você vai usar no projeto. Copie como base ao criar novas páginas que buscam dados:

```jsx
import { useState, useEffect } from "react";
import api from "../api/api";

function ListaAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarAgendamentos() {
      try {
        const resposta = await api.get("/agendamentos");
        setAgendamentos(resposta.data);
      } catch (erro) {
        setErro("Não foi possível carregar os agendamentos.");
        console.error(erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarAgendamentos();
  }, []);

  async function excluir(id) {
    if (!confirm("Tem certeza que deseja excluir?")) return;

    try {
      await api.delete(`/agendamentos/${id}`);
      setAgendamentos(agendamentos.filter((item) => item.id !== id));
    } catch (erro) {
      alert("Erro ao excluir agendamento.");
      console.error(erro);
    }
  }

  if (carregando) {
    return <p className="text-center py-10">Carregando...</p>;
  }

  if (erro) {
    return <p className="text-center py-10 text-red-500">{erro}</p>;
  }

  if (agendamentos.length === 0) {
    return <p className="text-center py-10 text-gray-500">Nenhum agendamento encontrado.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {agendamentos.map((item) => (
        <div key={item.id} className="border rounded p-4 flex justify-between items-center">
          <div>
            <h2 className="font-bold">{item.titulo}</h2>
            <p className="text-gray-600 text-sm">{item.data}</p>
          </div>
          <button
            onClick={() => excluir(item.id)}
            className="text-red-500 hover:text-red-700"
          >
            Excluir
          </button>
        </div>
      ))}
    </div>
  );
}

export default ListaAgendamentos;
```

### O que esse padrão cobre

1. **Estado de loading** — mostra "Carregando..." enquanto a requisição está em andamento
2. **Estado de erro** — mostra mensagem de erro se a requisição falhar
3. **Estado vazio** — mostra mensagem se a lista estiver vazia
4. **Dados carregados** — renderiza a lista de agendamentos
5. **Ação de exclusão** — remove do backend e atualiza a lista local

---

## Criando um serviço de API organizado

Conforme o projeto cresce, é uma boa prática centralizar as chamadas de API em arquivos de "serviço":

```js
// src/api/agendamentoService.js

import api from "./api";

export async function listarAgendamentos() {
  const resposta = await api.get("/agendamentos");
  return resposta.data;
}

export async function buscarAgendamento(id) {
  const resposta = await api.get(`/agendamentos/${id}`);
  return resposta.data;
}

export async function criarAgendamento(dados) {
  const resposta = await api.post("/agendamentos", dados);
  return resposta.data;
}

export async function atualizarAgendamento(id, dados) {
  const resposta = await api.put(`/agendamentos/${id}`, dados);
  return resposta.data;
}

export async function excluirAgendamento(id) {
  await api.delete(`/agendamentos/${id}`);
}
```

### Usando o serviço nos componentes

```jsx
import { listarAgendamentos, excluirAgendamento } from "../api/agendamentoService";

function ListaAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await listarAgendamentos();
        setAgendamentos(dados);
      } catch (erro) {
        console.error(erro);
      }
    }
    carregar();
  }, []);

  async function handleExcluir(id) {
    await excluirAgendamento(id);
    setAgendamentos(agendamentos.filter((item) => item.id !== id));
  }
}
```

### Vantagens

- As URLs e lógica de requisição ficam em **um lugar só**
- Se a URL mudar no backend, você altera em **um arquivo**, não em vários componentes
- O componente fica mais limpo e focado na interface

---

## Interceptors — tratamento global de erros e tokens

Interceptors são funções que rodam **automaticamente** em toda requisição ou resposta. Útil para:

- Adicionar um token de autenticação em todas as requisições
- Tratar erros 401 (não autenticado) globalmente

### Exemplo: adicionando token de autenticação

```js
// src/api/api.js

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// Interceptor de REQUISIÇÃO — roda ANTES de cada requisição ser enviada
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Interceptor de RESPOSTA — roda DEPOIS de cada resposta ser recebida
api.interceptors.response.use(
  (resposta) => resposta, // Sucesso: retorna normalmente
  (erro) => {
    if (erro.response?.status === 401) {
      // Token expirou ou inválido — redireciona para login
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(erro);
  }
);

export default api;
```

> Não se preocupe com interceptors agora se o projeto ainda não tem autenticação. Quando precisar, volte aqui.

---

## Resumo rápido

| O que eu quero fazer?             | Como fazer                                           |
| --------------------------------- | ---------------------------------------------------- |
| Buscar lista de dados             | `const resp = await api.get("/rota")`                |
| Buscar um item por ID             | `const resp = await api.get("/rota/1")`              |
| Criar um item novo                | `await api.post("/rota", dados)`                     |
| Atualizar um item                 | `await api.put("/rota/1", dados)`                    |
| Excluir um item                   | `await api.delete("/rota/1")`                        |
| Tratar erros                      | Envolva com `try/catch`                              |
| Buscar dados ao carregar a página | Use `useEffect` + `async function` interna           |
| Organizar chamadas                | Crie arquivos de serviço em `src/api/`               |
