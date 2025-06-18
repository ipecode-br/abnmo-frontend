import { getAllCookies } from '@/actions/cookies'
import { env } from '@/config/env'

type SuccessResponse<Data> = {
  success: true
  data: Data
}

type FailureResponse = {
  success: false
  message: string
}

type ApiResponse<Data> = SuccessResponse<Data> | FailureResponse

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

interface ApiOptions extends RequestInit {
  includeCookies?: boolean
}

export async function api<T>(
  path: string,
  { includeCookies, ...options }: ApiOptions,
): Promise<ApiResponse<T>> {
  try {
    let headers: HeadersInit = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options?.headers,
    }

    if (includeCookies) {
      const cookies = await getAllCookies()
      headers = { ...headers, Cookie: cookies.toString() }
    }

    const url = new URL(path, env.NEXT_PUBLIC_API_URL)
    const response = await fetch(url.toString(), {
      credentials: 'include',
      ...options,
      headers,
    })

    const responseData = await response.json()

    if (responseData.success === true) {
      return {
        success: true,
        data: responseData.data,
      }
    } else {
      return {
        success: false,
        message: responseData.message || 'Erro desconhecido',
      }
    }
  } catch (error) {
    console.error('API request error:', error)
    return {
      success: false,
      message: 'Não foi possível se conectar ao servidor.',
    }
  }
}
