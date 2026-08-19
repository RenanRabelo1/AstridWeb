"use client";

/* eslint-disable @next/next/no-img-element */

import {
  Activity, Archive, BadgeAlert, ChevronRight, Crosshair, FileLock2,
  FlaskConical, GlassWater, Landmark, LockKeyhole, MapPin, Medal,
  Radio, ShieldAlert, Sparkles, Target, Wine,
} from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const mapEvents = [
  { city: "Escandinávia", year: "1790", x: 43, y: 14, title: "Identidade apagada", text: "O primeiro registro é uma criança sem nome. O arquivo posterior conecta esta lacuna à identidade Layla e à joia que nunca deixou seu bolso." },
  { city: "Ramalá / Belém", year: "1810", x: 55, y: 55, title: "Antes do Abraço", text: "Oliveiras, treinamento de campo e uma comunidade adotiva: a memória que Astrid tenta conservar por trás de todas as identidades militares." },
  { city: "Sarajevo", year: "1914", x: 41, y: 39, title: "A cidade do estopim", text: "Fontes do arquivo relacionam a rede de Astrid a informações que circularam nos dias que antecederam a crise balcânica." },
  { city: "Verdun", year: "1916", x: 30, y: 34, title: "Logística noturna", text: "Listas de suprimento, mapas e mensagens cifradas. Nada neste registro é tratado como glória — apenas como rastro de uma guerra devastadora." },
  { city: "Stalingrado", year: "1942", x: 76, y: 32, title: "O cerco", text: "Comunicações interrompidas relatam ordens contraditórias, documentos destruídos e uma retirada que deixou o front em silêncio." },
  { city: "Berlim", year: "1943", x: 34, y: 24, title: "Centro de gravidade", text: "O dossiê termina em uma cidade sob bombardeio, com o sujeito ainda tentando controlar uma máquina política em colapso." },
];

const dust = [[8, 14, 3, 12], [17, 62, 4, 18], [28, 28, 2, 15], [38, 80, 5, 13], [48, 8, 3, 18], [60, 49, 4, 14], [70, 23, 2, 17], [80, 71, 4, 12], [91, 38, 3, 16], [12, 89, 4, 16]];

function TypeLine({ text }: { text: string }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setShown(text.slice(0, index));
      if (index >= text.length) window.clearInterval(timer);
    }, 15);
    return () => window.clearInterval(timer);
  }, [text]);
  return <>{shown}<span className="terminal-cursor">_</span></>;
}

