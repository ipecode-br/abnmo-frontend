import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().default('http://localhost:3000'),
  NODE_ENV: z
    .enum(['production', 'test', 'development'])
    .default('development'),
})

export const env = envSchema.parse(process.env)
