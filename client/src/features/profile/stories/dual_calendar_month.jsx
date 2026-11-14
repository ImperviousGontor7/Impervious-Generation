import useDualCalendar from "./use_dual_calendar";
import CalendarHeader from "./calendar_header";
import CalendarMonth from "./calendar_month";

export default function DualMonthCalendar() {

  const {
    year,
    month,
    next,
  } = useDualCalendar();

  return (

    <section className="rounded-3xl border border-white/10 bg-[#071018] p-8">

      <CalendarHeader next={next} />

      <div className="grid gap-6 lg:grid-cols-2">

        <CalendarMonth
          year={year}
          month={month}
        />

        <CalendarMonth
          year={year}
          month={(month + 1) % 12}
        />

      </div>

    </section>

  );
}