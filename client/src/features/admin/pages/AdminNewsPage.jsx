import {
    useCallback,
    useEffect,
    useState,
} from "react";

import newsApi from "../../news/services/newsApi.js";

import NewsEditor from "../components/NewsEditor.jsx";

const EMPTY_FORM = {
    id: null,

    title: "",

    slug: "",

    excerpt: "",

    content: "",

    thumbnail: "",

    banner: "",

    metaTitle: "",

    metaDescription: "",

    categoryId: "",

    status: "DRAFT",
};

export default function AdminNewsPage() {
    const [
        items,
        setItems,
    ] = useState([]);

    const [
        pagination,
        setPagination,
    ] = useState(null);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        saving,
        setSaving,
    ] = useState(false);

    const [
        error,
        setError,
    ] = useState("");

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

    const loadNews =
        useCallback(
            async (
                page = 1,
            ) => {
                setLoading(
                    true,
                );

                setError(
                    "",
                );

                try {
                    const result =
                        await newsApi.getAdminNews(
                            {
                                page,

                                limit: 10,
                            },
                        );

                    setItems(
                        result.items ||
                        [],
                    );

                    setPagination(
                        result.pagination ||
                        null,
                    );
                } catch (
                requestError
                ) {
                    setError(
                        requestError
                            ?.response
                            ?.data
                            ?.message ||
                        requestError?.message ||
                        "Gagal memuat news.",
                    );
                } finally {
                    setLoading(
                        false,
                    );
                }
            },
            [],
        );

    useEffect(() => {
        loadNews();
    }, [
        loadNews,
    ]);

    function handleCreate() {
        setForm(
            {
                ...EMPTY_FORM,
            },
        );

        setEditing(
            true,
        );

        setError(
            "",
        );
    }

    function handleEdit(
        item,
    ) {
        setForm({
            id:
                item.id,

            title:
                item.title ||
                "",

            slug:
                item.slug ||
                "",

            excerpt:
                item.excerpt ||
                "",

            content:
                item.content ||
                "",

            thumbnail:
                item.thumbnail ||
                "",

            banner:
                item.banner ||
                "",

            metaTitle:
                item.metaTitle ||
                "",

            metaDescription:
                item.metaDescription ||
                "",

            categoryId:
                item.categoryId ||
                "",

            status:
                item.status ||
                "DRAFT",
        });

        setEditing(
            true,
        );

        setError(
            "",
        );
    }

    async function handleSave(
        payload,
    ) {
        setSaving(
            true,
        );

        setError(
            "",
        );

        try {
            if (form.id) {
                await newsApi.updateNews(
                    form.id,
                    payload,
                );
            } else {
                await newsApi.createNews(
                    payload,
                );
            }

            setEditing(
                false,
            );

            setForm(
                {
                    ...EMPTY_FORM,
                },
            );

            await loadNews(
                pagination?.page ||
                1,
            );
        } catch (
        requestError
        ) {
            const message =
                requestError
                    ?.response
                    ?.data
                    ?.message ||
                requestError?.message ||
                "Gagal menyimpan news.";

            setError(
                message,
            );

            throw requestError;
        } finally {
            setSaving(
                false,
            );
        }
    }

    async function handleDelete(
        id,
    ) {
        const confirmed =
            window.confirm(
                "Hapus news ini?",
            );

        if (!confirmed) {
            return;
        }

        try {
            await newsApi.deleteNews(
                id,
            );

            await loadNews(
                pagination?.page ||
                1,
            );
        } catch (
        requestError
        ) {
            setError(
                requestError
                    ?.response
                    ?.data
                    ?.message ||
                "Gagal menghapus news.",
            );
        }
    }

    async function handlePublish(
        id,
    ) {
        try {
            await newsApi.publishNews(
                id,
            );

            await loadNews(
                pagination?.page ||
                1,
            );
        } catch (
        requestError
        ) {
            setError(
                requestError
                    ?.response
                    ?.data
                    ?.message ||
                "Gagal menerbitkan news.",
            );
        }
    }

    async function handleDraft(
        id,
    ) {
        try {
            await newsApi.draftNews(
                id,
            );

            await loadNews(
                pagination?.page ||
                1,
            );
        } catch (
        requestError
        ) {
            setError(
                requestError
                    ?.response
                    ?.data
                    ?.message ||
                "Gagal mengubah news menjadi draft.",
            );
        }
    }

    if (editing) {
        return (
            <section className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-white/45">
                            Admin News
                        </p>

                        <h1 className="mt-2 text-3xl font-semibold">
                            {form.id
                                ? "Edit News"
                                : "Buat News"}
                        </h1>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            setEditing(
                                false,
                            )
                        }
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/70 hover:bg-white/10"
                    >
                        Kembali
                    </button>
                </div>

                {error && (
                    <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                        {error}
                    </div>
                )}

                <NewsEditor
                    initialValue={
                        form
                    }
                    saving={
                        saving
                    }
                    onSubmit={
                        handleSave
                    }
                />
            </section>
        );
    }

    return (
        <section className="space-y-6">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-white/45">
                        Content Management
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold">
                        News
                    </h1>

                    <p className="mt-2 text-sm text-white/55">
                        Kelola artikel, thumbnail,
                        banner, status, dan metadata.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={
                        handleCreate
                    }
                    className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black"
                >
                    + Buat News
                </button>
            </header>

            {error && (
                <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {error}
                </div>
            )}

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                {loading ? (
                    <div className="p-10 text-center text-sm text-white/45">
                        Memuat news...
                    </div>
                ) : items.length === 0 ? (
                    <div className="p-10 text-center text-sm text-white/45">
                        Belum ada news.
                    </div>
                ) : (
                    <div className="divide-y divide-white/10">
                        {items.map(
                            (
                                item,
                            ) => (
                                <article
                                    key={
                                        item.id
                                    }
                                    className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between"
                                >
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold">
                                                {
                                                    item.status
                                                }
                                            </span>

                                            {item.category && (
                                                <span className="text-xs text-white/40">
                                                    {
                                                        item
                                                            .category
                                                            .name
                                                    }
                                                </span>
                                            )}
                                        </div>

                                        <h2 className="mt-2 truncate text-lg font-semibold">
                                            {
                                                item.title
                                            }
                                        </h2>

                                        <p className="mt-1 text-sm text-white/45">
                                            {item.slug}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleEdit(
                                                    item,
                                                )
                                            }
                                            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold hover:bg-white/10"
                                        >
                                            Edit
                                        </button>

                                        {item.status ===
                                            "PUBLISHED" ? (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDraft(
                                                        item.id,
                                                    )
                                                }
                                                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold"
                                            >
                                                Draft
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handlePublish(
                                                        item.id,
                                                    )
                                                }
                                                className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-black"
                                            >
                                                Publish
                                            </button>
                                        )}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDelete(
                                                    item.id,
                                                )
                                            }
                                            className="rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-200"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </article>
                            ),
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}