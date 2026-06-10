import { Helmet } from 'react-helmet-async'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import PullQuote from '../components/PullQuote'
import Bio from '../components/Bio'
import Stats from '../components/Stats'
import Research from '../components/Research'
import Pillars from '../components/Pillars'
import Footer from '../components/Footer'

const SITE_URL = 'https://dillonshokar.com'
const DESCRIPTION = 'Dillon Shokar is an executive, advisor, and speaker specialising in pharmaceutical strategy, Medical Affairs, and healthcare innovation.'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Dillon Shokar — Executive, Advisor, Speaker</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content="Dillon Shokar — Executive, Advisor, Speaker" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:site_name" content="Dillon Shokar" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Dillon Shokar — Executive, Advisor, Speaker" />
        <meta name="twitter:description" content={DESCRIPTION} />
      </Helmet>
      <Nav />
      <main style={{ paddingTop: 63 }}>
        <Hero />
        <PullQuote />
        <Bio />
        <Stats />
        <Research />
        <Pillars />
      </main>
      <Footer />
    </>
  )
}
