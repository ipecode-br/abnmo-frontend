# Sistema Viver Melhor (SVM) - ABNMO - Front-End

Aplicação Front-End do **Sistema Viver Melhor (SVM)**, desenvolvida para a ABNMO. Este sistema foi projetado para equipes multidisciplinares de saúde, proporcionando uma plataforma centralizada para acompanhamento de pacientes, gerenciamento de encaminhamentos e consolidação de informações clínicas.

O sistema otimiza o fluxo de atendimento com integração de dados em uma interface responsiva, acessível e adaptável a diversos dispositivos.

## Tecnologias utilizadas

- **Typescript**: Tipagem estática para maior segurança no desenvolvimento;
- **Next.js 16**: Framework React para renderização híbrida e roteamento eficiente;
- **Tailwind CSS**: Framework CSS utilitário;
- **React Hook Form + Zod**: Gerenciamento de formulários com validação robusta.

## Como executar localmente

### Pré-requisitos

- Node.js - versão 20.9.0 (LTS) ou superior
- NPM (Node package manager)
- Docker

### Instalação e configuração

#### 1. Clone o repositório e instale as dependências

```bash
git clone https://github.com/ipecode-br/abnmo-frontend
cd abnmo-frontend
npm install
```

#### 2. Configure as variáveis de ambiente

Copie o arquivo de exemplo `env.sample` e renomeie para `.env.local` ou execute o comando:

```bash
cp env.sample .env.local
```

#### 3. Inicie a aplicação

```bash
npm run dev
```

O aplicativo estará disponível em [http://localhost:3000](http://localhost:3000) por padrão.
