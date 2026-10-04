import Swal from "sweetalert2";

/**
 * Menampilkan dialog sukses.
 */
export const showSuccessDialog = (message, title = "Berhasil") => {
  return Swal.fire({
    icon: "success",
    title,
    text: message,
    confirmButtonText: "OK",
  });
};

/**
 * Menampilkan dialog error.
 */
export const showErrorDialog = (message, title = "Terjadi Kesalahan") => {
  return Swal.fire({
    icon: "error",
    title,
    text: message,
    confirmButtonText: "OK",
  });
};

/**
 * Menampilkan dialog konfirmasi.
 */
export const showConfirmDialog = async (
  message,
  title = "Konfirmasi"
) => {
  const result = await Swal.fire({
    icon: "warning",
    title,
    text: message,
    showCancelButton: true,
    confirmButtonText: "Ya",
    cancelButtonText: "Batal",
    reverseButtons: true,
  });

  return result.isConfirmed;
};

/**
 * Memformat tanggal menjadi format Indonesia.
 */
export const formatDate = (
  date,
  options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }
) => {
  if (!date) {
    return "-";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("id-ID", options).format(parsedDate);
};