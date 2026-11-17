function Sidebar({ filters, activeFilter, onSelectFilter }) {
  return (
    <nav
      aria-label="Memory filters"
      className="sticky top-14 z-40 md:top-[clamp(3.5rem,5vw,9rem)] -mx-4 border-y border-white/10 bg-[#170e07]/95 px-3 py-1.5 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
    >
      <div className="scrollbar-hidden flex h-[42px] items-center gap-2 overflow-x-auto">
        {filters.map((item) => {
          const active = activeFilter === item.value;
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onSelectFilter(item.value)}
              aria-pressed={active}
              className={`flex h-8 shrink-0 items-center gap-2 rounded-full border px-3 text-[11px] font-medium transition sm:text-xs ${active ? "border-marigold/60 bg-marigold/15 text-marigold" : "border-white/10 bg-white/5 text-white/65 hover:border-white/25 hover:text-white"}`}
            >
              <span>{item.label}</span>
              <span className="text-[10px] opacity-60">{item.count}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default Sidebar;
