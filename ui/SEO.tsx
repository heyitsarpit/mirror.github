import { DefaultSeo } from 'next-seo'

export const SEO: React.FC = () => {
  return (
    <DefaultSeo
      defaultTitle='Mirror Github'
      titleTemplate='%s - Mirror Github'
      description='Hiring Challenge for Mirror'
      canonical='https://mirror-github.vercel.app/'
      openGraph={{
        url: 'https://mirror-github.vercel.app/',
        title: 'Mirror Github',
        description: 'Hiring Challenge for Mirror',
        site_name: 'mirror.github'
      }}
    />
  )
}
