# Documentação do Dashboard

## Visão Geral

O **Dashboard** é a área principal de gerenciamento do sistema, utilizada para monitorar pacientes, acessar relatórios e gerenciar informações.

- Apenas usuários profissionais (`admin`, `nurse`, `specialist`, `manager`) podem acessá-lo.
- Pacientes não têm acesso ao Dashboard, apenas ao seu painel individual (`PatientDashboard`)
- O acesso é controlado pelo sistema de permissões.

## Estrutura de Pastas e Rotas

O **Dashboard** está localizado em:

```
src/
  app/
    (dashboard)/
```

Cada subpasta representa uma rota que herda automaticamente o layout principal, exceto pastas prefixados com `_`, que são componentes auxiliares.

### Rotas principais

- `/` → Visão geral do **Dashboard**.

- `/pacientes` → Página de gerenciamento de pacientes.

- `/encaminhados` → Página de encaminhamentos de pacientes **(em desenvolvimento, layout ainda não definido)**.

- `/aprovacoes` → Página de aprovações e validações **(em desenvolvimento, layout ainda não definido)**.

- `/configuracoes` → Página de configurações do sistema.

- `/suporte` → Página de suporte do sistema.

## Layout Principal

o **layout principal** do Dashboard está definido em:

```
src/
  app/
    (dashboard)/
      layout.tsx
```

É responsável por estruturar a interface comum a todas as páginas do Dashboard.

Ele garante que os elementos persistentes, como o **DashboardHeader** e **DashboardSidebar**, permaneçam visíveis enquanto o conteúdo da página atual é carregado.

**Observação**:
Todas as subpastas dentro de `(dashboard)` herdam automaticamente esse layout, exceto pastas prefixadas com `_` (componentes auxiliares).

### Controle de acesso

Antes de renderizar qualquer página do Dashboard, o layout verifica se o usuário possui permissão para acessar a área

```tsx
const canAccess = await canUser('view', 'Dashboard')

if (!canAccess) {
  redirect(ROUTES.patient.main)
}
```

- Usuários que **não têm acesso** são **redirecionados** para o painel do paciente (`ROUTES.patient.main`).

- Apenas os profissionais acessam o Dashboard.

### Components principais do layout

- **`DashboardHeader`** → Cabeçalho do Dashboard.

- **`DashboardSidebar`** → Menu lateral com navegação entre páginas do Dashboard e que exibe informação de usuário.

- **`children`** → Área onde a página específica é renderizada, de acordo com a rota acessada.

## Página inicial do Dashboard

```
src/
  app/
    (dashboard)/
        page.tsx
```

**Nota:** Esta página está em evolução. Atualmente exibe apenas indicadores básicos, mas novas funcionalidades serão adicionadas futuramente.

A página inicial do **Dashboard** é responsável por exibir uma visão geral rápida dos principais indicadores relacionados aos pacientes.
Ela serve como ponto de entrada para profissionais acompanharem o status do sistema.

### Funcionalidades principais

- **Exibe cards resumidos com métricas `DashboardOverviewPatientsCard`**
- Total de pacientes.
- Pacientes ativos.
- Pacientes inativos.
- Mostra um gráfico de distribuição por gênero dos pacientes `DashboardGenderChartCard`.
- Utiliza o `DashboardContainer` para manter a consistência visual e o espaçamento do layout, que é utilizado em qualquer nova tela do **`(dashboard)`**

### Observações

- Atualmente, os dados vêm de `PATIENTS_MOCKS` (dados mockados para prototipação).
- No futuro, esses dados devem ser carregados via **API/integração** real com o **backend**.

## Componentes auxiliares

Esses componentes ficam em pastar prefixadas com `_` dentro de `(dashboard)` e **não representam rotas**, mas fornecem funcionalidades e estuturas reutilizáveis:

- `_header` → Define o cabeçalho do Dashboard (ações rápidas, etc.). Mostra a navegação hierárquica da página atual.

- `_sidebar` → Define a navegação lateral, exibindo links para as páginas do Dashboard, informação de usuário e ações rápidas.

- `_cards` → Conjunto de cards reutilizados em diferentes partes do Dashboard, como os de métricas e gráficos da página inicial.
