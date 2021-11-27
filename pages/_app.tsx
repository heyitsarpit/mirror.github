import 'public/styles/font.css'
import 'public/styles/global.css'

import { SessionProvider } from 'next-auth/react'

const MyApp = ({ Component, pageProps }) => {
  const { session } = pageProps

  return (
    <SessionProvider session={session}>
      <div className='w-full h-full'>
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </SessionProvider>
  )
}

export default MyApp
