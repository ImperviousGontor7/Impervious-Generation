import MediaLibrary from "../components/MediaLibrary.jsx";

export default function AdminMediaPage() {
    return (
        <section className="space-y-6">
            <header>
                <p className="text-sm uppercase tracking-[0.3em] text-white/45">
                    Admin Media
                </p>

                <h1 className="mt-2 text-3xl font-semibold">
                    Media Management
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
                    Kelola seluruh file yang digunakan CMS:
                    image, document, avatar, dan gallery.
                </p>
            </header>

            <MediaLibrary />
        </section>
    );
}