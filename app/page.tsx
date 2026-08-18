"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

const dossierImages = [
  { file: "Astrid.jpeg", label: "Retrato de identificação / 01" },
  { file: "Astrid2.jpg", label: "Retrato civil / 02" },
  { file: "Astrid3.jpg", label: "Retrato de gabinete / 03" },
  { file: "Astrid4.jpg", label: "Vigilância noturna / 04" },
  { file: "astridnova.jpeg", label: "Registro de campo / 05" },
  { file: "astridnovas2.jpeg", label: "Registro de campo / 06" },
  { file: "astridnovas3.jpeg", label: "Registro de campo / 07" },
  { file: "astridnovas4.jpeg", label: "Registro de campo / 08" },
  { file: "astridnovas5.jpeg", label: "Registro de campo / 09" },
  { file: "astridnovas6.jpeg", label: "Registro de campo / 10" },
  { file: "AstridPinterest.jpeg", label: "Referência facial / 11" },
  { file: "atridnovas.jpeg", label: "Fotografia recuperada / 12" },
  { file: "faceclaimantigo.jpeg", label: "Arquivo pré-guerra / 13" },
  { file: "pesexercito.jpeg", label: "Registro militar / 14" },
  { file: "Ahmed.jpg", label: "Contato: Ahmed / 15" },
  { file: "Ahmed2.jpg", label: "Contato: Ahmed / 16" },
  { file: "Henry.jpeg", label: "Observador: Henry / 17" },
  { file: "henrycostas.jpeg", label: "Observador: Henry / 18" },
  { file: "youseff.jpg", label: "Contato: Youssef / 19" },
  { file: "Youseff2.jpg", label: "Contato: Youssef / 20" },
  { file: "beer.jpeg", label: "Cena social / 21" },
  { file: "bullets.jpeg", label: "Munição catalogada / 22" },
  { file: "chess.jpeg", label: "Jogo de influência / 23" },
  { file: "germanflag.jpeg", label: "Prova de regime / 24" },
  { file: "freegaza.jpeg", label: "Recorte político / 25" },
  { file: "lanca.jpeg", label: "Relíquia catalogada / 26" },
  { file: "mapaalemanha.jpeg", label: "Mapa de operações / 27" },
  { file: "panoarabe.jpeg", label: "Tecido de origem / 28" },
  { file: "tajmahal.jpeg", label: "Rota transcontinental / 29" },
];

const dust = [[7, 12, 3, 12], [16, 62, 4, 18], [25, 29, 2, 15], [33, 78, 5, 13], [43, 7, 3, 18], [52, 49, 4, 14], [61, 23, 2, 17], [69, 71, 4, 12], [78, 38, 3, 16], [88, 14, 5, 13], [94, 66, 2, 18], [12, 89, 4, 16]];

function TypeLine({ text, delay = 0 }: { text: string; delay?: number }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    let index = 0;
    setShown("");
    const start = window.setTimeout(() => {
      const timer = window.setInterval(() => {
        index += 1;
        setShown(text.slice(0, index));
        if (index >= text.length) window.clearInterval(timer);
      }, 18);
    }, delay);
    return () => window.clearTimeout(start);
  }, [delay, text]);
  return <span>{shown}<span className="terminal-cursor">_</span></span>;
}

