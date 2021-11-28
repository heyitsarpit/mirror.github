import { devtoolsExchange } from '@urql/devtools'
import { useSession } from 'next-auth/react'
import { useMemo } from 'react'
import { createClient, defaultExchanges } from 'urql'

export function useClient() {
  const { data: session } = useSession()

  const client = useMemo(() => {
    return createClient({
      url: 'https://api.github.com/graphql',
      exchanges: [devtoolsExchange, ...defaultExchanges],
      fetchOptions: {
        headers: {
          authorization: `Bearer ${session?.accessToken}`
        }
      }
    })
  }, [session?.accessToken])

  return client
}
