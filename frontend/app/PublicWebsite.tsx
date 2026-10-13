"use client";

import Image from "next/image";
import LaunchCountdown from "./LaunchCountdown";
import { FormEvent, useRef, useState } from "react";
import { IconArrowUpRight, IconAward, IconBook, IconChartBar, IconChevronDown, IconChevronRight, IconHandStop, IconMenu2, IconPlayerPlay, IconRoute, IconSearch, IconX } from "@tabler/icons-react";
import styles from "./landing.module.css";

export type Audience = "Learner" | "Family" | "Educator";
type Detail = { title: string; body: string; learning?: boolean };

// Provisional copy, based on the existing RSL program. Replace from the approved brief.
const groups = [
  { id: "beginner", title: "Beginner", icon: IconHandStop, tone: "mint", items: ["Introduction to Rwandan Sign Language", "The sign language alphabet", "Numbers", "Greetings and introductions", "Family and relationships", "Everyday expressions"], description: "Begin with the building blocks of Rwandan Sign Language, from your first handshapes to everyday expressions." },
  { id: "intermediate", title: "Intermediate", icon: IconBook, tone: "peach", items: ["Building sentences", "Asking questions"], description: "Bring your first signs together and develop your conversational skills." },
  { id: "advanced", title: "Advanced", icon: IconChartBar, tone: "lavender", items: ["Complex conversations"], description: "Continue your learning path with more detailed, everyday conversations." },
  { id: "video-learning", title: "Video learning", icon: IconPlayerPlay, tone: "peach", items: ["Watch a lesson", "Replay and practise", "Follow your progress"], description: "Watch each lesson, pause when you need to, and return to the parts you want to practise." },
  { id: "practice", title: "Practice and progress", icon: IconRoute, tone: "mint", items: ["Learning levels", "Lesson completion", "Continue learning"], description: "Follow a sequence of lessons and build on what you have already learned." },
  { id: "certificates", title: "Certificates", icon: IconAward, tone: "yellow", items: ["Level assessments", "Completion certificates"], description: "The program includes level assessments and completion certificates. Full requirements will be confirmed in the program guide." },
];

const audiences: { name: Audience; description: string }[] = [
  { name: "Learner", description: "Learning on my own" },
  { name: "Family", description: "Learning alongside someone" },
  { name: "Educator", description: "Supporting others as they learn" },
];

