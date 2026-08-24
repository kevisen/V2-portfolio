import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Line, Sparkles, Stars } from '@react-three/drei'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Menu, Volume2, X } from 'lucide-react'
import { Suspense, useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'

const chapters = [
  ['00', 'ENTRY'], ['01', 'IDENTITY'], ['02', 'CODE'], ['03', 'MARKETS'], ['04', 'PROJECTS'], ['05', 'VISION'], ['06', 'CONTACT'],
]
const projects = [
  ['01', 'TRADING HUB', 'EDTECH / TRADING', 'Structured learning, interactive quizzes and an immersive route into market education.'],
  ['02', '8BIT CREATIVE', 'DIGITAL AGENCY', 'A creative business at the intersection of web, growth, commerce and markets.'],
  ['03', 'ACTIVE24', 'E-COMMERCE', 'A sharp digital presence concept for a Mauritius electronics repair business.'],
  ['04', 'TRADING TOOLS', 'FINTECH / TRADING', 'Experimental systems for macro timing, analysis and execution workflows.'],
]

function Orb({ position, color = '#7b80ff', scale = 1 }: { position: [number, number, number], color?: string, scale?: number }) {
  const ref = useMemo(() => new THREE.Group(), [])
  useFrame((state) => { ref.rotation.y += .003; ref.rotation.x = Math.sin(state.clock.elapsedTime * .3) * .15 })
  return <group ref={ref} position={position} scale={scale}><mesh><icosahedronGeometry args={[1, 2]} /><meshStandardMaterial color="#11131a" metalness={.95} roughness={.16} emissive={color} emissiveIntensity={.18} /></mesh><mesh scale={1.16}><icosahedronGeometry args={[1, 1]} /><meshBasicMaterial color={color} wireframe transparent opacity={.33} /></mesh></group>
}
function World() {
  const nodes = [[-6, 2, -2], [5, 1, -3], [-4, -3, -4], [5, -3, -5], [0, 4, -5]] as [number,number,number][]
  return <Canvas className="world" dpr={[1, 1.5]} camera={{ position: [0, 0, 12], fov: 52 }} gl={{ antialias: false, powerPreference: 'high-performance' }}>
    <color attach="background" args={['#050505']} /><fog attach="fog" args={['#050505', 7, 28]} />
    <ambientLight intensity={.35} /><pointLight position={[0, 3, 5]} color="#8195ff" intensity={70} distance={16} /><pointLight position={[-8, -2, 0]} color="#18d7db" intensity={25} distance={12} />
    <Stars radius={45} depth={25} count={700} factor={2} saturation={0} fade speed={.35} /><Sparkles count={75} scale={[18, 13, 10]} size={1.2} speed={.22} color="#9eb9ff" />
    <Float speed={1.1} rotationIntensity={.4} floatIntensity={.45}><Orb position={[0, .15, 0]} scale={1.8} /></Float>
    {nodes.map((p, i) => <Float key={i} speed={.6 + i*.15}><Orb position={p} scale={.28 + i*.06} color={i % 2 ? '#26d9df' : '#9b75ff'} /></Float>)}
    {nodes.slice(0, 4).map((p, i) => <Line key={i} points={[p, nodes[(i + 1) % nodes.length]]} color="#445d93" transparent opacity={.38} lineWidth={.4} />)}
    <gridHelper args={[34, 34, '#17254a', '#0b1020']} position={[0, -4.5, -4]} rotation={[0,0,0]} />
  </Canvas>
}

function App() {
  const [loaded, setLoaded] = useState(false); const [progress, setProgress] = useState(0); const [menu, setMenu] = useState(false); const [active, setActive] = useState(0); const [selected, setSelected] = useState<number | null>(null)
  useEffect(() => { const id = setInterval(() => setProgress(p => p >= 100 ? (clearInterval(id), 100) : p + 4), 38); return () => clearInterval(id) }, [])
  useEffect(() => { if (progress === 100) { const t = setTimeout(() => setLoaded(true), 350); return () => clearTimeout(t) } }, [progress])
  useEffect(() => { const onScroll = () => setActive(Math.min(6, Math.floor((scrollY / Math.max(1, document.body.scrollHeight - innerHeight)) * 7))); addEventListener('scroll', onScroll); return () => removeEventListener('scroll', onScroll) }, [])
  const go = (i:number) => { document.getElementById(`chapter-${i}`)?.scrollIntoView({ behavior: 'smooth' }); setMenu(false) }
  return <main>
    <div className="world-wrap" aria-hidden="true"><Suspense fallback={null}><World /></Suspense></div>
    <AnimatePresence>{!loaded && <motion.div className="loader" exit={{opacity:0, transition:{duration:.8}}}><div className="loader-mark">◈</div><p>KEVISEN</p><span>INITIALIZING DIGITAL WORLD...</span><strong>{String(progress).padStart(2,'0')}</strong><i /></motion.div>}</AnimatePresence>
    {loaded && <><header><button className="wordmark" onClick={() => go(0)}>KEVISEN<span>®</span></button><button className="menu" onClick={() => setMenu(!menu)} aria-label="Open navigation">{menu ? <X /> : <Menu />} MENU</button></header>
      <AnimatePresence>{menu && <motion.nav initial={{opacity:0, y:-15}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-15}}>{chapters.map(([n,label],i)=><button key={n} onClick={()=>go(i)}><small>{n}</small>{label}</button>)}</motion.nav>}</AnimatePresence>
      <aside className="rail"><span className="rail-line"><b style={{height:`${((active+1)/7)*100}%`}} /></span>{chapters.map(([n],i)=><button key={n} className={i===active?'on':''} onClick={()=>go(i)}>{n}</button>)}</aside>
      <div className="scroll-cue">SCROLL TO EXPLORE <ArrowDownRight size={14}/></div><div className="counter">{chapters[active][0]} <i/> 06</div>
      <div className="journey">
        <section id="chapter-0" className="hero chapter"><div className="eyebrow">THE DIGITAL WORLD OF</div><h1>KEVISEN</h1><p className="roles">WEB DEVELOPER <i/> TRADER <i/> BUILDER</p><p className="intro">I build digital experiences, study markets, and turn ideas into systems.</p><div className="actions"><button onClick={()=>go(1)}>ENTER THE WORLD <ArrowUpRight/></button><button className="quiet" onClick={()=>go(4)}>VIEW WORK</button></div><small className="meta">MAURITIUS · 2026</small></section>
        <section id="chapter-1" className="chapter about"><div className="eyebrow">01 / IDENTITY</div><h2>Developer by profession.<br/><em>Trader by obsession.</em><br/>Builder by nature.</h2><div className="copy"><p>I’m a web developer from Mauritius focused on building modern, performant and conversion-focused digital experiences.</p><p>I work across frontend development, CMS platforms, Shopify, website optimization and digital products. Outside development, I study financial markets, macroeconomics and structured trading.</p></div></section>
        <section id="chapter-2" className="chapter code"><div className="eyebrow">02 / DEVELOPMENT</div><h2>Systems made<br/>visible.</h2><div className="terminal"><span>~/kevisen/stack</span><p>React · Next.js · TypeScript · JavaScript</p><p>Tailwind · Shopify · AEM · WordPress · Webflow</p><b>BUILDING WITH INTENTION_</b></div></section>
        <section id="chapter-3" className="chapter markets"><div className="eyebrow">03 / MARKETS</div><h2>Where probability<br/>meets <em>execution.</em></h2><div className="market-panel"><div className="chart">╱╲╱╲╲╱╲╱╲</div><p>FUTURES　 STOCKS　 FOREX　 CRYPTO　 MACRO</p><ol><li>01 <b>Risk</b></li><li>02 <b>Context</b></li><li>03 <b>Setup</b></li><li>04 <b>Execution</b></li><li>05 <b>Review</b></li></ol><strong>PROCESS &gt; PREDICTION</strong></div></section>
        <section id="chapter-4" className="chapter projects"><div className="eyebrow">04 / SELECTED WORK</div><h2>Built to be<br/><em>explored.</em></h2><div className="project-grid">{projects.map((p,i)=><button className="project" onClick={()=>setSelected(i)} key={p[0]}><small>{p[0]} / {p[2]}</small><h3>{p[1]}</h3><span>EXPLORE PROJECT <ArrowUpRight size={16}/></span></button>)}</div></section>
        <section id="chapter-5" className="chapter vision"><div className="eyebrow">05 / THE NEXT CHAPTER</div><h2>One world.<br/><em>Many systems.</em></h2><p>The long-term objective is to build complementary businesses rather than depend on a single income stream.</p><div className="network">{['TECH','DIGITAL PRODUCTS','TRADING','FINTECH','E-COMMERCE','BUSINESS'].map(x=><span key={x}>{x}</span>)}</div></section>
        <section id="chapter-6" className="chapter contact"><div className="eyebrow">06 / CONTACT</div><h2>LET’S BUILD<br/><em>SOMETHING.</em></h2><p>Ideas are cheap. Systems are interesting.</p><div className="actions"><a href="mailto:hello@kevisen.dev"><Mail/> CONTACT ME</a><button className="quiet"><Github/> GITHUB</button><button className="quiet"><Linkedin/> LINKEDIN</button></div><small className="meta">KEVISEN · WEB DEVELOPER · TRADER · BUILDER<br/>MAURITIUS · 2026</small></section>
      </div>
      <button className="sound" aria-label="Toggle ambient sound"><Volume2 size={15}/> SOUND OFF</button>
      <AnimatePresence>{selected !== null && <motion.div className="modal" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><button className="close" onClick={()=>setSelected(null)}><X/> RETURN TO WORLD</button><div><small>{projects[selected][0]} / {projects[selected][2]}</small><h2>{projects[selected][1]}</h2><p>{projects[selected][3]}</p><hr/><span>ROLE</span><b>Concept · Product direction · Frontend system</b><span>TECHNOLOGY</span><b>React · Next.js · Tailwind · Framer Motion</b></div></motion.div>}</AnimatePresence>
    </>}
  </main>
}
export default App
