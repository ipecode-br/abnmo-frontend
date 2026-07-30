# Área do Paciente

Portal destinado ao paciente para acesso a informações e documentos.

## Estrutura

```
src/
  app/
    _paciente/               # Rota /paciente (underscore agrupa subdiretórios internos)
      layout.tsx             # Layout com PatientHeader
      page.tsx               # Página inicial com ação principal
      documentos/            # Documentos do paciente
      _action-help/          # Ajuda contextual (rota interna)
      _components/           # Componentes específicos
      _header/               # Header do paciente
```

## Layout

O `_paciente/layout.tsx` verifica permissão de acesso e renderiza `PatientHeader` + `Divider` + conteúdo da página.

## Rotas

| Rota                   | Descrição                  |
| ---------------------- | -------------------------- |
| `/paciente`            | Página inicial do paciente |
| `/paciente/documentos` | Documentos e arquivos      |

## Observações

- O prefixo `_` em `_paciente/` agrupa subdiretórios internos sem criar segmentos de rota visíveis
- Apenas usuários com role `patient` (ou permissão equivalente) acessam esta área