function CensorTape() {
  const [progress, setProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const timeout = useRef<number | null>(null);
  const tick = useRef<number | null>(null);
  const stop = () => {
    if (timeout.current) window.clearTimeout(timeout.current);
    if (tick.current) window.clearInterval(tick.current);
    timeout.current = null;
    tick.current = null;
    if (!revealed) setProgress(0);
  };
  const start = () => {
    if (revealed || timeout.current) return;
    const beganAt = Date.now();
    tick.current = window.setInterval(() => setProgress(Math.min(100, ((Date.now() - beganAt) / 5000) * 100)), 80);
    timeout.current = window.setTimeout(() => {
      if (tick.current) window.clearInterval(tick.current);
      setProgress(100);
      setRevealed(true);
    }, 5000);
  };
  useEffect(() => () => {
    if (timeout.current) window.clearTimeout(timeout.current);
    if (tick.current) window.clearInterval(tick.current);
  }, []);
  if (revealed) return <motion.span className="birth-reveal" initial={{ opacity: 0, filter: "blur(8px)", letterSpacing: "0.5em" }} animate={{ opacity: 1, filter: "blur(0px)", letterSpacing: "0.08em" }}>1790 — PALESTINA <small>(NOME DE NASCENÇA: LAYLA)</small></motion.span>;
  return <button type="button" className="censor-wrap" onMouseEnter={start} onMouseLeave={stop} onFocus={start} onBlur={stop} aria-label="Data censurada; mantenha o cursor por cinco segundos"><span className="censor-tape"><span className="censor-progress" style={{ transform: `scaleX(${progress / 100})` }} />{progress > 0 && Array.from({ length: 10 }).map((_, i) => <motion.i key={i} className="ash" animate={{ opacity: [0, 1, 0], x: (i - 5) * 13, y: 12 + (i % 3) * 11 }} transition={{ duration: 1.2, delay: i * .07, repeat: Infinity }} />)}</span><small className="hold-hint">SEGURE PARA DECLASSIFICAR · {Math.ceil(Math.max(0, 5000 - progress * 50) / 1000)}S</small></button>;
}

export default function AstridArchive() {
  const [clock, setClock] = useState("--:--:--");
  const [medicalOpen, setMedicalOpen] = useState(false);
  const [thirdPillarOpen, setThirdPillarOpen] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(mapEvents[0]);
  const clicksTimer = useRef<number | null>(null);
  const idleTimer = useRef<number | null>(null);
  const henrySection = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: henrySection, offset: ["start end", "end start"] });
  const astridX = useTransform(scrollYProgress, [0, .4, .72, 1], ["-24%", "-12%", "-3%", "-3%"]);
  const henryX = useTransform(scrollYProgress, [0, .4, .72, 1], ["24%", "12%", "3%", "3%"]);
  const bondOpacity = useTransform(scrollYProgress, [0, .55, .75], [0, .35, 1]);

  useEffect(() => {
    const refresh = () => setClock(new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(new Date()));
    refresh();
    const interval = window.setInterval(refresh, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const trigger = () => { setGlitch(true); setShakeKey((value) => value + 1); window.setTimeout(() => setGlitch(false), 3000); };
    const reset = () => { if (idleTimer.current) window.clearTimeout(idleTimer.current); idleTimer.current = window.setTimeout(trigger, 20000); };
    const leave = (event: MouseEvent) => { if (!event.relatedTarget && !event.toElement) trigger(); };
    ["mousemove", "scroll", "keydown", "touchstart"].forEach((name) => window.addEventListener(name, reset, { passive: true }));
    document.addEventListener("mouseout", leave);
    reset();
    return () => { if (idleTimer.current) window.clearTimeout(idleTimer.current); ["mousemove", "scroll", "keydown", "touchstart"].forEach((name) => window.removeEventListener(name, reset)); document.removeEventListener("mouseout", leave); };
  }, []);

  const handlePathology = () => {
    const next = clicks + 1;
    setClicks(next);
    if (clicksTimer.current) window.clearTimeout(clicksTimer.current);
    if (next === 3) { setClicks(0); setMedicalOpen(true); return; }
    clicksTimer.current = window.setTimeout(() => setClicks(0), 680);
  };

  return <motion.main key={shakeKey} className="archive-shell" onMouseLeave={() => setGlitch(true)} animate={{ x: shakeKey ? [0, -7, 7, -5, 3, 0] : 0, y: shakeKey ? [0, 2, -2, 1, 0] : 0 }} transition={{ duration: .45 }}>
    <div className="crt-layer" aria-hidden="true" />
    <div className="fog-layer" aria-hidden="true"><motion.div className="fog fog-one" animate={{ x: ["-10%", "12%", "-10%"], opacity: [.1, .25, .1] }} transition={{ duration: 22, repeat: Infinity }} />{dust.map(([left, top, size, duration], index) => <motion.i key={index} className="dust" style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }} animate={{ y: [0, -65, 0], x: [0, index % 2 ? 13 : -10, 0], opacity: [.1, .55, .1] }} transition={{ duration, repeat: Infinity, delay: index * .3 }} />)}</div>
    <AnimatePresence>{glitch && <motion.div className="glitch-warning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><div className="static-noise" /><motion.p animate={{ opacity: [.3, 1, .4, 1], x: [0, -3, 4, 0] }} transition={{ duration: .18, repeat: Infinity }}>CUIDADO. ELE AINDA PROCURA.<br />A LÂMINA É PÁLIDA. FUJA DE BELÉM.</motion.p></motion.div>}</AnimatePresence>

    <header className="terminal-header"><div className="terminal-mark"><Radio size={12} /> ABW/INTEL · NÓ 04</div><div className="header-title">DEPT_INTEL_REICH <em>{"//"}</em> CLASSIFIED_ARCHIVE_1943</div><div className="header-metrics"><span>STRESS <b>{37 + Number(clock.slice(-1) || 0)}%</b></span><span>{clock} CET</span></div></header>

    <section className="hero-grid section-frame" aria-labelledby="archive-title"><div className="hero-copy"><p className="eyebrow">ARQUIVO ASTRID · ACESSO RESTRITO</p><h1 id="archive-title">O ARQUIVO <span>ASTRID.</span><br />UMA VIDA EM CÓDIGO.</h1><div className="terminal-copy"><TypeLine text="TELEGRAMA INTERCEPTADO: O sujeito não responde à luz, à idade ou ao medo." /></div><p className="hero-summary">Uma experiência ARG sobre identidade, memória e os rastros sombrios deixados por uma figura que atravessa a história sob nomes diferentes.</p><div className="stamp-row"><span><Activity size={11} /> ATIVO NOTURNO</span><span><ShieldAlert size={11} /> RISCO ALTO</span></div></div><motion.figure className="hero-portrait" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}><img src="/evidence/Astrid3.jpg" alt="Retrato arquivado de Astrid" /><figcaption>FOTO/03 — IDENTIDADE DE COBERTURA</figcaption><div className="portrait-crosshair" /></motion.figure><div className="case-index"><span>CASO</span><strong>07</strong><span>ANO</span><strong>1943</strong></div></section>

    <section className="origins-section section-frame" aria-labelledby="origins-title"><div className="origin-image"><img src="/palestina.jpg" alt="Memória visual da Palestina" /><span>FOLHA RECUPERADA / RAMALÁ</span></div><article className="diary-paper"><div className="section-heading"><span>01 / Origens</span><h2 id="origins-title">A Terra Esquecida</h2></div><p>Antes de Astrid, existia Layla: uma infância entre oliveiras de Ramalá, o cheiro da terra molhada e uma família adotiva que lhe deu um nome. Este fragmento de diário preserva a Palestina como memória íntima — anterior ao sangue, à hierarquia e às guerras.</p><div className="birth-row"><span>DATA DE NASCIMENTO</span><CensorTape /></div><blockquote>“A aldeia não era um mapa. Era a única coisa que não podia ser substituída.”</blockquote></article></section>

    <section className="pillar-grid section-frame" aria-label="Pilares de Astrid"><article className="pillar-card youssef-card"><img src="/youssef.jpg" alt="Registro de Youssef" /><div className="pillar-copy"><div className="section-heading"><span>02 / Primeiro Pilar</span><h2>Youssef</h2></div><p>Descendente da família que acolheu Layla. Registros cifrados indicam transferências clandestinas para mantê-lo vivo e apoiar a defesa de comunidades rurais.</p><div className="transfer-log"><span>REMESSA 06-B · fundos</span><b>CONFIRMADA</b><span>REMESSA 09-C · equipamento</span><b>INTERCEPTADA</b></div></div></article><article className="pillar-card ahmed-card"><img src="/ahmed.jpg" alt="Registro de Ahmed" /><div className="pillar-copy"><div className="section-heading"><span>03 / Segundo Pilar</span><h2>Ahmed</h2></div><p>Testemunha preservada em segurança na Europa. Para Astrid, Ahmed é a última voz capaz de contar o que ocorreu com a aldeia que ela chamava de casa.</p><div className="quote-tag"><Landmark size={14} /> MEMÓRIA VIVA / PROTEÇÃO ATIVA</div></div></article></section>

    <section className="third-pillar section-frame" aria-labelledby="third-title"><div className="lock-sigil"><LockKeyhole size={58} strokeWidth={1} /><span>LVL<br />05</span></div><div><p className="eyebrow">04 / Terceiro Pilar</p><h2 id="third-title">ARQUIVO CLASSIFICADO<br />DE SEGURANÇA MÁXIMA</h2><p>O nome foi removido da cópia de trabalho. Exige nível de acesso cinco e leitura supervisionada.</p></div><button type="button" className="access-button" onClick={() => setThirdPillarOpen(true)}><FileLock2 size={16} /> ACESSAR ARQUIVO <ChevronRight size={16} /></button></section>

    <section className="vice-section section-frame" aria-labelledby="vice-title"><article className="vice-copy"><div className="section-heading"><span>05 / O Vício Noturno</span><h2 id="vice-title">O Gabinete &amp; Bebidas</h2></div><p>Nos salões da alta sociedade, Astrid transforma a bebida em protocolo: vinhos finos, copos de cristal e conversas que nunca devem acontecer sob o sol. O luxo Ventrue funciona como fachada para um ritual de controle e sobrevivência.</p><div className="ritual-line"><Wine size={18} /><span>VINHO RESERVA</span><ChevronRight size={14} /><GlassWater size={18} /><span>RITUAL NOTURNO</span></div></article><figure className="vice-image"><img src="/drink.jpg" alt="Registro do gabinete e bebidas" /><figcaption>GABINETE / APÓS O ANOITECER</figcaption></figure></section>

    <section className="war-section section-frame" aria-labelledby="war-title"><div className="section-heading"><span>06 / Registros de Guerra</span><h2 id="war-title">Vitrine Militar</h2></div><div className="war-showcase"><figure><img src="/exercito.jpg" alt="Registro de uniforme e exército" /><figcaption><Medal size={16} /> INSÍGNIAS / ABWEHR</figcaption></figure><div className="war-ledger"><div><b>1914</b><span>TANNENBERG</span><small>códigos interceptados</small></div><div><b>1916</b><span>VERDUN</span><small>logística sob a noite</small></div><div><b>1942</b><span>STALINGRADO</span><small>linhas rompidas</small></div><p>Estes registros apresentam as guerras como devastação e responsabilidade, não como conquista.</p></div><figure><img src="/balas.jpg" alt="Calibres de munição catalogados" /><figcaption><Target size={16} /> CALIBRES / CATÁLOGO</figcaption></figure></div></section>

    <section className="relic-section section-frame" aria-labelledby="relic-title"><figure className="relic-image"><img src="/lanca.jpg" alt="A Lança de Longinus catalogada" /><div className="relic-halo"><Sparkles size={26} /></div></figure><article><p className="eyebrow">07 / Relíquia Perdida</p><h2 id="relic-title">A Lança de Longinus</h2><p>Enrolada em couro envelhecido e escondida entre identidades de cobertura, a relíquia é o centro gravitacional do arquivo. Lendas Kindred atribuem a ela poder suficiente para ameaçar anciões — e atrair quem atravessa séculos para encontrá-la.</p><div className="relic-status"><BadgeAlert size={17} /><span>ITEM 104 · NÃO REMOVER DO INVÓLUCRO</span></div></article></section>

    <section ref={henrySection} className="henry-section section-frame" aria-labelledby="henry-title"><div className="section-heading henry-heading"><span>08 / Dossiê de Convergência</span><h2 id="henry-title">Sujeito “Henry”</h2><p>Uma análise abstrata de duas presenças que se reconhecem antes mesmo de se explicarem.</p></div><div className="convergence-stage"><motion.article className="person-card astrid-person" style={{ x: astridX }}><img src="/evidence/Astrid2.jpg" alt="Astrid, sujeito A" /><span>SUJEITO A / ASTRID</span><p>Vontade, estratégia e silêncio.</p></motion.article><motion.div className="convergence-line" style={{ opacity: bondOpacity }}><span>CONEXÃO<br />NÃO DECLARADA</span></motion.div><motion.article className="person-card henry-person" style={{ x: henryX }}><img src="/henry.jpg" alt="Henry, sujeito H" /><span>SUJEITO H / HENRY</span><p>Testemunha, contrapeso e eco.</p></motion.article></div><p className="scroll-cue">ROLE PARA APROXIMAR OS ARQUIVOS</p></section>

    <section className="map-section section-frame" aria-labelledby="map-title"><div className="section-heading"><span>09 / Mapa Tático</span><h2 id="map-title">150 Anos de Convergência</h2></div><div className="map-layout"><div className="tactical-map"><img src="/mapa.jpg" alt="Mapa tático da jornada de Astrid" />{mapEvents.map((point) => <motion.button key={point.city} type="button" className={`map-pin ${selectedEvent.city === point.city ? "is-selected" : ""}`} style={{ left: `${point.x}%`, top: `${point.y}%` }} onClick={() => setSelectedEvent(point)} whileTap={{ scale: .85 }} aria-label={`${point.city}, ${point.year}`}><MapPin size={20} fill="currentColor" /><span>{point.year}</span></motion.button>)}</div><AnimatePresence mode="wait"><motion.aside key={selectedEvent.city} className="map-detail" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}><span>{selectedEvent.year} · {selectedEvent.city}</span><h3>{selectedEvent.title}</h3><p>{selectedEvent.text}</p><div><Crosshair size={15} /> PONTO DE MEMÓRIA ATIVO</div></motion.aside></AnimatePresence></div></section>

    <section className="medical-section section-frame"><div><div className="section-heading"><span>10 / Prontuário Médico</span><h2>Anomalia fotodermatológica</h2></div><p>Um laudo militar tenta explicar a intolerância solar total e a recuperação fora de qualquer parâmetro. A linguagem burocrática apenas encobre o impossível.</p><p className="medical-note">Classificação: <button type="button" onClick={handlePathology} className="pathology-button">Patologia</button> rara de origem indeterminada <sup>[{clicks}/3]</sup></p></div><FlaskConical className="medical-icon" size={92} strokeWidth={.7} /></section>

    <footer className="archive-footer"><Archive size={14} /><span>FIM DO ARQUIVO // REGISTRO NÃO É ABSOLVIÇÃO</span><span>DEPT_INTEL_REICH · 1943</span></footer>

    <AnimatePresence>{thirdPillarOpen && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-labelledby="third-modal-title"><motion.article className="red-folder" initial={{ y: 30, rotate: -2, opacity: 0 }} animate={{ y: 0, rotate: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}><button type="button" className="modal-close" onClick={() => setThirdPillarOpen(false)} aria-label="Fechar arquivo">×</button><span className="folder-tab">CLEARANCE LEVEL 5</span><p>ARQUIVO / TERCEIRO PILAR</p><h3 id="third-modal-title">ADOLF HITLER</h3><div className="redaction-lines" /><p className="folder-text">O arquivo descreve como Astrid tentou instrumentalizar o regime nazista para ampliar o conflito europeu. A lógica é registrada como uma escolha consciente de violência política e radicalização — sem lealdade, mas também sem absolvição.</p><div className="folder-stamp">EVIDÊNCIA DE CUMPLICIDADE</div></motion.article></motion.div>}</AnimatePresence>
    <AnimatePresence>{medicalOpen && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Alerta médico"><motion.article className="medical-modal" initial={{ scale: .85, rotate: -1 }} animate={{ scale: 1, rotate: [0, .5, -.4, 0] }} exit={{ scale: .9 }}><button type="button" className="modal-close" onClick={() => setMedicalOpen(false)} aria-label="Fechar alerta">×</button><div className="modal-static" /><span>ERRO 404_ANOMALIA</span><h3>VITAIS INEXISTENTES</h3><p>Ausência de pulso e temperatura corporal. O sujeito consumiu o estoque de transfusão de sangue do hospital militar.</p></motion.article></motion.div>}</AnimatePresence>
  </motion.main>;
}
