import { useUserData } from 'data/useUserData'

import { Link } from './Link'
import { LoadingBars } from './LoadingBars'

export function UserInfo({ login }: { login: string }) {
  const { user, fetching } = useUserData(login)

  if (fetching) {
    return (
      <div className='mb-4'>
        <LoadingBars count={1} />
      </div>
    )
  }

  if (!user) {
    return (
      <div className='mb-4'>
        <p>User not found</p>
      </div>
    )
  }

  return (
    <section className='my-4'>
      <h1 className='text-3xl '>
        <Link href={`/${login}`}>
          <div className='flex items-center gap-2'>
            <img src={user.avatarUrl} alt={login} className='w-8 rounded-full' />
            <span>{login}</span>
          </div>
        </Link>
      </h1>
      <p className='mt-1 text-sm text-gray-400'>{user.bio}</p>
      <p>{user.company}</p>
    </section>
  )
}
