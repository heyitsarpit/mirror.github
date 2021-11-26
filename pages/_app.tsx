import 'public/styles/font.css'
import 'public/styles/global.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <div className='w-full h-full'>
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  )
}

export default MyApp
