import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";

import { asyncLostFoundChange } from "../states/lostFoundThunks";

import {
  showErrorDialog,
  showSuccessDialog,
} from "../../../helpers/toolsHelper";

const ChangeModal = ({
  isOpen,
  onClose,
  lostFound,
  onSuccess,
}) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "lost",
    is_completed: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!lostFound) {
      return;
    }

    setForm({
      title: lostFound.title || "",
      description: lostFound.description || "",
      status: lostFound.status || "lost",
      is_completed:
        lostFound.is_completed === true ||
        lostFound.is_completed === 1,
    });
  }, [lostFound]);

  if (!isOpen || !lostFound) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCompletedChange = (event) => {
    setForm((previous) => ({
      ...previous,
      is_completed: event.target.checked,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      await showErrorDialog(
        "Judul laporan wajib diisi."
      );
      return;
    }

    if (!form.description.trim()) {
      await showErrorDialog(
        "Deskripsi laporan wajib diisi."
      );
      return;
    }

    try {
      setIsSubmitting(true);

      await dispatch(
        asyncLostFoundChange(lostFound.id, {
          title: form.title.trim(),
          description: form.description.trim(),
          status: form.status,
          is_completed: form.is_completed ? 1 : 0,
        })
      );

      await showSuccessDialog(
        "Laporan berhasil diperbarui."
      );

      onClose();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      await showErrorDialog(
        error?.message ||
          "Gagal memperbarui laporan."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Ubah Laporan
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Perbarui informasi laporan barang.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Tutup modal"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          {/* TITLE */}
          <div>
            <label
              htmlFor="change-title"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Judul Laporan
            </label>

            <input
              id="change-title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label
              htmlFor="change-description"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Deskripsi
            </label>

            <textarea
              id="change-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* STATUS */}
          <div>
            <label
              htmlFor="change-status"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Jenis Laporan
            </label>

            <select
              id="change-status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="lost">
                Barang Hilang
              </option>

              <option value="found">
                Barang Ditemukan
              </option>
            </select>
          </div>

          {/* COMPLETED */}
          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Laporan Selesai
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Tandai jika barang sudah kembali kepada
                pemilik atau laporan sudah selesai.
              </p>
            </div>

            <input
              type="checkbox"
              checked={form.is_completed}
              onChange={handleCompletedChange}
              className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
          </label>

          {/* BUTTON */}
          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Menyimpan..."
                : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeModal;