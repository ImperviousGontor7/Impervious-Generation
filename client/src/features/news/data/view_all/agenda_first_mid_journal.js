import { paneldata } from "../../../profile/Journalyst/PanelData.js";

const items = paneldata.filter((item) =>
  item.title.toLocaleLowerCase("id-ID").includes("first mid year"),
);

const section = {
  title: "First Mid Journal",
  description: "Arsip kepanitiaan dan kegiatan yang secara khusus tercatat untuk First Mid Year.",
  items,
};

export default section;
