import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="hidden bg-blue-600 p-12 lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-100">
              PABWE 2026
            </p>

            <h1 className="mt-6 max-w-lg text-5xl font-bold leading-tight">
              Delcom Lost & Found
            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-blue-100">
              Kelola laporan barang hilang dan ditemukan dengan lebih mudah,
              cepat, dan terorganisir.
            </p>
          </div>

          <p className="text-sm text-blue-100">
            Institut Teknologi Del
          </p>
        </section>

        <section className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </section>
      </div>
    </main>
  );
};

export default AuthLayout;