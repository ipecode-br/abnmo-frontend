# Guias de estilização

Bem-vindo ao guia de estilização do projeto! Este diretório contém documentação sobre como usar Tailwind CSS v4.

## Documentos

### [Tailwind Guide](./tailwind-guide.md)

Guia completo sobre estilização com Tailwind CSS v4. Inclui:

- ✅ Tokens do design system
- ✅ Regras fundamentais (valores arbitrários, `size-*`, espaçamento, etc)
- ✅ Padrões comuns
- ✅ Animações e sombras
- ✅ Breakpoints e responsividade
- ✅ Dicas de performance

### [Exemplos e Anti-patterns](./examples-and-antipatterns.md)

Exemplos práticos do projeto mostrando:

- ✅ Boas práticas encontradas no código
- ✅ Anti-padrões e como corrigi-los
- ✅ Padrões de espaçamento utilizados
- ✅ Checklist de estilização
- ✅ Estrutura recomendada para novos arquivos

---

## Regras Principais

1. **Sem valores arbitrários**: `w-[480px]` ❌ → use classes predefinidas
2. **Use `size-*`**: `w-10 h-10` ❌ → `size-10` ✅
3. **Não repita estilos**: `<Button className='h-10 rounded-lg' />` ❌
4. **Use `gap`**: `<div className='flex gap-4'>` ✅
5. **Minimize classes**: Menos é mais

---

## Fluxo de trabalho

### Quando estilizar um novo componente

1. **Verifique os tokens** em `src/app/globals.css`
2. **Veja exemplos similares** em `src/components/ui/`
3. **Use CVA para variantes** (se houver múltiplas versões)
4. **Minimize as classes** - comece com o mínimo necessário
5. **Revise o checklist** em Exemplos e Anti-patterns

### Quando adicionar um novo token

Se precisar de um valor que não existe:

1. Abra `src/app/globals.css`
2. Adicione na seção `@theme`
3. Use no projeto
4. Documente aqui

**NÃO** crie valores arbitrários `[...]`. Sempre prefira adicionar ao design system.

---

## Perguntas frequentes

### P: Posso usar `w-96 h-96` em um div quadrado?

**R**: Não, use `size-96` em vez disso.

### P: E se não houver um token de cor?

**R**: Adicione em `globals.css` e documente.

### P: Como faço espaçamento de 5px?

**R**: Tailwind tem incrementos de 4px. Não existe 5px. Use `p-1` (4px) ou `p-1.5` (6px).

### P: Posso usar `flex-1` sem problemas?

**R**: Sim, `flex-1` é permitido. É uma forma idiomática do Tailwind.

### P: Como faço para estilizar SVGs dentro de um componente?

**R**: Use `[&_svg]:size-5` ou similar dentro da classe do container ou diretamente no SVG. Verifique como o componente é estruturado para aplicar corretamente.

---

## Links úteis

- [Tailwind CSS v4 Docs](https://tailwindcss.com)
- [Class Variance Authority](https://cva.style)
- [Design Tokens em `globals.css`](../../../src/app/globals.css)
- [Utilitário `cn()` para merge](../../../src/utils/class-name-merge.ts)
- [Componentes UI do Projeto](../../../src/components/ui/)
