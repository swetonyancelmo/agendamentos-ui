# Guia de React

Este guia explica os conceitos fundamentais do React para quem está começando. Todos os exemplos usam o contexto deste projeto de agendamentos.

---

## Índice

1. [O que é o React?](#o-que-é-o-react)
2. [Como o React funciona por baixo dos panos](#como-o-react-funciona-por-baixo-dos-panos)
3. [O que é JSX?](#o-que-é-jsx)
4. [Componentes](#componentes)
5. [Props — passando dados entre componentes](#props--passando-dados-entre-componentes)
6. [Estado com useState](#estado-com-usestate)
7. [Efeitos colaterais com useEffect](#efeitos-colaterais-com-useeffect)
8. [Renderização condicional](#renderização-condicional)
9. [Renderizando listas](#renderizando-listas)
10. [Formulários e inputs controlados](#formulários-e-inputs-controlados)
11. [Levantando estado (lifting state up)](#levantando-estado-lifting-state-up)
12. [Resumo rápido](#resumo-rápido)

---

## O que é o React?

O React é uma **biblioteca JavaScript para construir interfaces de usuário**. Em vez de manipular o HTML diretamente (como se faz com jQuery ou JavaScript puro), você descreve **o que** a tela deve mostrar e o React cuida de **como** atualizar o navegador.

**Sem React (JavaScript puro):**

```js
const titulo = document.createElement("h1");
titulo.textContent = "Olá!";
document.body.appendChild(titulo);

// Preciso encontrar o elemento e alterar manualmente
titulo.textContent = "Olá, Maria!";
```

**Com React:**

```jsx
function Saudacao({ nome }) {
  return <h1>Olá, {nome}!</h1>;
}

// Quando "nome" muda, o React atualiza a tela automaticamente
```

A diferença fundamental: com React você **declara** o resultado final. Quando os dados mudam, o React calcula o que precisa ser atualizado na tela e faz apenas essas alterações. Isso é chamado de **programação declarativa**.

---

## Como o React funciona por baixo dos panos

Para entender por que escrevemos código do jeito que escrevemos, é útil saber o fluxo básico:

```
1. Você escreve componentes (funções que retornam JSX)
         ↓
2. O React monta uma árvore virtual (Virtual DOM) com esses componentes
         ↓
3. Quando algum dado muda (estado ou props), o React recalcula o componente
         ↓
4. Ele compara a árvore nova com a antiga (diffing)
         ↓
5. Aplica SOMENTE as mudanças necessárias no DOM real do navegador
```

Esse processo é chamado de **reconciliação**. É por isso que o React é eficiente: ele não redesenha a página inteira, apenas o que mudou.

### O ponto de entrada

No nosso projeto, tudo começa no arquivo `main.jsx`:

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

O que está acontecendo aqui:

1. `document.getElementById("root")` — encontra a `<div id="root">` no `index.html`
2. `createRoot(...)` — cria uma "raiz" do React nessa div
3. `.render(<App />)` — renderiza o componente `App` dentro dela
4. `StrictMode` — modo de desenvolvimento que ajuda a encontrar problemas (não afeta a produção)

A partir daqui, **tudo** que aparece na tela é controlado pelo React, começando pelo `App`.

---

## O que é JSX?

JSX (JavaScript XML) é uma extensão de sintaxe que permite escrever algo que **parece HTML** dentro do JavaScript. Ele não é HTML de verdade — o Vite transforma esse código em chamadas de funções JavaScript antes de enviar para o navegador.

```jsx
// O que você escreve (JSX):
const elemento = <h1 className="titulo">Olá!</h1>;

// O que o navegador recebe (JavaScript):
const elemento = React.createElement("h1", { className: "titulo" }, "Olá!");
```

Você nunca precisa escrever a versão JavaScript. O JSX existe justamente para tornar o código mais legível.

### Regras do JSX

**1. Use `className` em vez de `class`**

Como `class` é uma palavra reservada do JavaScript, no JSX usamos `className`:

```jsx
// ❌ Errado
<div class="container">

// ✅ Correto
<div className="container">
```

**2. Todo elemento deve ser fechado**

Tags que no HTML podem ficar "abertas" precisam ser fechadas no JSX:

```jsx
// ❌ Errado
<img src="foto.jpg">
<br>
<input type="text">

// ✅ Correto
<img src="foto.jpg" />
<br />
<input type="text" />
```

**3. Retorne apenas UM elemento raiz**

Um componente só pode retornar **um** elemento no topo. Se precisa retornar vários, envolva com uma `<div>` ou com um Fragment (`<>...</>`):

```jsx
// ❌ Errado — dois elementos no topo
function Errado() {
  return (
    <h1>Título</h1>
    <p>Texto</p>
  );
}

// ✅ Correto — envolvido com Fragment
function Correto() {
  return (
    <>
      <h1>Título</h1>
      <p>Texto</p>
    </>
  );
}
```

> O Fragment `<> </>` não gera nenhuma tag extra no HTML final. É apenas um "agrupador" para satisfazer a regra do JSX.

**4. Use chaves `{}` para colocar JavaScript dentro do JSX**

Qualquer expressão JavaScript válida pode ser inserida dentro de chaves:

```jsx
function InfoUsuario() {
  const nome = "Ana";
  const idade = 28;
  const ativo = true;

  return (
    <div>
      {/* Variáveis */}
      <p>Nome: {nome}</p>

      {/* Expressões */}
      <p>Ano de nascimento: {2026 - idade}</p>

      {/* Ternário (if inline) */}
      <p>Status: {ativo ? "Ativo" : "Inativo"}</p>

      {/* Chamada de função */}
      <p>Nome maiúsculo: {nome.toUpperCase()}</p>
    </div>
  );
}
```

**5. Comentários dentro do JSX usam `{/* */}`**

```jsx
return (
  <div>
    {/* Isso é um comentário dentro do JSX */}
    <p>Texto</p>
  </div>
);
```

---

## Componentes

Um componente é uma **função JavaScript que retorna JSX**. Pense neles como blocos de LEGO — cada um é uma peça independente da interface que pode ser combinada com outras.

### Criando um componente

```jsx
// src/components/CartaoAgendamento.jsx

function CartaoAgendamento() {
  return (
    <div className="border rounded-lg p-4 shadow">
      <h2 className="text-lg font-bold">Consulta Médica</h2>
      <p className="text-gray-600">15/04/2026 às 14:00</p>
      <span className="text-sm text-green-600">Confirmado</span>
    </div>
  );
}

export default CartaoAgendamento;
```

### Usando o componente

```jsx
import CartaoAgendamento from "./components/CartaoAgendamento";

function PaginaAgendamentos() {
  return (
    <div>
      <h1>Meus Agendamentos</h1>
      <CartaoAgendamento />
      <CartaoAgendamento />
      <CartaoAgendamento />
    </div>
  );
}
```

Cada `<CartaoAgendamento />` renderiza uma cópia independente do componente. Mas nesse exemplo todos mostram os mesmos dados — para torná-los dinâmicos, precisamos de **props**.

### Regras dos componentes

- O nome **sempre** começa com letra maiúscula: `CartaoAgendamento`, não `cartaoAgendamento`
- Cada componente fica em **seu próprio arquivo**: `CartaoAgendamento.jsx`
- O arquivo deve ter um `export default` (ou `export` nomeado) para que outros arquivos possam importá-lo

---

## Props — passando dados entre componentes

Props (abreviação de "properties") são o mecanismo para **passar dados de um componente pai para um componente filho**. Funciona exatamente como passar argumentos para uma função.

### Conceito

```
Componente Pai                        Componente Filho
┌──────────────────┐                  ┌──────────────────┐
│                  │   props          │                  │
│  <CartaoAgend.   │ ──────────────>  │  function Cartao │
│    titulo="..."  │  (dados fluem    │  ({ titulo })    │
│    data="..."    │   do pai para    │                  │
│  />              │   o filho)       │                  │
└──────────────────┘                  └──────────────────┘
```

### Exemplo prático

```jsx
// src/components/CartaoAgendamento.jsx

// Recebe as props por desestruturação de objeto
function CartaoAgendamento({ titulo, data, status }) {
  return (
    <div className="border rounded-lg p-4 shadow">
      <h2 className="text-lg font-bold">{titulo}</h2>
      <p className="text-gray-600">{data}</p>
      <span className="text-sm">{status}</span>
    </div>
  );
}

export default CartaoAgendamento;
```

```jsx
// src/pages/Home.jsx

import CartaoAgendamento from "../components/CartaoAgendamento";

function Home() {
  return (
    <div>
      <h1>Meus Agendamentos</h1>

      <CartaoAgendamento
        titulo="Consulta Médica"
        data="15/04/2026 às 14:00"
        status="Confirmado"
      />

      <CartaoAgendamento
        titulo="Reunião de Projeto"
        data="16/04/2026 às 10:00"
        status="Pendente"
      />
    </div>
  );
}
```

Agora cada cartão mostra dados diferentes, porque recebeu props diferentes.

### Props são somente leitura

Uma regra fundamental: o componente filho **nunca** deve modificar suas props. Elas são somente leitura.

```jsx
// ❌ NUNCA faça isso
function CartaoAgendamento({ titulo }) {
  titulo = "Outro título"; // ERRADO — não modifique props
  return <h2>{titulo}</h2>;
}
```

Se o filho precisa de um valor que muda, ele precisa de **estado** (explicado a seguir).

### Passando funções como props

Props não são apenas textos e números. Você pode passar **funções** para que o filho avise o pai quando algo acontece:

```jsx
function CartaoAgendamento({ titulo, onExcluir }) {
  return (
    <div className="border p-4 rounded">
      <h2>{titulo}</h2>
      <button onClick={onExcluir} className="text-red-500">
        Excluir
      </button>
    </div>
  );
}
```

```jsx
function Home() {
  function handleExcluir(id) {
    console.log("Excluir agendamento:", id);
  }

  return (
    <CartaoAgendamento
      titulo="Consulta Médica"
      onExcluir={() => handleExcluir(1)}
    />
  );
}
```

Fluxo: dados descem (pai → filho via props), eventos sobem (filho → pai via funções callback).

### Children — conteúdo entre tags

Tudo que você coloca **entre** as tags de abertura e fechamento de um componente é acessível pela prop especial `children`:

```jsx
function Painel({ children, titulo }) {
  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">{titulo}</h2>
      <div>{children}</div>
    </div>
  );
}

// Uso:
<Painel titulo="Agendamentos de Hoje">
  <CartaoAgendamento titulo="Consulta" data="14:00" status="Confirmado" />
  <CartaoAgendamento titulo="Reunião" data="16:00" status="Pendente" />
</Painel>
```

Isso é útil para criar componentes de layout que "envolvem" outros componentes.

---

## Estado com useState

O **estado** é a "memória" de um componente — dados que podem **mudar ao longo do tempo** e que, quando mudam, fazem o componente ser renderizado novamente com os novos valores.

### Por que não usar variáveis normais?

```jsx
// ❌ Isso NÃO funciona
function Contador() {
  let contagem = 0;

  function incrementar() {
    contagem = contagem + 1; // O valor muda, mas...
    console.log(contagem);   // ...o React não sabe que mudou!
  }

  // A tela NUNCA vai atualizar, porque o React não está monitorando essa variável
  return (
    <div>
      <p>{contagem}</p>
      <button onClick={incrementar}>+1</button>
    </div>
  );
}
```

O React não monitora variáveis comuns. Para que ele saiba que algo mudou e atualize a tela, você precisa usar `useState`.

### Como usar o useState

```jsx
import { useState } from "react";

function Contador() {
  //    valor atual   função para alterar   valor inicial
  //        ↓              ↓                    ↓
  const [contagem, setContagem] = useState(0);

  function incrementar() {
    setContagem(contagem + 1); // O React sabe que mudou e atualiza a tela
  }

  return (
    <div>
      <p>Cliques: {contagem}</p>
      <button onClick={incrementar}>+1</button>
    </div>
  );
}
```

O `useState` retorna um **array com dois itens**:
1. O **valor atual** do estado
2. Uma **função** para atualizar esse valor

Usamos desestruturação de array para dar nomes a eles: `const [contagem, setContagem]`.

### O que acontece quando o estado muda?

```
1. Usuário clica no botão
         ↓
2. setContagem(contagem + 1) é chamado
         ↓
3. O React agenda uma nova renderização do componente
         ↓
4. A função Contador() roda de novo, mas agora useState retorna o novo valor
         ↓
5. O JSX retornado reflete o novo valor
         ↓
6. O React atualiza SOMENTE o que mudou na tela (ex: o texto "Cliques: 1")
```

### Múltiplos estados

Você pode ter quantos `useState` precisar em um componente:

```jsx
function FormularioAgendamento() {
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [carregando, setCarregando] = useState(false);

  // Cada estado é independente
  // ...
}
```

### Estado com objetos

Para formulários maiores, às vezes é mais prático usar um objeto:

```jsx
function FormularioAgendamento() {
  const [formulario, setFormulario] = useState({
    titulo: "",
    data: "",
    descricao: "",
  });

  function handleChange(campo, valor) {
    setFormulario({
      ...formulario, // mantém os outros campos
      [campo]: valor, // atualiza só o campo que mudou
    });
  }

  return (
    <input
      value={formulario.titulo}
      onChange={(e) => handleChange("titulo", e.target.value)}
    />
  );
}
```

> O `...formulario` é o **spread operator** — ele copia todas as propriedades do objeto. Sem ele, os outros campos seriam perdidos.

### Estado com arrays

```jsx
function ListaAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);

  function adicionar(novo) {
    setAgendamentos([...agendamentos, novo]); // adiciona no final
  }

  function remover(id) {
    setAgendamentos(agendamentos.filter((item) => item.id !== id)); // remove pelo id
  }

  function atualizar(id, novosDados) {
    setAgendamentos(
      agendamentos.map((item) =>
        item.id === id ? { ...item, ...novosDados } : item
      )
    );
  }
}
```

### Regras do useState

1. **Sempre use a função setter** — nunca modifique o estado diretamente
   ```jsx
   // ❌ Errado
   contagem = 5;
   agendamentos.push(novo);

   // ✅ Correto
   setContagem(5);
   setAgendamentos([...agendamentos, novo]);
   ```

2. **Chame hooks apenas no topo do componente** — nunca dentro de `if`, `for` ou funções aninhadas
   ```jsx
   // ❌ Errado
   function Exemplo() {
     if (logado) {
       const [nome, setNome] = useState(""); // ERRADO
     }
   }

   // ✅ Correto
   function Exemplo() {
     const [nome, setNome] = useState(""); // sempre no topo
   }
   ```

---

## Efeitos colaterais com useEffect

O `useEffect` permite executar código em resposta a algo acontecendo — como buscar dados quando a página carrega, ou atualizar o título do navegador quando um valor muda.

### Sintaxe básica

```jsx
import { useEffect } from "react";

useEffect(() => {
  // Código que será executado
}, [dependencias]);
```

### Quando ele executa?

O segundo argumento (array de dependências) controla quando o efeito roda:

**1. Array vazio `[]` — executa UMA vez (quando o componente aparece na tela)**

```jsx
useEffect(() => {
  console.log("Componente montou! Buscando dados...");
  // Ideal para buscar dados da API
}, []);
```

**2. Com dependências `[variavel]` — executa quando a variável muda**

```jsx
const [busca, setBusca] = useState("");

useEffect(() => {
  console.log("O texto de busca mudou para:", busca);
  // Ideal para filtrar resultados, refazer buscas, etc.
}, [busca]);
```

**3. Sem array — executa TODA vez que o componente renderiza**

```jsx
useEffect(() => {
  console.log("Renderizou!"); // Cuidado: pode criar loops infinitos
});
```

> **Evite** useEffect sem array de dependências. Na maioria dos casos, você quer `[]` ou `[variavel]`.

### Exemplo prático: buscando dados da API ao carregar a página

```jsx
import { useState, useEffect } from "react";
import api from "../api/api";

function ListaAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    api
      .get("/agendamentos")
      .then((resposta) => {
        setAgendamentos(resposta.data);
      })
      .catch((erro) => {
        setErro("Não foi possível carregar os agendamentos.");
        console.error(erro);
      })
      .finally(() => {
        setCarregando(false);
      });
  }, []);

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p className="text-red-500">{erro}</p>;

  return (
    <ul>
      {agendamentos.map((item) => (
        <li key={item.id}>{item.titulo}</li>
      ))}
    </ul>
  );
}
```

### Função de limpeza (cleanup)

Quando o efeito cria algo que precisa ser "desfeito" (como um timer ou uma assinatura), você retorna uma função de limpeza:

```jsx
useEffect(() => {
  const intervalo = setInterval(() => {
    console.log("Verificando novos agendamentos...");
  }, 30000); // a cada 30 segundos

  // Função de limpeza: é chamada quando o componente sai da tela
  return () => {
    clearInterval(intervalo);
  };
}, []);
```

Sem a limpeza, o `setInterval` continuaria rodando mesmo depois do componente sumir da tela, causando vazamento de memória.

---

## Renderização condicional

Frequentemente você precisa mostrar coisas diferentes dependendo de uma condição: exibir um loading, mostrar uma mensagem de erro, esconder um botão, etc.

### Com operador ternário `? :`

```jsx
function StatusAgendamento({ confirmado }) {
  return (
    <span>
      {confirmado ? "✅ Confirmado" : "⏳ Pendente"}
    </span>
  );
}
```

### Com `&&` (mostrar ou esconder)

Quando você só quer mostrar algo **se** uma condição for verdadeira (sem o "senão"):

```jsx
function Alerta({ mensagem }) {
  return (
    <div>
      {mensagem && (
        <div className="bg-red-100 text-red-700 p-3 rounded">
          {mensagem}
        </div>
      )}
    </div>
  );
}
```

Se `mensagem` for `null`, `undefined` ou `""` (vazio), nada é renderizado.

### Com retorno antecipado (early return)

Para casos mais complexos, retorne cedo antes do JSX principal:

```jsx
function PaginaAgendamento({ carregando, erro, agendamento }) {
  if (carregando) {
    return <p>Carregando...</p>;
  }

  if (erro) {
    return <p className="text-red-500">Erro: {erro}</p>;
  }

  if (!agendamento) {
    return <p>Agendamento não encontrado.</p>;
  }

  return (
    <div>
      <h1>{agendamento.titulo}</h1>
      <p>{agendamento.descricao}</p>
    </div>
  );
}
```

---

## Renderizando listas

Para renderizar uma lista de dados, usamos o método `.map()` do array dentro do JSX.

### Exemplo básico

```jsx
function ListaAgendamentos({ agendamentos }) {
  return (
    <ul>
      {agendamentos.map((item) => (
        <li key={item.id}>
          {item.titulo} — {item.data}
        </li>
      ))}
    </ul>
  );
}
```

### Por que precisa do `key`?

O `key` é um identificador único que ajuda o React a saber **qual item mudou, foi adicionado ou removido**. Sem ele, o React teria que redesenhar a lista inteira toda vez.

```jsx
// ✅ Bom — usa um ID único do banco de dados
{agendamentos.map((item) => (
  <li key={item.id}>{item.titulo}</li>
))}

// ❌ Evite — usar índice do array pode causar bugs ao reordenar/remover itens
{agendamentos.map((item, index) => (
  <li key={index}>{item.titulo}</li>
))}
```

### Lista com componentes

```jsx
function ListaAgendamentos({ agendamentos, onExcluir }) {
  if (agendamentos.length === 0) {
    return <p className="text-gray-500">Nenhum agendamento encontrado.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {agendamentos.map((item) => (
        <CartaoAgendamento
          key={item.id}
          titulo={item.titulo}
          data={item.data}
          status={item.status}
          onExcluir={() => onExcluir(item.id)}
        />
      ))}
    </div>
  );
}
```

---

## Formulários e inputs controlados

No React, a forma recomendada de trabalhar com formulários é usando **inputs controlados** — onde o React é a "fonte da verdade" do valor do input.

### Input controlado

```jsx
import { useState } from "react";

function FormularioAgendamento() {
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // Impede o reload da página

    const novoAgendamento = { titulo, data, descricao };
    console.log("Enviando:", novoAgendamento);

    // Limpa o formulário após enviar
    setTitulo("");
    setData("");
    setDescricao("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <div>
        <label className="block text-sm font-medium mb-1">Título</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="Ex: Consulta médica"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Data</label>
        <input
          type="datetime-local"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Descrição</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full border rounded px-3 py-2"
          rows={3}
          placeholder="Detalhes do agendamento..."
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Criar Agendamento
      </button>
    </form>
  );
}
```

### Por que `e.preventDefault()`?

Por padrão, quando um formulário HTML é enviado, o navegador **recarrega a página inteira**. No React, não queremos isso — queremos tratar o envio com JavaScript. O `e.preventDefault()` cancela o comportamento padrão do navegador.

### Como funciona o fluxo de um input controlado

```
1. Usuário digita "C" no input
         ↓
2. O evento onChange dispara
         ↓
3. O handler chama setTitulo("C")
         ↓
4. O React re-renderiza o componente
         ↓
5. O input exibe value={titulo} → "C"
```

O React é **sempre** a fonte da verdade. O input só exibe o que está no estado.

---

## Levantando estado (lifting state up)

Quando dois componentes irmãos precisam compartilhar o mesmo dado, o estado deve ser colocado no **componente pai** mais próximo que contém ambos. Isso é chamado de "lifting state up" (levantar o estado).

### Problema: dois componentes precisam do mesmo dado

```
                    Pai (App)
                   /         \
          Filtro (input)    Lista (resultados)

O Filtro precisa atualizar o texto de busca.
A Lista precisa ler o texto de busca para filtrar.
```

### Solução: o estado fica no pai

```jsx
function PaginaAgendamentos() {
  // Estado "levantado" para o pai
  const [busca, setBusca] = useState("");
  const [agendamentos, setAgendamentos] = useState([...]);

  const agendamentosFiltrados = agendamentos.filter((item) =>
    item.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div>
      {/* Filtro recebe a função para atualizar a busca */}
      <CampoBusca valor={busca} onChange={setBusca} />

      {/* Lista recebe os dados já filtrados */}
      <ListaAgendamentos agendamentos={agendamentosFiltrados} />
    </div>
  );
}

function CampoBusca({ valor, onChange }) {
  return (
    <input
      type="text"
      value={valor}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Buscar agendamento..."
    />
  );
}

function ListaAgendamentos({ agendamentos }) {
  return (
    <ul>
      {agendamentos.map((item) => (
        <li key={item.id}>{item.titulo}</li>
      ))}
    </ul>
  );
}
```

---

## Resumo rápido

| Conceito                 | Para que serve                                 | Exemplo de uso                        |
| ------------------------ | ---------------------------------------------- | ------------------------------------- |
| **Componente**           | Pedaço reutilizável da interface               | `<CartaoAgendamento />`               |
| **Props**                | Passar dados do pai para o filho               | `<Cartao titulo="..." />`            |
| **useState**             | Guardar dados que mudam com o tempo            | Valor de um input, lista de itens     |
| **useEffect**            | Executar código quando algo acontece           | Buscar dados da API ao carregar       |
| **Renderização cond.**   | Mostrar algo dependendo de uma condição        | Loading, mensagens de erro            |
| **map + key**            | Renderizar listas de dados                     | Lista de agendamentos                 |
| **Formulários**          | Capturar entrada do usuário                    | Criar/editar agendamento              |
| **Lifting state**        | Compartilhar estado entre componentes irmãos   | Filtro + lista compartilhando busca   |
