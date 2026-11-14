import { FaChevronRight } from "react-icons/fa6";

export default function CalendarHeader({ next }) {

  return (
    <div className="mb-8 flex items-center justify-between">

      <h2 className="text-[clamp(1.5rem,2vw,2.4rem)] font-bold text-[#D9A14F]">
        DUAL MONTH CALENDAR
      </h2>

      <button
        onClick={next}
        className="flex items-center gap-2 text-[#D9A14F]"
      >
        Slide Month

        <FaChevronRight />
      </button>

    </div>
  );
}