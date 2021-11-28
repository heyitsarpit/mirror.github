import { useUserData } from 'data/useUserData'
import { useViewerData } from 'data/useViewerData'
import { signIn } from 'next-auth/react'

const wrapperClass = 'max-w-[75ch] h-full mx-auto pt-12 pb-28 px-5'

export default function Home() {
  const { viewer } = useViewerData()

  if (!viewer) {
    return (
      <div className={`${wrapperClass} flex items-center`}>
        <section className='text-center'>
          <h1 className='text-4xl'>Welcome to the Github Mirror Challenge!</h1>
          <p className='opacity-70'>
            You can sign in with your Github account to see your starred repos.
          </p>
          <button className='my-10 btn' onClick={() => signIn('Github')}>
            Sign In
          </button>
        </section>
      </div>
    )
  }

  return <div className={wrapperClass}></div>
}
