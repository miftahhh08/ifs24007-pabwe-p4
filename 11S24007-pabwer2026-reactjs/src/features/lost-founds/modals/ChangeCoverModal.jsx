import { useEffect, useState } from "react";
import { FiImage, FiUpload, FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";

import { asyncLostFoundChangeCover } from "../states/lostFoundThunks";

import {
  showErrorDialog,
  showSuccessDialog,
} from "../../../helpers/toolsHelper";

const ChangeCoverModal = ({
  isOpen,
  onClose,
  lostFound,
  onSuccess,
}) => {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  useEffect(() => {
    if (!isOpen) {
      setFile(null);
      setPreview("");
    }
  }, [isOpen]);

  if (!isOpen || !lostFound) {
    return null;
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    setFile(selectedFile);

    const objectUrl =
      URL.createObjectURL(selectedFile);

    setPreview(objectUrl);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      await showErrorDialog(
        "Silakan pilih gambar terlebih dahulu."
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();

      formData.append("cover", file);

      await dispatch(
        asyncLostFoundChangeCover(
          lostFound.id,
          formData
        )
      );

      await showSuccessDialog(
        "Cover laporan berhasil diperbarui."
      );

      onClose();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      await showErrorDialog(
        error?.message ||
          "Gagal mengubah cover laporan."
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
              Ganti Cover
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Upload foto barang untuk laporan ini.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100"
            aria-label="Tutup modal"
          >
            <FiX size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          {/* PREVIEW */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            {preview ? (
              <img
                src={preview}
                alt="Preview cover"
                className="h-64 w-full object-cover"
              />
            ) : (
              <div className="flex h-64 flex-col items-center justify-center text-slate-400">
                <FiImage size={48} />

                <p className="mt-3 text-sm">
                  Preview gambar akan muncul di sini
                </p>
              </div>
            )}
          </div>

          {/* FILE */}
          <label
            htmlFor="cover-file"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 px-4 py-4 text-sm font-semibold text-slate-600 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
          >
            <FiUpload />

            {file
              ? file.name
              : "Pilih gambar"}

            <input
              id="cover-file"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="sr-only"
            />
          </label>

          {/* BUTTON */}
          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Mengunggah..."
                : "Upload Cover"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeCoverModal;