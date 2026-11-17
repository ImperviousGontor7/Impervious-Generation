import {
  FiBookOpen,
  FiAward,
  FiUsers,
  FiCamera,
  FiActivity,
  FiCompass,
  FiMusic,
  FiHeart,
} from "react-icons/fi";

export const categoryHome = [
  { id: "academic", slug: "akademik", name: "Akademik & Keilmuan", icon: FiBookOpen, color: "#D9A14F", description: "Ujian, olimpiade, diskusi, dan wawasan." },
  { id: "events", slug: "kegiatan-pesantren", name: "Kegiatan Pesantren", icon: FiUsers, color: "#A78BFA", description: "Agenda dan aktivitas kehidupan pondok." },
  { id: "art", slug: "seni-kreativitas", name: "Seni & Kreativitas", icon: FiMusic, color: "#F472B6", description: "Panggung, drama, musik, dan karya seni." },
  { id: "sports", slug: "olahraga", name: "Olahraga", icon: FiActivity, color: "#4ADE80", description: "Kompetisi, sportivitas, dan kebugaran." },
  { id: "scouting", slug: "kepramukaan", name: "Kepramukaan", icon: FiCompass, color: "#FBBF24", description: "Pramuka, kepemimpinan, dan pengabdian." },
  { id: "organization", slug: "organisasi", name: "Organisasi & Kepemimpinan", icon: FiAward, color: "#60A5FA", description: "Kepanitiaan, manajemen, dan tanggung jawab." },
  { id: "spiritual", slug: "keagamaan", name: "Keagamaan & Pengabdian", icon: FiHeart, color: "#FB923C", description: "Ramadan, Syawwal, qurban, dan pelayanan." },
  { id: "multimedia", slug: "multimedia", name: "Multimedia & Dokumentasi", icon: FiCamera, color: "#22D3EE", description: "Fotografi, videografi, dan arsip visual." },
];
