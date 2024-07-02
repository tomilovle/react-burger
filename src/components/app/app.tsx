import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "../main/main";
import { Login } from "../../pages/login/login";
import { Register } from "../../pages/register/register";
import { ResetPassword } from "../../pages/reset-password/reset-password";
import { ForgotPassword } from "../../pages/forgot-password/forgot-password";
import { Ingredients } from "../../pages/ingredients/ingredients";
import Profile from "../../pages/profile/profile";
import ProtectedRouteElement from "../ProtectedRouteElement";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/login"
            element={
              <ProtectedRouteElement forAuth={true}>
                <Login />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRouteElement forAuth={true}>
                <Register />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRouteElement forAuth={true}>
                <ResetPassword />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRouteElement forAuth={true}>
                <ForgotPassword />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/profile/*"
            element={
              <ProtectedRouteElement>
                <Profile />
              </ProtectedRouteElement>
            }
          />
          <Route path="ingredients/:id" element={<Ingredients />} />
        </Routes>
      </BrowserRouter>
    </DndProvider>
  );
}

export default App;
