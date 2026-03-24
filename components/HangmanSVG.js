export default function HangmanSVG({ wrongCount }) {
  return (
    <svg viewBox="0 0 200 220" width="200" height="220" xmlns="http://www.w3.org/2000/svg">
      {/* Gallows */}
      <line x1="20" y1="210" x2="180" y2="210" stroke="#2a2a38" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="210" x2="60" y2="20" stroke="#2a2a38" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="20" x2="130" y2="20" stroke="#2a2a38" strokeWidth="3" strokeLinecap="round" />
      <line x1="130" y1="20" x2="130" y2="45" stroke="#2a2a38" strokeWidth="3" strokeLinecap="round" />

      {/* Rope */}
      {wrongCount >= 1 && (
        <line x1="130" y1="20" x2="130" y2="45" stroke="#c8a96e" strokeWidth="2" strokeLinecap="round" />
      )}

      {/* Head */}
      {wrongCount >= 1 && (
        <circle cx="130" cy="58" r="13" stroke="#e8e8f0" strokeWidth="2.5" fill="none" />
      )}

      {/* Body */}
      {wrongCount >= 2 && (
        <line x1="130" y1="71" x2="130" y2="130" stroke="#e8e8f0" strokeWidth="2.5" strokeLinecap="round" />
      )}

      {/* Left arm */}
      {wrongCount >= 3 && (
        <line x1="130" y1="85" x2="105" y2="110" stroke="#e8e8f0" strokeWidth="2.5" strokeLinecap="round" />
      )}

      {/* Right arm */}
      {wrongCount >= 4 && (
        <line x1="130" y1="85" x2="155" y2="110" stroke="#e8e8f0" strokeWidth="2.5" strokeLinecap="round" />
      )}

      {/* Left leg */}
      {wrongCount >= 5 && (
        <line x1="130" y1="130" x2="108" y2="165" stroke="#e8e8f0" strokeWidth="2.5" strokeLinecap="round" />
      )}

      {/* Right leg */}
      {wrongCount >= 6 && (
        <line x1="130" y1="130" x2="152" y2="165" stroke="#e8e8f0" strokeWidth="2.5" strokeLinecap="round" />
      )}

      {/* Dead eyes on max errors */}
      {wrongCount >= 6 && (
        <>
          <line x1="123" y1="53" x2="127" y2="57" stroke="#e8645a" strokeWidth="2" strokeLinecap="round" />
          <line x1="127" y1="53" x2="123" y2="57" stroke="#e8645a" strokeWidth="2" strokeLinecap="round" />
          <line x1="133" y1="53" x2="137" y2="57" stroke="#e8645a" strokeWidth="2" strokeLinecap="round" />
          <line x1="137" y1="53" x2="133" y2="57" stroke="#e8645a" strokeWidth="2" strokeLinecap="round" />
          <path d="M124 64 Q130 61 136 64" stroke="#e8645a" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      )}

      {/* Happy eyes on 0 wrong */}
      {wrongCount === 0 && (
        <>
          <circle cx="125" cy="55" r="2" fill="#4ecb71" />
          <circle cx="135" cy="55" r="2" fill="#4ecb71" />
          <path d="M124 62 Q130 67 136 62" stroke="#4ecb71" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}