export default function LandingPage() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [detail, setDetail] = useState<Detail | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const term = query.trim().toLowerCase();
  const filtered = groups.map(group => ({ ...group, items: group.title.toLowerCase().includes(term) ? group.items : group.items.filter(item => item.toLowerCase().includes(term)) })).filter(group => group.items.length);
  const showDetail = (next: Detail) => { setDetail(next); dialog.current?.showModal(); };
  const search = (event: FormEvent) => { event.preventDefault(); document.getElementById("levels")?.scrollIntoView({ behavior: "instant" }); setMenuOpen(false); };
  const selectAudience = (audience?: Audience) => { window.location.assign(audience ? `/register?audience=${encodeURIComponent(audience)}` : '/register'); };
  const login = () => { window.location.assign('/login'); };
  const openProgram = (title: string, body: string) => showDetail({ title, body, learning: true });

  return <div className={styles.page}>
    <LaunchCountdown />
    <a className={styles.skipLink} href="#main-content">Skip to content</a>
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main navigation">
        <div className={styles.navLeft}>
          <a href="#levels" className={styles.explore}>Explore <IconChevronDown size={16} aria-hidden="true" /></a>
          <form className={styles.search} onSubmit={search} role="search">
            <IconSearch size={20} aria-hidden="true" /><input aria-label="Search the learning program" type="search" placeholder="Search" value={query} onChange={event => setQuery(event.target.value)} />
          </form>
        </div>
        <a className={styles.brand} href="#main-content" aria-label="No Barriers home"><Image src="/no%20barriers%20logo.jpeg" width={40} height={36} alt="" /><span>no barriers</span></a>
        <div className={styles.navRight}><a href="#inclusion" className={styles.aboutLink}>Our purpose</a><button className={styles.textButton} onClick={login}>Log in</button><button className={styles.button} onClick={() => selectAudience()}>Sign up</button></div>
        <button className={styles.menuButton} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <IconX /> : <IconMenu2 />}</button>
      </nav>
      {menuOpen && <div className={styles.mobileMenu} id="mobile-navigation"><form className={styles.search} onSubmit={search} role="search"><IconSearch size={20} aria-hidden="true" /><input type="search" aria-label="Search the learning program" placeholder="Search the program" value={query} onChange={event => setQuery(event.target.value)} /><button type="submit" aria-label="Find lessons"><IconChevronRight size={20} /></button></form><a href="#levels" onClick={() => setMenuOpen(false)}>Explore the program</a><a href="#inclusion" onClick={() => setMenuOpen(false)}>Our purpose</a><button className={styles.textButton} onClick={login}>Log in</button></div>}
    </header>

    <main id="main-content">
      <section className={`${styles.container} ${styles.hero}`} aria-labelledby="hero-heading">
        <div className={styles.heroIntro}><h1 id="hero-heading">Learn sign language.<br />Connect with confidence.</h1><p>Explore Rwandan Sign Language through video lessons, practice, and a clear learning path.</p><Image className={styles.heroArt} src="/landing/community.webp" alt="Illustrative collage of three young adult learners" width={1448} height={1086} sizes="(max-width: 767px) 90vw, 42vw" loading="eager" /></div>
        <div className={styles.signup}><h2>Start your learning journey</h2><div className={styles.roleChoices}>{audiences.map(audience => <button className={styles.roleChoice} key={audience.name} onClick={() => selectAudience(audience.name)}><span><strong>{audience.name}</strong><small>{audience.description}</small></span><IconChevronRight size={21} aria-hidden="true" /></button>)}</div><p>Already have an account? <button className={styles.inlineLink} onClick={login}>Log in</button></p></div>
      </section>

      <section id="levels" className={`${styles.container} ${styles.directory}`} aria-label="Explore the learning program">
        {term && <div className={styles.searchStatus} role="status"><span>{filtered.length ? `Results for “${query}”` : `No topics found for “${query}”. Try “alphabet”, “video”, or “certificates”.`}</span><button className={styles.inlineLink} onClick={() => setQuery("")}>Clear search</button></div>}
        <div className={styles.directoryColumns}>{[groups.slice(0, 3), groups.slice(3)].map((column, index) => <div key={index}>{column.map(group => { const result = filtered.find(item => item.id === group.id); if (!result) return null; const Icon = group.icon; return <details key={`${group.id}-${term}`} className={styles.courseGroup} id={group.id} open><summary><span className={`${styles.categoryIcon} ${styles[group.tone]}`}><Icon size={25} strokeWidth={1.6} aria-hidden="true" /></span><h2>{group.title}</h2><IconChevronDown size={22} className={styles.chevron} aria-hidden="true" /></summary><div className={styles.courseLinks}>{result.items.map(item => <button key={item} onClick={() => openProgram(item, group.description)}>{item}</button>)}<button className={styles.seeAll} onClick={() => openProgram(group.title, group.description)}>Explore {group.title.toLowerCase()} <IconArrowUpRight size={17} aria-hidden="true" /></button></div></details>; })}</div>)}</div>
      </section>

      <section id="how-it-works" className={`${styles.container} ${styles.benefits}`} aria-labelledby="why-heading"><h2 id="why-heading">Why learn with No Barriers?</h2><div className={styles.benefitGrid}>{[
        { title: "Visual learning", body: "Watch a sign, pause the lesson, and return to it as you practise.", Icon: IconPlayerPlay, tone: "peach" },
        { title: "A clear learning path", body: "Build from your first signs toward more confident everyday communication.", Icon: IconRoute, tone: "mint" },
        { title: "Progress you can see", body: "Complete lessons, work through each level, and recognise what you have learned.", Icon: IconAward, tone: "yellow" },
      ].map(({ title, body, Icon, tone }) => <article key={title}><span className={`${styles.benefitIcon} ${styles[tone]}`}><Icon size={43} strokeWidth={1.35} aria-hidden="true" /></span><h3>{title}</h3><p>{body}</p></article>)}</div></section>

      <section id="educators" className={`${styles.container} ${styles.feature}`} aria-labelledby="educators-heading"><Image className={styles.featureArt} src="/landing/community.webp" alt="Illustrative portraits representing a community of learners" width={1448} height={1086} sizes="(max-width: 767px) 90vw, 45vw" /><div className={styles.featureCopy}><p className={styles.eyebrow}>For educators</p><h2 id="educators-heading">Help more people<br />take part.</h2><p>Bring sign language into your learning environment. Use video lessons as a starting point for practice and more inclusive conversations.</p><button className={styles.button} onClick={() => selectAudience("Educator")}>Educators, start here</button></div></section>

      <section id="learners" className={`${styles.container} ${styles.feature} ${styles.featureReverse}`} aria-labelledby="learners-heading"><div className={styles.featureCopy}><p className={styles.eyebrow}>For learners</p><h2 id="learners-heading"><span className={styles.highlight}>Your first sign</span><br />is a beginning.</h2><p>Start with the basics of Rwandan Sign Language. Replay lessons, practise regularly, and build confidence at your own pace.</p><button className={styles.button} onClick={() => selectAudience("Learner")}>Learners, start here</button></div><Image className={styles.featureArt} src="/landing/learner.webp" alt="Illustration of a video lesson on a laptop beside a notebook" width={1448} height={1086} sizes="(max-width: 767px) 90vw, 45vw" /></section>

      <section id="our-purpose" className={styles.statement} aria-label="Our purpose"><div className={styles.container}><p className={styles.statementText}>Learning to sign creates more ways to understand one another. Every conversation is a chance to include someone.</p><div className={styles.statementSignature}><div><strong>NO BARRIERS</strong><span>Learning. Communication. Inclusion.</span></div><Image src="/no%20barriers%20logo.jpeg" width={90} height={81} alt="" /></div></div></section>

      <section id="inclusion" className={`${styles.container} ${styles.feature}`} aria-labelledby="inclusion-heading"><Image className={styles.featureArt} src="/landing/inclusion.webp" alt="Illustrative collage of a family learning together with a tablet" width={1448} height={1086} sizes="(max-width: 767px) 90vw, 45vw" /><div className={styles.featureCopy}><p className={styles.eyebrow}>Together we can connect</p><h2 id="inclusion-heading">Communication should <span className={styles.underline}>include everyone.</span></h2><p>Learning sign language can help families, educators, and communities connect. Take a first step toward conversations where more people can take part.</p><a className={styles.button} href="#levels">Explore the learning path</a></div></section>

      <section id="join" className={`${styles.container} ${styles.join}`} aria-labelledby="join-heading"><h2 id="join-heading">Join No Barriers today</h2><div className={styles.joinChoices}><div className={styles.rings} aria-hidden="true" />{([['Learners', 'Learner'], ['Educators', 'Educator'], ['Families', 'Family']] as const).map(([label, audience]) => <button key={label} className={styles.button} onClick={() => selectAudience(audience)}>{label}</button>)}<a className={styles.button} href="#levels">Explore the program</a></div></section>

      <section id="supporters" className={styles.supporters} aria-labelledby="supporters-heading">
        <div className={styles.container}>
          <h2 id="supporters-heading">Our supporters</h2>
          <div className={styles.supporterLogos}>
            <figure className={styles.supporter}>
              <div className={styles.supporterImage}><Image src="/supporters/intango-tss-transparent.png" alt="INTANGO TSS" width={1519} height={1036} sizes="(max-width: 767px) 140px, 240px" /></div>
            </figure>
            <figure className={styles.supporter}>
              <div className={styles.supporterImage}><Image src="/supporters/dot-rwanda-transparent.png" alt="DOT Rwanda" width={1254} height={1254} sizes="(max-width: 767px) 140px, 220px" /></div>
            </figure>
          </div>
        </div>
      </section>
    </main>

    <footer className={styles.footer}><div className={styles.container}><div className={styles.footerColumns}><div className={styles.mission}><p>More ways to learn.<br />More ways to connect.</p><p>No Barriers brings sign-language learning and everyday communication closer together.</p></div><div><h2>About</h2><a href="#our-purpose">Our purpose</a><a href="#how-it-works">How learning works</a><a href="#inclusion">Inclusion</a><a href="#supporters">Our supporters</a></div><div><h2>Get started</h2><button onClick={() => selectAudience("Learner")}>Learners</button><button onClick={() => selectAudience("Family")}>Families</button><button onClick={() => selectAudience("Educator")}>Educators</button><button onClick={login}>Log in</button></div><div><h2>Learning</h2>{groups.filter(group => ["beginner", "intermediate", "advanced", "certificates"].includes(group.id)).map(group => <a key={group.id} href={`#${group.id}`}>{group.title}</a>)}</div></div><div className={styles.locale}><p><span>Language</span> English</p><p><span>Program</span> Rwandan Sign Language</p></div><div className={styles.footerBottom}><span>© {new Date().getFullYear()} No Barriers</span><div>{["Terms of use", "Privacy", "Accessibility"].map(title => <button key={title} onClick={() => showDetail({ title, body: title === "Accessibility" ? "This page supports keyboard navigation, visible focus indicators, and responsive layouts. A full accessibility statement will be added with the program information." : `The No Barriers ${title.toLowerCase()} information has not been published yet. It will be added before the learning service launches.` })}>{title}</button>)}</div></div></div></footer>

    <dialog ref={dialog} className={styles.dialog} aria-labelledby="detail-heading" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}><div className={styles.dialogContent}><button className={styles.closeDialog} aria-label="Close details" onClick={() => dialog.current?.close()}><IconX size={22} /></button><h2 id="detail-heading">{detail?.title}</h2><p>{detail?.body}</p>{detail?.learning && <button className={styles.button} onClick={() => { dialog.current?.close(); selectAudience("Learner"); }}>Start learning</button>}</div></dialog>
  </div>;
}
