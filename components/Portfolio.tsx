'use client';



import { useEffect, useRef, useState } from 'react';

import dynamic from 'next/dynamic';

import Image from 'next/image';

import { ArrowDown, ArrowUp, ArrowUpRight, BriefcaseBusiness, Phone, Check, ChevronRight, Copy, Download, Heart, Mail, MapPin, MessageCircle, Moon, Pause, Play, Plus, Send, Sparkles, Sun, UserRound, X } from 'lucide-react';

import { profile, projects, experiences, replies } from '../lib/content';



const MessageScene = dynamic(() => import('./MessageScene'), { ssr: false });

type Project = (typeof projects)[number];

type ReplyKey = keyof typeof replies;



export default function Portfolio() {

  const [dark, setDark] = useState(false);

  const [paused, setPaused] = useState(false);

  const [liked, setLiked] = useState(false);

  const [burst, setBurst] = useState(0);

  const [reply, setReply] = useState<ReplyKey | null>(null);

  const [filter, setFilter] = useState('All');

  const [selected, setSelected] = useState<Project | null>(null);

  const [active, setActive] = useState('home');

  const [copyStatus, setCopyStatus] = useState('');

  const dialog = useRef<HTMLDialogElement>(null);
  const contactDialog = useRef<HTMLDialogElement>(null);
  const callTrigger = useRef<HTMLButtonElement>(null);

  const conversation = useRef<HTMLDivElement>(null);

  const projectTrigger = useRef<HTMLButtonElement | null>(null);



  useEffect(() => {

    try { setDark(localStorage.getItem('sherindiva-theme') === 'dark'); } catch {}

    const observer = new IntersectionObserver(entries => entries.forEach(entry => {

      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }

    }), { threshold: 0.08 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const navObserver = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting) setActive(entry.target.id); }), { rootMargin: '-20% 0px -50% 0px' });

    document.querySelectorAll('section[id]').forEach(el => navObserver.observe(el));

    return () => { observer.disconnect(); navObserver.disconnect(); };

  }, []);

  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light'; }, [dark]);

  useEffect(() => { if(selected) dialog.current?.showModal(); }, [selected]);

  useEffect(() => { if(reply && conversation.current) conversation.current.scrollTop = conversation.current.scrollHeight; }, [reply]);

  function toggleTheme() { setDark(!dark); try { localStorage.setItem('sherindiva-theme', !dark ? 'dark' : 'light'); } catch {} }

  function closeProject() { dialog.current?.close(); setSelected(null); projectTrigger.current?.focus(); }

  async function copyEmail() {

    try { await navigator.clipboard.writeText(profile.email); setCopyStatus('Email tersalin!'); }

    catch { setCopyStatus(`Salin manual: ${profile.email}`); }

  }

  function react() { setLiked(!liked); if(!liked) setBurst(burst + 1); }



  return <main className={paused ? 'paused' : ''}>

    <a className="skip-link" href="#work">Langsung ke karya</a>

    <header className="topbar shell">

      <a href="#work" className="messages-back" aria-label="Lihat empat karya"><ArrowDown size={25}/><span>4</span></a>

      <a className="ios-contact-header" href="#about"><span className="ios-contact-avatar"><Image src="/portfolio/portrait.webp" alt="" width={48} height={72}/></span><strong>Sherindiva <ChevronRight size={12}/></strong></a>

      <div className="top-actions"><button ref={callTrigger} className="icon-button" onClick={() => contactDialog.current?.showModal()} aria-label="Buka kartu kontak" aria-haspopup="dialog"><Phone size={21}/></button><button className="icon-button" onClick={toggleTheme} aria-label={dark ? 'Aktifkan tema terang' : 'Aktifkan tema gelap'} aria-pressed={dark}>{dark ? <Sun size={21}/> : <Moon size={21}/>}</button></div>

    </header>

    <nav className="floating-nav" aria-label="Navigasi utama">

      {[{ id: 'home', text: 'Hello', icon: MessageCircle }, { id: 'work', text: 'Work', icon: BriefcaseBusiness }, { id: 'about', text: 'About', icon: UserRound }, { id: 'contact', text: 'Let’s talk', icon: Send }].map(item => <a key={item.id} href={`#${item.id}`} className={active === item.id ? 'active' : ''} aria-current={active === item.id ? 'location' : undefined}><item.icon size={17} aria-hidden="true"/><span>{item.text}</span></a>)}

    </nav>



    <section className="hero" id="home">

      <MessageScene paused={paused} burst={burst}/>

      <div className="hero-inner shell">

        <div className="hero-copy">

          <div className="ios-conversation-date entrance">iMessage<br/><strong>Hari ini</strong></div>

          <h1 className="entrance">Halo, aku Sherindiva.</h1>

          <p className="hero-description entrance">Fokus di Front-end Development & UI/UX Design.<br className="desktop-break"/> Mahasiswa software engineering di IPB yang suka merancang dan membangun antarmuka.</p>

          <div className="hero-actions entrance"><a className="button primary" href="#work">Lihat yang aku kerjakan <ArrowUpRight size={18}/></a><a className="button secondary" href="#contact">Sapa aku <MessageCircle size={17}/></a></div>

        </div>

        <div className="portrait-universe entrance">

          <div className="portrait-orbit" aria-hidden="true"/>

          <div className="portrait-greeting"><span className="status-dot"/> iMessage <span>·</span> Sherindiva</div>

          <div className="hero-person"><Image src="/portfolio/portrait.webp" alt="Sherindiva tersenyum dan melambaikan tangan" width={999} height={1500} priority/></div>

          <a className="floating-skill skill-code" href="#work"><span className="skill-app"><BriefcaseBusiness size={22}/></span><span><small>01</small><strong>Front-end Development</strong><span>Fokus pengembangan web</span></span><span className="skill-tail"/></a>

          <a className="floating-skill skill-finance" href="#work"><span className="skill-app"><Sparkles size={22}/></span><span><small>02</small><strong>UI/UX Design</strong><span>Figma · Desain antarmuka</span></span><span className="skill-tail"/></a>

          <a className="floating-skill skill-project" href="#experience"><span className="skill-app"><Check size={22}/></span><span><small>03</small><strong>Project Management</strong><span>Dari brief sampai selesai</span></span><span className="skill-tail"/></a>

          <a className="floating-skill skill-creative" href="#about"><span className="skill-app"><MessageCircle size={22}/></span><span><small>04</small><strong>Creative Strategy</strong><span>Campaign & komunikasi</span></span><span className="skill-tail"/></a>

          <button className={`portrait-tapback ${liked ? 'liked' : ''}`} onClick={react} aria-label={liked ? 'Hapus reaksi hati' : 'Beri reaksi hati'} aria-pressed={liked}><Heart size={23} fill={liked ? 'currentColor' : 'none'}/><span>{liked ? 'Loved!' : 'Say hi!'}</span></button>

          <div className="portrait-name"><strong>Sherindiva<span>↗</span></strong><span><MapPin size={12}/> Bogor, Indonesia</span></div>

          <span className="portrait-delivered">Delivered <Check size={12}/><Check size={12}/></span>

        </div>

      </div>

      <div className="hero-bottom shell"><span>GESER KE BAWAH, MASIH ADA CERITA</span><ArrowDown size={16}/><span>IDEAS → ACTION → IMPACT</span></div>

    </section>

    <section className="conversation-section shell" aria-label="Kenalan lewat pesan">

      <div className="conversation-copy reveal"><span className="eyebrow blue">KENALAN DULU, YUK</span><h2>Mau tahu<br/><span className="soft-word">apa tentang aku?</span></h2><p>Kenalan lebih dekat, lihat hal yang aku kerjakan,<br/>atau mulai percakapan baru. Pick a message.</p><div className="conversation-typing"><span/><span/><span/></div></div>

        <div className="chat-stage entrance">

          <div className="sticker sticker-top"><Sparkles size={17}/> a conversation worth starting</div>

          <div className="chat-window">

            <div className="chat-top"><span>Messages</span><span>iMessage</span><MessageCircle size={15}/></div>

            <div className="chat-profile"><span className="avatar"><Image src="/portfolio/portrait.webp" alt="" width={70} height={90} priority/></span><div><strong>Sherindiva <ChevronRight size={13}/></strong><span><i className="status-dot"/> Let’s create something meaningful</span></div><a href="#about" className="profile-more" aria-label="Tentang Sherindiva"><UserRound size={19}/></a></div>

            <div className="chat-body" ref={conversation}>

              <div className="chat-time">iMessage<br/><strong>Hari ini</strong></div>

              <div className="bubble incoming bubble-intro">Halo! Aku Sherindiva <span aria-label="melambaikan tangan">👋</span></div>

              <div className="bubble incoming">Aku suka bikin sistem yang membantu,<br/>dan memastikan proyeknya berjalan.</div>

              <div className="photo-message"><div className="portrait-backdrop"><span className="portrait-label">a little bit of<br/><strong>everything.</strong></span><Image src="/portfolio/portrait.webp" alt="Sherindiva tersenyum dan melambaikan tangan" width={260} height={390} priority/><span className="photo-spark" aria-hidden="true">✳</span></div></div>

              {!reply && <><div className="bubble outgoing">Boleh lihat karya kamu? <Sparkles size={15}/></div><span className="delivered">Delivered</span></>}

              <div aria-live="polite" aria-atomic="true">{reply && <div key={reply} className="reply-pair"><div className="bubble outgoing">{replies[reply].question}</div><div className="bubble incoming">{replies[reply].answer}<a className="reply-link" href={replies[reply].link}>{replies[reply].label} <ArrowUpRight size={14}/></a></div></div>}</div>

            </div>

            <div className="chat-bottom"><span className="reply-hint">Pilih pesan untuk mulai ngobrol</span><div className="quick-replies"><button onClick={() => setReply('about')}>Tentang aku <UserRound size={12}/></button><button onClick={() => setReply('work')}>Karyaku <BriefcaseBusiness size={12}/></button><button onClick={() => setReply('contact')}>Kontak <ArrowUpRight size={12}/></button></div><div className="message-composer"><button className="composer-plus" onClick={() => setReply('about')} aria-label="Lihat perkenalan Sherindiva"><Plus size={25}/></button><a className="composer-field" href="#contact"><span>iMessage</span><span className="composer-wave" aria-hidden="true"><i/><i/><i/><i/><i/></span><span className="sr-only"> — hubungi Sherindiva</span></a></div></div>

          </div>

          <div className="sticker sticker-bottom"><span className="mini-heart"><Heart size={14} fill="currentColor"/></span> Made of curiosity & a little courage.</div>

        </div>

    </section>



    <div className="stats-strip shell reveal"><div><strong>20<span>+</span></strong><span>Projects & programs</span></div><div><strong>25<span>+</span></strong><span>Team members led</span></div><div><strong>150<span>M+</span></strong><span>Rupiah budget managed</span></div><div className="stats-note"><Sparkles size={23}/><p>Different roles.<br/><strong>One drive to make an impact.</strong></p></div></div>



    <section id="work" className="work-section shell">

      <div className="section-heading reveal"><div><span className="eyebrow blue">LAMPIRAN</span><h2>A few things<br/>I’ve put my <span className="soft-word">heart into.</span></h2></div><p>Proyek, program, dan hal-hal yang pernah aku kerjakan.</p></div>

      <div className="work-toolbar"><div className="filter-group" aria-label="Filter karya">{['All', 'Technology', 'Strategy', 'Community'].map(category => <button key={category} aria-pressed={filter === category} className={filter === category ? 'selected' : ''} onClick={() => setFilter(category)}>{category}{category === 'All' && <span>04</span>}</button>)}</div><span className="attachment-count">{projects.filter(p => filter === 'All' || p.category === filter).length} attachments</span></div>

      <div className="project-grid">{projects.filter(p => filter === 'All' || p.category === filter).map((project, i) => <button className={`project-card ${project.id}`} key={project.id} onClick={e => { projectTrigger.current = e.currentTarget; setSelected(project); }} aria-label={`Buka studi kasus ${project.subtitle}`}>

        <div className="project-art"><span className="project-category">{project.category}</span>{project.id === 'pos' || project.id === 'finance' ? <div className="screen-composition"><div className="desktop-screen"><div className="screen-bar"><i/><i/><i/><span>{project.id === 'pos' ? 'A smoother everyday.' : 'Everything, in balance.'}</span></div><Image src={project.image} alt={`Tampilan ${project.subtitle}, data dummy`} width={960} height={540}/></div><div className="mobile-screen"><Image src={`/portfolio/${project.id}-mobile.webp`} alt="Tampilan mobile" width={180} height={390}/></div></div> : <Image className="cover-art" src={project.image} alt={project.id === 'ruma' ? 'Sherindiva dalam kegiatan edukasi RUMA' : 'Proyeksi keuangan dalam pitch deck CoolGo'} width={960} height={540}/>}<span className="open-project"><ArrowUpRight size={21}/></span></div>

        <div className="project-info"><div><span className="project-subtitle">{project.subtitle}</span><h3>{project.name}</h3></div><span className="project-index">0{projects.indexOf(project) + 1}</span></div>

      </button>)}</div>

      <p className="work-footnote">A little context goes a long way. Tap an attachment to see the story.</p>

    </section>



    <section id="about" className="about-section shell">

      <div className="about-photo reveal"><div className="about-photo-title">More than<br/>one <em>thing.</em></div><Image src="/portfolio/portrait.webp" alt="Sherindiva" width={500} height={750}/><span className="about-pin"><MapPin size={14}/> Bogor, Indonesia</span><span className="about-sticker">Curious by nature.<br/>Driven by purpose.</span></div>

      <div className="about-copy reveal"><span className="eyebrow blue">KARTU KONTAK</span><h2>Dari rancangan<br/>ke <span className="soft-word">antarmuka.</span></h2><p>Aku Sherindiva, mahasiswa Teknologi Rekayasa Perangkat Lunak di IPB University. Aku ingin berfokus pada front-end development dan UI/UX design: memahami kebutuhan pengguna, merancang tampilan, dan mengubahnya menjadi pengalaman web yang nyaman digunakan.</p><p>Pengalaman mengelola proyek, menyusun alur sistem, mengevaluasi desain UI/UX, dan bekerja dengan berbagai tim menjadi bekalku dalam mengembangkan fokus ini. Pengalaman keuangan, organisasi, dan sosialku juga bisa kamu lihat seluruhnya di bawah.</p><div className="education-card"><span className="education-icon">IPB</span><div><strong>IPB University</strong><span>Applied Bachelor · Software Engineering Technology</span><small>2024 – Present <b>·</b> GPA 3.70 / 4.00</small></div></div><div className="skill-tags">{['Figma', 'UI/UX Design', 'Web Development', 'Business Process', 'Google Apps Script', 'Project Management'].map(skill => <span key={skill}>{skill}</span>)}</div></div>

    </section>



    <section id="experience" className="experience-section shell">

      <div className="section-heading reveal"><div><span className="eyebrow blue">AKTIVITAS</span><h2>Semua peran,<br/><span className="soft-word">semua pengalaman.</span></h2></div><a className="text-link" href="/portfolio/sherindiva-portfolio.pdf" download>Full portfolio <Download size={16}/></a></div>

      <div className="timeline">{experiences.map((exp, i) => <article className="timeline-item reveal" key={exp.title}><span className="timeline-date">{exp.date}</span><div className="timeline-marker"><span/></div><div className="timeline-content"><span>{exp.company}</span><h3>{exp.title}</h3><p>{exp.text}</p></div><span className="experience-number">{String(i+1).padStart(2, '0')}</span></article>)}</div>

      <p className="experience-source-note">Pengalaman dirangkum dari portofolio. Untuk peran tanpa tanggal dalam dokumen, ditampilkan konteks kegiatannya.</p>
    </section>



    <section id="contact" className="contact-section shell reveal"><div className="contact-label"><span className="status-dot"/> YOUR NEXT COLLABORATOR, ONE MESSAGE AWAY</div><div className="contact-bubble"><MessageCircle size={32} fill="currentColor"/></div><h2>Ada yang mau<br/><span>kita kerjakan bareng?</span></h2><p>Punya ide, peluang, atau sekadar ingin menyapa?<br/>I’d love to hear from you.</p><div className="contact-buttons"><a className="button primary" href={`mailto:${profile.email}`}>Say hello <ArrowUpRight size={18}/></a><button className="button secondary" onClick={copyEmail}>{copyStatus === 'Email tersalin!' ? <Check size={16}/> : <Copy size={16}/>} Copy email</button></div><div role="status" className="copy-status">{copyStatus || profile.email}</div><div className="social-links"><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13}/></a><a href={profile.instagram} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13}/></a><a href="/portfolio/sherindiva-portfolio.pdf" target="_blank" rel="noreferrer">Portfolio PDF <ArrowUpRight size={13}/></a></div></section>

    <footer className="shell"><a className="brand" href="#home">sherindiva<span className="brand-period">.</span></a><span>Sherindiva · Bogor, Indonesia</span><a className="text-link" href="#home">Back to hello <ArrowUp size={14}/></a></footer>



    <dialog ref={contactDialog} className="contact-dialog" aria-labelledby="contact-card-title" onClick={e => { if(e.target === contactDialog.current) contactDialog.current.close(); }} onClose={() => callTrigger.current?.focus()}>
      <button className="contact-card-close icon-button" onClick={() => contactDialog.current?.close()} aria-label="Tutup kartu kontak"><X size={21}/></button>
      <div className="contact-card-avatar"><Image src="/portfolio/portrait.webp" alt="Sherindiva" width={100} height={150}/></div>
      <h2 id="contact-card-title">Sherindiva</h2><p>Yuk, ngobrol atau kerja bareng.</p>
      <div className="contact-card-links"><a href={`mailto:${profile.email}`}><Mail size={22}/><span><small>Email</small><strong>{profile.email}</strong></span><ArrowUpRight size={18}/></a><a href={profile.instagram} target="_blank" rel="noreferrer"><MessageCircle size={22}/><span><small>Instagram</small><strong>@sherindiva</strong></span><ArrowUpRight size={18}/></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><BriefcaseBusiness size={22}/><span><small>LinkedIn</small><strong>Sherindiva</strong></span><ArrowUpRight size={18}/></a></div>
      <button className="contact-motion-button" onClick={() => setPaused(!paused)}>{paused ? <Play size={16}/> : <Pause size={16}/>} {paused ? 'Lanjutkan animasi' : 'Jeda animasi'}</button>
    </dialog>
    <dialog ref={dialog} className="project-dialog" onCancel={closeProject} onClose={() => { setSelected(null); projectTrigger.current?.focus(); }} onClick={e => { if(e.target === dialog.current) closeProject(); }} aria-labelledby="dialog-title"><button className="dialog-close icon-button" onClick={closeProject} aria-label="Tutup detail proyek"><X size={21}/></button>{selected && <><div className={`dialog-art ${selected.id}`}><Image src={selected.image} alt={selected.subtitle} width={960} height={540}/></div><div className="dialog-copy"><span className="eyebrow blue">{selected.role}</span><h2 id="dialog-title">{selected.name}</h2><p>{selected.description}</p><div className="project-metric"><strong>{selected.metric}</strong><span>{selected.metricLabel}</span></div><h3>My contribution</h3><ul>{selected.details.map(detail => <li key={detail}>{detail}</li>)}</ul><div className="skill-tags">{selected.tags.map(tag => <span key={tag}>{tag}</span>)}</div>{selected.note && <p className="confidential-note">{selected.note}</p>}</div></>}</dialog>

  </main>;

}
