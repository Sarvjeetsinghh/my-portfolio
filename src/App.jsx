import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";
import toywallahImg from "./assets/toywallah.png";
import dreamnaukriImg from "./assets/dreamnaukri.png";
import netclixImg from "./assets/netclix.png";
import bullclothingsImg from "./assets/bullclothings.png";
import iardoImg from "./assets/iardo.png";

/* ---------------------------------------------------------
   Data — pulled from resume
--------------------------------------------------------- */
const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "techstack", label: "Tech Stack" },
  { id: "leetcode", label: "LeetCode" },
  { id: "contact", label: "Contact me" },
];

const EXPERIENCE = [
  {
    company: "IARDO",
    role: "Java Developer",
    period: "Aug 2025 — Jun 2026",
    points: [
      "Worked across frontend, backend and database layers, and handled the live production server.",
      "Implemented and tested RESTful APIs using Maven, with clean code and proper exception handling.",
      "Integrated MySQL databases with Java applications — optimized queries, joins and stored procedures.",
    ],
  },
  {
    company: "QSpider Training Centre, Noida",
    role: "Java Full Stack Developer Trainee",
    period: "Jun 2025 — Oct 2025",
    points: [
      "Completed full stack Java training across Core Java, Servlets, Hibernate, Spring Boot and MySQL.",
      "Built real-time projects integrating a JSP frontend with a Maven-based backend.",
      "Strengthened hands-on experience in OOP, JDBC, REST APIs and database integration.",
    ],
  },
];

/* Each project now carries the extra fields the new spotlight
   layout needs: an overview paragraph, explicit tech groups,
   and links. Fill in the REPLACE ME spots with real info/urls. */
const PROJECTS = [
  {
    name: "DreamNaukri",
    tagline: "Job Portal",
    date: "Nov 2025",
    image: dreamnaukriImg,
    overview:
      "A job-search platform where candidates browse and apply to listings and recruiters manage postings, built end-to-end on a Java/Maven backend with a JavaScript frontend and Cashfree for payments, deployed live on Hostinger.",
    techGroups: [
      { label: "Backend", items: "Java, Maven" },
      { label: "Frontend", items: "JavaScript, HTML5, CSS3" },
      { label: "Payments", items: "Cashfree" },
      { label: "Deployment", items: "Hostinger" },
    ],
    githubUrl: "#", // REPLACE ME — add repo link
    liveUrl: "#", // REPLACE ME — add live link
  },
  {
    name: "Toywallah",
    tagline: "E-Commerce Platform",
    date: "Dec 2025",
    image: toywallahImg,
    overview:
      "A full e-commerce storefront for toys — product catalog, cart and checkout — built with JSP on the frontend, Servlets and MySQL on the backend, with Cashfree payment integration and a live Hostinger deployment.",
    techGroups: [
      { label: "Backend", items: "Java, Servlet, Maven" },
      { label: "Frontend", items: "JSP" },
      { label: "Database", items: "MySQL" },
      { label: "Payments", items: "Cashfree" },
      { label: "Deployment", items: "Hostinger" },
    ],
    githubUrl: "#", // REPLACE ME — add repo link
    liveUrl: "#", // REPLACE ME — add live link
  },
  {
    name: "Netclix",
    tagline: "REPLACE ME — e.g. Streaming Platform", // [Guessing]
    date: "REPLACE ME", // [Guessing]
    image: netclixImg,
    overview: "REPLACE ME — add a 2–3 sentence overview of what Netclix does and how it's built.",
    techGroups: [{ label: "Stack", items: "REPLACE ME" }],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    name: "Bull Clothings",
    tagline: "REPLACE ME — e.g. E-Commerce / Fashion Store", // [Guessing]
    date: "REPLACE ME", // [Guessing]
    image: bullclothingsImg,
    overview: "REPLACE ME — add a 2–3 sentence overview of what Bull Clothings does and how it's built.",
    techGroups: [{ label: "Stack", items: "REPLACE ME" }],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    name: "IARDO",
    tagline: "REPLACE ME — e.g. Internal Dashboard / Tool", // [Guessing]
    date: "REPLACE ME", // [Guessing]
    image: iardoImg,
    overview: "REPLACE ME — add a 2–3 sentence overview of what IARDO does and how it's built.",
    techGroups: [{ label: "Stack", items: "REPLACE ME" }],
    githubUrl: "#",
    liveUrl: "#",
  },
];

