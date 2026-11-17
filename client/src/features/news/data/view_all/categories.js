import { categoryHome } from "../category_home.js";
export const section = { title: "Explore Categories", description: "Jelajahi seluruh kategori dalam arsip Impervious Generation.", items: categoryHome.map((item) => ({ ...item, title: item.name, description: item.description, link: `/category/${item.slug}` })) };
export default section;
