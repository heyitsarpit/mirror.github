import NextLink from 'next/link'

type LinkProps = {
  children: React.ReactNode
  href: string
  className?: string
}

export function Link({
  children,
  href,
  className = 'text-blue-500 hover:underline'
}: LinkProps) {
  return (
    <NextLink href={href}>
      <a className={className}>{children}</a>
    </NextLink>
  )
}
