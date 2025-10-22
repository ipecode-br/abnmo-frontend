export type OrderMappingType<T extends string> = Record<
  T,
  { orderBy: string; order: string }
>
