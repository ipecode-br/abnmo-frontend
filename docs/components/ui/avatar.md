# Documentação do Componente Avatar (`avatar.tsx`)

O arquivo `avatar.tsx` define um componente React reutilizável que exibe imagens de perfil ou um ícone padrão quando nenhuma imagem é fornecida.

---

## ☑️ Objetivo do Componente

- O componente **`Avatar`** serve para exibir a imagem de perfil de um usuário.
- Caso não haja imagem (`src`), exibe um ícone padrão (`User2Icon`).
- Mantém estilização consistente com bordas arredondadas e tamanho fixo.

---

## 📦 Principais Importações

- `Image` e `ImageProps` do **Next.js**: Para exibir imagens otimizadas.
- `User2Icon` do **lucide-react**: Ícone padrão quando não há imagem.
- `cn` de `@/utils/class-name-merge`: Função utilitária para combinar classes CSS dinamicamente.

---

## 🧩 Propriedades do Componente Avatar

```ts
interface AvatarProps extends React.ComponentProps<'div'> {
  src?: ImageProps['src'] | null
}
```

- `src` (`string` | `StaticImageData` | `null`): URL ou import de imagem do perfil.
- `className` (`string`): Permite adicionar classes CSS extras.
- `...props` (`div` props): Outras props válidas para o container `<div>`.

---

## ⚙️ Lógica do Componente

```tsx
export function Avatar({ src, className, ...props }: Readonly<AvatarProps>) {
  return (
    <div
      className={cn(
        'text-foreground-soft bg-background flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full [&_svg]:size-5',
        !src && 'border-border border',
        className,
      )}
      {...props}
    >
      {src ? (
        <Image
          alt=''
          src={src}
          height={144}
          width={144}
          className='size-full object-cover'
        />
      ) : (
        <User2Icon />
      )}
    </div>
  )
}
```

- Exibe a imagem do usuário quando `src` é fornecido.
- Caso contrário, exibe o ícone `User2Icon`.
- Aplica classes padrão para tamanho, borda arredondada, alinhamento e overflow.
- Permite customização adicional de estilos via `className`.
- Repassa todas as demais props para o `<div>`.

---

### 📝 Exemplo de Uso

- `<Avatar src="/profile.jpg" />`
- `<Avatar />` (mostra ícone padrão)
- `<Avatar className="border-2 border-blue-500" />`

---

## 🔍 Pontos-Chave

- Reusabilidade: Pode ser usado em qualquer parte do app que exiba perfis.
- Personalização: Aceita classes adicionais para customização de estilo.
- Flexibilidade: Lida com imagem ausente mostrando um ícone padrão.
- Consistência visual: Mantém proporções e bordas arredondadas.

---

## 📋 Resumo das Props

- `src` (`string` | `StaticImageData` | `null`): Fonte da imagem do avatar.
- `className` (`string`): Adiciona classes CSS extras.
- `...props` (`React.ComponentProps<'div'>`): Outras props válidas para o container `<div>`.

---

## 💡 Vantagens

- Exibição elegante de perfis com fallback automático.
- Mantém consistência visual em toda a aplicação.
- Simples, flexível e reutilizável.

---

## 🛠️ Resumo

O componente `Avatar` fornece uma solução prática e visualmente consistente para exibição de imagens de perfil, garantindo fallback seguro com ícone padrão e fácil personalização de estilo.
