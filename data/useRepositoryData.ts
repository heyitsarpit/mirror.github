import { gql, useQuery } from 'urql'

const REPOSITORY_DATA = gql`
  query ($login: String!) {
    user(login: $login) {
      repositories(last: 10) {
        nodes {
          name
          description
          isPrivate
          stargazerCount
          updatedAt
          viewerHasStarred
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
      nodes: Array<{
        id: string
        name: string
        description: string
        isPrivate: string
        stargazerCount: string
        viewerHasStarred: boolean
        updatedAt: string
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
    repositories: data?.user.repositories.nodes,
    fetching,
    error
  }
}
