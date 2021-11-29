import { gql, useQuery } from 'urql'

const REPOSITORY_DATA = gql`
  query ($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      id
      name
      description
      description
      isPrivate
      stargazerCount
      updatedAt
      viewerHasStarred
      pushedAt
      nameWithOwner
      ...RepoFragment
      ...DefaultRepoFragment
      object(expression: "HEAD:") {
        ... on Tree {
          entries {
            name
            type
            object {
              ... on Blob {
                byteSize
              }
            }
          }
        }
      }

      stargazers(last: 25) {
        nodes {
          avatarUrl
          login
        }
      }
      languages(orderBy: { field: SIZE, direction: DESC }, first: 5) {
        nodes {
          color
          id
          name
        }
      }
    }
  }

  fragment DefaultRepoFragment on Repository {
    defaultBranchRef {
      name
      target {
        ... on Commit {
          message
          changedFiles
          committedDate
          author {
            user {
              login
              avatarUrl
            }
          }
          commitUrl
        }
      }
    }
  }

  fragment RepoFragment on Repository {
    readme1: object(expression: "main:README.md") {
      ...ReadmeText
    }
    readme2: object(expression: "main:README.MD") {
      ...ReadmeText
    }
    readme3: object(expression: "main:readme.md") {
      ...ReadmeText
    }
    readme4: object(expression: "main:Readme.md") {
      ...ReadmeText
    }
    readme5: object(expression: "main:README") {
      ...ReadmeText
    }
  }

  fragment ReadmeText on GitObject {
    ... on Blob {
      text
    }
  }
`

export type RepositoryData = {
  repository: {
    id: string
    name: string
    description: string
    isPrivate: boolean
    stargazerCount: number
    updatedAt: string
    viewerHasStarred: boolean
    pushedAt: string
    nameWithOwner: string
    object: {
      entries: Array<{
        name: string
        type: 'blob' | 'tree'
        object: {
          byteSize: number | null
        }
      }>
    }
    defaultBranchRef: {
      name: string
      target: {
        message: string
        changedFiles: number
        committedDate: string
        commitUrl: string
        author: {
          user: {
            login: string
            avatarUrl: string
          }
        }
      }
    }
    stargazers: {
      nodes: Array<{
        avatarUrl: string
        login: string
      }>
    }
    languages: {
      nodes: Array<{
        color: string
        id: string
        name: string
      }>
    }
    readme1: { text: string } | null
    readme2: { text: string } | null
    readme3: { text: string } | null
    readme4: { text: string } | null
    readme5: { text: string } | null
  }
}

type UseRepositoryDataArgs = { name: string | undefined; owner: string | undefined }

export const useRepositoryData = ({ name, owner }: UseRepositoryDataArgs) => {
  const [result] = useQuery<RepositoryData>({
    query: REPOSITORY_DATA,
    variables: { owner, name }
  })

  const { data, fetching, error } = result

  if (!name || !owner) return { fetching, error, repository: undefined }

  return {
    repository: data?.repository,
    fetching,
    error
  }
}