function CensorTape() {
  const [held, setHeld] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0);
  const timer = useRef<number | null>(null);
  const ticker = useRef<number | null>(null);
  const stop = () => {
    if (timer.current) window.clearTimeout(timer.current);
    if (ticker.current) window.clearInterval(ticker.current);
    timer.current = null; ticker.current = null; setHeld(false);
    if (!revealed) setProgress(0);
  };
  const start = () => {
    if (revealed) return;
    setHeld(true);
    const started = Date.now();
    ticker.current = window.setInterval(() => setProgress(Math.min(100, ((Date.now() - started) / 5000) * 100)), 80);
    timer.current = window.setTimeout(() => { if (ticker.current) window.clearInterval(ticker.current); setProgress(100); setRevealed(true); setHeld(false); }, 5000);
  };
  useEffect(() => stop, []);
  if (revealed) return <motion.span className="birth-reveal" initial={{ opacity: 0, letterSpacing: "0.65em", filter: "blur(8px)" }} animate={{ opacity: 1, letterSpacing: "0.08em", filter: "blur(0px)" }}>1790 — PALESTINA <small>(NOME DE NASCENÇA: LAYLA)</small></motion.span>;
  return <span className="censor-wrap" onMouseEnter={start} onMouseLeave={stop} onFocus={start} onBlur={stop} tabIndex={0} aria-label="Faixa censurada; mantenha o cursor por cinco segundos"><motion.span className="censor-tape" animate={held ? { skewX: [0, -2, 1, 0] } : {}} transition={{ repeat: Infinity, duration: 0.2 }}><span className="censor-progress" style={{ transform: `scaleX(${progress / 100})` }} />{held && Array.from({ length: 12 }).map((_, index) => <motion.i key={index} className="ash" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0], x: (index - 6) * 12, y: 18 + (index % 3) * 9, rotate: index * 23 }} transition={{ duration: 1.4, repeat: Infinity, delay: index * 0.06 }} />)}</motion.span><small className="hold-hint">SEGURE PARA DECLASSIFICAR · {Math.ceil(Math.max(0, 5000 - progress * 50) / 1000)}S</small></span>;
}

