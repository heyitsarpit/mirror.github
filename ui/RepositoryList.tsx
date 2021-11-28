import { useRepositoryData } from 'data/useRepositoryData'
import { getRelativeTime } from 'lib/fn/getRelativeTime'

type Props = {
  login: string | undefined
}

export function RepositoryList({ login }: Props) {
  const { repositories } = useRepositoryData(login)

  if (!repositories || repositories.length === 0) {
    return <div>User Not found</div>
  }

  console.log({ repositories })

  return (
    <div>
      <ul>
        {repositories.map(
          ({
            description,
            id,
            isPrivate,
            name,
            stargazerCount,
            languages,
            updatedAt
          }) => (
            <li key={id}>
              <section className='flex items-start justify-between p-4 my-4 bg-gray-900 rounded-md'>
                <div className='flex flex-col gap-4'>
                  <div className='flex gap-4'>
                    <h1 className='text-xl'>{name}</h1>
                    <div className='flex items-center justify-between px-2 text-[0.7rem] text-gray-500 border border-gray-700 rounded-full'>
                      {isPrivate ? 'private' : 'public'}
                    </div>
                  </div>

                  <p className='text-sm text-white/70'>{description}</p>

                  <div className='flex gap-4 text-xs'>
                    <Language language={languages.nodes[0]} />
                    <div>{stargazerCount} &#9733;</div>
                    <div>Updated {getRelativeTime(+new Date(updatedAt))}</div>
                  </div>
                </div>
              </section>
            </li>
          )
        )}
      </ul>
    </div>
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

function Language({ language }: LanguageProps) {
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
