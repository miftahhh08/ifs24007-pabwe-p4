import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiEdit,
  FiImage,
  FiPackage,
  FiTrash2,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ChangeModal from "../modals/ChangeModal";
import ChangeCoverModal from "../modals/ChangeCoverModal";

import {
  asyncLostFoundDelete,
  asyncLostFoundGetDetail,
} from "../states/lostFoundThunks";

import {
  showConfirmDialog,
  showErrorDialog,
  showSuccessDialog,
} from "../../../helpers/toolsHelper";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { lostFound } = useSelector(
    (state) => state.lostFounds
  );

  const [isLoading, setIsLoading] = useState(true);
  const [isChangeModalOpen, setIsChangeModalOpen] =
    useState(false);
  const [isCoverModalOpen, setIsCoverModalOpen] =
    useState(false);

  const loadDetail = async () => {
    try {
      setIsLoading(true);

      await dispatch(asyncLostFoundGetDetail(id));
    } catch (error) {
      await showErrorDialog(
        error?.message ||
          "Gagal mengambil detail laporan."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDetail();
  }, [dispatch, id]);

  const handleDelete = async () => {
    const confirmed = await showConfirmDialog(
      "Apakah kamu yakin ingin menghapus laporan ini?",
      "Hapus Laporan"
    );

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(asyncLostFoundDelete(id));

      await showSuccessDialog(
        "Laporan berhasil dihapus."
      );

      navigate("/");
    } catch (error) {
      await showErrorDialog(
        error?.message ||
          "Gagal menghapus laporan."
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-sm text-slate-500">
          Memuat detail laporan...
        </p>
      </div>
    );
  }

  if (!lostFound) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="text-center">
          <FiPackage
            size={48}
            className="mx-auto text-slate-300"
          />

          <h2 className="mt-4 text-xl font-bold text-slate-900">
            Laporan tidak ditemukan
          </h2>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  const isCompleted =
    lostFound.is_completed === true ||
    lostFound.is_completed === 1;

  const status =
    lostFound.status === "lost"
      ? "Hilang"
      : "Ditemukan";

  return (
    <div className="min-h-screen bg-slate-100">
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            <FiArrowLeft aria-hidden="true" />
            Kembali
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setIsChangeModalOpen(true)
              }
              className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
            >
              <FiEdit aria-hidden="true" />
              <span className="hidden sm:inline">
                Edit
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                setIsCoverModalOpen(true)
              }
              className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-200"
            >
              <FiImage aria-hidden="true" />
              <span className="hidden sm:inline">
                Cover
              </span>
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
            >
              <FiTrash2 aria-hidden="true" />
              <span className="hidden sm:inline">
                Hapus
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="mx-auto max-w-6xl p-4 sm:p-6">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="grid md:grid-cols-2">
            {/* COVER */}
            <div className="flex min-h-80 items-center justify-center bg-slate-100">
              {lostFound.cover ? (
                <img
                  src={lostFound.cover}
                  alt={
                    lostFound.title ||
                    "Foto barang"
                  }
                  className="h-full max-h-[520px] w-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <FiPackage
                    size={64}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-3 text-sm text-slate-400">
                    Tidak ada foto barang
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setIsCoverModalOpen(true)
                    }
                    className="mt-4 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Tambah Foto
                  </button>
                </div>
              )}
            </div>

            {/* DETAIL */}
            <div className="p-6 sm:p-8">
              {/* STATUS */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                    lostFound.status === "lost"
                      ? "bg-red-50 text-red-600"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  {status}
                </span>

                {isCompleted && (
                  <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                    Selesai
                  </span>
                )}
              </div>

              {/* TITLE */}
              <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
                {lostFound.title ||
                  "Tanpa judul"}
              </h1>

              {/* DESCRIPTION */}
              <div className="mt-6">
                <p className="text-sm font-semibold text-slate-700">
                  Deskripsi
                </p>

                <p className="mt-2 text-sm leading-7 text-slate-500">
                  {lostFound.description ||
                    "Tidak ada deskripsi."}
                </p>
              </div>

              {/* INFORMATION */}
              <div className="mt-6 space-y-4 border-t border-slate-100 pt-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Lokasi
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    {lostFound.location || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Tanggal Dibuat
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    {lostFound.created_at || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Status Laporan
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {isCompleted
                      ? "Laporan sudah selesai"
                      : "Laporan masih aktif"}
                  </p>
                </div>
              </div>

              {/* ACTION */}
              <div className="mt-8 border-t border-slate-100 pt-6">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() =>
                      setIsChangeModalOpen(true)
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    <FiEdit />
                    Ubah Laporan
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setIsCoverModalOpen(true)
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <FiImage />
                    Ganti Cover
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* CHANGE MODAL */}
      <ChangeModal
        isOpen={isChangeModalOpen}
        onClose={() =>
          setIsChangeModalOpen(false)
        }
        lostFound={lostFound}
        onSuccess={loadDetail}
      />

      {/* COVER MODAL */}
      <ChangeCoverModal
        isOpen={isCoverModalOpen}
        onClose={() =>
          setIsCoverModalOpen(false)
        }
        lostFound={lostFound}
        onSuccess={loadDetail}
      />
    </div>
  );
};

export default DetailPage;