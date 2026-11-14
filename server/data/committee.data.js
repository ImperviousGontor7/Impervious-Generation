const SEED_USER_ID = "REPLACE_WITH_REAL_USER_ID";

export const committeeData = [
  {
    title: "Impervious Generation Committee 2026",
    slug: "impervious-generation-committee-2026",
    description:
      "The core committee responsible for guiding content direction, event coordination, and platform administration for the 2026 cycle.",
    banner: null,
    logo: null,
    startDate: new Date("2026-06-01T00:00:00+07:00"),
    endDate: new Date("2027-05-31T23:59:59+07:00"),
    status: "ACTIVE",
    authorId: SEED_USER_ID,
    members: [
      {
        name: "Ahmad Fauzi",
        position: "Chairman",
        photo: null,
        bio:
          "Coordinates overall direction, approves major decisions, and keeps the committee aligned with the platform vision.",
        order: 1,
      },
      {
        name: "Rizky Maulana",
        position: "Vice Chairman",
        photo: null,
        bio:
          "Supports the chairman, monitors progress, and ensures every division stays on schedule.",
        order: 2,
      },
      {
        name: "Fahri Ramadhan",
        position: "Secretary",
        photo: null,
        bio:
          "Handles documentation, internal correspondence, and structured record keeping.",
        order: 3,
      },
      {
        name: "Muhammad Iqbal",
        position: "Treasurer",
        photo: null,
        bio:
          "Maintains financial tracking, budget notes, and accountability reports.",
        order: 4,
      },
      {
        name: "Zulfikar Hakim",
        position: "Public Relations",
        photo: null,
        bio:
          "Manages communication with members, announcements, and external coordination.",
        order: 5,
      },
      {
        name: "Alya Nasywa",
        position: "Content Coordinator",
        photo: null,
        bio:
          "Guides article planning, publication flow, and content quality checks.",
        order: 6,
      },
      {
        name: "Hafizullah",
        position: "Event Coordinator",
        photo: null,
        bio:
          "Organizes event timelines, activity logistics, and technical preparation.",
        order: 7,
      },
      {
        name: "Dinda Safitri",
        position: "Design & Media",
        photo: null,
        bio:
          "Supports visual assets, layout consistency, and creative media production.",
        order: 8,
      },
    ],
  },
];

export default committeeData;