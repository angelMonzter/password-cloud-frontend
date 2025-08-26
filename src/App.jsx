import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import SignIn from "./pages/Sign-in";
import SignUp from "./pages/Sing-up";
import Password from "./pages/Password";
import Profile from "./pages/Profile";
import PasswordRecobery from "./pages/passwordRecobery";
import PrivateRoute from "./config/PrivateRoute"

export default function App() {
    return (
      <Routes>
          {/* Página inicial con animación */}
          <Route path="/" element={<Home />} />

          {/* Páginas públicas */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/password" element={<Password />} />
          <Route path="/password-recobery" element={<PasswordRecobery />} />

          {/* Área protegida que usa layout */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
      </Routes>
    );
}

