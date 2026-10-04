import { Navigate, Route, Routes } from "react-router-dom";

import AuthLayout from "../features/auth/layouts/AuthLayout";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";

import ProfilePage from "../features/users/pages/ProfilePage";

import LostFoundLayout from "../features/lost-founds/layouts/LostFoundLayout";
import HomePage from "../features/lost-founds/pages/HomePage";
import DetailPage from "../features/lost-founds/pages/DetailPage";

function App() {
  return (
    <Routes>
      {/* Authentication */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Lost & Found */}
      <Route element={<LostFoundLayout />}>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/lost-founds/:id"
          element={<DetailPage />}
        />

        <Route
          path="/profile"
          element={<ProfilePage />}
        />
      </Route>

      {/* Halaman tidak ditemukan */}
      <Route
        path="*"
        element={<Navigate to="/auth/login" replace />}
      />
    </Routes>
  );
}

export default App;