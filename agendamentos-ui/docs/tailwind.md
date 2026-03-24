# Guia de Tailwind CSS

Este guia explica como usar o Tailwind CSS para estilizar os componentes neste projeto.

---

## Índice

1. [O que é o Tailwind CSS?](#o-que-é-o-tailwind-css)
2. [Como funciona na prática](#como-funciona-na-prática)
3. [Espaçamento (padding e margin)](#espaçamento-padding-e-margin)
4. [Tipografia (textos)](#tipografia-textos)
5. [Cores](#cores)
6. [Bordas e arredondamento](#bordas-e-arredondamento)
7. [Largura e altura](#largura-e-altura)
8. [Flexbox — alinhando elementos](#flexbox--alinhando-elementos)
9. [Grid — layouts em grade](#grid--layouts-em-grade)
10. [Responsividade](#responsividade)
11. [Estados (hover, focus, active)](#estados-hover-focus-active)
12. [Sombras](#sombras)
13. [Exemplo prático: construindo um card](#exemplo-prático-construindo-um-card)
14. [Dicas e padrões comuns](#dicas-e-padrões-comuns)
15. [Referência rápida](#referência-rápida)

---

## O que é o Tailwind CSS?

O Tailwind CSS é um framework de **classes utilitárias**. Em vez de escrever CSS em arquivos separados, você aplica classes diretamente no `className` dos elementos.

### Comparação: CSS tradicional vs Tailwind

**CSS Tradicional:**

```css
/* styles.css */
.botao {
  background-color: #3b82f6;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: bold;
}

.botao:hover {
  background-color: #2563eb;
}
```

```jsx
<button className="botao">Clique aqui</button>
```

**Tailwind CSS:**

```jsx
<button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600">
  Clique aqui
</button>
```

Sem arquivo CSS separado. Tudo em um lugar só.

### Vantagens

- **Sem inventar nomes** — você não precisa pensar em nomes como `.botao-primario-grande-destaque`
- **Sem trocar de arquivo** — o estilo está junto do componente
- **Consistência** — os valores são padronizados (espaçamentos, cores, tamanhos seguem uma escala fixa)
- **CSS final menor** — o Tailwind remove automaticamente as classes que você não usou

---

## Como funciona na prática

Cada classe do Tailwind corresponde a **uma propriedade CSS**:

| Classe Tailwind  | CSS equivalente                   |
| ---------------- | --------------------------------- |
| `p-4`            | `padding: 1rem`                   |
| `mt-2`           | `margin-top: 0.5rem`             |
| `text-lg`        | `font-size: 1.125rem`            |
| `bg-blue-500`    | `background-color: #3b82f6`      |
| `rounded`        | `border-radius: 0.25rem`         |
| `flex`           | `display: flex`                   |
| `hidden`         | `display: none`                   |

Você combina essas classes para criar o visual desejado.

---

## Espaçamento (padding e margin)

O Tailwind usa uma **escala numérica** para espaçamentos. Cada unidade equivale a `0.25rem` (4px):

| Valor | Tamanho   | Exemplo visual        |
| ----- | --------- | --------------------- |
| `0`   | 0px       |                       |
| `1`   | 4px       | ·                     |
| `2`   | 8px       | ··                    |
| `3`   | 12px      | ···                   |
| `4`   | 16px      | ····                  |
| `6`   | 24px      | ······                |
| `8`   | 32px      | ········              |
| `10`  | 40px      | ··········            |
| `12`  | 48px      | ············          |
| `16`  | 64px      | ················      |

### Padding (espaçamento interno)

```jsx
<div className="p-4">   {/* padding de 16px em TODOS os lados */}
<div className="px-4">  {/* padding horizontal (esquerda e direita) */}
<div className="py-2">  {/* padding vertical (cima e baixo) */}
<div className="pt-6">  {/* padding só em cima (top) */}
<div className="pb-4">  {/* padding só embaixo (bottom) */}
<div className="pl-2">  {/* padding só na esquerda (left) */}
<div className="pr-2">  {/* padding só na direita (right) */}
```

### Margin (espaçamento externo)

A mesma lógica, mas com `m`:

```jsx
<div className="m-4">   {/* margin em todos os lados */}
<div className="mx-auto"> {/* margin horizontal automática (centraliza) */}
<div className="mt-8">  {/* margin só em cima */}
<div className="mb-4">  {/* margin só embaixo */}
```

### Gap (espaçamento entre elementos filhos)

```jsx
<div className="flex gap-4">  {/* espaço de 16px entre cada filho */}
  <span>Item 1</span>
  <span>Item 2</span>
  <span>Item 3</span>
</div>
```

---

## Tipografia (textos)

### Tamanho de fonte

```jsx
<p className="text-xs">Muito pequeno (12px)</p>
<p className="text-sm">Pequeno (14px)</p>
<p className="text-base">Normal (16px)</p>
<p className="text-lg">Grande (18px)</p>
<p className="text-xl">Extra grande (20px)</p>
<p className="text-2xl">2x grande (24px)</p>
<p className="text-3xl">3x grande (30px)</p>
<p className="text-4xl">4x grande (36px)</p>
```

### Peso (negrito)

```jsx
<p className="font-light">Leve</p>
<p className="font-normal">Normal</p>
<p className="font-medium">Médio</p>
<p className="font-semibold">Semi-negrito</p>
<p className="font-bold">Negrito</p>
```

### Alinhamento

```jsx
<p className="text-left">Esquerda</p>
<p className="text-center">Centro</p>
<p className="text-right">Direita</p>
```

### Cor do texto

```jsx
<p className="text-black">Preto</p>
<p className="text-white">Branco</p>
<p className="text-gray-500">Cinza médio</p>
<p className="text-gray-700">Cinza escuro</p>
<p className="text-red-500">Vermelho</p>
<p className="text-blue-600">Azul</p>
<p className="text-green-500">Verde</p>
```

---

## Cores

O Tailwind tem uma paleta de cores com **tonalidades de 50 a 950**. Quanto maior o número, mais escura a cor.

```
50   100   200   300   400   500   600   700   800   900   950
claro ─────────────────────────────────────────────────── escuro
```

### Aplicando cores

```jsx
// Fundo
<div className="bg-blue-500">    {/* fundo azul */}
<div className="bg-gray-100">    {/* fundo cinza claro */}
<div className="bg-white">       {/* fundo branco */}

// Texto
<p className="text-blue-500">    {/* texto azul */}
<p className="text-gray-700">    {/* texto cinza escuro */}

// Borda
<div className="border border-gray-300">  {/* borda cinza */}
<div className="border border-red-500">   {/* borda vermelha */}
```

### Cores disponíveis

`slate`, `gray`, `zinc`, `neutral`, `stone`, `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`

---

## Bordas e arredondamento

### Bordas

```jsx
<div className="border">             {/* borda fina de 1px em todos os lados */}
<div className="border-2">           {/* borda de 2px */}
<div className="border-b">           {/* borda só embaixo */}
<div className="border-t">           {/* borda só em cima */}
<div className="border-gray-300">    {/* cor da borda */}
```

### Arredondamento

```jsx
<div className="rounded">      {/* leve arredondamento (4px) */}
<div className="rounded-md">   {/* médio (6px) */}
<div className="rounded-lg">   {/* grande (8px) */}
<div className="rounded-xl">   {/* extra grande (12px) */}
<div className="rounded-2xl">  {/* 2x grande (16px) */}
<div className="rounded-full"> {/* totalmente redondo (círculo) */}
```

---

## Largura e altura

```jsx
// Largura fixa
<div className="w-64">     {/* 256px */}
<div className="w-full">   {/* 100% do pai */}
<div className="w-screen"> {/* 100% da tela */}

// Largura máxima (muito útil para centralizar conteúdo)
<div className="max-w-md mx-auto">   {/* máximo 448px, centralizado */}
<div className="max-w-lg mx-auto">   {/* máximo 512px, centralizado */}
<div className="max-w-4xl mx-auto">  {/* máximo 896px, centralizado */}

// Altura
<div className="h-16">      {/* 64px */}
<div className="h-screen">  {/* 100% da altura da tela */}
<div className="min-h-screen"> {/* altura mínima = tela inteira */}
```

---

## Flexbox — alinhando elementos

O Flexbox é o sistema de layout mais usado no Tailwind. Ele alinha elementos em uma **linha** ou **coluna**.

### Linha horizontal (padrão)

```jsx
<div className="flex">
  <span>Item 1</span>
  <span>Item 2</span>
  <span>Item 3</span>
</div>
```

```
[ Item 1 ][ Item 2 ][ Item 3 ]
```

### Coluna vertical

```jsx
<div className="flex flex-col">
  <span>Item 1</span>
  <span>Item 2</span>
  <span>Item 3</span>
</div>
```

```
[ Item 1 ]
[ Item 2 ]
[ Item 3 ]
```

### Alinhamento horizontal (justify)

```jsx
// Espaço entre os itens
<div className="flex justify-between">
  <span>Esquerda</span>
  <span>Direita</span>
</div>
// [ Esquerda          Direita ]

// Centralizado
<div className="flex justify-center">
  <span>Centro</span>
</div>
//           [ Centro ]

// Final (direita)
<div className="flex justify-end">
  <span>Direita</span>
</div>
//                    [ Direita ]
```

### Alinhamento vertical (items)

```jsx
// Centralizar verticalmente
<div className="flex items-center h-16">
  <span>Centralizado verticalmente</span>
</div>

// No topo
<div className="flex items-start">

// Embaixo
<div className="flex items-end">
```

### Centralizar no meio da tela (combo clássico)

```jsx
<div className="flex items-center justify-center h-screen">
  <p>Estou no centro exato da tela!</p>
</div>
```

### Espaçamento entre itens

```jsx
<div className="flex gap-4">     {/* 16px entre cada item */}
<div className="flex gap-2">     {/* 8px entre cada item */}
<div className="flex flex-col gap-6">  {/* coluna com 24px de espaço */}
```

---

## Grid — layouts em grade

Para layouts em grade (como cards lado a lado), use `grid`:

```jsx
// 3 colunas iguais
<div className="grid grid-cols-3 gap-4">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
  <div>Card 4</div>
  <div>Card 5</div>
  <div>Card 6</div>
</div>
```

```
[ Card 1 ] [ Card 2 ] [ Card 3 ]
[ Card 4 ] [ Card 5 ] [ Card 6 ]
```

### Grid responsivo

```jsx
// 1 coluna no mobile, 2 no tablet, 3 no desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>
```

---

## Responsividade

O Tailwind usa a abordagem **mobile-first**: os estilos base valem para telas pequenas, e você adiciona **prefixos** para telas maiores.

### Breakpoints

| Prefixo | Largura mínima | Dispositivo típico  |
| ------- | -------------- | ------------------- |
| (nenhum)| 0px            | Celular             |
| `sm:`   | 640px          | Celular grande      |
| `md:`   | 768px          | Tablet              |
| `lg:`   | 1024px         | Notebook            |
| `xl:`   | 1280px         | Desktop             |
| `2xl:`  | 1536px         | Tela grande         |

### Como ler

```jsx
<h1 className="text-2xl md:text-4xl lg:text-6xl">
  Título responsivo
</h1>
```

Traduzindo:
- **Celular** (padrão): texto `2xl` (24px)
- **Tablet** (md: 768px+): texto `4xl` (36px)
- **Desktop** (lg: 1024px+): texto `6xl` (60px)

### Exemplo: layout que muda com a tela

```jsx
<div className="flex flex-col md:flex-row gap-4">
  {/* No celular: itens empilhados (coluna)     */}
  {/* No tablet+: itens lado a lado (linha)      */}
  <div className="w-full md:w-1/2">Metade esquerda</div>
  <div className="w-full md:w-1/2">Metade direita</div>
</div>
```

### Esconder/mostrar elementos

```jsx
<p className="hidden md:block">
  Este texto só aparece em tablet e desktop
</p>

<p className="block md:hidden">
  Este texto só aparece no celular
</p>
```

---

## Estados (hover, focus, active)

Adicione prefixos para estilizar estados interativos:

```jsx
// Hover (mouse em cima)
<button className="bg-blue-500 hover:bg-blue-700">
  Escurece ao passar o mouse
</button>

// Focus (quando o input está selecionado)
<input className="border focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />

// Active (enquanto o botão está sendo clicado)
<button className="bg-blue-500 active:bg-blue-800">
  Mais escuro ao clicar
</button>

// Disabled (desabilitado)
<button className="bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed" disabled>
  Desabilitado
</button>
```

---

## Sombras

```jsx
<div className="shadow-sm">    {/* sombra suave */}
<div className="shadow">       {/* sombra padrão */}
<div className="shadow-md">    {/* sombra média */}
<div className="shadow-lg">    {/* sombra grande */}
<div className="shadow-xl">    {/* sombra extra grande */}
<div className="shadow-none">  {/* sem sombra */}
```

---

## Exemplo prático: construindo um card

Vamos construir um card de agendamento passo a passo:

### Passo 1: estrutura básica

```jsx
<div>
  <h2>Consulta Médica</h2>
  <p>15/04/2026 às 14:00</p>
  <span>Confirmado</span>
</div>
```

### Passo 2: adicionar borda, arredondamento e espaçamento

```jsx
<div className="border rounded-lg p-4">
  <h2>Consulta Médica</h2>
  <p>15/04/2026 às 14:00</p>
  <span>Confirmado</span>
</div>
```

### Passo 3: tipografia e cores

```jsx
<div className="border rounded-lg p-4">
  <h2 className="text-lg font-bold text-gray-800">Consulta Médica</h2>
  <p className="text-sm text-gray-500 mt-1">15/04/2026 às 14:00</p>
  <span className="text-sm text-green-600 font-medium">Confirmado</span>
</div>
```

### Passo 4: sombra e layout com flex

```jsx
<div className="border rounded-lg p-4 shadow-sm hover:shadow-md flex justify-between items-center">
  <div>
    <h2 className="text-lg font-bold text-gray-800">Consulta Médica</h2>
    <p className="text-sm text-gray-500 mt-1">15/04/2026 às 14:00</p>
  </div>
  <span className="text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
    Confirmado
  </span>
</div>
```

### Resultado final como componente

```jsx
function CartaoAgendamento({ titulo, data, status }) {
  const corStatus = {
    confirmado: "text-green-600 bg-green-50",
    pendente: "text-yellow-600 bg-yellow-50",
    cancelado: "text-red-600 bg-red-50",
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md flex justify-between items-center">
      <div>
        <h2 className="text-lg font-bold text-gray-800">{titulo}</h2>
        <p className="text-sm text-gray-500 mt-1">{data}</p>
      </div>
      <span
        className={`text-sm font-medium px-3 py-1 rounded-full ${corStatus[status]}`}
      >
        {status}
      </span>
    </div>
  );
}
```

---

## Dicas e padrões comuns

### Centralizar conteúdo na página

```jsx
<main className="max-w-4xl mx-auto px-4 py-8">
  {/* Conteúdo centralizado com largura máxima */}
</main>
```

### Input estilizado

```jsx
<input
  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
  type="text"
  placeholder="Digite algo..."
/>
```

### Botão primário

```jsx
<button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 active:bg-blue-700">
  Salvar
</button>
```

### Botão de perigo (excluir)

```jsx
<button className="bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600 active:bg-red-700">
  Excluir
</button>
```

### Botão outline (secundário)

```jsx
<button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 active:bg-gray-100">
  Cancelar
</button>
```

### Página com altura mínima da tela

```jsx
<div className="min-h-screen bg-gray-50 flex flex-col">
  <header>...</header>
  <main className="flex-1">...</main>
  <footer>...</footer>
</div>
```

---

## Referência rápida

| Categoria       | Classes comuns                                                          |
| --------------- | ----------------------------------------------------------------------- |
| Espaçamento     | `p-4`, `px-2`, `py-6`, `m-4`, `mt-2`, `mb-4`, `gap-4`                |
| Texto           | `text-lg`, `text-center`, `font-bold`, `text-white`, `text-gray-700`  |
| Cores fundo     | `bg-blue-500`, `bg-gray-100`, `bg-white`                               |
| Bordas          | `border`, `rounded`, `rounded-lg`, `border-gray-300`                   |
| Layout          | `flex`, `flex-col`, `grid`, `items-center`, `justify-between`          |
| Tamanho         | `w-full`, `h-screen`, `max-w-md`, `min-h-screen`                      |
| Responsivo      | `sm:`, `md:`, `lg:`, `xl:` (prefixos)                                 |
| Hover/Focus     | `hover:bg-blue-700`, `focus:ring-2`, `active:bg-blue-800`             |
| Sombras         | `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`                        |
| Display         | `hidden`, `block`, `inline`, `flex`, `grid`                            |

> Documentação completa: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
