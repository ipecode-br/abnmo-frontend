# Sistema Viver Melhor (SVM) - ABNMO - Front-End

Aplicação Front-End do **Sistema Viver Melhor (SVM)**, desenvolvida para a ABNMO. Este sistema foi projetado para equipes multidisciplinares de saúde, proporcionando uma plataforma centralizada para acompanhamento de pacientes, gerenciamento de encaminhamentos e consolidação de informações clínicas.

O sistema otimiza o fluxo de atendimento com integração de dados em uma interface responsiva, acessível e adaptável a diversos dispositivos.

## Tecnologias utilizadas

- **Typescript**: Tipagem estática para maior segurança no desenvolvimento;
- **Next.js 15**: Framework React para renderização híbrida e roteamento eficiente;
- **Tailwind CSS**: Framework CSS utilitário;
- **React Hook Form + Zod**: Gerenciamento de formulários com validação robusta.

## Como executar localmente

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm

### Passos para Configuração

#### 1. Clone o repositório

```bash
git clone https://github.com/ipecode-br/abnmo-frontend
cd abnmo-frontend
```

#### 2. Configure variáveis de ambiente

Copie o arquivo de exemplo `env.sample` e renomoeie para `.env.local`. Ou crie um arquivo com o mesmo nome contendo as seguintes variáveis de ambiente:

```
NEXT_PUBLIC_API_URL=
```

#### 3. Instale dependências e inicie a aplicação

```bash
npm install
npm run dev
```

O aplicativo estará disponível em [http://localhost:3000](http://localhost:3000) por padrão.
