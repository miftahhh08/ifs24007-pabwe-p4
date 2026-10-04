import { Navigate, Outlet } from "react-router-dom";

const LostFoundLayout = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Outlet />
    </div>
  );
};

export default LostFoundLayout;