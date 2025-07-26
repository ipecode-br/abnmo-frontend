import { getAllCookies } from '@/actions/cookies'
import { env } from '@/config/env'

type ApiResponse = {
  success: boolean
  message: string
  data?: unknown
  total?: number
}

interface ApiOptions extends RequestInit {
  includeCookies?: boolean
}

export async function api<Data extends ApiResponse>(
  path: string,
  options?: ApiOptions,
): Promise<Data> {
  try {
    let headers: HeadersInit = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options?.headers,
    }

    if (options && options.includeCookies) {
      const cookies = await getAllCookies()
      headers = { ...headers, Cookie: cookies.toString() }
    }

    const url = new URL(path, env.NEXT_PUBLIC_API_URL)
    const response = await fetch(url.toString(), {
      credentials: 'include',
      ...options,
      headers,
    })

    const responseData: Data = await response.json()

    return responseData
  } catch (error) {
    console.error('API request error:', error)
    return {
      success: false,
      message: 'Não foi possível se conectar ao servidor.',
    } as Data
  }
}
