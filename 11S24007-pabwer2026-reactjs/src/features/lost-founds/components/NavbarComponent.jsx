import { FiLogOut, FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { asyncAuthLogout } from "../../auth/states/authThunks";

const NavbarComponent = ({ search, setSearch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(asyncAuthLogout());
    navigate("/auth/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
        <div className="shrink-0">
          <h1 className="text-lg font-bold text-slate-900">
            Delcom Lost & Found
          </h1>

          <p className="hidden text-xs text-slate-500 sm:block">
            Temukan dan laporkan barang dengan mudah
          </p>
        </div>

        <div className="hidden max-w-md flex-1 md:block">
          <div className="relative">
            <FiSearch
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari laporan..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="ml-auto flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-red-50 hover:text-red-600"
        >
          <FiLogOut aria-hidden="true" />
          <span className="hidden sm:inline">Keluar</span>
        </button>
      </div>
    </header>
  );
};

export default NavbarComponent;