import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '../components/Nav'

const projects = [
  {
    icon: '🎮',
    name: 'Jogo da Forca',
    desc: 'Jogo interativo com teclado virtual, animação SVG do boneco, sistema de pontuação e mais de 30 palavras temáticas. Projeto desenvolvido para a faculdade.',
    tags: ['React', 'Next.js', 'CSS', 'Game'],
    highlight: true,
    href: '/hangman',
  },
]

export default function Home() {
  return (
    <>
      <Head>
        <title>Gerson · Portfólio</title>
        <meta name="description" content="Portfólio de Gerson — Cientista de Dados" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <div className="page-wrapper">
        {/* HERO */}
        <section className="hero">
          <div className="hero-text">
            <div className="hero-eyebrow fade-up fade-up-delay-1">Cientista de Dados</div>
            <h1 className="hero-name fade-up fade-up-delay-2">
              Olá, sou<br />Gerson.
            </h1>
            <p className="hero-title fade-up fade-up-delay-3">
              Transformo dados em decisões inteligentes.
            </p>
            <p className="hero-desc fade-up fade-up-delay-4">
              Estudante de Ciência da Computação com foco em Ciência de Dados.
              Apaixonado por extrair conhecimento de dados complexos e construir
              soluções analíticas que geram impacto real.
            </p>
            <div className="hero-ctas fade-up fade-up-delay-4">
              <a href="#projects" className="btn-primary">Ver Projetos</a>
              <a href="#about" className="btn-ghost">Sobre mim</a>
            </div>
          </div>

          <div className="hero-image-area">
            <div className="hero-photo-wrapper fade-up fade-up-delay-2">
              <Image
                src="/perfil.jpeg"
                alt="Foto de Gerson"
                className="hero-photo"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div className="hero-badge">
                <span className="badge-dot" />
                <span className="badge-text">em formação</span>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ABOUT */}
        <section id="about">
          <div className="section-label">Sobre mim</div>
          <h2 className="section-title">Quem sou <em>eu</em></h2>

          <div className="about-grid">
            <div className="about-text">
              <p>
                Meu nome é <strong>Gerson</strong>, sou estudante de <strong>Ciência da Computação</strong> com
                foco em Ciência de Dados, baseado em <strong>Recife, Pernambuco</strong>.
              </p>
              <p>
                Tenho interesse em análise e visualização de dados, aprendizado de máquina e na
                construção de modelos que ajudem a interpretar o mundo ao nosso redor. Acredito
                que boas decisões nascem de dados bem compreendidos.
              </p>
              <p>
                Fora da computação, sou apaixonado por <strong>literatura</strong> — especialmente
                ficção científica e ensaios filosóficos — e por <strong>esportes</strong>, que me ensinam
                sobre disciplina, estratégia e trabalho em equipe.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: '📚', title: 'Educação', desc: 'Ciência da Computação · Foco em Data Science' },
                { icon: '📍', title: 'Localização', desc: 'Recife, Pernambuco, Brasil' },
                { icon: '📖', title: 'Interesses', desc: 'Literatura, Esportes, Machine Learning' },
                { icon: '🎯', title: 'Objetivo', desc: 'Atuar como Cientista de Dados' },
              ].map(item => (
                <div key={item.title} className="stat-card" style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item.title}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text2)', marginTop: '0.1rem' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* PROJECTS */}
        <section id="projects">
          <div className="section-label">Portfólio</div>
          <h2 className="section-title">Meus <em>projetos</em></h2>

          <div className="projects-grid" style={{ gridTemplateColumns: 'minmax(300px, 480px)' }}>
            {projects.map(p => (
              <Link href={p.href} key={p.name} className="project-card" style={{ borderColor: 'rgba(200,169,110,0.4)' }}>
                <span className="project-icon">{p.icon}</span>
                <h3 className="project-name">{p.name}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map(t => (
                    <span key={t} className="tag highlight">{t}</span>
                  ))}
                  <span className="tag highlight">✦ Destaque</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <footer>
          <span>© 2024 Gerson — Feito com ❤️ em Recife</span>
          <span style={{ fontFamily: 'DM Mono', fontSize: '0.75rem' }}>
            Next.js · CSS · ☕
          </span>
        </footer>
      </div>
    </>
  )
}
