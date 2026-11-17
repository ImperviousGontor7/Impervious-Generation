import { paneldata } from "../../../profile/Journalyst/PanelData.js";

const items = paneldata.filter((item) =>
  /kegiatan siswa akhir kmi|ujian kelas akhir kmi|pksa/i.test(item.title),
);

const section = {
  title: "Panitia Ujian Kelas Akhir KMI",
  description: "Arsip kegiatan yang berkaitan langsung dengan siswa akhir KMI berdasarkan data yang tersedia.",
  items,
};

export default section;
