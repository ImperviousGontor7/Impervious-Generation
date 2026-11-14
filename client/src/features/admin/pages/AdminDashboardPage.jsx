import { useEffect, useState } from "react";
import adminApi from "../services/adminApi.js";

function StatCard({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <p className="text-sm text-white/55">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await adminApi.getOverview();
        if (mounted) setOverview(data);
      } catch (error) {
        if (mounted) {
          setMessage(
            error?.response?.data?.message ||
              "Gagal mengambil overview admin"
          );
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const totals = overview?.totals || {};

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-white/45">
          Admin Dashboard
        </p>
        <h1 className="mt-2 text-3xl font-semibold">Ringkasan sistem</h1>
        <p className="mt-2 text-sm text-white/60">
          Statistik utama untuk user, news, agenda, gallery, forum, dan contact.
        </p>
      </div>

      {message && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {message}
        </div>
      )}

      {loading ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">
          Loading overview...
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard label="Users" value={totals.users ?? 0} />
          <StatCard label="News" value={totals.news ?? 0} />
          <StatCard label="Agendas" value={totals.agendas ?? 0} />
          <StatCard label="Galleries" value={totals.galleries ?? 0} />
          <StatCard label="Forums" value={totals.forums ?? 0} />
          <StatCard label="Contact Messages" value={totals.contactMessages ?? 0} />
        </div>
      )}
    </section>
  );
}