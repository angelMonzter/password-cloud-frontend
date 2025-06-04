import { Routes, Route, Navigate, useLocation, BrowserRouter } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import SignIn from "@/pages/sign-in";
import SignUp from "@/pages/sign-up";
import Home from "@/pages/home";
import Profile from "@/pages/profile";
import Acount from "@/pages/acount";
import Password from "@/pages/password";
import Recoberypassword from "@/pages/passwordRecobery";
import routes from "@/routes";
import { AuthProvider } from "./context/AuthProvider";
import { AcountProvider } from "./context/AcountProvider";
import { CategoryProvider } from "./context/CategoryProvider";
import RutaProtegida from "./layout/RutaProtegida";

function App() {
  const { pathname } = useLocation();

  return (
      <AuthProvider>
        <AcountProvider>
          <CategoryProvider>
            
            {!(pathname == '/sign-in' || pathname == '/sign-up') && (
              <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
              </div>
            )
            }
            <Routes>

              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/acount/:token" element={<Acount />} />
              <Route path="/password" element={<Password />} />
              <Route path="/password-recobery/:token" element={<Recoberypassword />} />

              <Route path="/profile" element={<RutaProtegida />}> 
                <Route index element={<Profile />} />
              </Route>

            </Routes>

          </CategoryProvider>
        </AcountProvider>
      </AuthProvider>
  );
}

export default App;
