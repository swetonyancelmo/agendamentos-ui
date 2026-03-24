# Endpoints do Backend

Documentação dos endpoints disponíveis atualmente na API (`http://localhost:8080`).

> Para entender como usar o Axios nas requisições, consulte o [Guia de Axios](axios.md).

---

## Índice

1. [Customers (Clientes)](#customers-clientes)
2. [Auth (Autenticação)](#auth-autenticação)
3. [Services (Serviços)](#services-serviços)

---

## Customers (Clientes)

Endpoints de gerenciamento de clientes.

### Listar todos os clientes

```
GET /api/customer/listAll
```

```jsx
import api from "../api/api";

const resposta = await api.get("/api/customer/listAll");
console.log(resposta.data); // Lista de clientes
```

---

### Buscar cliente por e-mail

```
GET /api/customer/search/{email}
```

```jsx
const email = "cliente@email.com";
const resposta = await api.get(`/api/customer/search/${email}`);
console.log(resposta.data); // Dados do cliente
```

---

### Atualizar cliente

```
PUT /api/customer/update/{email}
```

```jsx
const email = "cliente@email.com";
const dadosAtualizados = {
  nome: "Maria Silva",
  telefone: "(11) 99999-0000",
};

const resposta = await api.put(`/api/customer/update/${email}`, dadosAtualizados);
console.log(resposta.data); // Cliente atualizado
```

---

### Excluir cliente

```
DELETE /api/customer/delete/{email}
```

```jsx
const email = "cliente@email.com";
await api.delete(`/api/customer/delete/${email}`);
```

---

### Exemplo completo: página que lista clientes

```jsx
import { useState, useEffect } from "react";
import api from "../api/api";

function ListaClientes() {
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await api.get("/api/customer/listAll");
        setClientes(resposta.data);
      } catch (erro) {
        setErro("Não foi possível carregar os clientes.");
        console.error(erro);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p className="text-red-500">{erro}</p>;

  return (
    <div className="flex flex-col gap-4">
      {clientes.map((cliente) => (
        <div key={cliente.email} className="border rounded-lg p-4">
          <h2 className="font-bold">{cliente.nome}</h2>
          <p className="text-gray-500 text-sm">{cliente.email}</p>
        </div>
      ))}
    </div>
  );
}

export default ListaClientes;
```

---

## Auth (Autenticação)

Endpoints de autenticação e registro de empresas e clientes.

### Registrar empresa

```
POST /auth/register
```

```jsx
const dadosEmpresa = {
  nome: "Barbearia do João",
  email: "joao@barbearia.com",
  senha: "senhaSegura123",
};

const resposta = await api.post("/auth/register", dadosEmpresa);
console.log(resposta.data); // Dados da empresa registrada ou token
```

---

### Login de empresa

```
POST /auth/login
```

```jsx
const credenciais = {
  email: "joao@barbearia.com",
  senha: "senhaSegura123",
};

const resposta = await api.post("/auth/login", credenciais);
console.log(resposta.data); // Token de autenticação

// Salvar o token para usar nas próximas requisições
localStorage.setItem("token", resposta.data.token);
```

---

### Registrar cliente

```
POST /auth/customer/register
```

```jsx
const dadosCliente = {
  nome: "Maria Silva",
  email: "maria@email.com",
  senha: "senhaSegura123",
};

const resposta = await api.post("/auth/customer/register", dadosCliente);
console.log(resposta.data); // Dados do cliente registrado ou token
```

---

### Login de cliente

```
POST /auth/customer/login
```

```jsx
const credenciais = {
  email: "maria@email.com",
  senha: "senhaSegura123",
};

const resposta = await api.post("/auth/customer/login", credenciais);
console.log(resposta.data); // Token de autenticação

localStorage.setItem("token", resposta.data.token);
```

---

### Exemplo completo: tela de login

```jsx
import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/api";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro(null);
    setCarregando(true);

    try {
      const resposta = await api.post("/auth/login", { email, senha });
      localStorage.setItem("token", resposta.data.token);
      navigate("/");
    } catch (erro) {
      if (erro.response?.status === 401) {
        setErro("E-mail ou senha incorretos.");
      } else {
        setErro("Erro ao fazer login. Tente novamente.");
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        {erro && (
          <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
            {erro}
          </p>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="seu@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Sua senha"
            required
          />
        </div>

        <button
          type="submit"
          disabled={carregando}
          className="bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {carregando ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

export default Login;
```

---

## Services (Serviços)

Endpoint para criação de serviços oferecidos por uma empresa.

### Cadastrar serviço

```
POST /api/business/services
```

```jsx
const novoServico = {
  nome: "Corte de Cabelo",
  preco: 35.00,
  duracao: 30,
};

const resposta = await api.post("/api/business/services", novoServico);
console.log(resposta.data); // Serviço criado
```

> **Nota:** Este endpoint provavelmente requer autenticação (token). Certifique-se de que o interceptor do Axios está configurado para enviar o token (veja o [Guia de Axios — Interceptors](axios.md#interceptors--tratamento-global-de-erros-e-tokens)).

---

### Exemplo completo: formulário de cadastro de serviço

```jsx
import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/api";

function NovoServico() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [duracao, setDuracao] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setCarregando(true);

    try {
      await api.post("/api/business/services", {
        nome,
        preco: parseFloat(preco),
        duracao: parseInt(duracao),
      });
      alert("Serviço cadastrado com sucesso!");
      navigate("/");
    } catch (erro) {
      alert("Erro ao cadastrar serviço.");
      console.error(erro);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto flex flex-col gap-4 p-6"
    >
      <h1 className="text-2xl font-bold">Novo Serviço</h1>

      <div>
        <label className="block text-sm font-medium mb-1">Nome do serviço</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Ex: Corte de Cabelo"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Preço (R$)</label>
        <input
          type="number"
          step="0.01"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Ex: 35.00"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Duração (minutos)</label>
        <input
          type="number"
          value={duracao}
          onChange={(e) => setDuracao(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Ex: 30"
          required
        />
      </div>

      <button
        type="submit"
        disabled={carregando}
        className="bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {carregando ? "Cadastrando..." : "Cadastrar Serviço"}
      </button>
    </form>
  );
}

export default NovoServico;
```

---

## Resumo dos endpoints

| Método   | Endpoint                          | Descrição              |
| -------- | --------------------------------- | ---------------------- |
| `GET`    | `/api/customer/listAll`           | Listar todos clientes  |
| `GET`    | `/api/customer/search/{email}`    | Buscar cliente         |
| `PUT`    | `/api/customer/update/{email}`    | Atualizar cliente      |
| `DELETE` | `/api/customer/delete/{email}`    | Excluir cliente        |
| `POST`   | `/auth/register`                  | Registrar empresa      |
| `POST`   | `/auth/login`                     | Login de empresa       |
| `POST`   | `/auth/customer/register`         | Registrar cliente      |
| `POST`   | `/auth/customer/login`            | Login de cliente       |
| `POST`   | `/api/business/services`          | Cadastrar serviço      |
