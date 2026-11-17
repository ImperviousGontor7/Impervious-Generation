import { augustNews } from "../../contents/august.js";

const items = augustNews.filter((item) => item.category === "Ar-Ruqiyy");

const section = {
  title: "Ar-Ruqiyy",
  description: "Tulisan dan dokumentasi yang tercatat dalam kategori Ar-Ruqiyy.",
  items,
};

export default section;
