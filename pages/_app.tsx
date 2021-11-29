import 'public/styles/font.css'
import 'public/styles/global.css'

import { useClient } from 'lib/hooks/useClient'
import { SessionProvider } from 'next-auth/react'
import { Header } from 'ui/Header'
import { Provider } from 'urql'

function URQLProvider({ children }: { children: React.ReactNode }) {
  const client = useClient()

  return <Provider value={client}>{children}</Provider>
}

const MyApp = ({ Component, pageProps }) => {
  const { session } = pageProps

  return (
    <SessionProvider session={session}>
      <URQLProvider>
        <div className='flex flex-col w-full h-full'>
          <Header />
          <main className='h-full'>
            <Component {...pageProps} />
          </main>
        </div>
      </URQLProvider>
    </SessionProvider>
  )
}

export default MyApp
