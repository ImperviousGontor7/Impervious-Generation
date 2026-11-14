import { FiArrowRight } from "react-icons/fi";

function ForumHeader() {
  return (
    <div className="rounded-4xl border border-white/10 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0">
            <h1 className="text-[clamp(1.5rem,3vw,3rem)] font-black uppercase tracking-[0.14em]">
              General Forum
            </h1>
            <p className="mt-3 max-w-3xl text-[clamp(0.9rem,1.15vw,1.05rem)] leading-relaxed text-white/70">
              An open discussion space for all participants. Share your ideas, ask questions,
              and engage with each other in meaningful conversations.
            </p>
          </div>

          <button
            type="button"
            className="
              inline-flex w-full items-center justify-center gap-3
              rounded-2xl border border-marigold/20
              bg-marigold/10 px-5 py-4
              text-[clamp(0.85rem,1vw,1rem)] font-semibold text-[#f7c953]
              transition-all duration-200
              hover:-translate-y-0.5 hover:bg-marigold/15
              sm:w-auto
            "
          >
            Forum Guidelines
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-marigold/20 bg-black/20">
              <FiArrowRight />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForumHeader;