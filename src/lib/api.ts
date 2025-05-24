import { getAllCookies } from '@/actions/cookies'
import { env } from '@/config/env'

type BaseResponse = { success: false; message: string }
type ApiResponse<Data> = BaseResponse | (BaseResponse & { data?: Data })

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

    const responseData: ApiResponse<T> = await response.json()

    return responseData
  } catch (error) {
    console.error('API request error:', error)
    return {
      success: false,
      message: 'Não foi possível se conectar ao servidor.',
    }
  }
}
