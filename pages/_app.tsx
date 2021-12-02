import 'public/assets/styles/font.css'
import 'public/assets/styles/global.css'
import 'public/assets/styles/gfm-readme.css'

import { IdProvider } from '@radix-ui/react-id'
import { useClient } from 'lib/hooks/useClient'
import { SessionProvider } from 'next-auth/react'
import { Footer } from 'ui/Footer'
import { Header } from 'ui/Header'
import { SEO } from 'ui/SEO'
import { Provider } from 'urql'

function URQLProvider({ children }: { children: React.ReactNode }) {
  const client = useClient()

  return <Provider value={client}>{children}</Provider>
}

const MyApp = ({ Component, pageProps }) => {
  const { session } = pageProps
  return (
    <>
      <SEO />
      <IdProvider>
        <SessionProvider session={session}>
          <URQLProvider>
            <Header />
            <main>
              <Component {...pageProps} />
            </main>
            <Footer />
          </URQLProvider>
        </SessionProvider>
      </IdProvider>
    </>
  )
}

export default MyApp
