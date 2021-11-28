import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const session = await getSession(ctx)

    return { props: { session } }
  } catch {
    return { redirect: { permanent: false, destination: '/404' }, props: {} }
  }
}

export default function User(props) {
  return <div>{User}</div>
}
