import { getAllCookies } from '@/actions/cookies'
import { env } from '@/config/env'

type ApiResponse<Data> = {
  status?: number
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

    const responseData = await response.json().catch(() => ({}))

    if (!response.ok) {
      // Throws errors to be caught in the query/mutation error handlers
      throw {
        status: response.status,
        success: false,
        message: responseData?.message ?? 'Um erro inesperado aconteceu.',
      }
    }

    return responseData
  } catch (error: unknown) {
    const errorObject = error as { status?: number; message?: string }

    const normalizedError = {
      status: errorObject?.status ?? 500,
      success: false,
      message:
        errorObject?.message ?? 'Não foi possível se conectar ao servidor.',
    }

    console.error('API request error:', normalizedError)

    throw normalizedError as ApiResponse<Data>
  }
}
