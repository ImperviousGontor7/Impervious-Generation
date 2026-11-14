import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import homeCmsApi
  from "../services/homeApi.js";

import uploadApi
  from "../services/uploadApi.js";

import {
  resolveMediaUrl,
} from "../../news/services/homeMedia.js";

const PLACEMENTS = [
  [
    "HOME_HERO",
    "Hero Utama",
    "SLIDER",
  ],

  [
    "HOME_ROOT_SLIDER",
    "Root Slider",
    "SLIDER",
  ],

  [
    "HOME_THIS_MONTH",
    "This Month",
    "FEATURED",
  ],

  [
    "HOME_MONTH_AGO",
    "Month Ago",
    "FEATURED",
  ],

  [
    "HOME_BEHIND_EVENTS",
    "Behind The Events",
    "FEATURED",
  ],

  [
    "HOME_FEATURED",
    "Featured / Knowledge",
    "FEATURED",
  ],

  [
    "HOME_FIRST_MID_YEAR",
    "First Mid Year",
    "FEATURED",
  ],

  [
    "HOME_SECOND_MID_YEAR",
    "Second Mid Year",
    "FEATURED",
  ],

  [
    "HOME_TRENDING",
    "Trending",
    "TRENDING",
  ],

  [
    "HOME_CATEGORY",
    "Category",
    "CATEGORY",
  ],
];

const CATEGORY_COLORS = [
  "#8B5CF6",
  "#22C55E",
  "#F59E0B",
  "#EC4899",
  "#38BDF8",
];

const EMPTY_FORM = {
  id: null,

  key: "",

  sectionType:
    "SLIDER",

  placement:
    "HOME_HERO",

  title: "",

  subtitle: "",

  description: "",

  image: "",

  mobileImage: "",

  ctaLabel:
    "Read More",

  ctaUrl:
    "/",

  order: 0,

  isActive: true,

  payload: {
    category: "",
    date: "",
    time: "",
    link: "/",
    views: "",
    rank: "",
    color:
      CATEGORY_COLORS[0],
    icon: "BsGrid",
  },
};

function placementMeta(
  value,
) {
  return (
    PLACEMENTS.find(
      ([key]) =>
        key === value,
    ) ??
    PLACEMENTS[0]
  );
}

function normalizeForm(
  item,
) {
  return {
    ...EMPTY_FORM,

    id:
      item?.id ??
      null,

    key:
      item?.key ??
      "",

    sectionType:
      item?.sectionType ??
      "SLIDER",

    placement:
      item?.placement ??
      "HOME_HERO",

    title:
      item?.title ??
      "",

    subtitle:
      item?.subtitle ??
      "",

    description:
      item?.description ??
      "",

    image:
      item?.image ??
      "",

    mobileImage:
      item?.mobileImage ??
      "",

    ctaLabel:
      item?.ctaLabel ??
      "",

    ctaUrl:
      item?.ctaUrl ??
      "",

    order:
      item?.order ??
      0,

    isActive:
      item?.isActive ??
      true,

    payload: {
      ...EMPTY_FORM.payload,

      ...(
        item?.payload &&
        typeof item.payload ===
          "object"
          ? item.payload
          : {}
      ),
    },
  };
}

