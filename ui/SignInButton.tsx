import { signIn } from 'next-auth/react'
import { RiGithubLine } from 'react-icons/ri'

export function SignInButton() {
  return (
    <button
      className='flex items-center gap-1 mx-auto my-10 btn'
      onClick={() => signIn('github')}>
      <RiGithubLine size='20' />
      <span>Sign In</span>
    </button>
  )
}
