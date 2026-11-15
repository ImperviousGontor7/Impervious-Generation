import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiBookOpen, FiChevronRight, FiCompass } from "react-icons/fi";

import hero from "../../../assets/images/Jami Emas.webp";

const historyData = [
  {
    id: "tegalsari",
    number: "01",
    title: "Sejarah Pondok Tegalsari",
    summary:
      "Pada awal abad ke-18, hiduplah seorang kiai besar keturunan bangsawan dari kerajaan Majapahit. Dari garis nasab inilah kemudian lahir sosok yang kelak menjadi cikal bakal berdirinya Pondok Modern Darussalam Gontor.",
    image: hero,
    href: "/legacy/tegalsari",
  },
  {
    id: "gontor-lama",
    number: "02",
    title: "Sejarah Pondok Gontor Lama",
    summary:
      "Pada pertengahan abad ke-19, Pondok Tegalsari mulai mengalami kepadatan santri serta tantangan dalam regenerasi kepemimpinan. Dari kondisi ini lahirlah ikhtiar untuk merintis pesantren baru di wilayah Gontor.",
    image: hero,
    href: "/legacy/gontor-lama",
  },
  {
    id: "gontor-baru",
    number: "03",
    title: "Sejarah Pondok Gontor Baru",
    summary:
      "Berdirinya Pondok Gontor yang baru tidak lepas dari tekad Ibu Nyai Santoso yang mengirimkan putera-puteranya ke berbagai lembaga pendidikan agar kelak dapat membangkitkan kembali warisan pendidikan Islam.",
    image: hero,
    href: "/legacy/gontor-baru",
  },
  {
    id: "pmdg",
    number: "04",
    title: "Sejarah Pondok Modern Darussalam Gontor",
    summary:
      "Gagasan membangun Gontor Baru beserta konsep pendidikannya diilhami oleh Kongres Ummat Islam Indonesia di Surabaya pada tahun 1926 yang melahirkan semangat pembaruan pendidikan Islam.",
    image: hero,
    href: "/legacy/pmdg",
  },
  {
    id: "gontor-7",
    number: "05",
    title: "Sejarah Pondok Gontor 7",
    summary:
      "Gontor 7 merupakan bagian dari perkembangan jaringan pendidikan Pondok Modern Darussalam Gontor yang dibangun untuk memperluas akses pendidikan Islam berkualitas di berbagai daerah Indonesia.",
    image: hero,
    href: "/legacy/gontor-7",
  },
];