export default function AdminHomePage() {
  const [
    items,
    setItems,
  ] = useState([]);

  const [
    form,
    setForm,
  ] = useState(
    EMPTY_FORM,
  );

  const [
    editing,
    setEditing,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    uploading,
    setUploading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    filter,
    setFilter,
  ] = useState("ALL");

  const load =
    useCallback(
      async () => {
        setLoading(true);

        setError("");

        try {
          const data =
            await homeCmsApi.getHomeSections();

          setItems(
            Array.isArray(
              data,
            )
              ? data
              : [],
          );
        } catch (
          requestError
        ) {
          setError(
            requestError
              ?.response
              ?.data
              ?.message ||
              requestError
                ?.message ||
              "Gagal memuat Home CMS.",
          );
        } finally {
          setLoading(
            false,
          );
        }
      },
      [],
    );

  useEffect(
    () => {
      load();
    },
    [load],
  );

  const filteredItems =
    useMemo(
      () =>
        filter ===
        "ALL"
          ? items
          : items.filter(
              (
                item,
              ) =>
                item.placement ===
                filter,
            ),
      [
        items,
        filter,
      ],
    );

  function startCreate(
    placement =
      "HOME_HERO",
  ) {
    const [
      value,
      ,
      sectionType,
    ] =
      placementMeta(
        placement,
      );

    setForm({
      ...EMPTY_FORM,

      placement:
        value,

      sectionType:
        sectionType,

      key:
        `${value.toLowerCase()}_${Date.now()}`,

      order:
        items.filter(
          (
            item,
          ) =>
            item.placement ===
            value,
        ).length,
    });

    setEditing(true);

    setError("");
  }

  function startEdit(
    item,
  ) {
    setForm(
      normalizeForm(
        item,
      ),
    );

    setEditing(true);

    setError("");
  }

  function updateField(
    field,
    value,
  ) {
    setForm(
      (
        prev,
      ) => ({
        ...prev,
        [field]:
          value,
      }),
    );
  }

  function updatePayload(
    field,
    value,
  ) {
    setForm(
      (
        prev,
      ) => ({
        ...prev,

        payload: {
          ...prev.payload,

          [field]:
            value,
        },
      }),
    );
  }

  async function handleUpload(
    event,
    field = "image",
  ) {
    const file =
      event.target
        .files?.[0];

    event.target.value =
      "";

    if (!file) {
      return;
    }

    setUploading(
      true,
    );

    setError("");

    try {
      const media =
        await uploadApi.uploadImage(
          file,
        );

      updateField(
        field,
        media?.url ||
          "",
      );
    } catch (
      requestError
    ) {
      setError(
        requestError
          ?.response
          ?.data
          ?.message ||
          requestError
            ?.message ||
          "Upload gagal.",
      );
    } finally {
      setUploading(
        false,
      );
    }
  }

  async function handleSave(
    event,
  ) {
    event.preventDefault();

    if (
      !form.title.trim()
    ) {
      setError(
        "Title wajib diisi.",
      );

      return;
    }

    setSaving(true);

    setError("");

    try {
      const payload = {
        key:
          form.key.trim(),

        sectionType:
          form.sectionType,

        placement:
          form.placement,

        title:
          form.title.trim(),

        subtitle:
          form.subtitle.trim() ||
          null,

        description:
          form.description.trim() ||
          null,

        image:
          form.image ||
          null,

        mobileImage:
          form.mobileImage ||
          null,

        ctaLabel:
          form.ctaLabel.trim() ||
          null,

        ctaUrl:
          form.ctaUrl.trim() ||
          null,

        order:
          Number(
            form.order,
          ) || 0,

        isActive:
          form.isActive,

        payload:
          form.payload,
      };

      if (form.id) {
        await homeCmsApi.updateHomeSection(
          form.id,
          payload,
        );
      } else {
        await homeCmsApi.createHomeSection(
          payload,
        );
      }

      setEditing(false);

      setForm(
        EMPTY_FORM,
      );

      await load();
    } catch (
      requestError
    ) {
      setError(
        requestError
          ?.response
          ?.data
          ?.message ||
          requestError
            ?.message ||
          "Gagal menyimpan Home section.",
      );
    } finally {
      setSaving(
        false,
      );
    }
  }

  async function handleDelete(
    item,
  ) {
    if (
      !window.confirm(
        `Hapus placement ${item.title}?`,
      )
    ) {
      return;
    }

    try {
      await homeCmsApi.deleteHomeSection(
        item.id,
      );

      await load();
    } catch (
      requestError
    ) {
      setError(
        requestError
          ?.response
          ?.data
          ?.message ||
          requestError
            ?.message ||
          "Gagal menghapus Home section.",
      );
    }
  }

  const [
    ,
    placementLabel,
    formKind,
  ] =
    placementMeta(
      form.placement,
    );

  return (
    <section
      className="
        space-y-6
      "
    >
      <header
        className="
          flex
          flex-col
          gap-4
          lg:flex-row
          lg:items-end
          lg:justify-between
        "
      >
        <div>
          <p
            className="
              text-sm
              uppercase
              tracking-[0.3em]
              text-white/45
            "
          >
            Home CMS
          </p>

          <h1
            className="
              mt-2
              text-3xl
              font-semibold
            "
          >
            Home Placement Manager
          </h1>

          <p
            className="
              mt-2
              max-w-3xl
              text-sm
              leading-6
              text-white/55
            "
          >
            Atur setiap
            slider, card,
            Trending,
            dan Category
            dari database.
            Gambar diproses
            melalui
            Media/Upload.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            startCreate(
              filter ===
                "ALL"
                ? "HOME_HERO"
                : filter,
            )
          }
          className="
            rounded-2xl
            bg-white
            px-5
            py-3
            text-sm
            font-semibold
            text-black
          "
        >
          + Tambah
          Placement
        </button>
      </header>

      <div
        className="
          flex
          flex-wrap
          gap-2
        "
      >
        <button
          type="button"
          onClick={() =>
            setFilter("ALL")
          }
          className={`
            rounded-full
            px-4
            py-2
            text-xs
            font-semibold
            ${
              filter ===
              "ALL"
                ? "bg-white text-black"
                : "bg-white/5 text-white/60"
            }
          `}
        >
          Semua
        </button>

        {PLACEMENTS.map(
          ([
            value,
            label,
          ]) => (
            <button
              key={
                value
              }
              type="button"
              onClick={() =>
                setFilter(
                  value,
                )
              }
              className={`
                rounded-full
                px-4
                py-2
                text-xs
                font-semibold
                ${
                  filter ===
                  value
                    ? "bg-white text-black"
                    : "bg-white/5 text-white/60"
                }
              `}
            >
              {label}
            </button>
          ),
        )}
      </div>

      {error && (
        <div
          className="
            rounded-2xl
            border
            border-red-400/20
            bg-red-500/10
            px-4
            py-3
            text-sm
            text-red-200
          "
        >
          {error}
        </div>
      )}

      {editing && (
        <form
          onSubmit={
            handleSave
          }
          className="
            space-y-5
            rounded-3xl
            border
            border-white/10
            bg-black/20
            p-5
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <div>
              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.25em]
                  text-white/40
                "
              >
                Editing
              </p>

              <h2
                className="
                  mt-1
                  text-xl
                  font-semibold
                "
              >
                {
                  placementLabel
                }
              </h2>
            </div>

            <button
              type="button"
              onClick={() =>
                setEditing(
                  false,
                )
              }
              className="
                rounded-xl
                border
                border-white/10
                px-4
                py-2
                text-sm
              "
            >
              Tutup
            </button>
          </div>

          <div
            className="
              grid
              gap-4
              md:grid-cols-2
            "
          >
            <label
              className="
                space-y-2
              "
            >
              <span
                className="
                  text-xs
                  text-white/50
                "
              >
                Placement
              </span>

              <select
                value={
                  form.placement
                }
                onChange={(
                  event,
                ) => {
                  const [
                    value,
                    ,
                    type,
                  ] =
                    placementMeta(
                      event
                        .target
                        .value,
                    );

                  updateField(
                    "placement",
                    value,
                  );

                  updateField(
                    "sectionType",
                    type,
                  );
                }}
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  py-3
                "
              >
                <option value="">
                  Pilih
                  placement
                </option>

                {PLACEMENTS.map(
                  ([
                    value,
                    label,
                  ]) => (
                    <option
                      key={
                        value
                      }
                      value={
                        value
                      }
                    >
                      {
                        label
                      }
                    </option>
                  ),
                )}
              </select>
            </label>

            <label
              className="
                space-y-2
              "
            >
              <span
                className="
                  text-xs
                  text-white/50
                "
              >
                Order
              </span>

              <input
                type="number"
                value={
                  form.order
                }
                onChange={(
                  event,
                ) =>
                  updateField(
                    "order",
                    event
                      .target
                      .value,
                  )
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  py-3
                "
              />
            </label>
          </div>

          <div
            className="
              grid
              gap-4
              md:grid-cols-2
            "
          >
            <label
              className="
                space-y-2
              "
            >
              <span
                className="
                  text-xs
                  text-white/50
                "
              >
                Key
              </span>

              <input
                value={
                  form.key
                }
                onChange={(
                  event,
                ) =>
                  updateField(
                    "key",
                    event
                      .target
                      .value,
                  )
                }
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  py-3
                "
              />
            </label>

            <label
              className="
                space-y-2
              "
            >
              <span
                className="
                  text-xs
                  text-white/50
                "
              >
                Title
              </span>

              <input
                value={
                  form.title
                }
                onChange={(
                  event,
                ) =>
                  updateField(
                    "title",
                    event
                      .target
                      .value,
                  )
                }
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  py-3
                "
              />
            </label>
          </div>

          {formKind ===
            "SLIDER" && (
            <div
              className="
                grid
                gap-4
                md:grid-cols-2
              "
            >
              <label
                className="
                  space-y-2
                "
              >
                <span
                  className="
                    text-xs
                    text-white/50
                  "
                >
                  Subtitle
                </span>

                <input
                  value={
                    form.subtitle
                  }
                  onChange={(
                    event,
                  ) =>
                    updateField(
                      "subtitle",
                      event
                        .target
                        .value,
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-3
                  "
                />
              </label>

              <label
                className="
                  space-y-2
                "
              >
                <span
                  className="
                    text-xs
                    text-white/50
                  "
                >
                  CTA Label
                </span>

                <input
                  value={
                    form.ctaLabel
                  }
                  onChange={(
                    event,
                  ) =>
                    updateField(
                      "ctaLabel",
                      event
                        .target
                        .value,
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-3
                  "
                />
              </label>

              <label
                className="
                  space-y-2
                  md:col-span-2
                "
              >
                <span
                  className="
                    text-xs
                    text-white/50
                  "
                >
                  Description
                </span>

                <textarea
                  rows="4"
                  value={
                    form.description
                  }
                  onChange={(
                    event,
                  ) =>
                    updateField(
                      "description",
                      event
                        .target
                        .value,
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-3
                  "
                />
              </label>
            </div>
          )}

          <div
            className="
              grid
              gap-4
              md:grid-cols-2
            "
          >
            <label
              className="
                space-y-2
              "
            >
              <span
                className="
                  text-xs
                  text-white/50
                "
              >
                Link / CTA URL
              </span>

              <input
                value={
                  form.ctaUrl
                }
                onChange={(
                  event,
                ) =>
                  updateField(
                    "ctaUrl",
                    event
                      .target
                      .value,
                  )
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  py-3
                "
              />
            </label>

            <label
              className="
                space-y-2
              "
            >
              <span
                className="
                  text-xs
                  text-white/50
                "
              >
                Image URL
              </span>

              <input
                value={
                  form.image
                }
                onChange={(
                  event,
                ) =>
                  updateField(
                    "image",
                    event
                      .target
                      .value,
                  )
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  py-3
                "
              />
            </label>
          </div>

          {formKind !==
            "CATEGORY" && (
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-3
              "
            >
              <label
                className="
                  cursor-pointer
                  rounded-xl
                  bg-white
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-black
                "
              >
                {uploading
                  ? "Uploading..."
                  : "Upload Image"}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(
                    event,
                  ) =>
                    handleUpload(
                      event,
                      "image",
                    )
                  }
                  disabled={
                    uploading
                  }
                />
              </label>

              {form.image && (
                <img
                  src={resolveMediaUrl(
                    form.image,
                  )}
                  alt="Preview"
                  className="
                    h-20
                    w-32
                    rounded-xl
                    border
                    border-white/10
                    object-cover
                  "
                />
              )}
            </div>
          )}

          {formKind !==
            "SLIDER" &&
            formKind !==
              "CATEGORY" && (
              <div
                className="
                  grid
                  gap-4
                  md:grid-cols-2
                  lg:grid-cols-4
                "
              >
                <label
                  className="
                    space-y-2
                  "
                >
                  <span
                    className="
                      text-xs
                      text-white/50
                    "
                  >
                    Category
                  </span>

                  <input
                    value={
                      form.payload
                        .category
                    }
                    onChange={(
                      event,
                    ) =>
                      updatePayload(
                        "category",
                        event
                          .target
                          .value,
                      )
                    }
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-white/5
                      px-4
                      py-3
                    "
                  />
                </label>

                <label
                  className="
                    space-y-2
                  "
                >
                  <span
                    className="
                      text-xs
                      text-white/50
                    "
                  >
                    Date
                  </span>

                  <input
                    value={
                      form.payload
                        .date
                    }
                    onChange={(
                      event,
                    ) =>
                      updatePayload(
                        "date",
                        event
                          .target
                          .value,
                      )
                    }
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-white/5
                      px-4
                      py-3
                    "
                  />
                </label>

                <label
                  className="
                    space-y-2
                  "
                >
                  <span
                    className="
                      text-xs
                      text-white/50
                    "
                  >
                    Time
                  </span>

                  <input
                    value={
                      form.payload
                        .time
                    }
                    onChange={(
                      event,
                    ) =>
                      updatePayload(
                        "time",
                        event
                          .target
                          .value,
                      )
                    }
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-white/5
                      px-4
                      py-3
                    "
                  />
                </label>

                <label
                  className="
                    space-y-2
                  "
                >
                  <span
                    className="
                      text-xs
                      text-white/50
                    "
                  >
                    Link
                  </span>

                  <input
                    value={
                      form.payload
                        .link
                    }
                    onChange={(
                      event,
                    ) =>
                      updatePayload(
                        "link",
                        event
                          .target
                          .value,
                      )
                    }
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-white/5
                      px-4
                      py-3
                    "
                  />
                </label>
              </div>
            )}

          {formKind ===
            "TRENDING" && (
            <div
              className="
                grid
                gap-4
                md:grid-cols-2
              "
            >
              <label
                className="
                  space-y-2
                "
              >
                <span
                  className="
                    text-xs
                    text-white/50
                  "
                >
                  Views
                </span>

                <input
                  value={
                    form.payload
                      .views
                  }
                  onChange={(
                    event,
                  ) =>
                    updatePayload(
                      "views",
                      event
                        .target
                        .value,
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-3
                  "
                />
              </label>

              <label
                className="
                  space-y-2
                "
              >
                <span
                  className="
                    text-xs
                    text-white/50
                  "
                >
                  Rank
                </span>

                <input
                  value={
                    form.payload
                      .rank
                  }
                  onChange={(
                    event,
                  ) =>
                    updatePayload(
                      "rank",
                      event
                        .target
                        .value,
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-3
                  "
                />
              </label>
            </div>
          )}

          {formKind ===
            "CATEGORY" && (
            <div
              className="
                grid
                gap-4
                md:grid-cols-3
              "
            >
              <label
                className="
                  space-y-2
                "
              >
                <span
                  className="
                    text-xs
                    text-white/50
                  "
                >
                  Color
                </span>

                <input
                  type="color"
                  value={
                    form.payload
                      .color ||
                    CATEGORY_COLORS[0]
                  }
                  onChange={(
                    event,
                  ) =>
                    updatePayload(
                      "color",
                      event
                        .target
                        .value,
                    )
                  }
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                  "
                />
              </label>

              <label
                className="
                  space-y-2
                "
              >
                <span
                  className="
                    text-xs
                    text-white/50
                  "
                >
                  Icon
                </span>

                <select
                  value={
                    form.payload
                      .icon ||
                    "BsGrid"
                  }
                  onChange={(
                    event,
                  ) =>
                    updatePayload(
                      "icon",
                      event
                        .target
                        .value,
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-3
                  "
                >
                  <option>
                    BsGrid
                  </option>

                  <option>
                    BsCpu
                  </option>

                  <option>
                    BsBriefcase
                  </option>

                  <option>
                    BsTrophy
                  </option>

                  <option>
                    BsHeart
                  </option>

                  <option>
                    BsCamera
                  </option>
                </select>
              </label>

              <label
                className="
                  space-y-2
                "
              >
                <span
                  className="
                    text-xs
                    text-white/50
                  "
                >
                  Link Override
                </span>

                <input
                  value={
                    form.payload
                      .link ||
                    ""
                  }
                  onChange={(
                    event,
                  ) =>
                    updatePayload(
                      "link",
                      event
                        .target
                        .value,
                    )
                  }
                  placeholder="/category/technology"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-3
                  "
                />
              </label>
            </div>
          )}

          <label
            className="
              flex
              items-center
              gap-3
              text-sm
              text-white/70
            "
          >
            <input
              type="checkbox"
              checked={
                form.isActive
              }
              onChange={(
                event,
              ) =>
                updateField(
                  "isActive",
                  event.target
                    .checked,
                )
              }
            />

            Aktifkan di halaman
            Home
          </label>

          <button
            type="submit"
            disabled={
              saving ||
              uploading
            }
            className="
              rounded-2xl
              bg-white
              px-6
              py-3
              text-sm
              font-semibold
              text-black
              disabled:opacity-40
            "
          >
            {saving
              ? "Menyimpan..."
              : "Simpan Placement"}
          </button>
        </form>
      )}

      {loading ? (
        <div
          className="
            rounded-3xl
            border
            border-white/10
            bg-white/5
            p-10
            text-center
            text-white/50
          "
        >
          Memuat Home CMS...
        </div>
      ) : filteredItems.length ===
        0 ? (
        <div
          className="
            rounded-3xl
            border
            border-dashed
            border-white/10
            p-10
            text-center
            text-white/45
          "
        >
          Belum ada item
          untuk placement
          ini.
        </div>
      ) : (
        <div
          className="
            grid
            gap-4
            lg:grid-cols-2
          "
        >
          {filteredItems.map(
            (
              item,
            ) => (
              <article
                key={
                  item.id
                }
                className="
                  overflow-hidden
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                "
              >
                {item.image && (
                  <img
                    src={resolveMediaUrl(
                      item.image,
                    )}
                    alt={
                      item.title
                    }
                    className="
                      h-44
                      w-full
                      object-cover
                    "
                  />
                )}

                <div
                  className="
                    p-5
                  "
                >
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >
                    <div>
                      <p
                        className="
                          text-xs
                          uppercase
                          tracking-[0.25em]
                          text-white/40
                        "
                      >
                        {
                          item.placement
                        }
                      </p>

                      <h3
                        className="
                          mt-2
                          text-lg
                          font-semibold
                        "
                      >
                        {
                          item.title
                        }
                      </h3>
                    </div>

                    <span
                      className={`
                        rounded-full
                        px-3
                        py-1
                        text-[10px]
                        uppercase
                        tracking-wider
                        ${
                          item.isActive
                            ? "bg-emerald-400/15 text-emerald-200"
                            : "bg-white/10 text-white/40"
                        }
                      `}
                    >
                      {item.isActive
                        ? "Active"
                        : "Hidden"}
                    </span>
                  </div>

                  <p
                    className="
                      mt-2
                      text-sm
                      text-white/50
                    "
                  >
                    Order{" "}
                    {
                      item.order
                    }

                    {" · "}

                    {
                      item.key
                    }
                  </p>

                  <div
                    className="
                      mt-4
                      flex
                      gap-2
                    "
                  >
                    <button
                      type="button"
                      onClick={() =>
                        startEdit(
                          item,
                        )
                      }
                      className="
                        rounded-xl
                        bg-white
                        px-4
                        py-2
                        text-xs
                        font-semibold
                        text-black
                      "
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          item,
                        )
                      }
                      className="
                        rounded-xl
                        border
                        border-red-400/20
                        px-4
                        py-2
                        text-xs
                        text-red-200
                      "
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ),
          )}
        </div>
      )}
    </section>
  );
}