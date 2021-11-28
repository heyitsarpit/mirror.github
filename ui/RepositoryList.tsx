import { useStarRepository } from 'data/useRepositoriesData'
import { useViewerData } from 'data/useViewerData'
import {
  Language,
  LanguageConnection,
  Maybe,
  StarredRepoFragment,
  useStarredRepositoriesByLoginQuery,
  useViewerLoginQuery
} from 'graphql/generated'
import { getRelativeTime } from 'lib/fn/getRelativeTime'
import Link from 'next/link'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

type RepositoryListProps = {
  login: string
}

export function RepositoryList({ login }: RepositoryListProps) {
  const [repositoriesResult] = useStarredRepositoriesByLoginQuery({
    variables: { login }
  })
  const [viewerResult] = useViewerLoginQuery()

  const { viewer } = viewerResult.data || {}
  const { starredRepositories: repositories } = repositoriesResult.data?.user || {}

  if (!repositories?.nodes || repositories.nodes.length === 0) {
    return <div>User Not found</div>
  }

  console.log({ repositories })

  return (
    <div>
      <div className='flex items-center gap-2'>
        <h1 className='text-2xl'>
          repositories starred by {viewer?.login === login ? 'you' : `${login}`}
        </h1>
        <div className='flex items-center justify-between px-2 text-gray-200 border border-gray-700 rounded-full'>
          {repositories.totalCount}
        </div>
      </div>
      <ul>
        {repositories.nodes.map((repository) => {
          const c = repository
          return (
            <li key={repository?.id}>
              <RepositoryItem {...repository} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function RepositoryItem({
  description,
  id,
  isPrivate,
  name,
  stargazerCount,
  languages,
  updatedAt,
  viewerHasStarred,
  nameWithOwner
}: StarredRepoFragment & { languages: LanguageConnection }) {
  const { addStar, removeStar, addResult } = useStarRepository(id)

  const c = languages.nodes?.[0]

  console.log({ addResult })
  return (
    <section className='flex flex-wrap-reverse items-start justify-between gap-2 p-4 my-4 bg-gray-900 rounded-md'>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-4'>
          <h2 className='text-lg md:text-xl'>
            <Link href={`/${nameWithOwner}`}>
              <a className='hover:text-blue-500'>{name}</a>
            </Link>
          </h2>
          <div className='flex items-center justify-between px-2 text-[0.7rem] text-gray-500 border border-gray-700 rounded-full'>
            {isPrivate ? 'private' : 'public'}
          </div>
        </div>

        <p className='text-sm text-white/70'>{description}</p>

        <div className='flex gap-4 text-xs'>
          <Language language={languages.nodes?.[0]} />
          <div className='flex items-center gap-1'>
            {stargazerCount}{' '}
            {stargazerCount > 0 ? <AiFillStar size='14' /> : <AiOutlineStar size='14' />}
          </div>
          <div>Updated {getRelativeTime(+new Date(updatedAt))}</div>
        </div>
      </div>

      <div>
        <button
          onClick={viewerHasStarred ? removeStar : addStar}
          className={`flex items-center justify-between 
          gap-2 px-2 py-1 border border-gray-700 rounded-md text-sm 
          ${viewerHasStarred ? 'bg-gray-800' : ''}`}>
          <span>
            {viewerHasStarred ? <AiFillStar size='14' /> : <AiOutlineStar size='14' />}
          </span>
          <span>{viewerHasStarred ? 'Unstar' : 'Star'}</span>
        </button>
      </div>
    </section>
  )
}

function Language({ language }: { language: Maybe<Language> | undefined }) {
  if (!language) {
    return null
  }

  const { color, name } = language

  return (
    <div className='flex items-center gap-1'>
      <span
        style={{ backgroundColor: color || 'white' }}
        className='w-3 h-3 rounded-full'></span>
      <span>{name}</span>
    </div>
  )
}
