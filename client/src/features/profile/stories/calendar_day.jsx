const colors = {
  purple: "bg-violet-600",
  blue: "bg-blue-600",
  green: "bg-green-600",
  orange: "bg-orange-500",
};

export default function CalendarDay({
  event,
  day,
}) {

  return (

    <div className="text-center">

      {event ? (

        <div
          className={`mx-auto flex h-11 w-11 items-center justify-center rounded-full ${colors[event.color]}`}
        >
          {event.icon ?? day}
        </div>

      ) : (

        <div className="mx-auto flex h-11 w-11 items-center justify-center">
          {day}
        </div>

      )}

      <p className="mt-2 text-xs text-white/80">
        {event?.short ?? "--"}
      </p>

    </div>
  );
}