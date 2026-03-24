import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import Nav from '../components/Nav'
import HangmanSVG from '../components/HangmanSVG'

const WORDS = [
  { word: 'JAVASCRIPT', hint: 'Linguagem de programação da web' },
  { word: 'TYPESCRIPT', hint: 'JavaScript com tipos estáticos' },
  { word: 'NEXTJS', hint: 'Framework React para produção' },
  { word: 'COMPONENTE', hint: 'Bloco reutilizável em React' },
  { word: 'PROGRAMACAO', hint: 'Arte de escrever algoritmos' },
  { word: 'ALGORITMO', hint: 'Sequência de instruções para resolver um problema' },
  { word: 'INTERFACE', hint: 'O que o usuário vê e interage' },
  { word: 'DATABASE', hint: 'Onde os dados são armazenados' },
  { word: 'SERVIDOR', hint: 'Computador que processa requisições' },
  { word: 'FRAMEWORK', hint: 'Estrutura para desenvolvimento' },
  { word: 'BIBLIOTECA', hint: 'Coleção de funções reutilizáveis' },
  { word: 'VARIAVEL', hint: 'Espaço na memória para guardar valores' },
  { word: 'FUNCAO', hint: 'Bloco de código reutilizável' },
  { word: 'OBJETO', hint: 'Estrutura de dados com propriedades' },
  { word: 'ARRAY', hint: 'Lista de elementos indexados' },
  { word: 'RECURSAO', hint: 'Função que chama a si mesma' },
  { word: 'HERANCA', hint: 'Conceito fundamental de POO' },
  { word: 'POLIMORFISMO', hint: 'Mesma interface, comportamentos diferentes' },
  { word: 'ENCAPSULAMENTO', hint: 'Ocultar detalhes internos de implementação' },
  { word: 'DEPURACAO', hint: 'Processo de encontrar e corrigir bugs' },
  { word: 'COMMIT', hint: 'Salvar mudanças no Git' },
  { word: 'DEPLOY', hint: 'Publicar a aplicação em produção' },
  { word: 'CONTAINER', hint: 'Tecnologia Docker' },
  { word: 'MICROSERVICO', hint: 'Arquitetura de sistemas distribuídos' },
  { word: 'AUTENTICACAO', hint: 'Verificar a identidade do usuário' },
  { word: 'CRIPTOGRAFIA', hint: 'Proteção de dados por codificação' },
  { word: 'RESPONSIVO', hint: 'Design adaptado a diferentes telas' },
  { word: 'ACESSIBILIDADE', hint: 'Tecnologia para todos' },
  { word: 'PERFORMANCE', hint: 'Velocidade e eficiência da aplicação' },
  { word: 'REFATORACAO', hint: 'Melhorar código sem mudar comportamento' },
]

const KEYBOARD_ROWS = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['Z','X','C','V','B','N','M'],
]

const MAX_ERRORS = 6

function getRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)]
}

