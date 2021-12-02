import { useViewerData } from 'data/useViewerData'
import { useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { RepositoryList } from 'ui/RepositoryList'
import { SignInButton } from 'ui/SignInButton'
import { UserInfo } from 'ui/UserInfo'

const wrapperClass = 'max-w-[75ch] h-full mx-auto pt-12 pb-28 px-5'

function MirrorLogo() {
  return <img src='/assets/images/mirror.png' alt='Github Mirror' className='w-20' />
}

function Welcome() {
  return (
    <div
      className={`${wrapperClass} h-[calc(100vh-5rem)] relative flex flex-col items-center justify-center`}>
      <section className='absolute top-[30vh] flex flex-col items-center justify-center text-center'>
        <MirrorLogo />
        <h1 className='mt-4 text-3xl md:text-4xl'>
          Welcome to the Github Mirror Challenge!
        </h1>
        <p className='opacity-70'>
          You can sign in with your Github account to see your starred repositories.
        </p>
        <SignInButton />
      </section>
    </div>
  )
}

export default function Home() {
  const { data: session } = useSession()
  const { viewer } = useViewerData()

  return (
    <>
      <NextSeo title='Home' />
      {!session ? (
        <Welcome />
      ) : (
        <div className={wrapperClass}>
          <UserInfo login={viewer?.login as string} />
          <RepositoryList login={viewer?.login} />
        </div>
      )}
    </>
  )
}
