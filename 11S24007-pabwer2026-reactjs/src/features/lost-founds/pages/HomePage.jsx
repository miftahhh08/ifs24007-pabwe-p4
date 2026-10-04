import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiCheckCircle,
  FiPackage,
  FiSearch,
  FiChevronRight,
  FiPlus,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import NavbarComponent from "../components/NavbarComponent";
import SidebarComponent from "../components/SidebarComponent";
import AddModal from "../modals/AddModal";

import { asyncLostFoundGet } from "../states/lostFoundThunks";
import { showErrorDialog } from "../../../helpers/toolsHelper";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { lostFounds } = useSelector(
    (state) => state.lostFounds
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const loadLostFounds = async () => {
    try {
      setIsLoading(true);

      await dispatch(asyncLostFoundGet());
    } catch (error) {
      await showErrorDialog(
        error?.message ||
          "Gagal mengambil data Lost & Found."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLostFounds();
  }, [dispatch]);

  const filteredLostFounds = useMemo(() => {
    return lostFounds.filter((item) => {
      const keyword = search.toLowerCase().trim();

      const searchableText = [
        item?.title,
        item?.description,
        item?.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !keyword ||
        searchableText.includes(keyword);

      const matchesStatus =
        statusFilter === "all" ||
        item?.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [lostFounds, search, statusFilter]);

  const total = lostFounds.length;

  const lostCount = lostFounds.filter(
    (item) => item?.status === "lost"
  ).length;

  const foundCount = lostFounds.filter(
    (item) => item?.status === "found"
  ).length;

  const completedCount = lostFounds.filter(
    (item) =>
      item?.is_completed === true ||
      item?.is_completed === 1
  ).length;

  const statistics = [
    {
      label: "Total Laporan",
      value: total,
      icon: FiPackage,
    },
    {
      label: "Barang Hilang",
      value: lostCount,
      icon: FiPackage,
    },
    {
      label: "Barang Ditemukan",
      value: foundCount,
      icon: FiCheckCircle,
    },
    {
      label: "Selesai",
      value: completedCount,
      icon: FiCheckCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <NavbarComponent
        search={search}
        setSearch={setSearch}
      />

      <div className="flex">
        <SidebarComponent
          onAdd={() => setIsAddModalOpen(true)}
        />

        <main className="min-w-0 flex-1 p-4 sm:p-6">
          <div className="mx-auto max-w-7xl">

            {/* HEADER */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  Dashboard
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  Lost & Found
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Kelola laporan barang hilang dan ditemukan
                  di lingkungan Delcom.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
              >
                <FiPlus aria-hidden="true" />
                Tambah Laporan
              </button>
            </div>

            {/* STATISTICS */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {statistics.map((statistic) => {
                const Icon = statistic.icon;

                return (
                  <div
                    key={statistic.label}
                    className="rounded-2xl bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-500">
                          {statistic.label}
                        </p>

                        <p className="mt-2 text-3xl font-bold text-slate-900">
                          {statistic.value}
                        </p>
                      </div>

                      <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                        <Icon
                          aria-hidden="true"
                          size={22}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* DAFTAR LAPORAN */}
            <section className="mt-6 rounded-2xl bg-white shadow-sm">
              <div className="border-b border-slate-100 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Daftar Laporan
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {filteredLostFounds.length} laporan
                      ditampilkan
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[
                      ["all", "Semua"],
                      ["lost", "Hilang"],
                      ["found", "Ditemukan"],
                    ].map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          setStatusFilter(value)
                        }
                        className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                          statusFilter === value
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SEARCH MOBILE */}
                <div className="relative mt-4 md:hidden">
                  <FiSearch
                    aria-hidden="true"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="search"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Cari laporan..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                {isLoading ? (
                  <div className="py-12 text-center text-sm text-slate-500">
                    Memuat laporan...
                  </div>
                ) : filteredLostFounds.length === 0 ? (
                  <div className="py-12 text-center">
                    <FiPackage
                      className="mx-auto text-slate-300"
                      size={42}
                    />

                    <p className="mt-4 font-semibold text-slate-700">
                      Belum ada laporan
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Data laporan Lost & Found akan muncul
                      di sini.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setIsAddModalOpen(true)
                      }
                      className="mx-auto mt-5 flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      <FiPlus />
                      Tambah Laporan
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {filteredLostFounds.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          navigate(
                            `/lost-founds/${item.id}`
                          )
                        }
                        className="group w-full rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-300 hover:shadow-md"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h4 className="truncate font-bold text-slate-900">
                              {item.title ||
                                "Tanpa judul"}
                            </h4>

                            <p className="mt-2 line-clamp-3 text-sm text-slate-500">
                              {item.description ||
                                "Tidak ada deskripsi."}
                            </p>
                          </div>

                          <span
                            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                              item.status === "lost"
                                ? "bg-red-50 text-red-600"
                                : "bg-green-50 text-green-600"
                            }`}
                          >
                            {item.status === "lost"
                              ? "Hilang"
                              : "Ditemukan"}
                          </span>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                          <span className="text-xs font-semibold text-slate-400">
                            Lihat detail laporan
                          </span>

                          <FiChevronRight
                            aria-hidden="true"
                            className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600"
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* MODAL TAMBAH LAPORAN */}
      <AddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={loadLostFounds}
      />
    </div>
  );
};

export default HomePage;