export default function Hangman() {
  const [wordObj, setWordObj] = useState(null)
  const [guessed, setGuessed] = useState(new Set())
  const [status, setStatus] = useState('playing') // 'playing' | 'win' | 'lose'

  const startGame = useCallback(() => {
    setWordObj(getRandomWord())
    setGuessed(new Set())
    setStatus('playing')
  }, [])

  useEffect(() => { startGame() }, [startGame])

  const word = wordObj?.word || ''
  const hint = wordObj?.hint || ''

  const wrongLetters = [...guessed].filter(l => !word.includes(l))
  const wrongCount = wrongLetters.length
  const correctLetters = [...guessed].filter(l => word.includes(l))

  const isWon = word.length > 0 && [...word].every(l => guessed.has(l))
  const isLost = wrongCount >= MAX_ERRORS

  useEffect(() => {
    if (isWon) setStatus('win')
    else if (isLost) setStatus('lose')
  }, [isWon, isLost])

  const guess = useCallback((letter) => {
    if (status !== 'playing' || guessed.has(letter)) return
    setGuessed(prev => new Set([...prev, letter]))
  }, [status, guessed])

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e) => {
      const l = e.key.toUpperCase()
      if (/^[A-Z]$/.test(l)) guess(l)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [guess])

  const attemptsLeft = MAX_ERRORS - wrongCount
  const attemptsClass = attemptsLeft <= 1 ? 'danger' : attemptsLeft <= 3 ? 'warning' : 'safe'

  return (
    <>
      <Head>
        <title>Jogo da Forca · Dev. Portfólio</title>
      </Head>

      <Nav />

      <div className="page-wrapper hangman-page">
        <div className="hangman-header">
          <div className="section-label" style={{ justifyContent: 'center' }}>Projeto Pessoal</div>
          <h1 className="section-title" style={{ marginBottom: '0.5rem' }}>
            Jogo da <em>Forca</em>
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: '0.9rem' }}>
            Adivinhe a palavra relacionada a programação • Use o teclado virtual ou o seu teclado físico
          </p>
        </div>

        {wordObj && (
          <div className="hangman-container">
            {/* LEFT */}
            <div className="hangman-left">
              <div className="hangman-svg-wrap">
                <HangmanSVG wrongCount={wrongCount} />
              </div>

              {/* Word display */}
              <div className="word-display">
                {[...word].map((char, i) => (
                  <div key={i} className="letter-slot">
                    <span className={`letter-char ${guessed.has(char) ? 'revealed' : ''}`}>
                      {guessed.has(char) ? char : ' '}
                    </span>
                    <div className="letter-underline" />
                  </div>
                ))}
              </div>

              <button onClick={startGame} className="btn-restart-sm">
                🔄 Nova palavra
              </button>
            </div>

            {/* RIGHT */}
            <div className="hangman-right">
              {/* Attempts */}
              <div className="attempts-badge">
                <div>
                  <div className="attempts-label">Tentativas restantes</div>
                  <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                    {[...Array(MAX_ERRORS)].map((_, i) => (
                      <div
                        key={i}
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: i < attemptsLeft
                            ? (attemptsLeft <= 1 ? 'var(--accent3)' : attemptsLeft <= 3 ? '#f0a843' : 'var(--green)')
                            : 'var(--border)',
                          transition: 'background 0.3s',
                        }}
                      />
                    ))}
                  </div>
                </div>
                <span className={`attempts-count ${attemptsClass}`}>{attemptsLeft}</span>
              </div>

              {/* Hint */}
              <div className="hint-box">
                <h4>💡 Dica</h4>
                <p className="hint-text">{hint}</p>
              </div>

              {/* Used letters */}
              <div className="used-letters">
                <h4>Letras usadas</h4>
                <div className="letters-list">
                  {[...guessed].sort().map(l => (
                    <span
                      key={l}
                      className={`used-letter ${word.includes(l) ? 'correct' : 'wrong'}`}
                    >
                      {l}
                    </span>
                  ))}
                  {guessed.size === 0 && (
                    <span style={{ color: 'var(--text3)', fontSize: '0.8rem', fontStyle: 'italic' }}>
                      Nenhuma letra tentada ainda
                    </span>
                  )}
                </div>
              </div>

              {/* Keyboard */}
              <div className="keyboard">
                {KEYBOARD_ROWS.map((row, ri) => (
                  <div key={ri} className="keyboard-row">
                    {row.map(letter => {
                      const isUsed = guessed.has(letter)
                      const isCorrect = isUsed && word.includes(letter)
                      const isWrong = isUsed && !word.includes(letter)
                      return (
                        <button
                          key={letter}
                          className={`key-btn ${isCorrect ? 'key-correct' : ''} ${isWrong ? 'key-wrong' : ''}`}
                          onClick={() => guess(letter)}
                          disabled={isUsed || status !== 'playing'}
                        >
                          {letter}
                        </button>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* WIN/LOSE OVERLAY */}
      {status !== 'playing' && (
        <div className="game-overlay">
          <div className="result-card">
            <span className="result-emoji">
              {status === 'win' ? '🎉' : '💀'}
            </span>
            <h2 className={`result-title ${status === 'win' ? 'win' : 'lose'}`}>
              {status === 'win' ? 'Parabéns!' : 'Fim de jogo'}
            </h2>
            <p className="result-subtitle">
              {status === 'win'
                ? 'Você acertou a palavra!'
                : 'A palavra era:'}
            </p>
            <div className="result-word">{word}</div>
            {status === 'win' && (
              <p style={{ color: 'var(--text2)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Você errou apenas {wrongCount} letra{wrongCount !== 1 ? 's' : ''}!
              </p>
            )}
            <button onClick={startGame} className="btn-restart">
              Jogar novamente
            </button>
          </div>
        </div>
      )}
    </>
  )
}
