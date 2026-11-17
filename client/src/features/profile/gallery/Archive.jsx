import MemoriesCard from "./MemoriesCard";

function Archive({ items, viewMode }) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/3 p-10 text-center text-sm text-white/70">
        Tidak ada memory untuk filter ini.
      </div>
    );
  }

  return (
    <div className={viewMode === "grid" ? "grid grid-cols-3 gap-1" : "grid grid-cols-1 gap-3"}>
      {items.map((item) => (
        <MemoriesCard key={item.id} item={item} viewMode={viewMode} />
      ))}
    </div>
  );
}

export default Archive;
