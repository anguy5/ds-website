const PILLS = [
  'AI & Longevity',
  'Precision Medicine',
  'Direct-to-Patient',
  'Evidence Generation',
]

export default function Bio() {
  return (
    <section id="about" style={s.section}>
      {/* Header row */}
      <div style={s.header} className="bio-header">
        <p style={s.eyebrow}>About Dillon</p>
        <h2 style={s.heading}>
          Investing in the forces reshaping healthcare.
        </h2>
      </div>

      {/* Two-column body */}
      <div style={s.body} className="bio-body">
        {/* Sidebar */}
        <div style={s.sidebar} className="bio-sidebar">
          <p style={s.sideLabel}>Focus Areas</p>
          <div style={s.pills}>
            {PILLS.map(p => <span key={p} style={s.pill}>{p}</span>)}
          </div>
          <div style={s.affiliation}>
            <p style={s.sideLabel}>Affiliation</p>
            <p style={s.affiliationName}>Princeton Biopartners</p>
            <a href="mailto:dshokar@princetonbp.com" style={s.email}>dshokar@princetonbp.com</a>
          </div>
        </div>

        {/* Main text */}
        <div style={s.main} className="bio-main">
          {[
            'Dillon Shokar is an investor and operator focused on the forces reshaping healthcare. As Co-Founder and CEO of Princeton Biopartners, he advises leading pharmaceutical and biotech companies on asset strategy, operating models, and integrated evidence generation, giving him a working view of the industry from the inside. His investing and writing concentrate on three structural shifts: the rise of AI-powered consumer health applications built around longevity, the growing role of biomarker-driven precision medicine, and the emergence of direct-to-patient distribution. Together, these forces are redefining how healthcare is personalized, accessed, and delivered.',
          ].map((para, i) => (
            <p key={i} style={{ ...s.para, ...(i < 2 ? { marginBottom: 22 } : {}) }}>{para}</p>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .bio-header { padding: 36px 24px 24px !important; }
          .bio-body { grid-template-columns: 1fr !important; }
          .bio-sidebar { padding: 28px 24px 32px !important; border-right: none !important; border-bottom: 0.5px solid var(--border); }
          .bio-main { padding: 28px 24px 40px !important; }
        }
      `}</style>
    </section>
  )
}

const s = {
  section: {
    background: 'var(--cream)',
    borderTop: '0.5px solid var(--border)',
  },
  header: {
    padding: '52px 56px 32px',
    borderBottom: '0.5px solid var(--border)',
    display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
    gap: 16,
  },
  eyebrow: {
    fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
    color: 'var(--orange)', fontWeight: 500, marginBottom: 8,
  },
  heading: {
    fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 2.8vw, 34px)',
    fontWeight: 400, color: 'var(--green)', lineHeight: 1.2,
  },
  body: {
    display: 'grid', gridTemplateColumns: '1fr 1.8fr',
  },
  sidebar: {
    padding: '40px 36px 52px 56px',
    borderRight: '0.5px solid var(--border)',
  },
  sideLabel: {
    fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
    color: 'var(--muted)', marginBottom: 16, fontWeight: 400,
  },
  pills: { display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 },
  pill: {
    fontSize: 11, border: '0.5px solid var(--green)',
    color: 'var(--green)', padding: '5px 12px',
    letterSpacing: '0.05em', textTransform: 'uppercase',
  },
  affiliation: { marginTop: 4 },
  affiliationName: { fontSize: 14, color: 'var(--green)', fontWeight: 400, marginBottom: 6 },
  email: { fontSize: 12, color: 'var(--muted)', fontWeight: 300 },
  main: { padding: '40px 56px 52px 48px' },
  para: {
    fontSize: 15, lineHeight: 1.85, color: 'var(--body)',
    fontWeight: 300, maxWidth: 560,
  },
}
