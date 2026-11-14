import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function ContactCard() {
  return (
    <Link
      to="/contact"
      className="
        mt-5 block rounded-3xl
        border border-marigold/20 bg-marigold/10
        p-4 sm:p-5
        transition-all duration-200
        hover:-translate-y-0.5 hover:border-marigold/30 hover:bg-marigold/15
      "
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-[clamp(1rem,1.15vw,1.2rem)] font-semibold text-white">
            Do You Have Any Other Questions?
          </h3>
          <p className="mt-2 max-w-md text-[clamp(0.85rem,0.95vw,0.98rem)] leading-relaxed text-white/70">
            If your question is not covered here, feel free to contact our moderators or
            administrators.
          </p>
        </div>

        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-marigold/20 bg-black/20 text-marigold">
          <FiArrowRight className="text-lg" />
        </span>
      </div>
    </Link>
  );
}

export default ContactCard;