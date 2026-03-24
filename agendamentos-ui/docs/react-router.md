# Guia de React Router

Este guia explica como funciona a navegação entre páginas usando o React Router neste projeto.

---

## Índice

1. [O que é o React Router?](#o-que-é-o-react-router)
2. [SPA — Single Page Application](#spa--single-page-application)
3. [Configuração das rotas](#configuração-das-rotas)
4. [Navegando com Link](#navegando-com-link)
5. [Navegando por código com useNavigate](#navegando-por-código-com-usenavigate)
6. [Rotas com parâmetros dinâmicos](#rotas-com-parâmetros-dinâmicos)
7. [Página 404 — rota não encontrada](#página-404--rota-não-encontrada)
8. [Layout compartilhado (rotas aninhadas)](#layout-compartilhado-rotas-aninhadas)
9. [Resumo rápido](#resumo-rápido)

---

## O que é o React Router?

Em um site tradicional, quando você clica em um link, o navegador faz uma **nova requisição ao servidor**, que devolve uma página HTML completamente nova. A tela fica branca por um instante e todo o conteúdo é recarregado.

O React Router permite criar **navegação entre páginas sem recarregar o navegador**. Quando o usuário clica em um link, apenas o conteúdo que muda é trocado — a página não recarrega, o cabeçalho continua no lugar, e a experiência é muito mais fluida.

### Comparação visual

```
Site Tradicional (sem React Router):

  Clique em "Agendamentos"
         ↓
  Navegador envia requisição ao servidor
         ↓
  Servidor retorna HTML COMPLETO da nova página
         ↓
  Tela pisca / recarrega inteira
         ↓
  Nova página aparece

────────────────────────────────────

SPA com React Router:

  Clique em "Agendamentos"
         ↓
  React Router intercepta o clique
         ↓
  A URL muda (ex: /agendamentos)
         ↓
  React Router renderiza SOMENTE o componente dessa rota
         ↓
  A transição é instantânea, sem recarregar
```

---

## SPA — Single Page Application

Este projeto é uma **SPA (Single Page Application)**. Isso significa que existe apenas **um arquivo HTML** (`index.html`). O React Router controla o que aparece na tela com base na URL.

```
URL: /              →  Renderiza o componente <Home />
URL: /novo          →  Renderiza o componente <NovoAgendamento />
URL: /editar/5      →  Renderiza o componente <EditarAgendamento /> com id=5
URL: /qualquercoisa →  Renderiza o componente <NaoEncontrado /> (404)
```

O HTML nunca muda — o que muda é qual componente React está sendo renderizado.

---

## Configuração das rotas

As rotas são definidas no arquivo `App.jsx`, que é o componente raiz da aplicação.

### Estrutura básica

```jsx
// src/App.jsx

import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import NovoAgendamento from "./pages/NovoAgendamento";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/novo" element={<NovoAgendamento />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### Explicação de cada parte

| Componente      | O que faz                                                                 |
| --------------- | ------------------------------------------------------------------------- |
| `BrowserRouter` | Envolve toda a aplicação e habilita o sistema de rotas                    |
| `Routes`        | Agrupa todas as rotas — o React Router procura a que corresponde à URL   |
| `Route`         | Define UMA rota — associa um `path` (URL) a um `element` (componente)   |

### Como funciona

Quando o usuário acessa `http://localhost:5173/novo`:

1. O `BrowserRouter` detecta que a URL é `/novo`
2. O `Routes` percorre seus filhos `Route` de cima para baixo
3. Encontra `<Route path="/novo" ...>` — deu match!
4. Renderiza o componente `<NovoAgendamento />`

---

## Navegando com Link

Para criar links de navegação interna, use o componente `<Link>` em vez da tag HTML `<a>`.

### Por que não usar `<a>`?

```jsx
// ❌ NÃO use <a> para links internos
<a href="/novo">Novo Agendamento</a>
// Isso causa um RELOAD completo da página — perde o estado, pisca a tela

// ✅ Use <Link> para links internos
<Link to="/novo">Novo Agendamento</Link>
// Troca de rota instantânea, sem recarregar
```

> Use `<a>` apenas para links **externos** (ex: `<a href="https://google.com">`).

### Exemplo: menu de navegação

```jsx
import { Link } from "react-router";

function Menu() {
  return (
    <nav className="flex gap-6 p-4 bg-gray-100 border-b">
      <Link to="/" className="text-blue-600 hover:underline">
        Início
      </Link>
      <Link to="/novo" className="text-blue-600 hover:underline">
        Novo Agendamento
      </Link>
    </nav>
  );
}

export default Menu;
```

### Estilizando o link ativo

Para destacar o link da página atual, use o componente `NavLink`:

```jsx
import { NavLink } from "react-router";

function Menu() {
  return (
    <nav className="flex gap-6 p-4">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-blue-600 font-bold" : "text-gray-600"
        }
      >
        Início
      </NavLink>

      <NavLink
        to="/novo"
        className={({ isActive }) =>
          isActive ? "text-blue-600 font-bold" : "text-gray-600"
        }
      >
        Novo Agendamento
      </NavLink>
    </nav>
  );
}
```

O `NavLink` funciona igual ao `Link`, mas recebe um argumento `isActive` que é `true` quando a URL atual corresponde ao `to` do link.

---

## Navegando por código com useNavigate

Às vezes você precisa redirecionar o usuário **sem ele clicar em um link** — por exemplo, após salvar um formulário ou fazer login.

### Exemplo: redirecionar após salvar

```jsx
import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/api";

function NovoAgendamento() {
  const [titulo, setTitulo] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/agendamentos", { titulo });
      alert("Agendamento criado com sucesso!");
      navigate("/"); // Redireciona para a página inicial
    } catch (erro) {
      alert("Erro ao criar agendamento.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título"
      />
      <button type="submit">Salvar</button>
    </form>
  );
}
```

### Outras opções do navigate

```jsx
const navigate = useNavigate();

navigate("/");           // Vai para a rota "/"
navigate("/editar/5");   // Vai para uma rota específica
navigate(-1);            // Volta para a página anterior (como botão "voltar" do navegador)
navigate(-2);            // Volta duas páginas
```

---

## Rotas com parâmetros dinâmicos

Para criar rotas como `/agendamento/1`, `/agendamento/2`, etc., usamos **parâmetros dinâmicos** com `:`.

### Definindo a rota

```jsx
// src/App.jsx

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/novo" element={<NovoAgendamento />} />
  <Route path="/agendamento/:id" element={<DetalhesAgendamento />} />
</Routes>
```

O `:id` é um **parâmetro** — ele aceita qualquer valor:
- `/agendamento/1` → id = "1"
- `/agendamento/42` → id = "42"
- `/agendamento/abc` → id = "abc"

### Lendo o parâmetro no componente

```jsx
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import api from "../api/api";

function DetalhesAgendamento() {
  const { id } = useParams(); // Extrai o :id da URL
  const [agendamento, setAgendamento] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    api
      .get(`/agendamentos/${id}`)
      .then((resposta) => setAgendamento(resposta.data))
      .catch((erro) => console.error(erro))
      .finally(() => setCarregando(false));
  }, [id]);

  if (carregando) return <p>Carregando...</p>;
  if (!agendamento) return <p>Agendamento não encontrado.</p>;

  return (
    <div>
      <h1>{agendamento.titulo}</h1>
      <p>{agendamento.descricao}</p>
      <p>Data: {agendamento.data}</p>
    </div>
  );
}
```

Note que `[id]` está no array de dependências do `useEffect`. Assim, se o `id` mudar (o usuário navega de `/agendamento/1` para `/agendamento/2`), os dados são buscados novamente.

### Criando links para rotas dinâmicas

```jsx
function ListaAgendamentos({ agendamentos }) {
  return (
    <ul>
      {agendamentos.map((item) => (
        <li key={item.id}>
          <Link to={`/agendamento/${item.id}`}>
            {item.titulo}
          </Link>
        </li>
      ))}
    </ul>
  );
}
```

---

## Página 404 — rota não encontrada

Quando o usuário acessa uma URL que não existe (ex: `/pagina-que-nao-existe`), podemos mostrar uma página 404.

### Configuração

```jsx
// src/App.jsx

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/novo" element={<NovoAgendamento />} />
  <Route path="/agendamento/:id" element={<DetalhesAgendamento />} />

  {/* Rota "coringa" — captura qualquer URL que não deu match acima */}
  <Route path="*" element={<NaoEncontrado />} />
</Routes>
```

### O componente 404

```jsx
// src/pages/NaoEncontrado.jsx

import { Link } from "react-router";

function NaoEncontrado() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-6xl font-bold text-gray-300">404</h1>
      <p className="text-gray-600">Página não encontrada.</p>
      <Link to="/" className="text-blue-500 hover:underline">
        Voltar para o início
      </Link>
    </div>
  );
}

export default NaoEncontrado;
```

O `path="*"` funciona como um "coringa" — captura qualquer URL que não correspondeu a nenhuma rota anterior. **Sempre coloque essa rota por último.**

---

## Layout compartilhado (rotas aninhadas)

Quando várias páginas compartilham o mesmo layout (ex: cabeçalho + menu lateral + rodapé), usamos **rotas aninhadas** para evitar repetir o layout em cada página.

### O problema

```jsx
// ❌ Sem rotas aninhadas — repetição de layout em cada página
function Home() {
  return (
    <>
      <Menu />
      <main><h1>Home</h1></main>
      <Rodape />
    </>
  );
}

function NovoAgendamento() {
  return (
    <>
      <Menu />
      <main><h1>Novo</h1></main>
      <Rodape />
    </>
  );
}
```

### A solução: layout com Outlet

```jsx
// src/components/Layout.jsx

import { Outlet } from "react-router";
import Menu from "./Menu";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Menu />

      <main className="flex-1 p-6">
        {/* O Outlet renderiza o componente da rota filha atual */}
        <Outlet />
      </main>

      <footer className="p-4 text-center text-gray-500 border-t">
        © 2026 Agendamentos
      </footer>
    </div>
  );
}

export default Layout;
```

```jsx
// src/App.jsx

import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NovoAgendamento from "./pages/NovoAgendamento";
import NaoEncontrado from "./pages/NaoEncontrado";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pai com layout */}
        <Route element={<Layout />}>
          {/* Rotas filhas — renderizadas no <Outlet /> do Layout */}
          <Route path="/" element={<Home />} />
          <Route path="/novo" element={<NovoAgendamento />} />
          <Route path="*" element={<NaoEncontrado />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### Como funciona

```
URL: /novo

App
└── Layout (sempre presente)
    ├── Menu
    ├── <main>
    │   └── <Outlet /> → renderiza <NovoAgendamento />
    └── <footer>
```

O `<Outlet />` é o "buraco" no layout onde o React Router injeta o componente da rota filha correspondente à URL atual. O `Menu` e o `footer` permanecem fixos — só o conteúdo do `<Outlet />` troca.

---

## Resumo rápido

| Conceito            | Componente/Hook   | Para que serve                                      |
| ------------------- | ----------------- | --------------------------------------------------- |
| Definir rotas       | `Route`           | Associar uma URL a um componente                    |
| Agrupar rotas       | `Routes`          | Procurar a rota que corresponde à URL               |
| Habilitar rotas     | `BrowserRouter`   | Envolver a aplicação para ativar o sistema de rotas |
| Link de navegação   | `Link`            | Criar link que não recarrega a página               |
| Link ativo          | `NavLink`         | Link que sabe se está na rota ativa                 |
| Redirecionar        | `useNavigate()`   | Navegar por código (após form, login, etc.)         |
| Parâmetro de URL    | `useParams()`     | Ler `:id` e outros parâmetros da URL                |
| Layout              | `Outlet`          | Renderizar a rota filha dentro de um layout         |
| Página 404          | `path="*"`        | Capturar URLs que não existem                       |