/* Tech stack — grouped into icon tiles like a real toolkit,
   not a wall of chips. Each item shows a compact glyph (its
   own initials/shorthand) plus the full name. */
const TECH_GROUPS = [
  {
    group: "Languages",
    items: [
      { short: "J", name: "Java" },
      { short: "JS", name: "JavaScript" },
      { short: "SQL", name: "MySQL" },
      { short: "</>", name: "HTML5" },
      { short: "#", name: "CSS3" },
    ],
  },
  {
    group: "Frameworks",
    items: [
      { short: "Sp", name: "Spring" },
      { short: "SB", name: "Spring Boot" },
      { short: "JDBC", name: "JDBC" },
      { short: "Hib", name: "Hibernate" },
      { short: "JSP", name: "JSP" },
      { short: "Svl", name: "Servlets" },
    ],
  },
  {
    group: "Tools & Platforms",
    items: [
      { short: "Mvn", name: "Maven" },
      { short: "Git", name: "Git" },
      { short: "Hub", name: "GitHub" },
      { short: "Pm", name: "Postman" },
      { short: "VS", name: "VS Code" },
      { short: "Ecl", name: "Eclipse IDE" },
      { short: "STS", name: "STS" },
    ],
  },
  {
    group: "APIs & Data",
    items: [
      { short: "API", name: "REST APIs" },
      { short: "DB", name: "MySQL" },
    ],
  },
];

const ORBIT_ITEMS = ["Java", "Spring Boot", "MySQL", "React", "Maven", "REST APIs", "Hibernate", "JavaScript"];

/* LeetCode — only the number confirmed on the resume is shown
   as a real stat; the rest are placeholders to fill in. */
const LEETCODE = {
  solved: "50+",
  profileUrl: "#", // REPLACE ME — add LeetCode profile URL
  streak: "REPLACE ME",
  badges: "REPLACE ME",
};

/* Social links for the contact section — add real URLs. */
const SOCIALS = [
  { label: "GitHub", href: "#" }, // REPLACE ME
  { label: "LinkedIn", href: "#" }, // REPLACE ME
  { label: "LeetCode", href: "#" }, // REPLACE ME
];

/* ---------------------------------------------------------
   Helpers
--------------------------------------------------------- */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.18, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView];
}

