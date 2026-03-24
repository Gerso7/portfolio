import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Nav() {
  const router = useRouter()
  const isHangman = router.pathname === '/hangman'

  return (
    <nav>
      <Link href="/" className="nav-logo">
        {isHangman ? '← Dev.' : 'Dev.'}
      </Link>
      <ul className="nav-links">
        {!isHangman ? (
          <>
            <li><a href="#about">Sobre</a></li>
            <li><a href="#projects">Projetos</a></li>
          </>
        ) : null}
        <li>
          <Link href={isHangman ? '/' : '/hangman'} style={{ color: 'var(--accent)' }}>
            {isHangman ? 'Portfólio' : '🎮 Jogo da Forca'}
          </Link>
        </li>
      </ul>
    </nav>
  )
}
