import { RepositoriesData, useRepositoriesData } from 'data/useRepositoriesData'
import { useViewerData } from 'data/useViewerData'
import { getRelativeTime } from 'lib/fn/getRelativeTime'
import Link from 'next/link'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

import { LoadingBars } from './LoadingBars'
import { Spacer } from './Spacer'
import { StarButton } from './StarButton'

type Props = {
  login: string | undefined
}

export function RepositoryList({ login }: Props) {
  const { repositories, fetching } = useRepositoriesData(login)
  const { viewer } = useViewerData()

  if (fetching) {
    return <LoadingBars />
  }
  if (!repositories?.nodes || repositories.nodes.length === 0) {
    return <div>Repositories Not found</div>
  }

  return (
    <div>
      <div className='flex items-center gap-2'>
        <h2 className='text-lg'>
          repositories starred by {viewer?.login === login ? 'you' : `${login}`}
        </h2>
        <div className='flex items-center text-sm text-gray-400 justify-between px-4 border border-gray-700 rounded-3xl h-[max-content]'>
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
  const [repoOwner] = nameWithOwner.split('/')

  return (
    <section className='flex flex-wrap-reverse items-start justify-between w-full gap-2 p-4 my-4 bg-gray-900 rounded-md'>
      <div className='flex flex-col w-full gap-4'>
        <div className='flex flex-wrap items-center gap-4'>
          <h2 className='text-base md:text-xl'>
            <Link href={`/${repoOwner}`}>
              <a className='hover:text-blue-500 hover:underline'>{repoOwner}</a>
            </Link>
            {' / '}
            <Link href={`/${nameWithOwner}`}>
              <a className='hover:text-blue-500 hover:underline'>{name}</a>
            </Link>
          </h2>
          <div className='flex items-center justify-between px-2 text-[0.7rem] text-gray-500 border border-gray-700 rounded-3xl h-[max-content]'>
            {isPrivate ? 'private' : 'public'}
          </div>
          <Spacer orientation='horizontal' />
          <div className='hidden sm:block'>
            <StarButton id={id} viewerHasStarred={viewerHasStarred} />
          </div>
        </div>

        <p className='text-sm text-white/70 max-w-[55ch] overflow-hidden overflow-ellipsis'>
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
