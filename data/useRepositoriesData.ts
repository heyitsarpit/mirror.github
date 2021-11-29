import { gql, useMutation, useQuery } from 'urql'

const REPOSITORIES_DATA = gql`
  query ($login: String!) {
    user(login: $login) {
      starredRepositories(first: 20, orderBy: { field: STARRED_AT, direction: DESC }) {
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

export type RepositoriesData = {
  user: {
    starredRepositories: {
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

export const useRepositoriesData = (login: string | undefined) => {
  const [result] = useQuery<RepositoriesData>({
    query: REPOSITORIES_DATA,
    variables: { login }
  })

  const { data, fetching, error } = result

  if (!login) return { fetching, error, repositories: undefined }

  return {
    repositories: data?.user.starredRepositories,
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

export function useRepoStarMutation(id: string) {
  const [addResult, addStar] = useMutation(ADD_STAR_MUTATION)
  const [removeResult, removeStar] = useMutation(REMOVE_STAR_MUTATION)

  return {
    addResult,
    addStar: () => addStar({ starrableId: id }),
    removeResult,
    removeStar: () => removeStar({ starrableId: id })
  }
}
