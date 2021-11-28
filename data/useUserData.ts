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
    comaany: string
  }
}

export const useUserData = (login: string) => {
  const [result] = useQuery<UserData>({
    query: USER_DATA,
    variables: { login }
  })

  const { data, fetching, error } = result

  return {
    user: data?.user,
    fetching,
    error
  }
}