function Reveal({ children, className = "", as: Tag = "div", delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}

/** Mouse-tracked 3D tilt wrapper. Disabled for touch / reduced motion. */
function TiltCard({ children, className = "", maxTilt = 10 }) {
  const ref = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const [style, setStyle] = useState({});
  const isTouch = useRef(false);

  useEffect(() => {
    isTouch.current = window.matchMedia("(hover: none)").matches;
  }, []);

  const onMove = useCallback(
    (e) => {
      if (reducedMotion || isTouch.current || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * maxTilt * 2;
      const rotateX = (0.5 - py) * maxTilt * 2;
      setStyle({
        transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`,
      });
    },
    [maxTilt, reducedMotion]
  );

  const onLeave = useCallback(() => {
    setStyle({ transform: "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)" });
  }, []);

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------
   Sections
--------------------------------------------------------- */
function Nav({ active, onNavigate }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="nav-inner">
        <a
          href="#hero"
          className="brand"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("hero");
            setOpen(false);
          }}
        >
          SS<span className="brand-dot">.</span>
        </a>
        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`nav-links ${open ? "nav-links-open" : ""}`}>
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={active === n.id ? "nav-link nav-link-active" : "nav-link"}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(n.id);
                setOpen(false);
              }}
            >
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* ---------------------------------------------------------
   Hero — single centered layout, textured gradient background
   (no image asset required)
--------------------------------------------------------- */
function Hero({ onNavigate }) {
  return (
    <section id="hero" className="hero">
      <div className="hero-backdrop" aria-hidden="true">
        <div className="hero-glow hero-glow-a" />
        <div className="hero-glow hero-glow-b" />
      </div>

      <div className="hero-inner">
        <div className="hero-content">
          <p className="eyebrow">Full Stack · Java Developer</p>
          <h1 className="hero-title">
            Hey! I'm <span className="hero-title-accent">Sarvjeet</span>
          </h1>
          <p className="hero-sub">
            I build scalable backends and the interfaces on top of them — Java, Spring Boot
            and MySQL on the server, React on the screen.
          </p>
          <div className="hero-actions">
            <a
              className="btn btn-primary"
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("projects");
              }}
            >
              View Projects
            </a>
            <a className="btn btn-ghost" href="mailto:ssarvjeet834@gmail.com">
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      <button
        className="scroll-cue"
        onClick={() => onNavigate("about")}
        aria-label="Scroll to about section"
      >
        <span className="scroll-cue-dot" />
      </button>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section">
      <div className="section-inner about-grid">
        <Reveal className="about-text">
          <p className="section-eyebrow">About</p>
          <h2 className="section-title">Backend-first, product-minded.</h2>
          <p className="section-body">
            I'm a full stack developer who's most at home in Java and Spring Boot,
            shaping clean REST APIs and well-structured MySQL schemas — then following
            the work all the way to a working, deployed product with a React or JSP
            front end on top. Two of my projects are live and handling real traffic
            today, payments included.
          </p>
        </Reveal>
        <Reveal className="about-card" delay={120}>
          <TiltCard className="edu-card" maxTilt={6}>
            <div className="edu-card-inner">
              <span className="edu-badge">B.Tech</span>
              <h3 className="edu-title">Information Technology Engineering</h3>
              <p className="edu-school">SCRIET, CCS University, Meerut</p>
              <p className="edu-period">2021 – 2025</p>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section section-alt">
      <div className="section-inner">
        <Reveal>
          <p className="section-eyebrow">Experience</p>
          <h2 className="section-title">Where I've worked.</h2>
        </Reveal>

        <div className="timeline">
          {EXPERIENCE.map((job, i) => (
            <Reveal key={job.company} className="timeline-row" delay={i * 120}>
              <div className="timeline-marker">
                <span className="timeline-dot" />
                {i !== EXPERIENCE.length - 1 && <span className="timeline-line" />}
              </div>
              <div className="timeline-card">
                <div className="timeline-head">
                  <h3>{job.role}</h3>
                  <span className="timeline-period">{job.period}</span>
                </div>
                <p className="timeline-company">{job.company}</p>
                <ul className="point-list">
                  {job.points.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** One spotlight project — image on one side, overview + tech
    groups + links on the other. Alternates sides per index so
    the section doesn't feel like a repeated card grid. */
function ProjectSpotlight({ proj, index }) {
  const flipped = index % 2 === 1;
  return (
    <Reveal className={`project-row ${flipped ? "project-row-flip" : ""}`} delay={index * 90}>
      <TiltCard className="project-media" maxTilt={5}>
        <div className="project-media-inner">
          <img src={proj.image} alt={`${proj.name} preview`} className="project-image" loading="lazy" />
        </div>
      </TiltCard>

      <div className="project-copy">
        <div className="project-copy-top">
          <div>
            <h3 className="project-name">{proj.name}</h3>
            <p className="project-tagline">{proj.tagline}</p>
          </div>
          <span className="project-date">{proj.date}</span>
        </div>

        <p className="project-overview">{proj.overview}</p>

        <div className="project-tech-groups">
          {proj.techGroups.map((g) => (
            <p className="project-tech-row" key={g.label}>
              <span className="project-tech-label">{g.label}:</span> {g.items}
            </p>
          ))}
        </div>

        <div className="project-links">
          <a className="btn btn-ghost btn-sm" href={proj.githubUrl}>
            GitHub
          </a>
          <a className="btn btn-primary btn-sm" href={proj.liveUrl}>
            Live Demo
          </a>
        </div>
      </div>
    </Reveal>
  );
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <Reveal>
          <p className="section-eyebrow">Projects</p>
          <h2 className="section-title">Shipped, not just built.</h2>
        </Reveal>

        <div className="project-list">
          {PROJECTS.map((proj, i) => (
            <ProjectSpotlight proj={proj} index={i} key={proj.name} />
          ))}
        </div>
      </div>
    </section>
  );
}

function OrbitRing() {
  const reducedMotion = usePrefersReducedMotion();
  const sceneRef = useRef(null);
  const [radius, setRadius] = useState(180);
  const n = ORBIT_ITEMS.length;

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const update = () => setRadius(Math.round(el.clientWidth * 0.42));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={sceneRef} className={`orbit-scene ${reducedMotion ? "orbit-static" : ""}`}>
      <div className="orbit-center">
        <span className="orbit-center-label">Java</span>
      </div>
      <div className="orbit-ring">
        {ORBIT_ITEMS.map((item, i) => {
          const angle = (360 / n) * i;
          return (
            <div
              className="orbit-item"
              key={item}
              style={{ transform: `rotateY(${angle}deg) translateZ(${radius}px)` }}
            >
              <div className="orbit-item-counter">
                <span className="orbit-chip">{item}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Tech Stack — icon-tile grid grouped by category, echoing a
    toolbelt/dock rather than a paragraph of chips. */
function TechStack() {
  return (
    <section id="techstack" className="section section-alt">
      <div className="section-inner">
        <Reveal>
          <p className="section-eyebrow">Tech Stack</p>
          <h2 className="section-title">The stack I reach for.</h2>
        </Reveal>

        <div className="tech-groups">
          {TECH_GROUPS.map((g, gi) => (
            <Reveal className="tech-group" key={g.group} delay={gi * 100}>
              <h4 className="tech-group-title">{g.group}</h4>
              <div className="tech-tile-row">
                {g.items.map((it) => (
                  <div className="tech-tile" key={it.name} title={it.name}>
                    <span className="tech-tile-glyph">{it.short}</span>
                    <span className="tech-tile-name">{it.name}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="orbit-wrap" delay={200}>
          <OrbitRing />
        </Reveal>
      </div>
    </section>
  );
}

/** LeetCode Profile — mirrors the stat-card + highlights layout,
    built only from the number confirmed on the resume. Placeholder
    fields are marked so real stats can be dropped in later. */
function LeetCodeSection() {
  return (
    <section id="leetcode" className="section">
      <div className="section-inner">
        <Reveal>
          <p className="section-eyebrow">LeetCode</p>
          <h2 className="section-title">Solving problems, building skills.</h2>
        </Reveal>

        <Reveal className="leet-banner" delay={100}>
          <div className="leet-banner-text">
            <h3>Check out my LeetCode journey!</h3>
            <p>Solving problems, building skills, and maintaining streaks.</p>
          </div>
          <a className="btn btn-ghost" href={LEETCODE.profileUrl}>
            View Profile ↗
          </a>
        </Reveal>

        <div className="leet-stats">
          <Reveal className="leet-stat-card" delay={140}>
            <span className="leet-stat-label">Problems Solved</span>
            <span className="leet-stat-value">{LEETCODE.solved}</span>
          </Reveal>
          <Reveal className="leet-stat-card" delay={200}>
            <span className="leet-stat-label">Max Streak</span>
            <span className="leet-stat-value leet-stat-placeholder">{LEETCODE.streak}</span>
          </Reveal>
          <Reveal className="leet-stat-card" delay={260}>
            <span className="leet-stat-label">Badges</span>
            <span className="leet-stat-value leet-stat-placeholder">{LEETCODE.badges}</span>
          </Reveal>
        </div>

        <Reveal delay={300}>
          <p className="leetcode-note">
            <strong>50+ problems</strong> solved on LeetCode — strong foundation in Data
            Structures &amp; Algorithms.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section section-alt contact-section">
      <div className="section-inner">
        <Reveal className="contact-inner">
          <p className="section-eyebrow">Contact</p>
          <h2 className="section-title">Still a stranger?</h2>
          <p className="section-body contact-copy">
            Open to full stack and backend Java roles. Feel free to drop me an email if you
            think we'd make a great team — let's make the work productive and enjoyable.
          </p>
          <div className="contact-actions">
            <a className="btn btn-primary" href="mailto:ssarvjeet834@gmail.com">
              ssarvjeet834@gmail.com
            </a>
            <a className="btn btn-ghost" href="tel:+919889141494">
              +91 98891 41494
            </a>
          </div>
          <div className="contact-socials">
            {SOCIALS.map((s) => (
              <a key={s.label} className="social-pill" href={s.href} title={`Add your ${s.label} URL`}>
                {s.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
      <footer className="footer">
        <span>© {new Date().getFullYear()} Sarvjeet Singh</span>
        <span>Built with React</span>
      </footer>
    </section>
  );
}

/* ---------------------------------------------------------
   App
--------------------------------------------------------- */
export default function App() {
  const [active, setActive] = useState("hero");

  const handleNavigate = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  }, []);

  useEffect(() => {
    const ids = ["hero", ...NAV.map((n) => n.id)];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="app">
      <Nav active={active} onNavigate={handleNavigate} />
      <Hero onNavigate={handleNavigate} />
      <About />
      <Experience />
      <Projects />
      <TechStack />
      <LeetCodeSection />
      <Contact />
    </div>
  );
}