import { useEffect, useRef, useCallback, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FuzzyText } from "../components/FuzzyText";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zarch Linux | Performance, Security, and Control" },
      {
        name: "description",
        content:
          "Arch-based Linux focused on performance, security workflows, gaming support, and system control.",
      },
      { property: "og:title", content: "Zarch Linux | Performance, Security, and Control" },
      {
        property: "og:description",
        content:
          "Zarch Linux is an Arch-based distribution built for users who want a fast system, a security-ready environment, gaming optimization, and a polished Linux experience.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=Manrope:wght@200;700;800&display=swap"
        rel="stylesheet"
      />

      <div className="pointer-events-none fixed inset-0 z-0 bg-noir-radial" />
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="stars" />
        <div className="stars-2" />
      </div>

      {/* Floating spheres layer — BETWEEN bg (z-0) and content (z-10) */}
      <FloatingSpheres />

      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-28 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm" />

      <Nav />

      <main className="relative z-10">
        <Hero />
        <Features />
        <SpotlightReveal>
          <Testimonial />
          <Pricing />
          <CTA />
        </SpotlightReveal>
      </main>

      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a
          href="#home"
          className="flex items-center gap-3 font-display text-base font-bold uppercase tracking-[0.28em]"
        >
          <span className="grid h-7 w-7 place-items-center rounded-md bg-[var(--accent-red)] text-white">
            <span className="block h-2 w-2 rounded-full bg-white" />
          </span>
          Zarch Linux
        </a>
        <ul className="hidden items-center gap-8 text-sm uppercase tracking-[0.16em] text-muted-foreground md:flex">
          {["Home", "Features", "Download", "Docs", "About"].map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} className="transition hover:text-foreground">
                {item}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#download"
          className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-white backdrop-blur transition hover:border-[var(--accent-red)] hover:text-[var(--accent-red)]"
        >
          Download on GitHub
        </a>
      </nav>
    </header>
  );
}

