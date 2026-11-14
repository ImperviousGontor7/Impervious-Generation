export default function CalendarLegend() {

  return (

    <div className="mt-8 border-t border-white/10 pt-5">

      <p className="mb-3 font-semibold text-white">
        Upcoming Events :
      </p>

      <div className="space-y-2">

        <p>
          🟣 Purple = Main Event
        </p>

        <p>
          🟢 Green = Ongoing / Live
        </p>

        <p>
          🟠 Orange = Important Event
        </p>

      </div>

    </div>

  );
}