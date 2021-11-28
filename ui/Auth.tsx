import { signIn, useSession } from 'next-auth/react'

import { UserDropDown } from './UserDropDown'

export function Auth() {
  const { status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'unauthenticated') {
    return (
      <button onClick={() => signIn('github')} className='btn'>
        Sign In
      </button>
    )
  }

  return <UserDropDown />
}
