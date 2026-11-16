// src/pages/Agenda.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegClock, FaLocationDot } from "react-icons/fa6";

import hero from "../../../assets/images/Jami Emas.webp";
import { marqueeItems } from "../stories/marquee_items";

import { agendaSlides } from "../stories/agenda_main_slide";
import Countdown from "../stories/countdown";
import DualMonthCalendar from "../stories/dual_calendar_month";

function Agenda() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // =========================
  // Auto Slide
  // =========================
  useEffect(() => {
    if (agendaSlides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % agendaSlides.length);
    }, 7500);

    return () => clearInterval(interval);
  }, []);

  // =========================
  // Go To Slide
  // =========================
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // =========================
  // Next / Prev
  // =========================
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % agendaSlides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + agendaSlides.length) % agendaSlides.length,
    );
  };

  // =========================
  // Glow Effect
  // =========================
  const handleMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
    card.style.setProperty("--opacity", "1");
  };

  const handleLeave = (e) => {
    e.currentTarget.style.setProperty("--opacity", "0");
  };

  if (!agendaSlides.length) return null;

  return (
    <div>
      <section className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out will-change-transform"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {agendaSlides.map((slide, index) => (
            <article
              key={index}
              className="
                relative
                min-w-full
                overflow-hidden
                aspect-video
                min-h-[clamp(22rem,65vh,40rem)]
                max-h-[clamp(40rem,75vh,70rem)]
              "
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-black/55" />
              <div className="absolute inset-0 bg-linear-to-r from-[#0b0a08] via-[#0b0a08]/50 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-t from-[#170e07] via-transparent to-transparent" />

              <div className="relative z-10 flex h-full items-center">
                <div className="mx-auto flex h-full w-full max-w-[1800px] items-center px-[clamp(1.25rem,5vw,6rem)] py-[clamp(2rem,6vw,6rem)]">
                  <div className="max-w-[clamp(22rem,42vw,48rem)] text-white">
                    {/* Subtitle */}
                    <div className="mb-[clamp(1.5rem,4vw,4rem)]">
                      <div className="flex flex-col items-start">
                        <h2 className="text-[clamp(.9rem,1vw,1.35rem)] font-semibold uppercase tracking-[0.25em] bg-linear-to-b from-[#ffd37a] via-[#d98a1f] to-[#8a4f00] bg-clip-text text-transparent">
                          {slide.subtitle}
                        </h2>

                        <div className="mt-3 flex items-center gap-3">
                          <span className="h-px w-[clamp(3rem,5vw,5rem)] bg-linear-to-r from-transparent to-[#c97a18]" />

                          <span className="relative flex size-4 items-center justify-center">
                            <span className="absolute size-3 rotate-45 border border-[#c97a18]" />
                            <span className="absolute size-1.5 rounded-full bg-[#c97a18]" />
                          </span>

                          <span className="h-px w-[clamp(3rem,5vw,5rem)] bg-linear-to-l from-transparent to-[#c97a18]" />
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h1 className="max-w-[18ch] text-[clamp(2.25rem,5vw,5.5rem)] font-black leading-[0.9]">
                      {slide.title}
                    </h1>

                    {/* Description */}
                    <p className="mt-[clamp(1rem,2vw,1.5rem)] max-w-160 text-[clamp(.95rem,1.15vw,1.2rem)] leading-relaxed text-white/80">
                      {slide.description}
                    </p>

                    {/* Info */}
                    <div className="mt-[clamp(1.5rem,3vw,3rem)] space-y-[clamp(.75rem,1vw,1rem)] text-[clamp(.9rem,1vw,1rem)]">
                      <div className="flex flex-wrap items-center gap-x-[clamp(1rem,3vw,4rem)] gap-y-2">
                        <span className="w-24 shrink-0 font-semibold text-[#d9a14f]">
                          STATUS
                        </span>

                        <span className="rounded-md bg-[#6d4bbd] px-3 py-1 text-xs font-bold uppercase tracking-wide">
                          {slide.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-[clamp(1rem,3vw,4rem)] gap-y-2">
                        <span className="w-24 shrink-0 font-semibold text-[#d9a14f]">
                          DATE
                        </span>

                        <span>{slide.date}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-[clamp(1rem,3vw,4rem)] gap-y-2">
                        <span className="w-24 shrink-0 font-semibold text-[#d9a14f]">
                          TIME
                        </span>

                        <span>{slide.time}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-[clamp(1rem,3vw,4rem)] gap-y-2">
                        <span className="w-24 shrink-0 font-semibold text-[#d9a14f]">
                          LOCATION
                        </span>

                        <span>{slide.location}</span>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-[clamp(2rem,3vw,3.5rem)] flex flex-wrap gap-[clamp(.75rem,1vw,1rem)]">
                      <Link
                        to={slide.buttonPrimary.href}
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-xl
                          bg-linear-to-r
                          from-[#b67a2a]
                          to-[#dfaa55]
                          px-[clamp(1.2rem,2vw,2rem)]
                          py-[clamp(.75rem,1vw,1rem)]
                          text-[clamp(.9rem,1vw,1rem)]
                          font-semibold
                          text-white
                          transition-all
                          duration-300
                          hover:scale-105
                          hover:brightness-110
                        "
                      >
                        {slide.buttonPrimary.text}
                        <span>›</span>
                      </Link>

                      <button
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-xl
                          border
                          border-[#b67a2a]
                          px-[clamp(1.2rem,2vw,2rem)]
                          py-[clamp(.75rem,1vw,1rem)]
                          text-[clamp(.9rem,1vw,1rem)]
                          font-semibold
                          text-[#d9a14f]
                          transition-all
                          duration-300
                          hover:bg-[#b67a2a]
                          hover:text-white
                        "
                      >
                        🔔 Enable Reminder
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="
    absolute left-3 top-1/2 z-20 -translate-y-1/2
    rounded-full bg-black/40 px-3 py-3 text-white
    backdrop-blur-md transition
    hover:bg-black/60
    focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80
    sm:left-4 sm:px-4
  "
        >
          <span className="block text-lg leading-none sm:text-xl">←</span>
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="
            absolute right-3 top-1/2 z-20 -translate-y-1/2
            rounded-full bg-black/40 px-3 py-3 text-white
            backdrop-blur-md transition
            hover:bg-black/60
            focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80
            sm:right-4 sm:px-4
          "
        >
          <span className="block text-lg leading-none sm:text-xl">→</span>
        </button>

        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-5">
          {agendaSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "w-8 bg-white"
                  : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </section>

      <div className="w-full max-w-500 mx-auto px-5 sm:px-8 relative z-10">
        <div>
          <Countdown />
        </div>

        <div className="mx-auto my-[clamp(3rem,6vw,8rem)]">
          <div className="mx-auto my-25">
            <h3 className="mb-[clamp(1.5rem,2vw,2.75rem)] text-[clamp(1.25rem,1.8vw,2.5rem)]">
              First Mid Journal
            </h3>

            <div className="scrollbar-hidden overflow-x-auto pt-[clamp(.5rem,1vw,1.5rem)]">
              <div className="flex snap-x snap-mandatory gap-[clamp(1rem,1.5vw,2rem)] pb-[clamp(1rem,2vw,2rem)]">
                {agendaSlides.map((item) => (
                  <Link
                    key={item.id}
                    to={item.link}
                    onMouseMove={handleMove}
                    onMouseLeave={handleLeave}
                    className="
                      glow-card
                      group
                      flex
                      h-[clamp(30rem,38vw,42rem)]
                      w-[clamp(18rem,22vw,30rem)]
                      shrink-0
                      snap-start
                      flex-col
                      overflow-hidden
                      rounded-[clamp(1rem,1.5vw,2rem)]
                      border
                      border-white/10
                      bg-choco
                      transition-all
                      duration-300
                      hover:-translate-y-2
                      hover:border-[#D9A14F]
                    "
                  >
                    {/* IMAGE */}
                    <div className="relative aspect-2/1 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

                      {/* DATE */}
                      <div
                        className="
                          absolute
                          bottom-[clamp(.75rem,1vw,1.25rem)]
                          left-[clamp(.75rem,1vw,1.25rem)]
                          rounded-lg
                          bg-[#D67D29]
                          px-[clamp(.75rem,.8vw,1rem)]
                          py-[clamp(.45rem,.5vw,.75rem)]
                          text-center
                        "
                      >
                        <p className="text-[clamp(1rem,1.2vw,1.5rem)] font-bold leading-none text-white">
                          {item.day}
                        </p>

                        <p className="text-[clamp(.55rem,.6vw,.8rem)] font-semibold tracking-[0.2em] text-white">
                          {item.month}
                        </p>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div
                      className="
                        relative
                        z-10
                        flex
                        flex-1
                        flex-col
                        p-[clamp(1rem,1.5vw,2rem)]
                      "
                    >
                      {/* TITLE */}
                      <h2
                        className="
                          h-[2.6em]
                          overflow-hidden
                          text-[clamp(1.2rem,1.5vw,1.8rem)]
                          font-bold
                          leading-[1.3]
                          text-white
                          line-clamp-2
                        "
                      >
                        {item.title}
                      </h2>

                      {/* INFO */}
                      <div className="mt-[clamp(1rem,1.4vw,1.5rem)] space-y-[clamp(.6rem,.8vw,1rem)]">
                        <div className="flex items-center gap-[clamp(.5rem,.8vw,.8rem)] text-[clamp(.65rem,.75vw,1.25rem)] text-white/70">
                          <FaRegClock className="text-[clamp(.8rem,.9vw,1.2rem)] text-[#D9A14F]" />
                          <span>{item.time}</span>
                        </div>

                        <div className="flex items-center gap-[clamp(.5rem,.8vw,.8rem)] text-[clamp(.65rem,.75vw,1.25rem)] text-white/70">
                          <FaLocationDot className="text-[clamp(.8rem,.9vw,1.2rem)] text-[#D9A14F]" />
                          <span>{item.location}</span>
                        </div>
                      </div>

                      {/* STATUS */}
                      <div className="mt-[clamp(1.25rem,1.8vw,2rem)]">
                        <div className="flex items-center gap-[clamp(.5rem,.7vw,.8rem)] flex-wrap">
                          <span className="text-[clamp(.65rem,.75vw,1.25rem)] font-semibold uppercase tracking-[0.25em] text-[#D9A14F]">
                            STATUS
                          </span>

                          <span
                            className="
                              rounded-full
                              bg-violet-500/15
                              px-[clamp(.6rem,.8vw,1rem)]
                              py-[clamp(.3rem,.4vw,.5rem)]
                              text-[clamp(.6rem,.7vw,.9rem)]
                              font-semibold
                              text-violet-300
                            "
                          >
                            {item.status}
                          </span>
                        </div>

                        <p className="mt-[clamp(.75rem,.8vw,1rem)] text-[clamp(.65rem,.75vw,1.25rem)] text-white/75">
                          Starts in{" "}
                          <span className="font-bold text-white">
                            {item.countdown}
                          </span>
                        </p>
                      </div>

                      {/* BUTTON */}
                      <div className="mt-auto pt-[clamp(1.5rem,2vw,2.5rem)]">
                        <div
                          className="
                            inline-flex
                            w-full
                            items-center
                            justify-center
                            gap-[clamp(.4rem,.6vw,.7rem)]
                            rounded-[clamp(.75rem,.8vw,1rem)]
                            bg-linear-to-r
                            from-[#B67A2A]
                            to-[#DFAA55]
                            py-[clamp(.75rem,.9vw,1rem)]
                            text-[clamp(.65rem,.75vw,1.25rem)]
                            font-semibold
                            text-white
                            transition
                            duration-300
                            group-hover:brightness-110
                          "
                        >
                          Read More
                          <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto my-25">
            <h3 className="mb-[clamp(1.5rem,2vw,2.75rem)] text-[clamp(1.25rem,1.8vw,2.5rem)]">
              Second Mid Journal
            </h3>

            <div className="scrollbar-hidden overflow-x-auto pt-[clamp(.5rem,1vw,1.5rem)]">
              <div className="flex snap-x snap-mandatory gap-[clamp(1rem,1.5vw,2rem)] pb-[clamp(1rem,2vw,2rem)]">
                {agendaSlides.map((item) => (
                  <Link
                    key={item.id}
                    to={item.link}
                    onMouseMove={handleMove}
                    onMouseLeave={handleLeave}
                    className="
                      glow-card
                      group
                      flex
                      h-[clamp(30rem,38vw,42rem)]
                      w-[clamp(18rem,22vw,30rem)]
                      shrink-0
                      snap-start
                      flex-col
                      overflow-hidden
                      rounded-[clamp(1rem,1.5vw,2rem)]
                      border
                      border-white/10
                      bg-choco
                      transition-all
                      duration-300
                      hover:-translate-y-2
                      hover:border-[#D9A14F]
                    "
                  >
                    {/* IMAGE */}
                    <div className="relative aspect-2/1 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

                      {/* DATE */}
                      <div
                        className="
                          absolute
                          bottom-[clamp(.75rem,1vw,1.25rem)]
                          left-[clamp(.75rem,1vw,1.25rem)]
                          rounded-lg
                          bg-[#D67D29]
                          px-[clamp(.75rem,.8vw,1rem)]
                          py-[clamp(.45rem,.5vw,.75rem)]
                          text-center
                        "
                      >
                        <p className="text-[clamp(1rem,1.2vw,1.5rem)] font-bold leading-none text-white">
                          {item.day}
                        </p>

                        <p className="text-[clamp(.55rem,.6vw,.8rem)] font-semibold tracking-[0.2em] text-white">
                          {item.month}
                        </p>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div
                      className="
                        relative
                        z-10
                        flex
                        flex-1
                        flex-col
                        p-[clamp(1rem,1.5vw,2rem)]
                      "
                    >
                      {/* TITLE */}
                      <h2
                        className="
                          h-[2.6em]
                          overflow-hidden
                          text-[clamp(1.2rem,1.5vw,1.8rem)]
                          font-bold
                          leading-[1.3]
                          text-white
                          line-clamp-2
                        "
                      >
                        {item.title}
                      </h2>

                      {/* INFO */}
                      <div className="mt-[clamp(1rem,1.4vw,1.5rem)] space-y-[clamp(.6rem,.8vw,1rem)]">
                        <div className="flex items-center gap-[clamp(.5rem,.8vw,.8rem)] text-[clamp(.65rem,.75vw,1.25rem)] text-white/70">
                          <FaRegClock className="text-[clamp(.8rem,.9vw,1.2rem)] text-[#D9A14F]" />
                          <span>{item.time}</span>
                        </div>

                        <div className="flex items-center gap-[clamp(.5rem,.8vw,.8rem)] text-[clamp(.65rem,.75vw,1.25rem)] text-white/70">
                          <FaLocationDot className="text-[clamp(.8rem,.9vw,1.2rem)] text-[#D9A14F]" />
                          <span>{item.location}</span>
                        </div>
                      </div>

                      {/* STATUS */}
                      <div className="mt-[clamp(1.25rem,1.8vw,2rem)]">
                        <div className="flex items-center gap-[clamp(.5rem,.7vw,.8rem)] flex-wrap">
                          <span className="text-[clamp(.65rem,.75vw,1.25rem)] font-semibold uppercase tracking-[0.25em] text-[#D9A14F]">
                            STATUS
                          </span>

                          <span
                            className="
                              rounded-full
                              bg-violet-500/15
                              px-[clamp(.6rem,.8vw,1rem)]
                              py-[clamp(.3rem,.4vw,.5rem)]
                              text-[clamp(.6rem,.7vw,.9rem)]
                              font-semibold
                              text-violet-300
                            "
                          >
                            {item.status}
                          </span>
                        </div>

                        <p className="mt-[clamp(.75rem,.8vw,1rem)] text-[clamp(.65rem,.75vw,1.25rem)] text-white/75">
                          Starts in{" "}
                          <span className="font-bold text-white">
                            {item.countdown}
                          </span>
                        </p>
                      </div>

                      {/* BUTTON */}
                      <div className="mt-auto pt-[clamp(1.5rem,2vw,2.5rem)]">
                        <div
                          className="
                            inline-flex
                            w-full
                            items-center
                            justify-center
                            gap-[clamp(.4rem,.6vw,.7rem)]
                            rounded-[clamp(.75rem,.8vw,1rem)]
                            bg-linear-to-r
                            from-[#B67A2A]
                            to-[#DFAA55]
                            py-[clamp(.75rem,.9vw,1rem)]
                            text-[clamp(.65rem,.75vw,1.25rem)]
                            font-semibold
                            text-white
                            transition
                            duration-300
                            group-hover:brightness-110
                          "
                        >
                          Read More
                          <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <section
            className="
              glow-card
          
              w-full
          
              rounded-4xl
          
              border
              border-white/10
          
              bg-choco
          
              overflow-hidden
          
              px-[clamp(1.5rem,4vw,3rem)]
              py-[clamp(2rem,5vw,4rem)]
          
              my-[clamp(4rem,8vw,7rem)]
            "
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
          >
            {/* Section Label */}

            <div className="mb-[clamp(2rem,4vw,3rem)]">
              <p
                className="
                  uppercase
          
                  tracking-[0.5em]
          
                  text-marigold
          
                  font-semibold
          
                  text-[clamp(0.8rem,1.5vw,1.5rem)]
                "
              >
                Gontor Knowledge
              </p>

              <div className="mt-3 h-px w-full bg-white/10" />
            </div>

            {/* Content */}

            <div
              className="
                grid
          
                grid-cols-1
                md:grid-cols-[1.1fr_1fr]
          
                gap-[clamp(2rem,5vw,5rem)]
          
                items-center
              "
            >
              {/* IMAGE */}

              <div
                className="
                  overflow-hidden
          
                  rounded-[1.75rem]
          
                  border
                  border-white/10
          
                  aspect-4/3
                "
              >
                <img
                  src={hero}
                  alt="Hero"

                  className="
                    h-full
                    w-full
          
                    object-cover
          
                    transition-all
                    duration-500
          
                    hover:scale-105
                  "
                />
              </div>

              {/* ARTICLE */}

              <div className="flex flex-col h-full">
                {/* Badge */}
                <span className="inline-flex w-fit items-center rounded-full bg-white/10 backdrop-blur-xl border border-white/10 px-4 py-2 text-[clamp(.75rem,.8vw,1rem)] font-semibold text-white">
                  FEATURED ARTICLE
                </span>

                {/* Title */}
                <h2
                  className="
                mt-6
                font-bold
                leading-tight
                text-[clamp(2rem,3vw,3.5rem)]
              "
                >
                  Apa Rahasia Jadi Sukses?
                </h2>

                {/* Description */}
                <div className="mt-6 space-y-5">
                  <p
                    className="
                  leading-relaxed
                  text-white/70
                  text-[clamp(1rem,1.15vw,1.15rem)]
                "
                  >
                    Kesuksesan bukan hanya berasal dari kecerdasan, tetapi juga
                    dari disiplin, istiqamah, dan kemauan untuk terus belajar.
                    Nilai-nilai inilah yang dibangun dalam kehidupan santri
                    melalui aktivitas sehari-hari, organisasi, serta
                    pembelajaran yang konsisten.
                  </p>

                  <p
                    className="
                  leading-relaxed
                  text-white/70
                  text-[clamp(1rem,1.15vw,1.15rem)]
                "
                  >
                    Gontor Knowledge menghadirkan berbagai cerita, pengalaman,
                    dan wawasan yang menginspirasi agar setiap pembaca dapat
                    mengambil pelajaran dari perjalanan para santri dan civitas
                    pondok.
                  </p>
                </div>

                {/* Button */}
                <div className="pt-[clamp(1.5rem,3vw,2.5rem)]">
                  <button
                    className="
                inline-flex
                w-fit
          
                items-center
                gap-3
          
                rounded-full
          
                text-[clamp(0.75rem,1vw,1rem)]
                border
                border-marigold
          px-[clamp(0.9rem,1.2vw,1.25rem)]
          py-[clamp(0.45rem,0.7vw,0.7rem)]
                font-semibold
          
                text-marigold
          
                transition-all
                duration-300
          
                hover:bg-marigold
                hover:text-black
              "
                  >
                    Read Article →
                  </button>
                </div>
              </div>
            </div>
          </section>

          <div className="mx-auto my-[clamp(3rem,6vw,8rem)]">
            <div className="mx-auto my-25">
              <h3 className="mb-[clamp(1.5rem,2vw,2.75rem)] text-[clamp(1.25rem,1.8vw,2.5rem)]">
                Panitia Ujian Kelas Akhir KMI
              </h3>

              <div className="scrollbar-hidden overflow-x-auto pt-[clamp(.5rem,1vw,1.5rem)]">
                <div className="flex snap-x snap-mandatory gap-[clamp(1rem,1.5vw,2rem)] pb-[clamp(1rem,2vw,2rem)]">
                  {agendaSlides.map((item) => (
                    <Link
                      key={item.id}
                      to={item.link}
                      onMouseMove={handleMove}
                      onMouseLeave={handleLeave}
                      className="
                      glow-card
                      group
                      flex
                      h-[clamp(30rem,38vw,42rem)]
                      w-[clamp(18rem,22vw,30rem)]
                      shrink-0
                      snap-start
                      flex-col
                      overflow-hidden
                      rounded-[clamp(1rem,1.5vw,2rem)]
                      border
                      border-white/10
                      bg-choco
                      transition-all
                      duration-300
                      hover:-translate-y-2
                      hover:border-[#D9A14F]
                    "
                    >
                      {/* IMAGE */}
                      <div className="relative aspect-2/1 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

                        {/* DATE */}
                        <div
                          className="
                          absolute
                          bottom-[clamp(.75rem,1vw,1.25rem)]
                          left-[clamp(.75rem,1vw,1.25rem)]
                          rounded-lg
                          bg-[#D67D29]
                          px-[clamp(.75rem,.8vw,1rem)]
                          py-[clamp(.45rem,.5vw,.75rem)]
                          text-center
                        "
                        >
                          <p className="text-[clamp(1rem,1.2vw,1.5rem)] font-bold leading-none text-white">
                            {item.day}
                          </p>

                          <p className="text-[clamp(.55rem,.6vw,.8rem)] font-semibold tracking-[0.2em] text-white">
                            {item.month}
                          </p>
                        </div>
                      </div>

                      {/* CONTENT */}
                      <div
                        className="
                        relative
                        z-10
                        flex
                        flex-1
                        flex-col
                        p-[clamp(1rem,1.5vw,2rem)]
                      "
                      >
                        {/* TITLE */}
                        <h2
                          className="
                          h-[2.6em]
                          overflow-hidden
                          text-[clamp(1.2rem,1.5vw,1.8rem)]
                          font-bold
                          leading-[1.3]
                          text-white
                          line-clamp-2
                        "
                        >
                          {item.title}
                        </h2>

                        {/* INFO */}
                        <div className="mt-[clamp(1rem,1.4vw,1.5rem)] space-y-[clamp(.6rem,.8vw,1rem)]">
                          <div className="flex items-center gap-[clamp(.5rem,.8vw,.8rem)] text-[clamp(.65rem,.75vw,1.25rem)] text-white/70">
                            <FaRegClock className="text-[clamp(.8rem,.9vw,1.2rem)] text-[#D9A14F]" />
                            <span>{item.time}</span>
                          </div>

                          <div className="flex items-center gap-[clamp(.5rem,.8vw,.8rem)] text-[clamp(.65rem,.75vw,1.25rem)] text-white/70">
                            <FaLocationDot className="text-[clamp(.8rem,.9vw,1.2rem)] text-[#D9A14F]" />
                            <span>{item.location}</span>
                          </div>
                        </div>

                        {/* STATUS */}
                        <div className="mt-[clamp(1.25rem,1.8vw,2rem)]">
                          <div className="flex items-center gap-[clamp(.5rem,.7vw,.8rem)] flex-wrap">
                            <span className="text-[clamp(.65rem,.75vw,1.25rem)] font-semibold uppercase tracking-[0.25em] text-[#D9A14F]">
                              STATUS
                            </span>

                            <span
                              className="
                              rounded-full
                              bg-violet-500/15
                              px-[clamp(.6rem,.8vw,1rem)]
                              py-[clamp(.3rem,.4vw,.5rem)]
                              text-[clamp(.6rem,.7vw,.9rem)]
                              font-semibold
                              text-violet-300
                            "
                            >
                              {item.status}
                            </span>
                          </div>

                          <p className="mt-[clamp(.75rem,.8vw,1rem)] text-[clamp(.65rem,.75vw,1.25rem)] text-white/75">
                            Starts in{" "}
                            <span className="font-bold text-white">
                              {item.countdown}
                            </span>
                          </p>
                        </div>

                        {/* BUTTON */}
                        <div className="mt-auto pt-[clamp(1.5rem,2vw,2.5rem)]">
                          <div
                            className="
                            inline-flex
                            w-full
                            items-center
                            justify-center
                            gap-[clamp(.4rem,.6vw,.7rem)]
                            rounded-[clamp(.75rem,.8vw,1rem)]
                            bg-linear-to-r
                            from-[#B67A2A]
                            to-[#DFAA55]
                            py-[clamp(.75rem,.9vw,1rem)]
                            text-[clamp(.65rem,.75vw,1.25rem)]
                            font-semibold
                            text-white
                            transition
                            duration-300
                            group-hover:brightness-110
                          "
                          >
                            Read More
                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                              →
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <DualMonthCalendar />
          </div>

          <div className="mx-auto my-[clamp(3rem,6vw,8rem)]">
            <div className="mx-auto my-25">
              <h3 className="mb-[clamp(1.5rem,2vw,2.75rem)] text-[clamp(1.25rem,1.8vw,2.5rem)]">
                Ar-Ruqiyy
              </h3>

              <div className="scrollbar-hidden overflow-x-auto pt-[clamp(.5rem,1vw,1.5rem)]">
                <div className="flex snap-x snap-mandatory gap-[clamp(1rem,1.5vw,2rem)] pb-[clamp(1rem,2vw,2rem)]">
                  {agendaSlides.map((item) => (
                    <Link
                      key={item.id}
                      to={item.link}
                      onMouseMove={handleMove}
                      onMouseLeave={handleLeave}
                      className="
                      glow-card
                      group
                      flex
                      h-[clamp(30rem,38vw,42rem)]
                      w-[clamp(18rem,22vw,30rem)]
                      shrink-0
                      snap-start
                      flex-col
                      overflow-hidden
                      rounded-[clamp(1rem,1.5vw,2rem)]
                      border
                      border-white/10
                      bg-choco
                      transition-all
                      duration-300
                      hover:-translate-y-2
                      hover:border-[#D9A14F]
                    "
                    >
                      {/* IMAGE */}
                      <div className="relative aspect-2/1 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

                        {/* DATE */}
                        <div
                          className="
                          absolute
                          bottom-[clamp(.75rem,1vw,1.25rem)]
                          left-[clamp(.75rem,1vw,1.25rem)]
                          rounded-lg
                          bg-[#D67D29]
                          px-[clamp(.75rem,.8vw,1rem)]
                          py-[clamp(.45rem,.5vw,.75rem)]
                          text-center
                        "
                        >
                          <p className="text-[clamp(1rem,1.2vw,1.5rem)] font-bold leading-none text-white">
                            {item.day}
                          </p>

                          <p className="text-[clamp(.55rem,.6vw,.8rem)] font-semibold tracking-[0.2em] text-white">
                            {item.month}
                          </p>
                        </div>
                      </div>

                      {/* CONTENT */}
                      <div
                        className="
                        relative
                        z-10
                        flex
                        flex-1
                        flex-col
                        p-[clamp(1rem,1.5vw,2rem)]
                      "
                      >
                        {/* TITLE */}
                        <h2
                          className="
                          h-[2.6em]
                          overflow-hidden
                          text-[clamp(1.2rem,1.5vw,1.8rem)]
                          font-bold
                          leading-[1.3]
                          text-white
                          line-clamp-2
                        "
                        >
                          {item.title}
                        </h2>

                        {/* INFO */}
                        <div className="mt-[clamp(1rem,1.4vw,1.5rem)] space-y-[clamp(.6rem,.8vw,1rem)]">
                          <div className="flex items-center gap-[clamp(.5rem,.8vw,.8rem)] text-[clamp(.65rem,.75vw,1.25rem)] text-white/70">
                            <FaRegClock className="text-[clamp(.8rem,.9vw,1.2rem)] text-[#D9A14F]" />
                            <span>{item.time}</span>
                          </div>

                          <div className="flex items-center gap-[clamp(.5rem,.8vw,.8rem)] text-[clamp(.65rem,.75vw,1.25rem)] text-white/70">
                            <FaLocationDot className="text-[clamp(.8rem,.9vw,1.2rem)] text-[#D9A14F]" />
                            <span>{item.location}</span>
                          </div>
                        </div>

                        {/* STATUS */}
                        <div className="mt-[clamp(1.25rem,1.8vw,2rem)]">
                          <div className="flex items-center gap-[clamp(.5rem,.7vw,.8rem)] flex-wrap">
                            <span className="text-[clamp(.65rem,.75vw,1.25rem)] font-semibold uppercase tracking-[0.25em] text-[#D9A14F]">
                              STATUS
                            </span>

                            <span
                              className="
                              rounded-full
                              bg-violet-500/15
                              px-[clamp(.6rem,.8vw,1rem)]
                              py-[clamp(.3rem,.4vw,.5rem)]
                              text-[clamp(.6rem,.7vw,.9rem)]
                              font-semibold
                              text-violet-300
                            "
                            >
                              {item.status}
                            </span>
                          </div>

                          <p className="mt-[clamp(.75rem,.8vw,1rem)] text-[clamp(.65rem,.75vw,1.25rem)] text-white/75">
                            Starts in{" "}
                            <span className="font-bold text-white">
                              {item.countdown}
                            </span>
                          </p>
                        </div>

                        {/* BUTTON */}
                        <div className="mt-auto pt-[clamp(1.5rem,2vw,2.5rem)]">
                          <div
                            className="
                            inline-flex
                            w-full
                            items-center
                            justify-center
                            gap-[clamp(.4rem,.6vw,.7rem)]
                            rounded-[clamp(.75rem,.8vw,1rem)]
                            bg-linear-to-r
                            from-[#B67A2A]
                            to-[#DFAA55]
                            py-[clamp(.75rem,.9vw,1rem)]
                            text-[clamp(.65rem,.75vw,1.25rem)]
                            font-semibold
                            text-white
                            transition
                            duration-300
                            group-hover:brightness-110
                          "
                          >
                            Read More
                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                              →
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto my-[clamp(3rem,6vw,8rem)]">
            <div className="mx-auto my-25">
              <h3 className="mb-[clamp(1.5rem,2vw,2.75rem)] text-[clamp(1.25rem,1.8vw,2.5rem)]">
                (Panitia Imtihan Akhir Tahun)
              </h3>

              <div className="scrollbar-hidden overflow-x-auto pt-[clamp(.5rem,1vw,1.5rem)]">
                <div className="flex snap-x snap-mandatory gap-[clamp(1rem,1.5vw,2rem)] pb-[clamp(1rem,2vw,2rem)]">
                  {agendaSlides.map((item) => (
                    <Link
                      key={item.id}
                      to={item.link}
                      onMouseMove={handleMove}
                      onMouseLeave={handleLeave}
                      className="
                      glow-card
                      group
                      flex
                      h-[clamp(30rem,38vw,42rem)]
                      w-[clamp(18rem,22vw,30rem)]
                      shrink-0
                      snap-start
                      flex-col
                      overflow-hidden
                      rounded-[clamp(1rem,1.5vw,2rem)]
                      border
                      border-white/10
                      bg-choco
                      transition-all
                      duration-300
                      hover:-translate-y-2
                      hover:border-[#D9A14F]
                    "
                    >
                      {/* IMAGE */}
                      <div className="relative aspect-2/1 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

                        {/* DATE */}
                        <div
                          className="
                          absolute
                          bottom-[clamp(.75rem,1vw,1.25rem)]
                          left-[clamp(.75rem,1vw,1.25rem)]
                          rounded-lg
                          bg-[#D67D29]
                          px-[clamp(.75rem,.8vw,1rem)]
                          py-[clamp(.45rem,.5vw,.75rem)]
                          text-center
                        "
                        >
                          <p className="text-[clamp(1rem,1.2vw,1.5rem)] font-bold leading-none text-white">
                            {item.day}
                          </p>

                          <p className="text-[clamp(.55rem,.6vw,.8rem)] font-semibold tracking-[0.2em] text-white">
                            {item.month}
                          </p>
                        </div>
                      </div>

                      {/* CONTENT */}
                      <div
                        className="
                        relative
                        z-10
                        flex
                        flex-1
                        flex-col
                        p-[clamp(1rem,1.5vw,2rem)]
                      "
                      >
                        {/* TITLE */}
                        <h2
                          className="
                          h-[2.6em]
                          overflow-hidden
                          text-[clamp(1.2rem,1.5vw,1.8rem)]
                          font-bold
                          leading-[1.3]
                          text-white
                          line-clamp-2
                        "
                        >
                          {item.title}
                        </h2>

                        {/* INFO */}
                        <div className="mt-[clamp(1rem,1.4vw,1.5rem)] space-y-[clamp(.6rem,.8vw,1rem)]">
                          <div className="flex items-center gap-[clamp(.5rem,.8vw,.8rem)] text-[clamp(.65rem,.75vw,1.25rem)] text-white/70">
                            <FaRegClock className="text-[clamp(.8rem,.9vw,1.2rem)] text-[#D9A14F]" />
                            <span>{item.time}</span>
                          </div>

                          <div className="flex items-center gap-[clamp(.5rem,.8vw,.8rem)] text-[clamp(.65rem,.75vw,1.25rem)] text-white/70">
                            <FaLocationDot className="text-[clamp(.8rem,.9vw,1.2rem)] text-[#D9A14F]" />
                            <span>{item.location}</span>
                          </div>
                        </div>

                        {/* STATUS */}
                        <div className="mt-[clamp(1.25rem,1.8vw,2rem)]">
                          <div className="flex items-center gap-[clamp(.5rem,.7vw,.8rem)] flex-wrap">
                            <span className="text-[clamp(.65rem,.75vw,1.25rem)] font-semibold uppercase tracking-[0.25em] text-[#D9A14F]">
                              STATUS
                            </span>

                            <span
                              className="
                              rounded-full
                              bg-violet-500/15
                              px-[clamp(.6rem,.8vw,1rem)]
                              py-[clamp(.3rem,.4vw,.5rem)]
                              text-[clamp(.6rem,.7vw,.9rem)]
                              font-semibold
                              text-violet-300
                            "
                            >
                              {item.status}
                            </span>
                          </div>

                          <p className="mt-[clamp(.75rem,.8vw,1rem)] text-[clamp(.65rem,.75vw,1.25rem)] text-white/75">
                            Starts in{" "}
                            <span className="font-bold text-white">
                              {item.countdown}
                            </span>
                          </p>
                        </div>

                        {/* BUTTON */}
                        <div className="mt-auto pt-[clamp(1.5rem,2vw,2.5rem)]">
                          <div
                            className="
                            inline-flex
                            w-full
                            items-center
                            justify-center
                            gap-[clamp(.4rem,.6vw,.7rem)]
                            rounded-[clamp(.75rem,.8vw,1rem)]
                            bg-linear-to-r
                            from-[#B67A2A]
                            to-[#DFAA55]
                            py-[clamp(.75rem,.9vw,1rem)]
                            text-[clamp(.65rem,.75vw,1.25rem)]
                            font-semibold
                            text-white
                            transition
                            duration-300
                            group-hover:brightness-110
                          "
                          >
                            Read More
                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                              →
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* =========================
    VISUAL ARCHIVE
========================= */}

          <div className="mx-auto my-[clamp(3rem,6vw,8rem)]">
            <div className="mb-[clamp(1.5rem,2vw,2.75rem)]">
              <p className="mb-3 text-[clamp(.7rem,.8vw,1rem)] font-semibold uppercase tracking-[0.4em] text-[#D9A14F]">
                VISUAL ARCHIVE
              </p>

              <h3 className="text-[clamp(1.5rem,2.5vw,3rem)] font-bold">
                Agenda Poster Gallery
              </h3>

              <p className="mt-3 text-sm text-white/50">
                A collection of moments, stories, and celebrations.
              </p>
            </div>
          </div>

          {/* =========================
    INFINITE POSTER MARQUEE
========================= */}

          <div
            className="
    group
    relative
    w-full
    overflow-hidden
  "
          >
            <style>
              {`
      @keyframes agenda-marquee {
        from {
          transform: translateX(0);
        }

        to {
          transform: translateX(-50%);
        }
      }
    `}
            </style>

            <div
              className="
      flex
      w-max
      animate-[agenda-marquee_30s_linear_infinite]
      will-change-transform
      group-hover:[animation-play-state:paused]
      motion-reduce:animate-none
    "
            >
              {[0, 1].map((groupIndex) => (
                <div
                  key={groupIndex}
                  aria-hidden={groupIndex === 1}
                  className="
          flex
          shrink-0
          items-center
          gap-[clamp(1rem,1.5vw,2rem)]
          pr-[clamp(1rem,1.5vw,2rem)]
        "
                >
                  {marqueeItems.map((item, index) => (
                    <div
                      key={`${groupIndex}-${item.id}-${index}`}
                      className="
              relative
              aspect-3/4
              w-[clamp(13rem,18vw,21rem)]
              shrink-0
              overflow-hidden
              rounded-[clamp(1rem,1.5vw,2rem)]
              border
              border-white/10
              bg-choco
              transition-all
              duration-500
              hover:-translate-y-2
              hover:border-[#D9A14F]
            "
                    >
                      {/* POSTER IMAGE */}
                      <img
                        src={item.image}
                        alt={groupIndex === 1 ? "" : item.title}
                        draggable="false"
                        className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-700
                hover:scale-105
              "
                      />

                      {/* DARK OVERLAY */}
                      <div
                        className="
                absolute
                inset-0
                bg-linear-to-t
                from-black/90
                via-black/10
                to-transparent
              "
                      />

                      {/* POSTER TITLE */}
                      <div
                        className="
                absolute
                inset-x-0
                bottom-0
                p-[clamp(1rem,1.5vw,2rem)]
              "
                      >
                        <h4
                          className="
                  text-[clamp(1rem,1.4vw,1.6rem)]
                  font-bold
                  leading-tight
                  text-white
                "
                        >
                          {item.title}
                        </h4>

                        <div className="mt-3 h-px w-12 bg-[#D9A14F]" />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {/* =========================
    INFINITE POSTER MARQUEE
========================= */}

          <div
            className="
    my-15
    group
    relative
    w-full
    overflow-hidden
  "
          >
            <style>
              {`
      @keyframes agenda-marquee {
        from {
          transform: translateX(0);
        }

        to {
          transform: translateX(-50%);
        }
      }
    `}
            </style>

            <div
              className="
      flex
      w-max
      animate-[agenda-marquee_30s_linear_infinite]
      will-change-transform
      group-hover:[animation-play-state:paused]
      motion-reduce:animate-none
    "
            >
              {[0, 1].map((groupIndex) => (
                <div
                  key={groupIndex}
                  aria-hidden={groupIndex === 1}
                  className="
          flex
          shrink-0
          items-center
          gap-[clamp(1rem,1.5vw,2rem)]
          pr-[clamp(1rem,1.5vw,2rem)]
        "
                >
                  {marqueeItems.map((item, index) => (
                    <div
                      key={`${groupIndex}-${item.id}-${index}`}
                      className="
              relative
              aspect-3/4
              w-[clamp(13rem,18vw,21rem)]
              shrink-0
              overflow-hidden
              rounded-[clamp(1rem,1.5vw,2rem)]
              border
              border-white/10
              bg-choco
              transition-all
              duration-500
              py-3
              hover:-translate-y-2
              hover:border-[#D9A14F]
            "
                    >
                      {/* POSTER IMAGE */}
                      <img
                        src={item.image}
                        alt={groupIndex === 1 ? "" : item.title}
                        draggable="false"
                        className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-700
                hover:scale-105
              "
                      />

                      {/* DARK OVERLAY */}
                      <div
                        className="
                absolute
                inset-0
                bg-linear-to-t
                from-black/90
                via-black/10
                to-transparent
              "
                      />

                      {/* POSTER TITLE */}
                      <div
                        className="
                absolute
                inset-x-0
                bottom-0
                p-[clamp(1rem,1.5vw,2rem)]
              "
                      >
                        <h4
                          className="
                  text-[clamp(1rem,1.4vw,1.6rem)]
                  font-bold
                  leading-tight
                  text-white
                "
                        >
                          {item.title}
                        </h4>

                        <div className="mt-3 h-px w-12 bg-[#D9A14F]" />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agenda;
