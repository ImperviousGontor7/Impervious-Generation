import { januaryNews } from "../../contents/january.js";
import { februaryNews } from "../../contents/february.js";
import { marchNews } from "../../contents/march.js";
import { aprilNews } from "../../contents/april.js";
import { mayNews } from "../../contents/may.js";
import { juneNews } from "../../contents/june.js";
import { julyNews } from "../../contents/july.js";
import { augustNews } from "../../contents/august.js";
import { septemberNews } from "../../contents/september.js";
import { octoberNews } from "../../contents/october.js";
import { novemberNews } from "../../contents/november.js";
import { desemberNews } from "../../contents/desember.js";
import { thisMonth } from "../month_st.js";
import { monthAgo } from "../month_nd.js";
import { firstMid } from "../first_mid.js";
import { secondMid } from "../second_mid.js";
import { behindTheEvent } from "../behind_the_events.js";
import { paneldata } from "../../../profile/Journalyst/PanelData.js";
import { heroSlides } from "../home_main_slide.js";
import { rootSlides } from "../home_root_slide.js";

export const section = {
  title: "All Stories",
  description: "Seluruh cerita dan dokumentasi yang tersedia di arsip.",
  items: [
    ...januaryNews,
    ...februaryNews,
    ...marchNews,
    ...aprilNews,
    ...mayNews,
    ...juneNews,
    ...julyNews,
    ...augustNews,
    ...septemberNews,
    ...octoberNews,
    ...novemberNews,
    ...desemberNews,
    ...thisMonth,
    ...monthAgo,
    ...firstMid,
    ...secondMid,
    ...behindTheEvent,
    ...heroSlides,
    ...rootSlides,
    ...paneldata,
  ],
};

export default section;
