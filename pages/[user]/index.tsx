import { useUserData } from 'data/useUserData'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { Link } from 'ui/Link'
import { RepositoryList } from 'ui/RepositoryList'

export default function User() {
  const router = useRouter()
  const { user, fetching } = useUserData(router.query.user as string)

  if (!router.query.user || fetching) {
    return <div>No user Found</div>
  }

  return (
    <>
      <NextSeo title={router.query.user as string} />
      <div className='max-w-[75ch] h-full mx-auto pt-12 pb-28 px-5'>
        <section className='my-4'>
          <h1 className='text-3xl '>
            <Link href={`${router.query.user}`}>
              <div className='flex items-center gap-2'>
                <img
                  src={user?.avatarUrl}
                  alt={router.query.user as string}
                  className='w-8 rounded-full'
                />
                <span>{router.query.user}</span>
              </div>
            </Link>
          </h1>
          <p className='mt-1 text-sm text-gray-400'>{user?.bio}</p>
          <p>{user?.company}</p>
        </section>
        <RepositoryList login={router.query.user as string} />
      </div>
    </>
  )
}
