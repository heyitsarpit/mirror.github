import { useRepoStarMutation } from 'data/useRepositoriesData'
import { useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

type StarButtonProps = {
  viewerHasStarred: boolean
  id: string
}

export function StarButton({ viewerHasStarred, id }: StarButtonProps) {
  const { addStar, removeStar } = useRepoStarMutation(id)
  const [starred, setStarred] = useState(viewerHasStarred)

  function onClick() {
    // Immediately set the state for optimistic UI

    if (starred) {
      setStarred(false)
      removeStar().then(({ data, error }) => {
        data && !error ? setStarred(false) : setStarred(true)
      })
    } else {
      setStarred(true)
      addStar().then(({ data, error }) =>
        data && !error ? setStarred(true) : setStarred(false)
      )
    }
  }

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between hover:opacity-70
        gap-2 px-2 py-1 border border-gray-700 rounded-md text-sm 
        ${starred ? 'bg-gray-800' : ''}`}>
      <span>{starred ? <AiFillStar size='14' /> : <AiOutlineStar size='14' />}</span>
      <span>{starred ? 'Unstar' : 'Star'}</span>
    </button>
  )
}
