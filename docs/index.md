# Documentação do projeto

Bem-vindo à documentação do projeto ABNMO Frontend. Guia completo para desenvolvedores com diretrizes, padrões e boas práticas.

## Sobre o projeto

Next.js 16 (App Router) com TypeScript, Tailwind CSS v4 e arquitetura escalável.

## Estrutura da documentação

### Diretrizes fundamentais

- **[Convenções de nomenclatura](./naming.md)** — Regras para nomeação de arquivos, componentes e pastas
- **[Organização de arquivos e pastas](./files-and-folders.md)** — Como estruturar e onde criar novos arquivos
- **[Permissões](./permissions.md)** — Sistema de permissões baseado em Features
- **[Gerenciamento de estado](./state-management.md)** — Zustand + TanStack Query
- **[Proxy](./proxy.md)** — Proteção de rotas (substituto do middleware)

### Componentes

- **[Ícones](./components/icons.md)** — Como utilizar ícones do Lucide
- **[Modais](./components/modal.md)** — Como criar dialogs com Base UI
- **[Formulários](./components/form.md)** — React Hook Form + Zod
- **[Tabelas](./components/table.md)** — Tabelas de dados com filtros e paginação
- **[Gráficos](./components/charts.md)** — Gráficos com Recharts

### Features

- **[Autenticação](./features/auth.md)** — Login, cadastro, recuperação de senha
- **[Dashboard](./features/dashboard.md)** — Área principal de gerenciamento
- **[Área do paciente](./features/patients-area.md)** — Portal do paciente

## Como usar esta documentação

1. **Novos desenvolvedores**: Comece pelas diretrizes fundamentais
2. **Desenvolvimento de features**: Consulte as seções específicas de componentes e features
3. **Revisão de código**: Use os checklists para garantir conformidade
4. **Dúvidas**: Procure exemplos práticos em cada seção

## Tecnologias principais

- **Framework**: Next.js 16 (App Router)
- **Linguagem**: TypeScript (strict)
- **Estilização**: Tailwind CSS v4
- **Formulários**: React Hook Form + Zod
- **Estado**: Zustand (global) + TanStack Query (servidor)
- **UI**: Base UI (`@base-ui/react`) + CVA + Lucide React
- **Gráficos**: Recharts
- **Testes**: Jest + Testing Library

---

**Última atualização**: Julho de 2026
