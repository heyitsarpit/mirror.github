import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { RepositoryList } from 'ui/RepositoryList'
import { UserInfo } from 'ui/UserInfo'

const wrapperStyle = 'max-w-[75ch] h-full mx-auto pt-12 pb-28 px-5'

export default function User() {
  const router = useRouter()

  return (
    <>
      <NextSeo title={router.query.user as string} />
      <div className={wrapperStyle}>
        <UserInfo login={router.query.user as string} />
        <RepositoryList login={router.query.user as string} />
      </div>
    </>
  )
}
