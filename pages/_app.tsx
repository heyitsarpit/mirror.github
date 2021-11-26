import 'public/styles/font.css'
import 'public/styles/global.css'

import Link from 'next/link'
import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react'

export function Test() {
  const { data: sessions, status } = useSession()
  console.log({ sessions, status })

  return (
    <div className='flex flex-col'>
      <Link href='/hello'>
        <a>hello</a>
      </Link>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <button onClick={() => signIn('github')}>Signin</button>
      <button onClick={() => signOut()}>signout</button>
    </div>
  )
}

const MyApp = ({ Component, pageProps }) => {
  const { session } = pageProps

  return (
    <SessionProvider session={session}>
      <div className='w-full h-full'>
        <main>
          <Component {...pageProps} />
          <Test />
        </main>
      </div>
    </SessionProvider>
  )
}

export default MyApp
