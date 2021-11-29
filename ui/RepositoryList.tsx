import { RepositoriesData, useRepositoriesData } from 'data/useRepositoriesData'
import { useViewerData } from 'data/useViewerData'
import { getRelativeTime } from 'lib/fn/getRelativeTime'
import Link from 'next/link'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

import { StarButton } from './StarButton'

type Props = {
  login: string | undefined
}

export function RepositoryList({ login }: Props) {
  const { repositories } = useRepositoriesData(login)
  const { viewer } = useViewerData()

  if (!repositories?.nodes || repositories.nodes.length === 0) {
    return <div>User Not found</div>
  }

  return (
    <div>
      <div className='flex items-center gap-2'>
        <h2 className='text-lg'>
          repositories starred by {viewer?.login === login ? 'you' : `${login}`}
        </h2>
        <div className='flex items-center justify-between px-2 text-gray-200 border border-gray-700 rounded-full'>
          {repositories.totalCount}
        </div>
      </div>
      <ul>
        {repositories.nodes.map((repository) => (
          <li key={repository.id}>
            <Repository {...repository} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function Repository({
  description,
  id,
  isPrivate,
  name,
  stargazerCount,
  languages,
  updatedAt,
  viewerHasStarred,
  nameWithOwner
}: RepositoriesData['user']['starredRepositories']['nodes'][0]) {
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

        <p className='text-sm text-white/70 max-w-[55ch] overflow-hidden overflow-ellipsis whitespace-nowrap'>
          {description}
        </p>

        <div className='flex gap-4 text-xs'>
          <Language language={languages.nodes[0]} />
          <div className='flex items-center gap-1'>
            {stargazerCount}{' '}
            {stargazerCount > 0 ? <AiFillStar size='14' /> : <AiOutlineStar size='14' />}
          </div>
          <div>Updated {getRelativeTime(+new Date(updatedAt))}</div>
        </div>
      </div>
      <StarButton id={id} viewerHasStarred={viewerHasStarred} />
    </section>
  )
}

type LanguageProps = {
  language:
    | {
        color: string
        id: string
        name: string
      }
    | undefined
}

export function Language({ language }: LanguageProps) {
  if (!language) {
    return null
  }

  const { color, name } = language

  return (
    <div className='flex items-center gap-1'>
      <span style={{ backgroundColor: color }} className='w-3 h-3 rounded-full'></span>
      <span>{name}</span>
    </div>
  )
}
