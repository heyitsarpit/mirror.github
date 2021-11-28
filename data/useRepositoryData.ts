import { gql, useMutation, useQuery } from 'urql'

const REPOSITORY_DATA = gql`
  query ($login: String!) {
    user(login: $login) {
      repositories(last: 10) {
        totalCount
        nodes {
          id
          name
          description
          isPrivate
          stargazerCount
          updatedAt
          viewerHasStarred
          nameWithOwner
          languages(orderBy: { field: SIZE, direction: DESC }, first: 5) {
            nodes {
              color
              id
              name
            }
          }
        }
      }
    }
  }
`

export type RepositoryData = {
  user: {
    repositories: {
      totalCount: number
      nodes: Array<{
        id: string
        name: string
        description: string
        isPrivate: string
        stargazerCount: number
        viewerHasStarred: boolean
        updatedAt: string
        nameWithOwner: string
        languages: {
          nodes: Array<{
            color: string
            id: string
            name: string
          }>
        }
      }>
    }
  }
}

export const useRepositoryData = (login: string | undefined) => {
  const [result] = useQuery<RepositoryData>({
    query: REPOSITORY_DATA,
    variables: { login }
  })

  const { data, fetching, error } = result

  if (!login) return { fetching, error, repositories: undefined }

  return {
    repositories: data?.user.repositories,
    fetching,
    error
  }
}

const ADD_STAR_MUTATION = gql`
  mutation ($starrableId: String!) {
    addStar(input: { starrableId: $starrableId }) {
      clientMutationId
    }
  }
`

const REMOVE_STAR_MUTATION = gql`
  mutation ($starrableId: String!) {
    removeStar(input: { starrableId: $starrableId }) {
      clientMutationId
    }
  }
`

export function useStarRepository(id: string) {
  const [addResult, addStar] = useMutation(ADD_STAR_MUTATION)
  const [removeResult, removeStar] = useMutation(REMOVE_STAR_MUTATION)

  return {
    addResult,
    addStar: () => addStar({ starrableId: id }),
    removeResult,
    removeStar: () => removeStar({ starrableId: id })
  }
}
