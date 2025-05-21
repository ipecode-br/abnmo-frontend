export function convertEnumToOptions(nativeEnum: Record<string, string>) {
  const options = Object.entries(nativeEnum).map(([key, value]) => ({
    value: key,
    label: value,
  }))

  return options
}
