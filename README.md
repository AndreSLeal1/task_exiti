# TaskFlow - Gerenciador de Tarefas

![TaskFlow Preview](https://img.shields.io/badge/status-active-success) 
![React](https://img.shields.io/badge/React-18.2-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6)

Uma aplicação moderna para gerenciamento de tarefas com dashboard interativo e sistema completo de CRUD.

## ✨ Funcionalidades Principais

- **Dashboard Inicial Animado**
- **Gerenciamento Completo de Tarefas**
  - Criação, edição e exclusão
  - Filtros por status (Pendente/Em andamento/Concluído)
  - Ordenação por data ou título
- **Interface Responsiva**
- **Integração com API REST**
- **Sistema de Loading e Tratamento de Erros**
- **Animações Fluidas com Framer Motion**

## 🛠 Tecnologias Utilizadas

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **React Query** - Gerenciamento de estado
- **Framer Motion** - Animações
- **React Icons** - Ícones
- **Zod** - Validação de dados
- **Axios** - Cliente HTTP

## ⚙ Pré-requisitos

- Node.js 22.13.1
- NPM 10.9.2
- API Backend em execução (http://localhost:8080)

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/AndreSLeal1/task_exiti.git
```
## Instale as dependências:
````bash
npm install
````
## Crie o arquivo de ambiente:
```bash
cp .env.example .env.local
```
## Inicie o servidor de desenvolvimento:
````bash
npm run dev
````
## Estrutura do Projeto
- taskexiti/
- ├── app/
- │   ├── tasks/          # Página principal de gerenciamento
- │   ├── tasks/new/      # Criação de novas tarefas
- │   └── tasks/[id]/edit # Edição de tarefas
- ├── components/         # Componentes reutilizáveis
- ├── lib/                # Utilitários e configurações
- ├── services/           # Comunicação com API
- ├── types/              # Tipos TypeScript
- └── public/             # Assets estáticos
