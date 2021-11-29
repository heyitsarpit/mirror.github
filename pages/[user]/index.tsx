import { useRouter } from 'next/router'
import { RepositoryList } from 'ui/RepositoryList'

export default function User() {
  const router = useRouter()
  console.log(router)

  if (!router.query.user) {
    return <div>No user Found</div>
  }

  return (
    <div className='max-w-[75ch] h-full mx-auto pt-12 pb-28 px-5'>
      <RepositoryList login={router.query.user as string} />
    </div>
  )
}
