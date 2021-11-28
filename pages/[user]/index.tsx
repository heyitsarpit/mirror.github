import { gql } from 'graphql-request'
import { githubClient } from 'lib/graphql_client'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

const USER_DATA = gql`
  query ($login: String!) {
    user(login: $login) {
      login
      bio
      company
    }
  }
`

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user = ctx.query.user

  try {
    const data = await githubClient.request(USER_DATA, { login: user })

    const session = await getSession(ctx)

    return { props: { data, session } }
  } catch {
    return { redirect: { permanent: false, destination: '/404' }, props: {} }
  }
}

export default function User(props) {
  const {
    data: { user }
  } = props

  return <div>{user.login}</div>
}
