import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  if (req.page.name === '/') return NextResponse.next()

  const protectedPages = ['/[user]', '/[user]/[repository]', '/404']

  if (!protectedPages.includes(req.page.name as string)) return NextResponse.next()

  const session = await getToken({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req,
    secret: process.env.NEXT_AUTH_SECRET as string
  })

  return session ? NextResponse.next() : NextResponse.redirect('/')
}
