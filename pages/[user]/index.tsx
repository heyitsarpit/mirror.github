import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { RepositoryList } from 'ui/RepositoryList'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const session = await getSession(ctx)

    return { props: { session } }
  } catch {
    return { redirect: { permanent: false, destination: '/' }, props: {} }
  }
}

export default function User(props) {
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
