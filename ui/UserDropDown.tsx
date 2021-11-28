import { Content, Group, Item, Label, Root, Trigger } from '@radix-ui/react-dropdown-menu'
import { useViewerLoginQuery } from 'graphql/generated'
import { signOut, useSession } from 'next-auth/react'

export function UserDropDown() {
  const { data: session, status } = useSession()
  const [viewerResult] = useViewerLoginQuery()

  const { viewer } = viewerResult.data || {}

  if (status !== 'authenticated' || !session) {
    return null
  }

  return (
    <div className='flex items-center gap-4'>
      <Root>
        <Trigger>
          <div className='flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-md'>
            {session.user?.image ? (
              <img src={session.user.image} className='h-8 rounded-full' alt='avatar' />
            ) : null}

            <div>{session.user?.name}</div>
          </div>
          <Content className='p-2 my-4 bg-gray-900 rounded-md'>
            <Label className='mb-4 text-sm opacity-70'>
              {viewer ? (
                <span>
                  Signed in as <strong>{viewer.login}</strong>
                </span>
              ) : null}
            </Label>
            <Group className='flex flex-col gap-2'>
              <Item className='p-2 py-2 bg-gray-700 rounded-md'>Profile</Item>
              <Item onSelect={() => signOut()} className='p-2 bg-gray-700 rounded-md'>
                Sign Out
              </Item>
            </Group>
          </Content>
        </Trigger>
      </Root>
    </div>
  )
}
