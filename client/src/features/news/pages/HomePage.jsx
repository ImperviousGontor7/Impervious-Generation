import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Trending from "../view_all/trending";

import hero from "../../../assets/images/Jami Emas.webp";

import { heroSlides } from "../data/home_main_slide";
import { thisMonth } from "../data/month_st";
import { monthAgo } from "../data/month_nd";
import { rootSlides } from "../data/home_root_slide";
import { behindTheEvent } from "../data/behind_the_events";
import { firstMid } from "../data/first_mid";
import { secondMid } from "../data/second_mid";
import { categoryHome } from "../data/category_home";
import { trendingHome } from "../data/trending_home";

// ==========================================
// INFINITE CAROUSEL HOOK
// ==========================================

function useInfiniteCarousel(slides, autoPlayMs = 0) {
  const totalSlides = slides.length;

  const [currentIndex, setCurrentIndex] = useState(totalSlides > 1 ? 1 : 0);

  const [transitionEnabled, setTransitionEnabled] = useState(true);

  // NEXT SLIDE
  const nextSlide = () => {
    if (totalSlides <= 1) return;

    setCurrentIndex((prev) => prev + 1);
  };

  // PREVIOUS SLIDE
  const prevSlide = () => {
    if (totalSlides <= 1) return;

    setCurrentIndex((prev) => prev - 1);
  };

  // DOT INDICATOR
  const goToSlide = (index) => {
    if (totalSlides <= 1) return;

    setCurrentIndex(index + 1);
  };

  // INFINITE LOOP
  const handleTransitionEnd = (e) => {
    if (e.target !== e.currentTarget || totalSlides <= 1) return;

    // Kembali ke slide pertama
    if (currentIndex >= totalSlides + 1) {
      setTransitionEnabled(false);
      setCurrentIndex(1);
    }

    // Kembali ke slide terakhir
    if (currentIndex <= 0) {
      setTransitionEnabled(false);
      setCurrentIndex(totalSlides);
    }
  };

  // RESET POSITION WITHOUT ANIMATION
  useEffect(() => {
    if (transitionEnabled) return;

    const frame = requestAnimationFrame(() => {
      setTransitionEnabled(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [transitionEnabled]);

  // AUTO PLAY
  useEffect(() => {
    if (autoPlayMs <= 0 || totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, autoPlayMs);

    return () => clearInterval(interval);
  }, [autoPlayMs, totalSlides]);

  // DUPLICATE FIRST AND LAST SLIDES
  const renderedSlides =
    totalSlides > 1 ? [slides[totalSlides - 1], ...slides, slides[0]] : slides;

  // ACTIVE DOT INDEX
  const activeIndex =
    totalSlides > 1 ? (currentIndex - 1 + totalSlides) % totalSlides : 0;

  return {
    currentIndex,
    activeIndex,
    renderedSlides,
    transitionEnabled,
    nextSlide,
    prevSlide,
    goToSlide,
    handleTransitionEnd,
  };
}

// ==========================================
// VIEW ALL SECTION HEADING
// ==========================================

function ViewAllHeading({ title, to }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <h3 className="text-[clamp(1.25rem,2vw,2.5rem)]">{title}</h3>
      <Link
        to={to}
        className="group inline-flex shrink-0 items-center gap-2 text-[clamp(.75rem,.9vw,1rem)] font-semibold text-white/55 transition-colors hover:text-marigold"
      >
        View All
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </Link>
    </div>
  );
}

// ==========================================
// HOME COMPONENT
// ==========================================

function Home() {
  // HERO SLIDER
  const heroCarousel = useInfiniteCarousel(heroSlides, 5000);

  // ROOT SLIDER
  const rootCarousel = useInfiniteCarousel(rootSlides, 5000);

  // GLOW EFFECT - MOUSE MOVE
  const handleMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
    card.style.setProperty("--opacity", "1");
  };

  // GLOW EFFECT - MOUSE LEAVE
  const handleLeave = (e) => {
    e.currentTarget.style.setProperty("--opacity", "0");
  };

  // CHECK HERO SLIDES
  if (!heroSlides.length) return null;

  // ==========================================
  // HOME JSX DILANJUTKAN DI BAWAH INI
  // ==========================================

  // Letakkan return JSX Home milikmu di sini.

  return (
    <div id="view-beranda" className="view-pane active">
      <section className="relative w-full overflow-hidden">
        <div
          onTransitionEnd={heroCarousel.handleTransitionEnd}
          className={`flex will-change-transform ${
            heroCarousel.transitionEnabled
              ? "transition-transform duration-700 ease-in-out"
              : ""
          }`}
          style={{
            transform: `translateX(-${heroCarousel.currentIndex * 100}%)`,
          }}
        >
          {heroCarousel.renderedSlides.map((slide, index) => (
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
              <div className="absolute inset-0 bg-linear-to-t from-bg-main via-transparent to-transparent" />

              <div className="relative z-10 flex h-full items-center justify-center px-[clamp(1rem,3vw,3rem)] pb-[clamp(1.5rem,5vw,5rem)] pt-[clamp(2rem,6vw,6rem)]">
                <div className="max-w-[clamp(20rem,80vw,75rem)] text-center text-white">
                  <p className="mb-[clamp(.5rem,1vw,1rem)] text-[clamp(.7rem,.9vw,.95rem)] font-medium uppercase tracking-[0.35em] text-white/70">
                    - {slide.subtitle} -
                  </p>

                  <h1 className="mx-auto max-w-[clamp(20rem,80vw,75rem)] text-[clamp(2.25rem,4vw,5rem)] font-bold leading-[1.05]">
                    {slide.title}
                  </h1>

                  <p className="mx-auto mt-[clamp(.9rem,1.5vw,1.4rem)] max-w-[clamp(18rem,56vw,42rem)] text-[clamp(.95rem,1.2vw,1.25rem)] leading-relaxed text-white/75">
                    {slide.description}
                  </p>

                  <div className="mt-[clamp(1.25rem,2vw,2rem)] flex flex-wrap justify-center gap-[clamp(.75rem,1.5vw,1rem)]">
                    <Link
                      to={slide.buttonPrimary.href}
                      className="
                        inline-flex items-center justify-center
                        rounded-full bg-white
                        px-[clamp(1.25rem,3vw,2.5rem)]
                        py-[clamp(.7rem,1vw,1rem)]
                        text-[clamp(.75rem,1vw,1rem)]
                        font-semibold text-black
                        transition duration-300
                        hover:scale-105 hover:bg-white/90
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80
                      "
                    >
                      {slide.buttonPrimary.text}
                    </Link>
                    <Link
                      to="/view-all/featured-stories"
                      className="inline-flex items-center justify-center rounded-full border border-white/35 px-[clamp(1.25rem,3vw,2.5rem)] py-[clamp(.7rem,1vw,1rem)] text-[clamp(.75rem,1vw,1rem)] font-semibold text-white transition duration-300 hover:border-white hover:bg-white/10"
                    >
                      View All Stories
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button
          onClick={heroCarousel.prevSlide}
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
          onClick={heroCarousel.nextSlide}
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
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => heroCarousel.goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                heroCarousel.activeIndex === index
                  ? "w-8 bg-white"
                  : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </section>
      <div className="w-full max-w-500 mx-auto px-5 sm:px-8 my-15 relative z-10">
        <div className="max-h-[clamp(50rem,45vw,75rem)] my-25 mx-auto">
          <ViewAllHeading title="First Mid Year" to="/view-all/first-mid-year" />

          <div className="scrollbar-hidden overflow-x-auto py-5">
            <div className="flex h-full gap-7.5 mx-0 w-full scroll-smooth snap-x snap-mandatory">
              {thisMonth.map((item) => (
                <Link
                  key={item.id}
                  to={item.link}
                  onMouseMove={handleMove}
                  onMouseLeave={handleLeave}
                  className="
  glow-card
  shrink-0
  snap-start

  w-[clamp(18rem,22vw,30rem)]
  aspect-4/5

  overflow-hidden
  rounded-3xl
  border
  border-white/10
  bg-choco

  transition-all
  duration-300

  hover:z-10
  hover:-translate-y-4
  hover:shadow-2xl
"
                >
                  {/* IMAGE */}
                  <div className="absolute inset-0 h-[70%] w-full">
                    <img
                      src={hero}
                      alt={item.title}
                      className="block h-full w-full object-cover selected-none"
                    />

                    <div
                      className="absolute inset-0 translate-y-px h-full 
                    w-full bg-linear-to-t from-choco to-choco/25"
                    />
                  </div>

                  {/* OVERLAY */}

                  <div
                    className="
                  absolute
                  inset-0

                  bg-linear-to-t
                  from-choco
                  via-choco/35
                  to-transparent
                "
                  />

                  {/* CONTENT */}
                  <div
                    className="
    absolute
    inset-x-0
    top-[40%]
    bottom-0
    z-10
    flex
    flex-col
    justify-between
    text-white

    px-5
    pt-4
    pb-5

    sm:px-6
    sm:pt-5

    lg:px-8

    min-[1440px]:top-60
    min-[1440px]:block
    min-[1440px]:px-10
    min-[1440px]:p-5
  "
                  >
                    {/* TAG & TITLE */}
                    <div>
                      {/* CATEGORY */}
                      <span
                        className="
        inline-flex
        items-center
        justify-center
        px-[clamp(1rem,1vw,1.5rem)]
        h-[clamp(1.5rem,2vw,2.5rem)]
        bg-honey/85
        rounded-3xl
        text-[clamp(0.6rem,0.75vw,1.25rem)]
        font-semibold
        tracking-wide
        text-white
        whitespace-nowrap
        mb-3
      "
                      >
                        {item.category}
                      </span>

                      {/* TITLE */}
                      <h2
                        className="
        text-white
        font-bold
        my-3 sm:my-4
        text-[clamp(1.25rem,1.5vw,2.5rem)]
        leading-tight
        line-clamp-2
      "
                      >
                        {item.title}
                      </h2>
                    </div>

                    {/* DATE & TIME */}
                    <p
                      className="
      text-[clamp(0.75rem,1.2vw,0.9rem)]
      lg:text-[clamp(0.85rem,0.7vw,1.5rem)]
      xl:text-[clamp(0.85rem,0.7vw,1.5rem)]
      text-white/60

      min-[1440px]:absolute
      min-[1440px]:bottom-7
    "
                    >
                      {item.date} • {item.time}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-500 mx-auto px-5 sm:px-8 my-15 relative z-10">
        <div className="max-h-[clamp(50rem,45vw,75rem)] my-25 mx-auto">
          <ViewAllHeading title="Second Mid Year" to="/view-all/second-mid-year" />

          <div className="scrollbar-hidden overflow-x-auto py-5">
            <div className="flex h-full gap-7.5 mx-0 w-full scroll-smooth snap-x snap-mandatory">
              {monthAgo.map((item) => (
                <Link
                  key={item.id}
                  to={item.link}
                  onMouseMove={handleMove}
                  onMouseLeave={handleLeave}
                  className="
  glow-card
  shrink-0
  snap-start

  w-[clamp(18rem,22vw,30rem)]
  aspect-4/5

  overflow-hidden
  rounded-3xl
  border
  border-white/10
  bg-choco

  transition-all
  duration-300

  hover:z-10
  hover:-translate-y-4
  hover:shadow-2xl
"
                >
                  {/* IMAGE */}
                  <div className="absolute inset-0 h-[70%] w-full">
                    <img
                      src={hero}
                      alt={item.title}
                      className="block h-full w-full object-cover selected-none"
                    />

                    <div
                      className="absolute inset-0 translate-y-px h-full 
                    w-full bg-linear-to-t from-choco to-choco/25"
                    />
                  </div>

                  {/* OVERLAY */}

                  <div
                    className="
                  absolute
                  inset-0

                  bg-linear-to-t
                  from-choco
                  via-choco/35
                  to-transparent
                "
                  />

                  {/* CONTENT */}
                  <div
                    className="
    absolute
    inset-x-0
    top-[40%]
    bottom-0
    z-10
    flex
    flex-col
    justify-between
    text-white

    px-5
    pt-4
    pb-5

    sm:px-6
    sm:pt-5

    lg:px-8

    min-[1440px]:top-60
    min-[1440px]:block
    min-[1440px]:px-10
    min-[1440px]:p-5
  "
                  >
                    {/* TAG & TITLE */}
                    <div>
                      {/* CATEGORY */}
                      <span
                        className="
        inline-flex
        items-center
        justify-center
        px-[clamp(1rem,1vw,1.5rem)]
        h-[clamp(1.5rem,2vw,2.5rem)]
        bg-honey/85
        rounded-3xl
        text-[clamp(0.6rem,0.75vw,1.25rem)]
        font-semibold
        tracking-wide
        text-white
        whitespace-nowrap
        mb-3
      "
                      >
                        {item.category}
                      </span>

                      {/* TITLE */}
                      <h2
                        className="
        text-white
        font-bold
        my-3 sm:my-4
        text-[clamp(1.25rem,1.5vw,2.5rem)]
        leading-tight
        line-clamp-2
      "
                      >
                        {item.title}
                      </h2>
                    </div>

                    {/* DATE & TIME */}
                    <p
                      className="
      text-[clamp(0.75rem,1.2vw,0.9rem)]
      lg:text-[clamp(0.85rem,0.7vw,1.5rem)]
      xl:text-[clamp(0.85rem,0.7vw,1.5rem)]
      text-white/60

      min-[1440px]:absolute
      min-[1440px]:bottom-7
    "
                    >
                      {item.date} • {item.time}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <section className="relative w-full overflow-hidden rounded-4xl border">
          <Link
            to="/view-all/root-slider"
            className="absolute right-4 top-4 z-30 rounded-full border border-white/25 bg-black/45 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition hover:border-marigold hover:text-marigold sm:right-6 sm:top-6 sm:text-sm"
          >
            View All Events →
          </Link>
          {/* ROOT SLIDER */}
          <div
            onTransitionEnd={rootCarousel.handleTransitionEnd}
            className={`flex ${
              rootCarousel.transitionEnabled
                ? "transition-transform duration-700 ease-in-out"
                : ""
            }`}
            style={{
              transform: `translateX(-${rootCarousel.currentIndex * 100}%)`,
            }}
          >
            {rootCarousel.renderedSlides.map((slide, index) => (
              <div
                key={index}
                className="relative min-w-full aspect-video overflow-hidden"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />

                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 bg-linear-to-r from-bg-main via-[#0d0500]/75 to-transparent" />

                <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center px-4">
                  <div className="max-w-[clamp(20rem,80vw,75rem)] text-center text-white">
                    <p className="mb-[clamp(.5rem,1vw,1rem)] text-[clamp(.5rem,.5vw,.75rem)] uppercase tracking-[0.35em] text-white/70">
                      - {slide.subtitle} -
                    </p>

                    <h1 className="mx-auto max-w-[clamp(20rem,80vw,75rem)] text-[clamp(0.75rem,4vw,4.25rem)] font-bold leading-[1.05]">
                      {slide.title}
                    </h1>

                    <p className="mx-auto mt-[clamp(.9rem,1.5vw,1.4rem)] max-w-[clamp(18rem,56vw,42rem)] text-[clamp(.75rem,1vw,1.25rem)] leading-relaxed text-white/75">
                      {slide.description}
                    </p>

                    <div className="mt-[clamp(1.25rem,2vw,2rem)] flex flex-wrap justify-center gap-[clamp(.75rem,1.5vw,1rem)]">
                      <Link
                        to={slide.buttonPrimary.href}
                        className="
                        inline-flex items-center justify-center
                        rounded-full bg-white
                        px-[clamp(1.2rem,3vw,2.5rem)]
                        py-[clamp(.7rem,1vw,1rem)]
                        text-[clamp(.5rem,1vw,1rem)]
                        font-semibold text-black
                        transition duration-300
                        hover:scale-105 hover:bg-white/90
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80
                      "
                      >
                        {slide.buttonPrimary.text}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PREVIOUS BUTTON */}
          <button
            onClick={rootCarousel.prevSlide}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 px-4 py-3 text-white backdrop-blur-md transition hover:bg-black/60"
            aria-label="Previous slide"
          >
            ←
          </button>

          {/* NEXT BUTTON */}
          <button
            onClick={rootCarousel.nextSlide}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 px-4 py-3 text-white backdrop-blur-md transition hover:bg-black/60"
            aria-label="Next slide"
          >
            →
          </button>

          {/* DOT INDICATOR */}
          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
            {rootSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => rootCarousel.goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  rootCarousel.activeIndex === index
                    ? "w-8 bg-white"
                    : "w-2.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </section>
        <div className="w-full max-w-500 mx-auto px-5 sm:px-8 my-15 relative z-10">
          <div className="max-h-[clamp(50rem,45vw,75rem)] my-25 mx-auto">
            <ViewAllHeading title="Multimedia Archive" to="/view-all/multimedia" />

            <div className="scrollbar-hidden overflow-x-auto py-5">
              <div className="flex h-full gap-7.5 mx-0 w-full scroll-smooth snap-x snap-mandatory">
                {behindTheEvent.map((item) => (
                  <Link
                    key={item.id}
                    to={item.link}
                    onMouseMove={handleMove}
                    onMouseLeave={handleLeave}
                    className="
  glow-card
  shrink-0
  snap-start

  w-[clamp(18rem,22vw,30rem)]
  aspect-4/5

  overflow-hidden
  rounded-3xl
  border
  border-white/10
  bg-choco

  transition-all
  duration-300

  hover:z-10
  hover:-translate-y-4
  hover:shadow-2xl
"
                  >
                    {/* IMAGE */}
                    <div className="absolute inset-0 h-[70%] w-full">
                      <img
                        src={hero}
                        alt={item.title}
                        className="block h-full w-full object-cover selected-none"
                      />

                      <div
                        className="absolute inset-0 translate-y-px h-full 
                    w-full bg-linear-to-t from-choco to-choco/25"
                      />
                    </div>

                    {/* OVERLAY */}

                    <div
                      className="
                  absolute
                  inset-0

                  bg-linear-to-t
                  from-choco
                  via-choco/35
                  to-transparent
                "
                    />

                    {/* CONTENT */}
                    <div
                      className="
    absolute
    inset-x-0
    top-[40%]
    bottom-0
    z-10
    flex
    flex-col
    justify-between
    text-white

    px-5
    pt-4
    pb-5

    sm:px-6
    sm:pt-5

    lg:px-8

    min-[1440px]:top-60
    min-[1440px]:block
    min-[1440px]:px-10
    min-[1440px]:p-5
  "
                    >
                      {/* TAG & TITLE */}
                      <div>
                        {/* CATEGORY */}
                        <span
                          className="
        inline-flex
        items-center
        justify-center
        px-[clamp(1rem,1vw,1.5rem)]
        h-[clamp(1.5rem,2vw,2.5rem)]
        bg-honey/85
        rounded-3xl
        text-[clamp(0.6rem,0.75vw,1.25rem)]
        font-semibold
        tracking-wide
        text-white
        whitespace-nowrap
        mb-3
      "
                        >
                          {item.category}
                        </span>

                        {/* TITLE */}
                        <h2
                          className="
        text-white
        font-bold
        my-3 sm:my-4
        text-[clamp(1.25rem,1.5vw,2.5rem)]
        leading-tight
        line-clamp-2
      "
                        >
                          {item.title}
                        </h2>
                      </div>

                      {/* DATE & TIME */}
                      <p
                        className="
      text-[clamp(0.75rem,1.2vw,0.9rem)]
      lg:text-[clamp(0.85rem,0.7vw,1.5rem)]
      xl:text-[clamp(0.85rem,0.7vw,1.5rem)]
      text-white/60

      min-[1440px]:absolute
      min-[1440px]:bottom-7
    "
                      >
                        {item.date} • {item.time}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
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
              <div className="flex items-center justify-between gap-4">
                <p className="uppercase tracking-[0.5em] text-marigold font-semibold text-[clamp(0.8rem,1.5vw,1.5rem)]">
                  Gontor Knowledge
                </p>
                <Link
                  to="/view-all/knowledge"
                  className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-white/55 transition-colors hover:text-marigold"
                >
                  View All <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
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
                  melalui aktivitas sehari-hari, organisasi, serta pembelajaran
                  yang konsisten.
                </p>

                <p
                  className="
        leading-relaxed
        text-white/70
        text-[clamp(1rem,1.15vw,1.15rem)]
      "
                >
                  Gontor Knowledge menghadirkan berbagai cerita, pengalaman, dan
                  wawasan yang menginspirasi agar setiap pembaca dapat mengambil
                  pelajaran dari perjalanan para santri dan civitas pondok.
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
        <div className="max-h-[clamp(50rem,45vw,75rem)] my-25 mx-auto">
          <ViewAllHeading title="Behind The Scene" to="/view-all/behind-the-scene" />

          <div className="scrollbar-hidden overflow-x-auto py-5">
            <div className="flex h-full gap-7.5 mx-0 w-full scroll-smooth snap-x snap-mandatory">
              {firstMid.map((item) => (
                <Link
                  key={item.id}
                  to={item.link}
                  onMouseMove={handleMove}
                  onMouseLeave={handleLeave}
                  className="
  glow-card
  shrink-0
  snap-start

  w-[clamp(18rem,22vw,30rem)]
  aspect-4/5

  overflow-hidden
  rounded-3xl
  border
  border-white/10
  bg-choco

  transition-all
  duration-300

  hover:z-10
  hover:-translate-y-4
  hover:shadow-2xl
"
                >
                  {/* IMAGE */}
                  <div className="absolute inset-0 h-[70%] w-full">
                    <img
                      src={hero}
                      alt={item.title}
                      className="block h-full w-full object-cover selected-none"
                    />

                    <div
                      className="absolute inset-0 translate-y-px h-full 
                    w-full bg-linear-to-t from-choco to-choco/25"
                    />
                  </div>

                  {/* OVERLAY */}

                  <div
                    className="
                  absolute
                  inset-0

                  bg-linear-to-t
                  from-choco
                  via-choco/35
                  to-transparent
                "
                  />

                  {/* CONTENT */}
                  <div
                    className="
    absolute
    inset-x-0
    top-[40%]
    bottom-0
    z-10
    flex
    flex-col
    justify-between
    text-white

    px-5
    pt-4
    pb-5

    sm:px-6
    sm:pt-5

    lg:px-8

    min-[1440px]:top-60
    min-[1440px]:block
    min-[1440px]:px-10
    min-[1440px]:p-5
  "
                  >
                    {/* TAG & TITLE */}
                    <div>
                      {/* CATEGORY */}
                      <span
                        className="
        inline-flex
        items-center
        justify-center
        px-[clamp(1rem,1vw,1.5rem)]
        h-[clamp(1.5rem,2vw,2.5rem)]
        bg-honey/85
        rounded-3xl
        text-[clamp(0.6rem,0.75vw,1.25rem)]
        font-semibold
        tracking-wide
        text-white
        whitespace-nowrap
        mb-3
      "
                      >
                        {item.category}
                      </span>

                      {/* TITLE */}
                      <h2
                        className="
        text-white
        font-bold
        my-3 sm:my-4
        text-[clamp(1.25rem,1.5vw,2.5rem)]
        leading-tight
        line-clamp-2
      "
                      >
                        {item.title}
                      </h2>
                    </div>

                    {/* DATE & TIME */}
                    <p
                      className="
      text-[clamp(0.75rem,1.2vw,0.9rem)]
      lg:text-[clamp(0.85rem,0.7vw,1.5rem)]
      xl:text-[clamp(0.85rem,0.7vw,1.5rem)]
      text-white/60

      min-[1440px]:absolute
      min-[1440px]:bottom-7
    "
                    >
                      {item.date} • {item.time}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="max-h-[clamp(50rem,45vw,75rem)] my-25 mx-auto">
          <ViewAllHeading title="Isidental" to="/view-all/isidental" />

          <div className="scrollbar-hidden overflow-x-auto py-5">
            <div className="flex h-full gap-7.5 mx-0 w-full scroll-smooth snap-x snap-mandatory">
              {secondMid.map((item) => (
                <Link
                  key={item.id}
                  to={item.link}
                  onMouseMove={handleMove}
                  onMouseLeave={handleLeave}
                  className="
  glow-card
  shrink-0
  snap-start

  w-[clamp(18rem,22vw,30rem)]
  aspect-4/5

  overflow-hidden
  rounded-3xl
  border
  border-white/10
  bg-choco

  transition-all
  duration-300

  hover:z-10
  hover:-translate-y-4
  hover:shadow-2xl
"
                >
                  {/* IMAGE */}
                  <div className="absolute inset-0 h-[70%] w-full">
                    <img
                      src={hero}
                      alt={item.title}
                      className="block h-full w-full object-cover selected-none"
                    />

                    <div
                      className="absolute inset-0 translate-y-px h-full 
                    w-full bg-linear-to-t from-choco to-choco/25"
                    />
                  </div>

                  {/* OVERLAY */}

                  <div
                    className="
                  absolute
                  inset-0

                  bg-linear-to-t
                  from-choco
                  via-choco/35
                  to-transparent
                "
                  />

                  {/* CONTENT */}
                  <div
                    className="
    absolute
    inset-x-0
    top-[40%]
    bottom-0
    z-10
    flex
    flex-col
    justify-between
    text-white

    px-5
    pt-4
    pb-5

    sm:px-6
    sm:pt-5

    lg:px-8

    min-[1440px]:top-60
    min-[1440px]:block
    min-[1440px]:px-10
    min-[1440px]:p-5
  "
                  >
                    {/* TAG & TITLE */}
                    <div>
                      {/* CATEGORY */}
                      <span
                        className="
        inline-flex
        items-center
        justify-center
        px-[clamp(1rem,1vw,1.5rem)]
        h-[clamp(1.5rem,2vw,2.5rem)]
        bg-honey/85
        rounded-3xl
        text-[clamp(0.6rem,0.75vw,1.25rem)]
        font-semibold
        tracking-wide
        text-white
        whitespace-nowrap
        mb-3
      "
                      >
                        {item.category}
                      </span>

                      {/* TITLE */}
                      <h2
                        className="
        text-white
        font-bold
        my-3 sm:my-4
        text-[clamp(1.25rem,1.5vw,2.5rem)]
        leading-tight
        line-clamp-2
      "
                      >
                        {item.title}
                      </h2>
                    </div>

                    {/* DATE & TIME */}
                    <p
                      className="
      text-[clamp(0.75rem,1.2vw,0.9rem)]
      lg:text-[clamp(0.85rem,0.7vw,1.5rem)]
      xl:text-[clamp(0.85rem,0.7vw,1.5rem)]
      text-white/60

      min-[1440px]:absolute
      min-[1440px]:bottom-7
    "
                    >
                      {item.date} • {item.time}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div
          className="
        grid
        grid-cols-1
        md:grid-cols-[4fr_3fr]

        gap-[clamp(1.5rem,2vw,3rem)]

        my-[clamp(3rem,5vw,6rem)]
      "
        >
          {/* ===================== TRENDING ===================== */}

          <div
            className="
          glow-card

          rounded-[clamp(1.5rem,2vw,2rem)]

          border
          border-white/10

          backdrop-blur-md

          p-[clamp(1.25rem,2vw,2rem)]
        "
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
          >
            <Trending title="Trending Now" to="/trending" />

            <div className="mt-[clamp(1.5rem,2vw,2.25rem)] flex flex-col">
              {trendingHome.map((item) => (
                <Link
                  key={item.id}
                  to={item.link}
                  className="
                group

                flex
                items-center

                text-[clamp(1.25rem,2vw,2.5rem)]
                gap-[clamp(.75rem,1vw,1.5rem)]

                py-[clamp(.85rem,1vw,1.25rem)]

                border-b
                border-white/10

                last:border-none
              "
                >
                  {/* Rank */}

                  <span
                    className="
                  shrink-0

                  w-[clamp(2.5rem,4vw,3.5rem)]

                  text-[clamp(2rem,2.6vw,3rem)]

                  font-black

                  text-white/30

                  transition-all

                  duration-300

                  group-hover:text-marigold
                "
                  >
                    {item.rank}
                  </span>

                  {/* Thumbnail */}

                  <img
                    src={item.image}
                    alt={item.title}
                    className="
                  shrink-0

                  w-[clamp(5rem,8vw,7rem)]
                  h-[clamp(4rem,6vw,5rem)]

                  rounded-[clamp(.75rem,1vw,1rem)]

                  object-cover

                  transition-all
                  duration-300

                  group-hover:scale-105
                "
                  />

                  {/* Text */}

                  <div className="flex-1 min-w-0">
                    <h4
                      className="
                    line-clamp-2

                    text-white

                    font-semibold

                    text-[clamp(.95rem,1vw,1.15rem)]

                    leading-snug

                    transition-colors

                    duration-300

                    group-hover:text-marigold
                  "
                    >
                      {item.title}
                    </h4>

                    <p
                      className="
                    mt-2

                    text-[clamp(.75rem,.8vw,.9rem)]

                    text-white/50
                  "
                    >
                      {item.category}

                      <span className="mx-2">•</span>

                      {item.views}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ===================== CATEGORY ===================== */}

          <div
            className="
          glow-card

          rounded-[clamp(1.5rem,2vw,2rem)]

          border
          border-white/10

          backdrop-blur-md

          p-[clamp(1.25rem,2vw,2rem)]
        "
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
          >
            <Trending title="Category" to="/view-all/categories" />

            <div
              className="
            mt-[clamp(1.5rem,2vw,2.25rem)]

            space-y-[clamp(1rem,1.3vw,1.75rem)]
          "
            >
              {categoryHome.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.id}
                    to={`/category/${item.slug}`}

                    className="
                  group

                  flex

                  items-center

                  gap-[clamp(.9rem,1.2vw,1.5rem)]
                "
                  >
                    <div
                      className="
                    flex

                    items-center

                    justify-center

                    shrink-0

                    w-[clamp(2.8rem,3vw,3.4rem)]
                    h-[clamp(2.8rem,3vw,3.4rem)]

                    rounded-xl

                    border

                    transition-all

                    duration-300

                    group-hover:scale-110
                  "
                      style={{
                        borderColor: item.color,
                      }}
                    >
                      <Icon
                        className="
                      w-[clamp(1.1rem,1.4vw,1.4rem)]
                      h-[clamp(1.1rem,1.4vw,1.4rem)]
                    "
                        style={{
                          color: item.color,
                        }}
                      />
                    </div>

                    <span
                      className="
                    text-[clamp(.95rem,1vw,1.15rem)]

                    font-medium

                    text-white

                    transition-colors

                    duration-300

                    group-hover:text-marigold
                  "
                    >
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
