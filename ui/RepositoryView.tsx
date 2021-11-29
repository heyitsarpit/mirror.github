/* eslint-disable @next/next/no-img-element */
import { RepositoryData } from 'data/useRepositoryData'
import { getRelativeTime } from 'lib/fn/getRelativeTime'
import NextLink from 'next/link'
import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { BiComment, BiFileBlank } from 'react-icons/bi'
import { FaFolder } from 'react-icons/fa'
import { FiGitBranch } from 'react-icons/fi'

import { Language } from './RepositoryList'
import { StarButton } from './StarButton'

type LinkProps = {
  children: React.ReactNode
  href: string
  className?: string
}
function Link({
  children,
  href,
  className = 'text-blue-500 hover:underline'
}: LinkProps) {
  return (
    <NextLink href={href}>
      <a className={className}>{children}</a>
    </NextLink>
  )
}

type RepositoryViewProps = {
  repository: RepositoryData['repository']
  owner: string
  name: string
}

export function RepositoryView({ repository, name, owner }: RepositoryViewProps) {
  const {
    id,
    defaultBranchRef,
    description,
    isPrivate,
    languages,
    object,
    readme1,
    readme2,
    readme3,
    readme4,
    readme5,
    stargazerCount,
    stargazers,
    viewerHasStarred
  } = repository

  console.log({ stargazers })
  const readmeText = (readme1 || readme2 || readme3 || readme4 || readme5)?.text

  function Heading() {
    return (
      <div className='flex items-center gap-4 my-4'>
        <h1 className='text-2xl font-semibold max-w-[25ch] overflow-hidden overflow-ellipsis whitespace-nowrap'>
          <Link href={`/${owner}`}>{owner}</Link>
          <span className='font-light text-gray-400'>{' / '}</span>
          <Link href={`/${owner}/${name}`}>{name}</Link>
        </h1>
        <div className='flex items-center justify-between px-2 text-sm text-gray-500 border border-gray-700 rounded-full w-max'>
          {isPrivate ? 'private' : 'public'}
        </div>
      </div>
    )
  }

  function Files() {
    const folders = object.entries.filter(({ type }) => type === 'tree')
    const files = object.entries.filter(({ type }) => type === 'blob')

    return (
      <ul className='my-4 border border-gray-600 rounded-md'>
        {[...folders, ...files].map(({ name, type, object: { byteSize } }) => (
          <li key={name} className='px-2 py-1 border-b border-gray-600 hover:bg-gray-800'>
            <div className='flex items-center gap-4'>
              <span> {type === 'tree' ? <FaFolder /> : <BiFileBlank />} </span>
              <span>{name}</span>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  function LastCommit() {
    const {
      name,
      target: { author, changedFiles, commitUrl, committedDate, message }
    } = defaultBranchRef
    return (
      <div>
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center gap-2 px-2 my-4 bg-gray-900 border border-gray-800 rounded-md'>
            <span className='text-gray-400'>
              <FiGitBranch />
            </span>
            <span>{name}</span>
          </div>
          <div className='flex items-center gap-1'>
            {stargazerCount}{' '}
            {stargazerCount > 0 ? <AiFillStar size='14' /> : <AiOutlineStar size='14' />}
          </div>
        </div>

        <div className='flex justify-between px-2 py-2 border rounded-lg bg-trueGray-800 border-trueGray-700'>
          <div className='flex gap-4'>
            <Link href={`/${author.user.login}`}>
              <div className='flex items-center gap-3'>
                <img
                  src={author.user.avatarUrl}
                  alt='author'
                  className='w-6 rounded-full'
                />
                <span>{author.user.login}</span>
              </div>
            </Link>
            <Link
              href={commitUrl}
              className='text-white hover:underline max-w-[35ch] overflow-hidden overflow-ellipsis whitespace-nowrap'>
              {message}
            </Link>
          </div>

          <div className='flex items-center gap-2 text-sm text-gray-400'>
            <div className='flex items-center gap-1'>
              <BiComment /> {changedFiles}
            </div>
            <div>{getRelativeTime(+new Date(committedDate))}</div>
          </div>
        </div>
      </div>
    )
  }

  function Languages() {
    if (!languages.nodes.length) return null

    return (
      <section className='my-4'>
        <h2 className='font-normal'>Languages</h2>
        <div className='flex flex-wrap gap-2 mt-1 text-sm'>
          {languages.nodes.map((language) => (
            <Language key={language.id} language={language} />
          ))}
        </div>
      </section>
    )
  }

  function StarGazers() {
    if (!stargazers.nodes.length) return null

    return (
      <section className='my-4'>
        <h2 className='font-normal'>StarGazers</h2>
        <ul className='flex mt-1 ml-2'>
          {stargazers.nodes.map(({ avatarUrl, login }) => (
            <li key={login} className='-ml-2'>
              <Link href={`/${login}`}>
                <div className='flex items-center gap-3'>
                  <img
                    src={avatarUrl}
                    alt='author'
                    className='w-6 rounded-full hover:scale-125'
                    title={login}
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  return (
    <div>
      <div className='flex flex-wrap-reverse justify-between'>
        <Heading />
        <StarButton id={id} viewerHasStarred={viewerHasStarred} />
      </div>
      <p className='text-gray-400'>{description}</p>
      <div>
        <StarGazers />
        <Languages />
        <LastCommit />
        <Files />
      </div>

      <div className='px-2 py-4 border border-gray-600 rounded-sm'>{readmeText}</div>
    </div>
  )
}
