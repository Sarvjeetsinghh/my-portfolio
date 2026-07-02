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
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
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

const PROJECTS = [
  {
    name: "DreamNaukri",
    tagline: "Job Portal",
    date: "Nov 2025",
    image: dreamnaukriImg,
    stack: ["Java", "Maven", "JavaScript", "Cashfree", "Hostinger"],
  },
  {
    name: "Toywallah",
    tagline: "E-Commerce Platform",
    date: "Dec 2025",
    image: toywallahImg,
    stack: ["Java", "JSP", "MySQL", "Servlet", "Cashfree", "Hostinger"],
  },
  {
    name: "Netclix",
    tagline: "REPLACE ME — e.g. Streaming Platform", // [Guessing]
    date: "REPLACE ME", // [Guessing]
    image: netclixImg,
    stack: ["REPLACE ME"], // [Guessing]
  },
  {
    name: "Bull Clothings",
    tagline: "REPLACE ME — e.g. E-Commerce / Fashion Store", // [Guessing]
    date: "REPLACE ME", // [Guessing]
    image: bullclothingsImg,
    stack: ["REPLACE ME"], // [Guessing]
  },
  {
    name: "IARDO",
    tagline: "REPLACE ME — e.g. Internal Dashboard / Tool", // [Guessing]
    date: "REPLACE ME", // [Guessing]
    image: iardoImg,
    stack: ["REPLACE ME"], // [Guessing]
  },
];

const SKILL_GROUPS = [
  { group: "Languages & Databases", items: ["Java", "React", "JavaScript", "HTML5", "CSS3", "MySQL"] },
  { group: "Frameworks", items: ["Spring", "Spring Boot", "JDBC", "REST APIs", "JSP", "Servlets", "Hibernate"] },
  { group: "Tools & Platforms", items: ["Maven", "Git", "GitHub", "Postman", "VS Code", "Eclipse IDE", "STS"] },
];

const ORBIT_ITEMS = ["Java", "Spring Boot", "MySQL", "React", "Maven", "REST APIs", "Hibernate", "JavaScript"];

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
            Sarvjeet <span className="hero-title-accent">Singh</span>
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

        <TiltCard className="hero-card" maxTilt={8}>
          <div className="hero-card-inner">
            <div className="hero-card-row">
              <span className="hero-card-label">role</span>
              <span className="hero-card-value">Java Developer</span>
            </div>
            <div className="hero-card-row">
              <span className="hero-card-label">based in</span>
              <span className="hero-card-value">Meerut, India</span>
            </div>
            <div className="hero-card-row">
              <span className="hero-card-label">focus</span>
              <span className="hero-card-value">Backend &amp; Full Stack</span>
            </div>
            <div className="hero-card-divider" />
            <div className="hero-card-tags">
              {["Java", "Spring Boot", "MySQL", "React"].map((t) => (
                <span key={t} className="hero-card-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </TiltCard>
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
          <p className="section-eyebrow">01 — About</p>
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
          <p className="section-eyebrow">02 — Experience</p>
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

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <Reveal>
          <p className="section-eyebrow">03 — Projects</p>
          <h2 className="section-title">Shipped, not just built.</h2>
        </Reveal>

        <div className="project-grid">
          {PROJECTS.map((proj, i) => (
            <Reveal key={proj.name} delay={i * 140}>
              <TiltCard className="project-card" maxTilt={7}>
                <div className="project-card-inner">
                  <div className="project-image-wrap">
                    <img
                      src={proj.image}
                      alt={`${proj.name} preview`}
                      className="project-image"
                      loading="lazy"
                    />
                  </div>
                  <div className="project-card-body">
                    <div className="project-card-top">
                      <div>
                        <h3 className="project-name">{proj.name}</h3>
                        <p className="project-tagline">{proj.tagline}</p>
                      </div>
                      <span className="project-date">{proj.date}</span>
                    </div>
                    <div className="chip-row">
                      {proj.stack.map((s) => (
                        <span className="chip" key={s}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
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

function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="section-inner skills-grid">
        <Reveal className="skills-text">
          <p className="section-eyebrow">04 — Skills</p>
          <h2 className="section-title">The stack I reach for.</h2>
          <div className="skill-groups">
            {SKILL_GROUPS.map((g) => (
              <div className="skill-group" key={g.group}>
                <h4>{g.group}</h4>
                <div className="chip-row">
                  {g.items.map((s) => (
                    <span className="chip chip-alt" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="leetcode-note">
            <strong>50+ problems</strong> solved on LeetCode — strong foundation in Data
            Structures &amp; Algorithms.
          </p>
        </Reveal>
        <Reveal className="skills-orbit" delay={150}>
          <OrbitRing />
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="section-inner">
        <Reveal className="contact-inner">
          <p className="section-eyebrow">05 — Contact</p>
          <h2 className="section-title">Let's build something.</h2>
          <p className="section-body contact-copy">
            Open to full stack and backend Java roles. The fastest way to reach me is
            email or a call.
          </p>
          <div className="contact-actions">
            <a className="btn btn-primary" href="mailto:ssarvjeet834@gmail.com">
              ssarvjeet834@gmail.com
            </a>
            <a className="btn btn-ghost" href="tel:+919889141494">
              +91 98891 41494
            </a>
          </div>
          <div className="contact-secondary">
            <span className="muted-link" title="Add your LinkedIn URL here">
              LinkedIn ↗
            </span>
            <span className="muted-link" title="Add your LeetCode URL here">
              LeetCode ↗
            </span>
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
      <Skills />
      <Contact />
    </div>
  );
}