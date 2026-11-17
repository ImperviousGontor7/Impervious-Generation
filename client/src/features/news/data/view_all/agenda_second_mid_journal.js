import { paneldata } from "../../../profile/Journalyst/PanelData.js";

const items = paneldata.filter((item) =>
  item.title.toLocaleLowerCase("id-ID").includes("second mid year"),
);

const section = {
  title: "Second Mid Journal",
  description: "Arsip kepanitiaan dan kegiatan yang secara khusus tercatat untuk Second Mid Year.",
  items,
};

export default section;
