import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import AuthLayout from "./features/auth/layouts/AuthLayout";
import LostFoundLayout from "./features/lost-founds/layouts/LostFoundLayout";

const LoginPage = lazy(() => import("./features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("./features/auth/pages/RegisterPage"));
const ProfilePage = lazy(() => import("./features/users/pages/ProfilePage"));
const HomePage = lazy(() => import("./features/lost-founds/pages/HomePage"));
const DetailPage = lazy(() => import("./features/lost-founds/pages/DetailPage"));

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        {/* Authentication */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        {/* Lost & Found */}
        <Route element={<LostFoundLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/lost-founds/:id" element={<DetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Halaman tidak ditemukan */}
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;