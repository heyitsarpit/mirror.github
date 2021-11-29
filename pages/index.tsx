import { useViewerData } from 'data/useViewerData'
import { useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { RepositoryList } from 'ui/RepositoryList'
import { SignInButton } from 'ui/SignInButton'
import { Spacer } from 'ui/Spacer'

const wrapperClass = 'max-w-[75ch] h-full mx-auto pt-12 pb-28 px-5'

function MirrorLogo() {
  return <img src='/assets/images/mirror.png' alt='Github Mirror' className='w-20' />
}

function Welcome() {
  return (
    <div className={`${wrapperClass} flex flex-col justify-center items-center`}>
      <Spacer orientation='vertical' />

      <section className='flex flex-col items-center justify-center text-center '>
        <MirrorLogo />

        <h1 className='mt-4 text-3xl md:text-4xl'>
          Welcome to the Github Mirror Challenge!
        </h1>
        <p className='opacity-70'>
          You can sign in with your Github account to see your starred repositories.
        </p>
        <SignInButton />
      </section>
      <Spacer orientation='vertical' />

      <a
        href='https://github.com/heyitsarpit/'
        target='_blank'
        rel='noopener noreferrer'
        className='text-gray-500 justify-self-ends font-extralight hover:text-white'>
        made by @heyitsarpit
      </a>
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
          <RepositoryList login={viewer?.login} />
        </div>
      )}
    </>
  )
}
