import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";

function FAQItem({ index, question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-black/15
        transition-all
        duration-300
      "
    >
      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          w-full
          items-start
          gap-4
          p-4
          sm:p-5
          text-left
        "
      >
        {/* Nomor */}
        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-2xl
            border border-marigold/20
            bg-marigold/10
            text-sm
            font-bold
            text-marigold
          "
        >
          {String(index).padStart(2, "0")}
        </div>

        {/* Judul */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <h3
              className="
                text-[clamp(0.95rem,1.1vw,1.05rem)]
                font-semibold
                leading-snug
                text-white
              "
            >
              {question}
            </h3>

            <FaChevronRight
              className={`
                mt-1
                shrink-0
                text-white/55
                transition-transform
                duration-300
                ${open ? "rotate-90" : ""}
              `}
            />
          </div>

          {/* Jawaban */}
          <div
            className={`
              grid
              transition-all
              duration-300
              ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
            `}
          >
            <div className="overflow-hidden">
              <div
                className="
                  mt-3

                  max-h-48
                  overflow-y-auto

                  pr-2

                  scrollbar-thin
                  scrollbar-thumb-[#E3A419]/40
                  scrollbar-track-transparent
                "
              >
                <p
                  className="
                    text-[clamp(0.85rem,0.95vw,0.98rem)]
                    leading-relaxed
                    text-white/68
                  "
                >
                  {answer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

export default FAQItem;