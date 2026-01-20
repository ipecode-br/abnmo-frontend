export type OrderMapping<T extends string> = Record<
  T,
  { orderBy: string; order: string }
>
