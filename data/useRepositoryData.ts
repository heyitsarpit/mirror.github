import { gql, useMutation, useQuery } from 'urql'

const REPOSITORY_DATA = gql`
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

export type RepositoryData = {
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

export const useRepositoryData = (login: string | undefined) => {
  const [result] = useQuery<RepositoryData>({
    query: REPOSITORY_DATA,
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
