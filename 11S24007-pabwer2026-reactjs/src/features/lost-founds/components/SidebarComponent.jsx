import {
  FiHome,
  FiPlusCircle,
  FiUser,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

const SidebarComponent = ({ onAdd }) => {
  const menus = [
    {
      label: "Dashboard",
      path: "/",
      icon: FiHome,
    },
    {
      label: "Profile Saya",
      path: "/profile",
      icon: FiUser,
    },
  ];

  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:block">
      <div className="sticky top-16 p-4">
        <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
          Menu
        </p>

        <nav className="space-y-1">
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.path}
                to={menu.path}
                end={menu.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <Icon aria-hidden="true" />
                {menu.label}
              </NavLink>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={onAdd}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <FiPlusCircle aria-hidden="true" />
          Tambah Laporan
        </button>
      </div>
    </aside>
  );
};

export default SidebarComponent;