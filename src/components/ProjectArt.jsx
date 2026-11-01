import { Sparkles, Keyboard } from 'lucide-react'

/* Small illustrated "thumbnails" — pure CSS/SVG, so they stay crisp, light and on-brand. */

function Flight() {
  return (
    <div className="art art--flight">
      <div className="art__grid" />
      <svg className="art__route" viewBox="0 0 320 130" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <path d="M24 100 Q160 -30 296 88" className="art__path" />
        <circle cx="24" cy="100" r="5" className="art__node" />
        <circle cx="296" cy="88" r="5" className="art__node art__node--end" />
        <g className="art__plane">
          <path d="M-9 -6 L11 0 L-9 6 L-5 0 Z" />
          <animateMotion dur="5.5s" repeatCount="indefinite" rotate="auto" path="M24 100 Q160 -30 296 88" />
        </g>
      </svg>
      <div className="art__ticket">
        <span className="art__ticket-k">BOARDING PASS</span>
        <span className="art__ticket-row">
          <b>A</b>
          <em />
          <b>B</b>
        </span>
        <span className="art__barcode" />
        <span className="art__ticket-k">PNR · SEAT</span>
      </div>
    </div>
  )
}

function Weather() {
  return (
    <div className="art art--weather">
      <div className="art__sun">
        <span className="art__rays" />
      </div>
      <span className="art__cloud art__cloud--a" />
      <span className="art__cloud art__cloud--b" />
      <div className="art__chip art__chip--coord">LAT · LON</div>
      <div className="art__chip art__chip--api">REST API</div>
    </div>
  )
}

function Library() {
  return (
    <div className="art art--library">
      <div className="art__books">
        <span className="art__book art__book--1" />
        <span className="art__book art__book--2" />
        <span className="art__book art__book--3" />
        <span className="art__book art__book--4" />
      </div>
      <div className="art__bubble">
        <Sparkles size={14} aria-hidden="true" />
        <span className="art__bubble-line" />
        <span className="art__bubble-line art__bubble-line--short" />
      </div>
      <div className="art__vec">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="art__chip art__chip--rag">RAG · FAISS</div>
    </div>
  )
}

function Typing() {
  return (
    <div className="art art--typing">
      <Keyboard className="art__kb" size={20} aria-hidden="true" />
      <p className="art__line">
        <span className="art__typed">practice makes perfect</span>
        <span className="art__caret" />
        <span className="art__rest"> every key counts</span>
      </p>
      <div className="art__meter">
        <span />
      </div>
      <div className="art__chip art__chip--wpm">WPM · ACCURACY</div>
    </div>
  )
}

function Portfolio() {
  return (
    <div className="art art--portfolio">
      <div className="art__browser">
        <div className="art__bar">
          <i />
          <i />
          <i />
        </div>
        <div className="art__page">
          <span className="art__hl art__hl--big" />
          <span className="art__hl" />
          <span className="art__hl art__hl--short" />
          <div className="art__tiles">
            <b />
            <b />
            <b />
          </div>
        </div>
      </div>
    </div>
  )
}

const arts = { flight: Flight, weather: Weather, library: Library, typing: Typing, portfolio: Portfolio }

export default function ProjectArt({ type }) {
  const Art = arts[type] || Portfolio
  return <Art />
}
