import { gql, useQuery } from 'urql'

const USER_DATA = gql`
  query ($login: String!) {
    user(login: $login) {
      login
      bio
      company
    }
  }
`

type UserData = {
  user: {
    login: string
    bio: string
    company: string
  }
}

export const useUserData = (login: string | undefined) => {
  const [result] = useQuery<UserData>({
    query: USER_DATA,
    variables: { login }
  })

  const { data, fetching, error } = result

  if (!login) return { fetching, error, user: undefined }

  return {
    user: data?.user,
    fetching,
    error
  }
}
