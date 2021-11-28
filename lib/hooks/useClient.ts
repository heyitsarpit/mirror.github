import { devtoolsExchange } from '@urql/devtools'
import { Session } from 'next-auth'
import { useMemo } from 'react'
import { createClient, defaultExchanges } from 'urql'

export function useClient(session: Session | null) {
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
