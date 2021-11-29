import { useRepositoryData } from 'data/useRepositoryData'
import { useRouter } from 'next/router'
import { LoadingBars } from 'ui/LoadingBars'
import { RepositoryView } from 'ui/RepositoryView'

const wrapperStyles = 'max-w-[75ch] h-full px-5 pt-12 mx-auto pb-28'

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

  if (fetching) {
    return (
      <div className={wrapperStyles}>
        <LoadingBars />
      </div>
    )
  }

  if (!repo || error) {
    return <div className={wrapperStyles}>Repo Data not found</div>
  }

  return (
    <div className={wrapperStyles}>
      <RepositoryView
        repository={repo}
        owner={user as string}
        name={repository as string}
      />
    </div>
  )
}
