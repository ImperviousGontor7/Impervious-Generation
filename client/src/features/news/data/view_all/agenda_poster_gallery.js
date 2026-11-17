import { agendaSlides } from "../../../profile/stories/agenda_main_slide.js";

// agenda marquee mengulang item yang sama untuk menghasilkan loop visual.
// Halaman View All cukup menampilkan setiap poster satu kali.
const items = agendaSlides.map((item) => ({ ...item, category: "Agenda Poster" }));

const section = {
  title: "Agenda Poster Gallery",
  description: "Koleksi poster agenda yang tampil pada marquee halaman Agenda.",
  items,
};

export default section;
