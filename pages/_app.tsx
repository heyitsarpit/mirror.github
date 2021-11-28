import 'public/styles/font.css'
import 'public/styles/global.css'

import { useClient } from 'lib/hooks/useClient'
import { SessionProvider } from 'next-auth/react'
import { Provider as URQLProvider } from 'urql'

const MyApp = ({ Component, pageProps }) => {
  const { session } = pageProps
  const client = useClient(session)

  return (
    <SessionProvider session={session}>
      <URQLProvider value={client}>
        <div className='w-full h-full'>
          <main>
            <Component {...pageProps} />
          </main>
        </div>
      </URQLProvider>
    </SessionProvider>
  )
}

export default MyApp
