import { calendarEvents } from "./calendar_data";
import { getMonthDays } from "./calendar_utils";
import CalendarDay from "./calendar_day";
import CalendarLegend from "./calendar_legend";

export default function CalendarMonth({
  year,
  month,
}) {

  const key =
    `${year}-${String(month + 1).padStart(2, "0")}`;

  const events =
    calendarEvents[key] || [];

  const days =
    getMonthDays(year, month);

  return (

    <div className="rounded-2xl border border-white/10 p-6">

      <h3 className="mb-6 text-center text-2xl font-semibold text-white">
        {new Date(year, month).toLocaleString("en-US", {
          month: "long",
        }).toUpperCase()}{" "}
        {year}
      </h3>

      <div className="grid grid-cols-7 gap-4">

        {days.map((day) => {

          const event =
            events.find((e) => e.day === day);

          return (
            <CalendarDay
              key={day}
              day={day}
              event={event}
            />
          );

        })}

      </div>

      <CalendarLegend />

    </div>

  );
}