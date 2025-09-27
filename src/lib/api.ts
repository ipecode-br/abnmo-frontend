import { getAllCookies } from '@/actions/cookies'
import { env } from '@/config/env'
import { wait } from '@/utils/wait'

type ApiResponse<Data> = {
  success: boolean
  message: string
  data?: Data
  total?: number
}

interface ApiOptions extends RequestInit {
  includeCookies?: boolean
  params?: Record<string, string | number | boolean | undefined | null>
}

export async function api<Data>(
  path: string,
  options?: ApiOptions,
): Promise<ApiResponse<Data>> {
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

    if (options?.params) {
      for (const [key, value] of Object.entries(options.params)) {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value))
        }
      }
    }

    const response = await fetch(url.toString(), {
      credentials: 'include',
      ...options,
      headers,
    })

    const responseData = await response.json()

    wait(1500)

    return responseData
  } catch (error) {
    console.error('API request error:', error)
    return {
      success: false,
      message: 'Não foi possível se conectar ao servidor.',
    } as ApiResponse<Data>
  }
}
