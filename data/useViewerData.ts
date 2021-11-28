import { gql, useQuery } from 'urql'

const VIEWER_DATA = gql`
  query {
    viewer {
      login
    }
  }
`

type ViewerData = {
  viewer: {
    login: string
  }
}

export const useViewerData = () => {
  const [result] = useQuery<ViewerData>({
    query: VIEWER_DATA
  })

  const { data, fetching, error } = result

  return {
    viewer: data?.viewer,
    fetching,
    error
  }
}
