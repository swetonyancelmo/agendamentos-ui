# ❄️ Mais Climatização - Sistema de Agendamentos

Sistema de gestão de serviços de climatização desenvolvido para a **Agência Vanzoff**. Esta aplicação permite que os clientes solicitem serviços de instalação, manutenção e reparo técnico de ar-condicionado de forma inteligente e eficiente.

## 🚀 Funcionalidades

- **Dashboard do Cliente:** Monitorização de todos os pedidos realizados.
- **Agendamento Inteligente:** Escolha de serviço, data e horário com validação.
- **Interface Moderna:** Desenvolvida com React e Mantine UI para uma experiência fluida.
- **Efeito Visual:** Sistema de partículas (neve) que reflete a identidade visual da marca.

## 🛠️ Tecnologias Utilizadas

### Front-end:
- [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- [Mantine UI](https://mantine.dev/) (Componentes de interface)
- [Tabler Icons](https://tabler-icons.io/) (Ícones)
- [Axios](https://axios-http.com/) (Consumo de API)
- [React Router Dom](https://reactrouter.com/) (Navegação)

### Back-end:
- [Java 25](https://www.oracle.com/java/) + [Spring Boot 4](https://spring.io/projects/spring-boot)
- [Spring Security](https://spring.io/projects/spring-security) (Autenticação e Proteção)
- [PostgreSQL](https://www.postgresql.org/) (Base de dados)
- [Docker](https://www.docker.com/) (Contentorização do banco)

## 📦 Como executar o projeto

### Pré-requisitos:
- Node.js instalado
- Java JDK 25
- Docker rodando (para a base de dados)

### Passos:
1. Clone o repositório.
2. No terminal da pasta do front-end (`climatização`):
   ```bash
   npm install
   npm run dev
