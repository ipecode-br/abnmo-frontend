export async function wait(delay?: number) {
  return await new Promise((resolve) => setTimeout(resolve, delay ?? 250))
}
