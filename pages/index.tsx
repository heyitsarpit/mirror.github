import { useUserData } from 'data/useUserData'

export default function Home() {
  const { user } = useUserData('tmm')
  console.log(user)

  return <div className='max-w-[75ch] mx-auto pt-12 pb-28 px-5'>Home Page</div>
}
