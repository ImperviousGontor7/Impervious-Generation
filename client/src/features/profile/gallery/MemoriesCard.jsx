function MemoriesCard({ item, viewMode }) {
  const mediaClass = viewMode === "grid"
    ? "aspect-[16/9] w-full"
    : "aspect-[16/9] w-full sm:w-64";

  return (
    <article className="group relative min-w-0 overflow-hidden rounded-md border border-white/10 bg-black/20">
      {item.video ? (
        <video
          src={item.video}
          poster={item.image}
          controls={viewMode !== "grid"}
          muted
          playsInline
          className={`${mediaClass} object-cover`}
        />
      ) : (
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className={`${mediaClass} object-cover transition-transform duration-500 group-hover:scale-105`}
        />
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 to-transparent p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
        <p className="line-clamp-1 text-[10px] font-semibold text-white sm:text-xs">{item.title}</p>
        <p className="mt-0.5 text-[9px] text-white/65 sm:text-[10px]">{item.categoryLabel}</p>
      </div>
      {item.video && viewMode === "grid" && (
        <span className="pointer-events-none absolute right-1 top-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] text-white">VIDEO</span>
      )}
    </article>
  );
}

export default MemoriesCard;
