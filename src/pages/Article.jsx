import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getArticle } from '../data/articles'
import Footer from '../components/Footer'

const SITE_URL = 'https://dillonshokar.com'

function getArticleDescription(article) {
  const abstract = article.content.find(b => b.type === 'abstract')
  const firstParagraph = article.content.find(b => b.type === 'p')
  const raw = abstract?.text || firstParagraph?.text || article.title
  return raw.length > 155 ? raw.slice(0, 152) + '…' : raw
}

export default function Article() {
  const { slug } = useParams()
  const article = getArticle(slug)

  if (!article) {
    return (
      <>
        <ArticleNav />
        <main style={{ paddingTop: 63, minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--green)' }}>Article not found.</p>
        </main>
        <Footer />
      </>
    )
  }

  const canonicalUrl = `${SITE_URL}/articles/${article.slug}`
  const description = getArticleDescription(article)
  const pageTitle = `${article.title} | Dillon Shokar`

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="Dillon Shokar" />
        <meta property="article:author" content={article.author} />
        <meta property="article:published_time" content={article.date} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      <ArticleNav />
      <main style={{ paddingTop: 63 }}>
        <header style={{ ...s.header, background: article.bg }} className="article-header">
          <div style={s.headerInner}>
            <span style={s.tag}>{article.tag}</span>
            <h1 style={s.title}>{article.title}</h1>
            <p style={s.meta}>By {article.author} · {article.date} · {article.readTime}</p>
          </div>
        </header>
        <div style={s.body}>
          <div style={s.container}>
            {article.content.map((block, i) => renderBlock(block, i))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function ArticleNav() {
  return (
    <nav style={s.nav} className="article-nav">
      <Link to="/" style={s.logo}>Dillon Shokar</Link>
      <Link to="/" style={s.back}>← Back to Home</Link>
      <style>{`
        @media (max-width: 768px) {
          .article-nav { padding: 16px 24px !important; }
          .article-header { padding: 48px 24px 40px !important; }
        }
      `}</style>
    </nav>
  )
}

function renderBlock(block, i) {
  switch (block.type) {
    case 'abstract':
      return (
        <div key={i} style={s.abstract}>
          <p style={s.abstractText}>{block.text}</p>
        </div>
      )
    case 'h2':
      return <h2 key={i} style={s.h2}>{block.text}</h2>
    case 'h3':
      return <h3 key={i} style={s.h3}>{block.text}</h3>
    case 'p':
      return <p key={i} style={s.p}>{block.text}</p>
    case 'labeled':
      return (
        <p key={i} style={s.p}>
          <strong style={s.label}>{block.label}: </strong>{block.text}
        </p>
      )
    case 'ul':
      return (
        <ul key={i} style={s.ul}>
          {block.items.map((item, j) => <li key={j} style={s.li}>{item}</li>)}
        </ul>
      )
    case 'image':
      return (
        <figure key={i} style={s.figure}>
          <img src={block.src} alt={block.caption || ''} style={s.img} />
          {block.caption && <figcaption style={s.figcaption}>{block.caption}</figcaption>}
        </figure>
      )
    case 'credential':
      return <p key={i} style={s.credential}>{block.text}</p>
    case 'sources':
      return (
        <div key={i} style={s.sources}>
          <p style={s.sourcesTitle}>Sources</p>
          {block.items.map((src, j) => <p key={j} style={s.sourceItem}>{src}</p>)}
        </div>
      )
    default:
      return null
  }
}

const s = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '18px 56px',
    background: 'rgba(28,58,40,0.97)',
    backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '0.5px solid rgba(247,244,239,0.1)',
  },
  logo: {
    fontFamily: 'var(--serif)', fontSize: 17, fontWeight: 400,
    color: 'var(--cream)', letterSpacing: '0.02em', textDecoration: 'none',
  },
  back: {
    fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
    color: 'rgba(247,244,239,0.5)', textDecoration: 'none',
  },
  header: {
    padding: '80px 56px 64px',
    borderBottom: '0.5px solid rgba(247,244,239,0.1)',
  },
  headerInner: {
    maxWidth: 760,
    margin: '0 auto',
  },
  tag: {
    display: 'inline-block',
    fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase',
    background: 'var(--orange)', color: '#fff', padding: '5px 11px',
    fontWeight: 500, marginBottom: 24,
  },
  title: {
    fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 3.2vw, 42px)',
    fontWeight: 400, color: 'var(--cream)', lineHeight: 1.2, marginBottom: 20,
  },
  meta: {
    fontSize: 13, color: 'rgba(247,244,239,0.45)', fontWeight: 300,
    letterSpacing: '0.03em',
  },
  body: {
    background: 'var(--cream)',
    padding: '0 24px',
  },
  container: {
    maxWidth: 720,
    margin: '0 auto',
    padding: '56px 0 80px',
  },
  abstract: {
    background: 'var(--stone)',
    borderLeft: '3px solid var(--orange)',
    padding: '24px 28px',
    marginBottom: 36,
  },
  abstractText: {
    fontSize: 14, lineHeight: 1.85,
    color: 'var(--body)', fontStyle: 'italic', fontWeight: 300,
  },
  h2: {
    fontFamily: 'var(--serif)', fontSize: 22,
    color: 'var(--green)', fontWeight: 400,
    marginTop: 52, marginBottom: 16,
    paddingBottom: 12,
    borderBottom: '0.5px solid var(--border)',
  },
  h3: {
    fontFamily: 'var(--serif)', fontSize: 16,
    color: 'var(--green)', fontWeight: 500, fontStyle: 'italic',
    marginTop: 30, marginBottom: 10,
  },
  p: {
    fontSize: 15, lineHeight: 1.85,
    color: 'var(--body)', marginBottom: 18, fontWeight: 300,
  },
  label: {
    color: 'var(--green)', fontWeight: 600, fontStyle: 'normal',
  },
  ul: {
    marginLeft: 20, marginBottom: 18, paddingLeft: 4,
  },
  li: {
    fontSize: 15, lineHeight: 1.75,
    color: 'var(--body)', marginBottom: 8, fontWeight: 300,
  },
  figure: {
    margin: '40px 0',
  },
  img: {
    width: '100%', height: 'auto',
    border: '0.5px solid var(--border)',
    display: 'block',
  },
  figcaption: {
    fontSize: 12, color: 'var(--muted)',
    marginTop: 10, fontStyle: 'italic', textAlign: 'center',
  },
  credential: {
    fontSize: 13, color: 'var(--muted)',
    fontWeight: 300, fontStyle: 'italic',
    marginTop: 32, marginBottom: 0,
    borderTop: '0.5px solid var(--border)',
    paddingTop: 20,
  },
  sources: {
    marginTop: 56, paddingTop: 32,
    borderTop: '0.5px solid var(--border)',
  },
  sourcesTitle: {
    fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
    color: 'var(--orange)', fontWeight: 500, marginBottom: 20,
  },
  sourceItem: {
    fontSize: 12, lineHeight: 1.7,
    color: 'var(--muted)', marginBottom: 10, fontWeight: 300,
  },
}
