import { Link } from "react-router-dom";
import Shield from "../../../assets/images/Jami Emas.webp";
import Card from "../generation/ActorCard";

import { paneldata } from "../Journalyst/PanelData.js";

function Committee() {
  return (
    <div className="relative overflow-hidden text-white">
      {/* HERO SECTION */}

      <Card id="home">
        <div className="relative h-[clamp(20rem,50vh,60rem)]">
          <img
            src={Shield}
            alt="Jami Emas"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-black/60" />

          <div className="absolute inset-0 bg-linear-to-t from-[#170e07] via-[#0d0500]/40 to-transparent" />

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 py-10 text-center sm:py-16">
            <p className="text-sm uppercase tracking-[0.55em] text-violet-200/85 sm:text-base lg:text-lg">
              IMPACT
            </p>

            <h1 className="mt-2 bg-linear-to-b from-white via-violet-200 to-violet-500 bg-clip-text text-[clamp(4rem,10vw,8.5rem)] font-black leading-none tracking-widest text-transparent drop-shadow-[0_0_24px_rgba(168,85,247,0.16)]">
              Impervious Committee
            </h1>

            <div className="mt-4 h-px w-20 bg-violet-300/60" />

            <p className="mt-4 max-w-2xl text-sm italic text-white/85 sm:text-base lg:text-lg">
              ~ Impervious In Action ~
            </p>
          </div>
        </div>
      </Card>

      {/* BEHIND THE EVENT SECTION */}

      <section className="relative z-10 text-white">
        <div className="relative z-10 mx-auto w-full max-w-500 px-15 sm:px-8">
          {/* MAIN BOX */}

          {/* VERTICAL SCROLL CONTAINER */}

          <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-marigold">Behind the Event</p>
              <h2 className="mt-2 text-xl font-bold sm:text-2xl">Committee Archive</h2>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60">
              {paneldata.length} Records
            </span>
          </div>

          <div className="max-h-[clamp(30rem,75vh,75rem)] py-7.5 overflow-y-auto overflow-x-hidden scrollbar-hidden">
            <div className="flex flex-col gap-10">
              {paneldata.map((item) => (
                <article
                  key={item.id}
                  className="
          group
          relative
          w-full
          shrink-0

          rounded-3xl
          border
          border-white/10
          bg-white/5

          p-5 sm:p-7

          shadow-xl
          shadow-black/10
          backdrop-blur-xl

          transition-all
          duration-300

          hover:-translate-y-5
          hover:border-marigold/30
          hover:bg-white/8
          hover:shadow-2xl
        "
                >
                  <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-marigold/70">
                    <span>Committee Record</span>
                    <span>{String(item.id).padStart(2, "0")}</span>
                  </div>
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    {/* EVENT INFORMATION */}

                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-semibold tracking-[0.3em] text-marigold/70">
                        EVENT - {String(item.id).padStart(2, "0")}
                      </span>

                      <h2 className="my-3 text-[clamp(1.25rem,2vw,2rem)] font-bold leading-tight text-white transition-colors duration-300 group-hover:text-marigold">
                        {item.title}
                      </h2>

                      <p className="max-w-3xl text-[clamp(0.85rem,0.85vw,1.05rem)] leading-relaxed text-white/60">
                        {item.description}
                      </p>
                    </div>

                    {/* DATE, TIME & LINK */}

                    <div className="flex shrink-0 flex-col gap-4 md:min-w-52 md:items-end">
                      <p className="text-sm font-medium text-white/50">
                        {item.date} <span className="text-marigold">•</span>{" "}
                        {item.time}
                      </p>

                      <Link
                        to={`/news/${String(item.title).toLocaleLowerCase("id-ID").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`}
                        className="
                inline-flex
                items-center
                gap-3
                text-sm
                font-semibold
                tracking-wider
                text-marigold
                transition-all
                duration-300
                hover:gap-5
              "
                      >
                        Read More
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-marigold/20 bg-marigold/10 transition-all duration-300 group-hover:bg-marigold/20">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Committee;
