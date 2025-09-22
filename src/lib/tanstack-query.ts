import {
  isServer,
  MutationCache,
  QueryCache,
  QueryClient,
} from '@tanstack/react-query'

import { ROUTES } from '@/constants/routes'

type ErrorType = { status?: number }

function makeQueryClient() {
  let hasRedirected = false

  const client = new QueryClient({
    defaultOptions: {
      queries: {
        // Set default staleTime to avoid refetching immediately on the client
        staleTime: 60 * 1000,
        retry: (_, error) => {
          const errorObject = error as ErrorType
          return errorObject?.status !== 401
        },
      },
      mutations: {
        retry: (_, error) => {
          const errorObject = error as ErrorType
          return errorObject?.status !== 401
        },
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        const errorObject = error as ErrorType
        console.log('QueryCache error:', errorObject)
        if (errorObject?.status === 401 && !hasRedirected) {
          hasRedirected = true
          window.location.href = ROUTES.auth.signOut
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        const errorObject = error as ErrorType
        console.log('MutationCache error:', errorObject)
        if (errorObject?.status === 401 && !hasRedirected) {
          hasRedirected = true
          window.location.href = ROUTES.auth.signOut
        }
      },
    }),
  })

  return client
}

let browserQueryClient: QueryClient | undefined

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient()
  }

  // Browser: make a new query client if we don't already have one
  // This is very important, so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) browserQueryClient = makeQueryClient()

  return browserQueryClient
}

export const queryClient = getQueryClient()
// NOTE: Avoid useState when initializing the query client if you don't
//       have a suspense boundary between this and the code that may
//       suspend because React will throw away the client on the initial
//       render if it suspends and there is no boundary