export default function Home() {
  const [clock, setClock] = useState("--:--:--");
  const [medicalOpen, setMedicalOpen] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [command, setCommand] = useState("");
  const [decoded, setDecoded] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [bloodMode, setBloodMode] = useState(false);
  const idleTimer = useRef<number | null>(null);
  const clickTimer = useRef<number | null>(null);

  useEffect(() => {
    const updateClock = () => setClock(new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(new Date()));
    updateClock(); const interval = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(interval);
  }, []);
  useEffect(() => {
    const invokeGlitch = () => { setGlitch(true); setShakeKey((key) => key + 1); window.setTimeout(() => setGlitch(false), 3000); };
    const resetIdle = () => { if (idleTimer.current) window.clearTimeout(idleTimer.current); idleTimer.current = window.setTimeout(invokeGlitch, 20000); };
    const leaveWindow = (event: MouseEvent) => { if (!event.relatedTarget && !event.toElement) invokeGlitch(); };
    ["mousemove", "scroll", "keydown", "touchstart"].forEach((event) => window.addEventListener(event, resetIdle, { passive: true }));
    document.addEventListener("mouseout", leaveWindow); resetIdle();
    return () => { if (idleTimer.current) window.clearTimeout(idleTimer.current); if (clickTimer.current) window.clearTimeout(clickTimer.current); ["mousemove", "scroll", "keydown", "touchstart"].forEach((event) => window.removeEventListener(event, resetIdle)); document.removeEventListener("mouseout", leaveWindow); };
  }, []);
  const handlePathology = () => {
    const next = clicks + 1; setClicks(next);
    if (clickTimer.current) window.clearTimeout(clickTimer.current);
    if (next >= 3) { setMedicalOpen(true); setClicks(0); return; }
    clickTimer.current = window.setTimeout(() => setClicks(0), 680);
  };
  const executeCommand = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (["youssef", "ahmed", "layla"].includes(command.trim().toLowerCase())) { setDecoded(true); setBloodMode(true); setShakeKey((key) => key + 1); window.setTimeout(() => setBloodMode(false), 4200); }
    setCommand("");
  };

  return <motion.main key={shakeKey} className={`archive-shell ${bloodMode ? "blood-mode" : ""}`} onMouseLeave={() => setGlitch(true)} animate={{ x: shakeKey ? [0, -7, 8, -5, 4, 0] : 0, y: shakeKey ? [0, 2, -2, 1, 0] : 0 }} transition={{ duration: 0.46 }}>
    <div className="crt-layer" aria-hidden="true" />
    <div className="fog-layer" aria-hidden="true"><motion.div className="fog fog-one" animate={{ x: ["-8%", "12%", "-8%"], opacity: [0.12, 0.26, 0.12] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} /><motion.div className="fog fog-two" animate={{ x: ["18%", "-14%", "18%"], opacity: [0.08, 0.22, 0.08] }} transition={{ duration: 27, repeat: Infinity, ease: "easeInOut" }} />{dust.map(([left, top, size, duration], index) => <motion.i key={index} className="dust" style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }} animate={{ y: [0, -65, 0], x: [0, index % 2 ? 14 : -10, 0], opacity: [0.1, 0.6, 0.1] }} transition={{ duration, repeat: Infinity, ease: "easeInOut", delay: index * 0.35 }} />)}</div>
    <AnimatePresence>{glitch && <motion.div className="glitch-warning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onAnimationComplete={() => window.setTimeout(() => setGlitch(false), 2800)}><div className="static-noise" /><motion.p animate={{ opacity: [0.35, 1, 0.4, 1], x: [0, -3, 4, 0] }} transition={{ duration: 0.18, repeat: Infinity }}>CUIDADO. ELE AINDA PROCURA.<br />A LÂMINA É PÁLIDA. FUJA DE BELÉM.</motion.p></motion.div>}</AnimatePresence>
    <header className="terminal-header"><div className="terminal-mark"><span className="live-dot" /> ABW/INTEL · NÓ 04</div><div className="header-title">DEPT_INTEL_REICH <em>//</em> CLASSIFIED_ARCHIVE_1943</div><div className="header-metrics"><span>STRESS <b>{37 + Number(clock.slice(-1) || 0)}%</b></span><span>{clock} CET</span></div></header>
    <section className="hero-grid section-frame" aria-labelledby="case-title"><div className="hero-copy"><p className="eyebrow">ARQUIVO 07-A · ACESSO RESTRITO</p><h1 id="case-title">GENERAL <span>A.</span><br />O NOME QUE A GUERRA NÃO EXPLICA.</h1><div className="terminal-copy"><TypeLine text="TELEGRAMA INTERCEPTADO: O sujeito não responde à luz, à idade ou ao medo." delay={300} /></div><p className="hero-summary">Um arquivo ficcional sobre uma oficial que usa o poder como disfarce. Os registros abaixo tratam sua participação em violência de Estado como evidência incriminadora, não como feito.</p><div className="stamp-row"><span>◈ VENTRUE / SUSPEITA</span><span>◈ STATUS: OBSERVAR</span></div></div><motion.figure className="hero-portrait" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}><img src="/evidence/Astrid3.jpg" alt="Retrato arquivado de Astrid" /><figcaption>FOTO/03 — IDENTIDADE DE COBERTURA</figcaption><div className="portrait-crosshair" aria-hidden="true" /></motion.figure><div className="case-index"><span>CASO</span><strong>07</strong><span>ANO</span><strong>1943</strong></div></section>
    <section className="section-frame dossier-section" aria-labelledby="bio-title"><div className="section-heading"><span>01 / Dossiê Biográfico</span><h2 id="bio-title">Linhas de uma vida adulterada</h2></div><div className="dossier-layout"><div className="facts-panel"><p><span>NOME OPERACIONAL</span> ASTRID / GENERAL A.</p><p><span>ORIGEM</span> <CensorTape /></p><p><span>CLASSIFICAÇÃO</span> ATIVO NOTURNO / RISCO ALTO</p><p><span>ÚLTIMO SINAL</span> BERLIM, SETOR BOMBARD. — 1943</p></div><ol className="timeline"><li><b>1914—1918</b><span>Registros de inteligência a ligam à Primeira Guerra Mundial e à manipulação de redes militares.</span></li><li><b>1919—1932</b><span>Na República de Weimar, as fontes descrevem uma escalada de influência entre industrialistas e movimentos autoritários.</span></li><li><b>1942—1943</b><span>Em Stalingrado, comunicações fragmentadas citam retiradas seletivas, arquivos destruídos e testemunhas desaparecidas.</span></li></ol></div></section>
    <section className="two-column section-frame"><article className="medical-report" aria-labelledby="medical-title"><div className="section-heading"><span>02 / Prontuário Médico</span><h2 id="medical-title">Anomalia fotodermatológica</h2></div><p>Laudo selado da Wehrmacht: intolerância solar total, recuperação impossível de registrar e aparente ausência de fadiga. O diagnóstico foi usado como fachada burocrática para encobrir a condição real do sujeito.</p><p className="medical-note">Classificação: <button type="button" onClick={handlePathology} className="pathology-button">Patologia</button> rara de origem indeterminada <sup>[{clicks}/3]</sup></p><div className="medical-lines" /></article><aside className="artifact-photo"><img src="/evidence/lanca.jpeg" alt="Fotografia do artefato de lança" /><span>ARQUIVO VISUAL / RELÍQUIA 104</span></aside></section>
    <section className="inventory-section section-frame" aria-labelledby="inventory-title"><div className="section-heading"><span>03 / Inventário de Artefatos</span><h2 id="inventory-title">Objetos que não deveriam sobreviver</h2></div><div className="inventory-wrap"><table data-camarilla-note="ALERTA: Lança de Longinus confirmada. O Lâmina Pálida está no encalço."><thead><tr><th>REF.</th><th>OBJETO</th><th>ORIGEM</th><th>ESTADO</th></tr></thead><tbody><tr><td>73</td><td>Fragmento Mineral Luminescente</td><td>Caravana / 1790</td><td><span className="status-seal">CONTIDO</span></td></tr><tr><td>104</td><td><span className="relic-icon" tabIndex={0}>✦<i>RELÍQUIA DE SANGUE</i></span> Ponta de Lança Romana em Couro</td><td>Belém / registro lacrado</td><td><span className="status-seal danger">NÃO TOCAR</span></td></tr></tbody></table><p className="inspector-note">// INSPEÇÃO: atributo adicional preservado na matriz de evidências.</p></div></section>
    <section className="command-section section-frame" aria-labelledby="command-title"><div className="command-map"><img src="/evidence/mapaalemanha.jpeg" alt="Mapa alemão de operações arquivado" /></div><div className="command-body"><div className="section-heading"><span>04 / Terminal Interceptado</span><h2 id="command-title">Uma palavra abre o arquivo</h2></div><p>Consulte as identidades bloqueadas. O sistema conhece três chaves.</p><form onSubmit={executeCommand} className="terminal-form"><label htmlFor="command">CTRL_PROMPT_&gt;</label><input id="command" value={command} onChange={(event) => setCommand(event.target.value)} autoComplete="off" spellCheck={false} aria-label="Digite um comando" /><button type="submit">EXECUTAR</button></form><AnimatePresence>{decoded && <motion.div className="decoded-file" initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }} animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}><span>ARQUIVO DECIFRADO // 00:17</span><p>Fragmentos do manifesto pessoal da General A. revelam uma promessa de vingança e uma política de terror. O dossiê registra essas palavras como prova de radicalização — não como uma causa a ser seguida.</p></motion.div>}</AnimatePresence></div></section>
    <section className="evidence-section section-frame" aria-labelledby="evidence-title"><div className="section-heading"><span>05 / Caixa de Evidências</span><h2 id="evidence-title">Todos os anexos recuperados</h2></div><p className="evidence-intro">Fotografias, mapas, relíquias e contatos apreendidos. Mova o cursor pelas provas para iluminar as etiquetas.</p><div className="evidence-grid">{dossierImages.map((image, index) => <motion.figure key={image.file} className={`evidence evidence-${(index % 6) + 1}`} whileHover={{ y: -8, rotate: index % 2 ? 1 : -1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }}><img src={`/evidence/${image.file}`} alt={image.label} loading="lazy" /><figcaption>{image.label}</figcaption></motion.figure>)}</div></section>
    <footer className="archive-footer"><span>FIM DO ARQUIVO // NÃO CONFUNDA REGISTRO COM ABSOLVIÇÃO</span><span>DEPT_INTEL_REICH · 1943</span></footer>
    <AnimatePresence>{medicalOpen && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Alerta médico"><motion.div className="medical-modal" initial={{ scale: 0.82, rotate: -1 }} animate={{ scale: 1, rotate: [0, 0.5, -0.4, 0] }} exit={{ scale: 0.9 }} transition={{ duration: 0.25 }}><button type="button" className="modal-close" onClick={() => setMedicalOpen(false)} aria-label="Fechar alerta">×</button><div className="modal-static" /><span>ERRO 404_ANOMALIA</span><h3>VITAIS INEXISTENTES</h3><p>Ausência de pulso e temperatura corporal. O sujeito consumiu o estoque de transfusão de sangue do hospital militar.</p></motion.div></motion.div>}</AnimatePresence>
  </motion.main>;
}
