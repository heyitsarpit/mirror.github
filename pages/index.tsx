import { useViewerLoginQuery } from 'graphql/generated'
import { useSession } from 'next-auth/react'
import { RepositoryList } from 'ui/RepositoryList'
import { SignInButton } from 'ui/SignInButton'

const wrapperClass = 'max-w-[75ch] h-full mx-auto pt-12 pb-28 px-5'

function Welcome() {
  return (
    <div className={`${wrapperClass} flex items-center`}>
      <section className='text-center'>
        <h1 className='text-4xl'>Welcome to the Github Mirror Challenge!</h1>
        <p className='opacity-70'>
          You can sign in with your Github account to see your starred repos.
        </p>
        <SignInButton />
      </section>
    </div>
  )
}

export default function Home() {
  const { data: session } = useSession()
  const [viewerResult] = useViewerLoginQuery()

  if (!session || !viewerResult.data?.viewer) {
    return <Welcome />
  }

  return (
    <div className={wrapperClass}>
      <RepositoryList login={viewerResult.data?.viewer.login} />
    </div>
  )
}
