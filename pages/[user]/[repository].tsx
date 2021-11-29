import { useRepositoryData } from 'data/useRepositoryData'
import { useRouter } from 'next/router'
import { RepositoryView } from 'ui/RepositoryView'

export default function Repository() {
  const router = useRouter()
  const { user, repository } = router.query
  const {
    fetching,
    repository: repo,
    error
  } = useRepositoryData({
    name: repository as string,
    owner: user as string
  })

  if (error) {
    return <div>Error occurred</div>
  }

  if (fetching) {
    return <div>Loading...</div>
  }

  if (!repo) {
    return <div>Repo Data not found</div>
  }

  return (
    <div className='max-w-[75ch] h-full px-5 pt-12 mx-auto pb-28'>
      <RepositoryView
        repository={repo}
        owner={user as string}
        name={repository as string}
      />
    </div>
  )
}
