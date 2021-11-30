import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { UserDropDown } from './UserDropDown'

function MirrorLogo() {
  return (
    <Link href='/'>
      <a
        className='flex items-center justify-center w-12 h-12 p-4 bg-gray-300 rounded-full'
        title='home'>
        <img src='/assets/images/mirror.png' alt='Github Mirror' className='w-full' />
      </a>
    </Link>
  )
}

export function Header() {
  const { data: session } = useSession()

  if (!session) {
    return null
  }
  return (
    <header className='relative w-full h-16 mb-20'>
      <div className='fixed h-16 z-40 w-full flex justify-between backdrop-blur-[20px] backdrop-saturate-150bg-[#0D0D1050]'>
        <nav className='w-full sm:max-w-[75ch] m-auto flex px-5 justify-between items-center '>
          <MirrorLogo />
          <UserDropDown />
        </nav>
      </div>
    </header>
  )
}
