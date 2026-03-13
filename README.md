# Agendamentos UI

Interface do sistema de agendamentos, construída com **React**, **Vite**, **Tailwind CSS**, **Axios** e **React Router**.

---

## Pré-requisitos

| Ferramenta | Versão mínima | Como verificar      |
| ---------- | ------------- | -------------------- |
| Node.js    | 18+           | `node -v`            |
| npm        | 9+            | `npm -v`             |

> Baixe o Node.js em [https://nodejs.org](https://nodejs.org). O npm já vem incluso.

---

## Instalação e execução

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>

# 2. Entre na pasta do projeto
cd agendamentos-ui

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Após o passo 4, o terminal exibirá um endereço local (geralmente `http://localhost:5173`). Abra-o no navegador.

---

## Scripts disponíveis

| Comando           | O que faz                                           |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Inicia o servidor de desenvolvimento com hot-reload |
| `npm run build`   | Gera a versão de produção na pasta `dist/`          |
| `npm run preview` | Serve a versão de produção localmente para teste    |
| `npm run lint`    | Verifica problemas de código com ESLint             |

---

## Estrutura do projeto

```
agendamentos-ui/
├── public/                  # Arquivos estáticos (favicon, imagens públicas)
├── src/
│   ├── api/
│   │   └── api.js           # Instância do Axios (configuração base da API)
│   ├── components/          # Componentes reutilizáveis (botões, inputs, cards…)
│   ├── pages/               # Páginas da aplicação (cada rota = uma página)
│   ├── App.jsx              # Componente raiz — onde ficam as rotas
│   ├── main.jsx             # Ponto de entrada — monta o React no HTML
│   └── index.css            # Estilos globais + importação do Tailwind
├── docs/                    # Documentação de apoio
├── index.html               # HTML base (o React é injetado aqui)
├── vite.config.js           # Configuração do Vite + plugins
├── package.json             # Dependências e scripts
└── README.md                # Este arquivo
```

### Onde colocar cada coisa?

| Eu quero criar…                  | Coloco em…         | Exemplo de nome          |
| -------------------------------- | ------------------- | ------------------------ |
| Uma página inteira               | `src/pages/`        | `Home.jsx`               |
| Um pedaço reutilizável de tela   | `src/components/`   | `BotaoAgendar.jsx`       |
| Uma função de chamada à API      | `src/api/`          | `agendamentoService.js`  |

---

## Convenções do projeto

### Nomenclatura de arquivos

- **Componentes e páginas:** `PascalCase` → `BotaoAgendar.jsx`, `Home.jsx`
- **Utilitários e serviços:** `camelCase` → `api.js`, `agendamentoService.js`

### Organização de um componente

```jsx
// 1. Imports
import { useState } from "react";
import api from "../api/api";

// 2. Componente
function MeuComponente() {
  // 3. Estados
  const [dados, setDados] = useState([]);

  // 4. Funções/handlers
  function handleClick() {
    // ...
  }

  // 5. Retorno (JSX)
  return (
    <div>
      <button onClick={handleClick}>Ação</button>
    </div>
  );
}

// 6. Export
export default MeuComponente;
```

### Fluxo de trabalho

```
1. Crie a página em src/pages/
2. Adicione a rota no App.jsx
3. Extraia partes reutilizáveis para src/components/
4. Use src/api/api.js para comunicação com o backend
```

---

## Documentação de apoio

Se você é novo no projeto ou em React, leia os guias abaixo na ordem sugerida:

| #  | Guia                                            | O que você vai aprender                              |
| -- | ----------------------------------------------- | ---------------------------------------------------- |
| 1  | [React](docs/react.md)                         | Componentes, JSX, props, estado, hooks, formulários  |
| 2  | [React Router](docs/react-router.md)           | Navegação entre páginas sem recarregar               |
| 3  | [Axios](docs/axios.md)                         | Comunicação com o backend (GET, POST, PUT, DELETE)   |
| 4  | [Tailwind CSS](docs/tailwind.md)               | Estilização com classes utilitárias                  |
| 5  | [Endpoints do Backend](docs/endpoints.md)      | Endpoints disponíveis e como fazer requisições neles |
