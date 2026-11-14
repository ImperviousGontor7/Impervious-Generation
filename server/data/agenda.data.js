const SEED_USER_ID = "REPLACE_WITH_REAL_USER_ID";

export const agendaData = [
  {
    title: "Impervious Generation Launch Briefing",
    slug: "impervious-generation-launch-briefing",
    description:
      "An internal briefing to align the content workflow, publishing schedule, and administrative responsibilities for the platform launch.",
    banner: null,
    location: "Main Hall, Gontor Campus 7",
    startDate: new Date("2026-08-10T08:00:00+07:00"),
    endDate: new Date("2026-08-10T10:00:00+07:00"),
    status: "UPCOMING",
    authorId: SEED_USER_ID,
  },
  {
    title: "Century Night Festival",
    slug: "century-night-festival",
    description:
      "A commemorative evening event marking the centenary spirit with performances, visual showcases, and community presentations.",
    banner: null,
    location: "Campus Auditorium",
    startDate: new Date("2026-08-18T19:30:00+07:00"),
    endDate: new Date("2026-08-18T22:00:00+07:00"),
    status: "UPCOMING",
    authorId: SEED_USER_ID,
  },
  {
    title: "Editorial Workshop",
    slug: "editorial-workshop",
    description:
      "A working session for writers, editors, and moderators to standardize article format, headings, and publication tone.",
    banner: null,
    location: "Media Room",
    startDate: new Date("2026-08-12T13:00:00+07:00"),
    endDate: new Date("2026-08-12T15:30:00+07:00"),
    status: "ONGOING",
    authorId: SEED_USER_ID,
  },
  {
    title: "Alumni Reflection Forum",
    slug: "alumni-reflection-forum",
    description:
      "A reflective discussion about growth, memories, and the role of the generation in supporting the wider community.",
    banner: null,
    location: "Forum Hall",
    startDate: new Date("2026-07-20T09:00:00+07:00"),
    endDate: new Date("2026-07-20T11:00:00+07:00"),
    status: "FINISHED",
    authorId: SEED_USER_ID,
  },
];

export default agendaData;