function FloatingSpheres() {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const orb4Ref = useRef<HTMLDivElement>(null);
  const orb5Ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Parallax scroll handler — each orb moves at a different rate
  const handleParallax = useCallback(() => {
    const scrollY = window.scrollY;
    const configs = [
      { ref: orb1Ref, ySpeed: 0.18, xSpeed: 0.04 },
      { ref: orb2Ref, ySpeed: -0.14, xSpeed: -0.03 },
      { ref: orb3Ref, ySpeed: 0.09, xSpeed: 0.015 },
      { ref: orb4Ref, ySpeed: -0.22, xSpeed: 0.05 },
      { ref: orb5Ref, ySpeed: 0.2, xSpeed: -0.035 },
    ];
    configs.forEach(({ ref, ySpeed, xSpeed }) => {
      if (ref.current) {
        ref.current.style.setProperty('--parallax-y', `${scrollY * ySpeed}px`);
        ref.current.style.setProperty('--parallax-x', `${scrollY * xSpeed}px`);
      }
    });
  }, []);

  useEffect(() => {
    // Orb final separated positions (CasaOS-style spread)
    const orbConfigs = [
      { ref: orb1Ref, x: '-30vw', y: '-12vh', scale: 1.1, opacity: 0.8 },
      { ref: orb2Ref, x: '26vw',  y: '-16vh', scale: 1.0, opacity: 0.7 },
      { ref: orb3Ref, x: '-2vw',  y: '8vh',   scale: 1.25, opacity: 0.9 },
      { ref: orb4Ref, x: '-34vw', y: '24vh',  scale: 0.85, opacity: 0.6 },
      { ref: orb5Ref, x: '30vw',  y: '20vh',  scale: 1.0, opacity: 0.65 },
    ];

    // Start invisible & clustered at center
    orbConfigs.forEach(({ ref }) => {
      if (ref.current) {
        ref.current.style.opacity = '0';
        ref.current.style.transform = 'translate(-50%, -50%) scale(0.2)';
        ref.current.classList.remove('orb-pulse');
      }
    });

    // Staggered separation animation
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    orbConfigs.forEach(({ ref, x, y, scale, opacity }, i) => {
      const t = setTimeout(() => {
        if (ref.current) {
          const transform = `translate(calc(-50% + ${x}), calc(-50% + ${y})) scale(${scale})`;
          ref.current.style.opacity = opacity.toString();
          ref.current.style.transform = transform;
          ref.current.style.setProperty('--orb-end-transform', transform);
        }
      }, 300 + i * 150);
      timeouts.push(t);
    });

    // Enable breathing pulse after spread
    const tPulse = setTimeout(() => {
      orbConfigs.forEach(({ ref }) => {
        if (ref.current) ref.current.classList.add('orb-pulse');
      });
      setMounted(true);
    }, 3000);
    timeouts.push(tPulse);

    // Parallax scroll
    window.addEventListener('scroll', handleParallax, { passive: true });

    return () => {
      timeouts.forEach(clearTimeout);
      window.removeEventListener('scroll', handleParallax);
    };
  }, [handleParallax]);

  return (
    <div className="pointer-events-none fixed inset-0" style={{ zIndex: 5 }} aria-hidden="true">
      <div className="orb-container">
        <div className="orb orb-sphere" id="orb-1" ref={orb1Ref} />
        <div className="orb orb-sphere" id="orb-2" ref={orb2Ref} />
        <div className="orb orb-sphere" id="orb-3" ref={orb3Ref} />
        <div className="orb orb-sphere" id="orb-4" ref={orb4Ref} />
        <div className="orb orb-sphere" id="orb-5" ref={orb5Ref} />
      </div>
      {/* Noise texture over spheres */}
      <div className="noise-overlay" />
    </div>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-[100vh] w-full flex-col items-center justify-center px-6 pt-44 pb-24 text-center"
    >
      {/* Hero text content — sits ABOVE the floating spheres (z-10 via main) */}
      <div className="hero-content mx-auto flex max-w-7xl flex-col items-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-display text-xs uppercase tracking-[0.24em] text-muted-foreground backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-red)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-red)]" />
          </span>
          Arch-based distribution
        </div>

        <h1 className="mt-8 max-w-5xl font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          Performance, security, and control in one Linux system.
        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-muted-foreground">
          Zarch Linux is an Arch-based distribution built for users who want a fast system, a
          security-ready environment, gaming optimization, and a polished Linux experience.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#download" className="shiny-cta justify-center text-sm uppercase tracking-[0.18em]">
            Download on GitHub
          </a>
          <a
            href="#docs"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-white backdrop-blur transition hover:border-[var(--accent-red)] hover:text-[var(--accent-red)]"
          >
            Read the Docs
          </a>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
          {["Arch-based", "Performance-focused", "Security-ready", "Gaming-optimized"].map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 font-display text-xs uppercase tracking-[0.18em] text-muted-foreground"
            >
              {pill}
            </span>
          ))}
        </div>

        <div className="mt-16 w-full max-w-5xl rounded-3xl border border-white/10 bg-card/70 px-6 py-8 backdrop-blur sm:px-10">
          <p className="font-display text-sm uppercase tracking-[0.24em] text-muted-foreground">
            Zarch Linux
          </p>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            Arch-based Linux focused on performance, security workflows, gaming support, and system
            control.
          </p>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const featureCards = [
    {
      index: "01",
      title: "Rolling Arch Base With Direct Control",
      description:
        "Get the Arch rolling-release model with full visibility into packages, services, kernels, and system behavior. Zarch keeps the power Arch users expect while reducing setup friction.",
      tags: ["Arch Linux", "Rolling Release", "pacman", "System Control"],
      year: "2024",
      cta: "Explore Feature",
    },
    {
      index: "02",
      title: "Performance Tuning Built In",
      description:
        "Zarch is tuned for lower overhead, faster response, and smoother daily use. It is built for users who care about boot speed, responsiveness, compilation time, and low-latency workflows.",
      tags: ["Kernel", "Low Latency", "Responsiveness", "Optimization"],
      year: "2024",
      cta: "Explore Feature",
    },
    {
      index: "03",
      title: "Security-Ready Workflow",
      description:
        "Use a lightweight CLI-first environment that supports cybersecurity, network analysis, scripting, and advanced technical work without depending on a heavy preloaded stack.",
      tags: ["CLI", "Security", "Networking", "Technical Work"],
      year: "2023",
      cta: "Explore Feature",
    },
    {
      index: "04",
      title: "Gaming Support Without Extra Friction",
      description:
        "Zarch is prepared for modern Linux gaming with attention to drivers, compatibility layers, runtime behavior, and system tuning so users can move from install to play faster.",
      tags: ["GPU Drivers", "Proton", "Compatibility", "Gaming"],
      year: "2023",
      cta: "Explore Feature",
    },
    {
      index: "05",
      title: "A Repo That Makes Zarch Unique",
      description:
        "The Zarch repository delivers project-specific packages through normal package management, so users get curated updates, custom package delivery, and a cleaner path than manual rebuilds.",
      tags: ["Zarch Repo", "Custom Packages", "Updates", "Package Source"],
      year: "2022",
      cta: "Explore Feature",
    },
  ];
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ticking = false;

    const updateCards = () => {
      const sectionTop = section.offsetTop;
      const relativeScroll = window.scrollY - sectionTop;
      const scrollStep = window.innerHeight;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        if (mediaQuery.matches) {
          card.style.transform = "scale(1)";
          card.style.opacity = "1";
          return;
        }

        // A card stays fully active until the NEXT card starts to stack over it
        const fadeStart = (index + 1) * scrollStep;
        const progress = (relativeScroll - fadeStart) / scrollStep;
        const clampedProgress = Math.min(Math.max(progress, 0), 1);
        const scale = Math.max(0.92, 1 - clampedProgress * 0.05);
        const opacity = Math.max(0.7, 1 - clampedProgress * 0.3);
        const parallaxY = clampedProgress * -30;

        card.style.transform = `scale(${scale}) translateY(${parallaxY}px)`;
        card.style.opacity = `${opacity}`;
      });

      ticking = false;
    };

    const requestTick = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateCards);
    };

    const handleMotionChange = () => requestTick();

    requestTick();
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMotionChange);
    } else {
      mediaQuery.addListener(handleMotionChange);
    }

    return () => {
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);

      if (mediaQuery.addEventListener) {
        mediaQuery.removeEventListener("change", handleMotionChange);
      } else {
        mediaQuery.removeListener(handleMotionChange);
      }
    };
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="cards-section relative w-full"
      style={{ minHeight: `calc(var(--card-scroll-step) * ${featureCards.length} + 100vh)` }}
    >
      {/* Spacer to allow the black background to fully cover the viewport before text appears */}
      <div className="h-[75vh] w-full" aria-hidden="true" />
      
      <div className="mx-auto max-w-7xl px-6">
        <div className="cards-section-header">
          <p className="cards-eyebrow">Features</p>
          <h2 className="cards-heading">
            What makes <span className="cards-heading-em">Zarch Linux powerful</span>
          </h2>
        </div>

        <div className="cards-stack">
        {featureCards.map((card, index) => (
          <div
            key={card.index}
            className="card-sticky-wrapper"
            style={{ top: `calc(${index} * var(--top-offset-step))`, zIndex: index + 1 }}
          >
            <article
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              aria-label={`Feature card ${index + 1} of ${featureCards.length}`}
              className="project-card"
              style={{ zIndex: index + 1 }}
            >
              <div className="project-card-content">
                <div className="project-card-top">
                  <span className="project-index">{card.index}</span>
                  <div className="project-tags">
                    {card.tags.map((tag) => (
                      <span key={tag} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="project-copy">
                  <h3 className="project-title">{card.title}</h3>
                  <p className="project-description">{card.description}</p>
                </div>

                <div className="project-footer">
                  <span className="project-year">{card.year}</span>
                  <a href="#" className="project-link">
                    {card.cta}
                  </a>
                </div>
              </div>
            </article>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  const steps = [
    "Download the latest release from GitHub.",
    "Follow the installation guide and initial setup steps.",
    "Configure for security work, gaming, or customization.",
    "Track releases and updates through GitHub.",
  ];
  const screenshots = [
    "Desktop overview",
    "Terminal workflow",
    "Package management",
    "System customization",
  ];
  return (
    <>
      <section className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-3xl border border-white/10 bg-card/70 p-8 backdrop-blur lg:p-10">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            From install to daily use
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <article
                key={step}
                className="rounded-2xl border border-white/10 bg-black/50 p-6"
              >
                <p className="font-display text-xs uppercase tracking-[0.24em] text-[var(--accent-red)]">
                  0{index + 1}
                </p>
                <p className="mt-4 leading-7 text-muted-foreground">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-20">
        <h2 className="max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
          See Zarch Linux in use
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {screenshots.map((label) => (
            <article
              key={label}
              className="overflow-hidden rounded-3xl border border-white/10 bg-card/70 backdrop-blur"
            >
              <div className="flex h-72 items-center justify-center border-b border-white/10 bg-black/70 px-6 text-center font-display text-lg uppercase tracking-[0.2em] text-muted-foreground">
                {label}
              </div>
              <div className="px-6 py-5">
                <p className="font-display text-xs uppercase tracking-[0.24em] text-[var(--accent-red)]">
                  {label}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function Pricing() {
  const docsCards = [
    ["Installation", "Prepare media, install the system, complete first boot."],
    [
      "Post-install setup",
      "Package setup, user environment config, and core system checks.",
    ],
    ["Repository usage", "Connect to and update from the Zarch package source."],
    ["Gaming setup", "Drivers, compatibility tools, and runtime tuning."],
    ["Security tools", "CLI environment overview and technical workflow direction."],
    ["Troubleshooting", "Known issues, recovery steps, and support links."],
  ];
  return (
    <>
      <section id="download" className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-card/70 p-8 backdrop-blur lg:p-10">
            <div className="absolute inset-0 bg-noir-radial opacity-80" />
            <div className="relative">
              <p className="font-display text-xs uppercase tracking-[0.24em] text-[var(--accent-red)]">
                Download
              </p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Download Zarch Linux
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
                Access the latest release, installation assets, and source repository from GitHub.
              </p>
              <div className="mt-8 rounded-2xl border border-white/10 bg-black/60 p-6">
                <h3 className="font-display text-2xl font-bold">Get Zarch Linux</h3>
                <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
                  Distributed through GitHub. Use the repository and release page for downloads,
                  updates, and project tracking.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#"
                  className="shiny-cta justify-center text-sm uppercase tracking-[0.18em]"
                >
                  Download on GitHub
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-white backdrop-blur transition hover:border-[var(--accent-red)] hover:text-[var(--accent-red)]"
                >
                  View Releases
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-white backdrop-blur transition hover:border-[var(--accent-red)] hover:text-[var(--accent-red)]"
                >
                  Open Repository
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            <article className="rounded-3xl border border-white/10 bg-card/70 p-7 backdrop-blur">
              <h3 className="font-display text-2xl font-bold">Latest release</h3>
              <p className="mt-3 leading-7 text-muted-foreground">
                Download the current version and review release notes from the official GitHub
                release page.
              </p>
            </article>
            <article className="rounded-3xl border border-white/10 bg-card/70 p-7 backdrop-blur">
              <div className="space-y-4">
                {[
                  "Read the installation guide.",
                  "Verify hardware compatibility.",
                  "Check release notes for known issues.",
                  "Follow documented setup steps after installation.",
                ].map((item, index) => (
                  <div key={item} className="flex items-start gap-4">
                    <span className="mt-1 font-display text-xs uppercase tracking-[0.24em] text-[var(--accent-red)]">
                      0{index + 1}
                    </span>
                    <p className="leading-7 text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </article>
            <article className="rounded-3xl border border-white/10 bg-card/70 p-7 backdrop-blur">
              <p className="leading-7 text-muted-foreground">
                Include checksums, signatures, version number, release date, and changelog links
                when available.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="docs" className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <p className="font-display text-xs uppercase tracking-[0.24em] text-[var(--accent-red)]">
              Docs
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Documentation
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
              Install, configure, update, and troubleshoot Zarch Linux.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-white backdrop-blur transition hover:border-[var(--accent-red)] hover:text-[var(--accent-red)]"
          >
            Read the Docs
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {docsCards.map(([title, text]) => (
            <article
              key={title}
              className="rounded-3xl border border-white/10 bg-card/70 p-7 backdrop-blur"
            >
              <h3 className="font-display text-2xl font-bold tracking-tight">{title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function CTA() {
  const aboutCards = [
    [
      "Project goal",
      "Reduce setup friction for users who want an Arch-based environment tuned toward speed, security workflows, gaming, and customization.",
    ],
    [
      "Delivery infrastructure",
      "Web, package distribution, and release access served via HTTPS and standard edge protection.",
    ],
    [
      "Open project workflow",
      "Repository is the main public source for releases, issue tracking, updates, and project visibility.",
    ],
  ];
  const faq = [
    [
      "What is Zarch Linux based on?",
      "Arch Linux - rolling-release foundation with a curated system experience.",
    ],
    [
      "Where can I download it?",
      "Through the project's GitHub repository and release page.",
    ],
    [
      "Who is it for?",
      "Users who want performance, technical workflows, gaming readiness, and customization.",
    ],
    [
      "Does it use a custom package source?",
      "Yes - a dedicated repository for Zarch-specific packages and updates.",
    ],
  ];
  return (
    <>
      <section id="about" className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-3xl border border-white/10 bg-card/70 p-8 backdrop-blur lg:p-10">
          <p className="font-display text-xs uppercase tracking-[0.24em] text-[var(--accent-red)]">
            About
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            About Zarch Linux
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            Built on Arch Linux - focused on performance, technical workflows, and a refined
            end-user experience.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 xl:grid-cols-3">
            {aboutCards.map(([title, text]) => (
              <article key={title} className="rounded-2xl border border-white/10 bg-black/50 p-6">
                <h3 className="font-display text-2xl font-bold tracking-tight">{title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {faq.map(([question, answer]) => (
            <details
              key={question}
              className="rounded-3xl border border-white/10 bg-card/70 p-7 backdrop-blur"
            >
              <summary className="cursor-pointer list-none font-display text-xl font-bold tracking-tight">
                {question}
              </summary>
              <p className="mt-4 leading-7 text-muted-foreground">{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-[1.3fr_0.7fr_0.7fr]">
        <div>
          <div className="flex items-center gap-3 font-display text-base font-bold uppercase tracking-[0.28em]">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-[var(--accent-red)]">
              <span className="block h-2 w-2 rounded-full bg-white" />
            </span>
            Zarch Linux
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
            Arch-based Linux focused on performance, security workflows, gaming support, and system
            control.
          </p>
        </div>
        <div>
          <ul className="mt-5 space-y-3 text-sm">
            {["Home", "Features", "Download", "Docs", "About"].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="hover:text-[var(--accent-red)]">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul className="mt-5 space-y-3 text-sm">
            {["GitHub", "Releases", "Issues", "License"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-[var(--accent-red)]">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="overflow-hidden border-t border-white/10">
        <div className="flex items-center justify-center py-4">
          <FuzzyText
            fontSize="clamp(4rem, 15vw, 14rem)"
            fontWeight={900}
            fontFamily="'IBM Plex Mono', monospace"
            enableHover={true}
            baseIntensity={0.12}
            hoverIntensity={0.6}
            fuzzRange={20}
            clickEffect={true}
            transitionDuration={300}
            direction="horizontal"
            glitchMode={true}
            glitchInterval={3000}
            glitchDuration={180}
            gradient={['#ef233c', '#ff6b6b', '#ef233c', '#d90429']}
            letterSpacing={8}
            className="max-w-full"
          >
            ZARCH
          </FuzzyText>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-muted-foreground sm:flex-row">
        <p>&copy; 2026 Zarch Linux - Built for users who want control.</p>
        <div className="flex gap-6">
          {["GitHub", "Releases", "Issues", "License"].map((item) => (
            <a key={item} href="#" className="hover:text-foreground">
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function SpotlightReveal({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const offset = rect.top;
      
      let progress = 0;
      // yPos starts at center of viewport + 100vh offset caused by marginTop:-100vh
      let yPos = windowHeight * 1.5;

      // Reveal starts as soon as the top hits the viewport
      if (offset <= 0) {
        progress = Math.abs(offset) / windowHeight; 
        // Track the center of the viewport down the container
        yPos = Math.abs(offset) + windowHeight * 1.5;
      }
      
      progress = Math.max(0, Math.min(progress, 1));
      
      // Calculate size: 0vw to 150vw to fully cover the screen
      const size = progress * 150; 
      
      containerRef.current.style.setProperty('--spotlight-size', `${size}vw`);
      containerRef.current.style.setProperty('--spotlight-y', `${yPos}px`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll(); // init
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-black">
      {/* 100vh scrolling buffer to animate the reveal */}
      <div style={{ height: '100vh' }} />
      <div 
        className="w-full relative"
        style={{
          marginTop: '-100vh',
          paddingTop: '100vh', // push content down so it aligns correctly with the scroll progress
          clipPath: 'circle(var(--spotlight-size, 0vw) at 50% var(--spotlight-y, 50vh))',
          WebkitClipPath: 'circle(var(--spotlight-size, 0vw) at 50% var(--spotlight-y, 50vh))',
        }}
      >
        {/* Colorful UI layout hidden beneath */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0508] via-[#0f0014] to-black z-0 pointer-events-none" />
        
        {/* Colorful grid layout pattern */}
        <div 
           className="absolute inset-0 z-0 pointer-events-none opacity-20" 
           style={{
             backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }} 
        />
        
        <div className="relative z-10 w-full">
          {children}
        </div>
      </div>
    </section>
  );
}