function History() {
  const [activeId, setActiveId] = useState(historyData[0].id);
  const [isDesktop, setIsDesktop] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    const updateSize = () => setIsDesktop(window.innerWidth >= 1024);
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const root = isDesktop ? mainRef.current : null;
    const sections = document.querySelectorAll("[data-history-section]");

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (!visible.length) return;

        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const current = visible[0].target.getAttribute("data-history-section");

        if (current) {
          setActiveId(current);
        }
      },
      {
        root,
        threshold: [0.2, 0.35, 0.5, 0.65, 0.8],
        rootMargin: "-15% 0px -55% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isDesktop]);

  const handleJump = (id) => {
    const section = document.querySelector(`[data-history-section="${id}"]`);
    if (!section) return;

    section.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  };

  return (
    <div className="min-h-screen bg-[#080b12] text-white selection:bg-violet-500/30 selection:text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/5">
        <img
          src={hero}
          alt="History of Gontor"
          className="h-60 w-full object-cover opacity-75 sm:h-75 md:h-90 lg:h-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,11,18,0.96),rgba(8,11,18,0.35)_38%,rgba(8,11,18,0.12)),radial-gradient(circle_at_center,rgba(124,58,237,0.18),transparent_45%)]" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-500 mx-auto px-5 sm:px-8 relative z-10 text-center">
            <p className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-black/25 px-4 py-2 text-[10px] tracking-[0.35em] text-violet-200/80 backdrop-blur-md sm:text-xs">
              <FiCompass className="text-violet-300" />
              SEJARAH GONTOR
            </p>
            <h1 className="text-[clamp(2rem,4vw,4.75rem)] font-semibold tracking-[0.18em] text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
              HISTORY OF GONTOR
            </h1>
            <div className="mx-auto mt-5 flex items-center justify-center gap-3 text-violet-300/80">
              <span className="h-px w-14 bg-linear-to-r from-transparent via-violet-400/80 to-transparent sm:w-16" />
              <span className="h-2 w-2 rotate-45 rounded-xs border border-violet-300/80" />
              <span className="h-px w-14 bg-linear-to-r from-transparent via-violet-400/80 to-transparent sm:w-16" />
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-sm italic leading-relaxed text-slate-200/85 sm:text-base md:text-lg">
              “Sejarah Berdirinya Pondok Sejak Pondok Tegalsari Hingga Pondok Modern Darussalam.”
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="w-full max-w-500 mx-auto px-5 relative z-10 py-6 sm:px-8 sm:py-8 lg:py-10">
        <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-0">
          {/* ASIDE */}
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-3xl border border-white/8 bg-white/3 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-5 lg:min-h-[calc(100vh-3rem)] lg:rounded-r-none">
              <div className="mb-6 text-center lg:text-left">
                <p className="inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-500/5 px-3 py-1 text-[11px] tracking-[0.35em] text-violet-200/90">
                  <FiBookOpen />
                  SEJARAH
                </p>
                <div className="mx-auto mt-4 h-px w-16 bg-linear-to-r from-transparent via-violet-400/70 to-transparent lg:mx-0" />
              </div>

              <nav className="space-y-3">
                {historyData.map((item) => {
                  const active = activeId === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleJump(item.id)}
                      className={[
                        "group flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-200",
                        active
                          ? "border-violet-400/40 bg-violet-500/15 text-white shadow-[0_0_0_1px_rgba(167,139,250,0.12)]"
                          : "border-white/8 bg-white/2 text-slate-200/80 hover:border-violet-400/25 hover:bg-white/5r:text-white",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "grid h-10 w-10 shrink-0 place-items-center rounded-xl border text-sm transition-all duration-200",
                          active
                            ? "border-violet-300/40 bg-violet-400/10 text-violet-100"
                            : "border-white/10 bg-black/20 text-slate-300 group-hover:border-violet-400/30 group-hover:text-white",
                        ].join(" ")}
                      >
                        <FiChevronRight className={active ? "translate-x-0.5" : ""} />
                      </span>

                      <span className="flex-1">
                        <span className="block text-[11px] uppercase tracking-[0.32em] text-violet-200/70">
                          {item.number}
                        </span>
                        <span className="mt-1 block text-sm leading-snug sm:text-[15px]">
                          {item.title}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-6 rounded-2xl border border-white/8 bg-black/15 p-5 text-center text-sm text-slate-300/85 lg:mt-auto">
                <p className="mx-auto max-w-55 italic leading-relaxed">
                  “Generasi penerus bertugas memelihara, mengembangkan, dan memajukan cita-cita para pendiri pondok.”
                </p>
                <div className="mx-auto mt-4 h-px w-16 bg-linear-to-r from-transparent via-violet-400/70 to-transparent" />
                <div className="mt-4 flex items-center justify-center gap-2 text-violet-300/90">
                  <span className="h-2 w-2 rounded-full bg-violet-400" />
                  <span className="h-2 w-2 rounded-full bg-violet-300/80" />
                  <span className="h-2 w-2 rounded-full bg-violet-200/70" />
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN */}
          <main
            ref={mainRef}
            className="min-h-[calc(100vh-1.5rem)] lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto lg:rounded-l-none"
          >
            <div className="rounded-3xl border border-white/8 bg-white/3 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-5 lg:rounded-l-none lg:p-6">
              <div className="mb-6 hidden items-center justify-between border-b border-white/6 pb-4 lg:flex">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-violet-200/80">Timeline Archive</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-wide text-white">History of Gontor</h2>
                </div>
              </div>

              <div className="space-y-5 sm:space-y-6">
                {historyData.map((item, index) => (
                  <section
                    key={item.id}
                    data-history-section={item.id}
                    className="scroll-mt-6 rounded-3xl border border-white/6 bg-black/10 p-4 transition-all duration-200 hover:border-violet-400/15 hover:bg-black/15 sm:p-5"
                  >
                    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_240px] xl:gap-6">
                      <div className="min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <p className="mb-2 text-[11px] uppercase tracking-[0.32em] text-violet-200/70">
                              {item.number} Chapter
                            </p>
                            <h3 className="text-[clamp(1.35rem,1.7vw,2rem)] font-semibold leading-tight text-white">
                              {item.title}
                            </h3>
                          </div>

                          <span className="hidden rounded-full border border-white/8 bg-white/3 px-3 py-1 text-[11px] tracking-[0.28em] text-slate-300/70 xl:inline-flex">
                            0{index + 1}
                          </span>
                        </div>

                        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200/80 sm:text-[15px]">
                          {item.summary}
                        </p>

                        <div className="mt-5 flex flex-wrap items-center gap-3">
                          <Link
                            to={item.href}
                            className="group inline-flex items-center gap-2 rounded-xl border border-violet-400/25 bg-violet-500/10 px-4 py-2.5 text-sm text-violet-100 transition-all duration-200 hover:border-violet-300/40 hover:bg-violet-500/18 hover:text-white"
                          >
                            Baca Selengkapnya
                            <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
                          </Link>

                        </div>
                      </div>

                      <div className="xl:pl-2">
                        <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/5">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="aspect-16/10 w-full object-cover transition duration-300 group-hover:scale-[1.03] group-hover:brightness-110"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent opacity-90" />
                          <div className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] tracking-[0.28em] text-white/80 backdrop-blur-md">
                            PHOTO
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                ))}
              </div>

              <footer className="mt-6 border-t border-white/6 pt-4 text-center text-sm text-slate-400/80">
                <p>
                  Sumber: <span className="text-violet-200/90">https://www.gontor.ac.id/#</span>
                </p>
              </footer>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default History;
