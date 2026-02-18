import { z } from 'zod'

const envSchema = z.object({
  // APIs
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_DOMAIN: z.string().min(1),

  // Environment
  NODE_ENV: z
    .enum(['production', 'test', 'development'])
    .default('development'),
})

export const env = envSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
})
