import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  HashRouter,
} from "react-router-dom";
import { Main } from "../main/main";
import { Login } from "../../pages/login/login";
import { Register } from "../../pages/register/register";
import { ResetPassword } from "../../pages/reset-password/reset-password";
import { ForgotPassword } from "../../pages/forgot-password/forgot-password";
import { Ingredients } from "../../pages/ingredients/ingredients";
import Profile from "../../pages/profile/profile";
import ProtectedRouteElement from "../ProtectedRouteElement";
import Modal from "../modal/modal";
import IngredientDetails from "../details/ingredient-details";
import OrdersFeed from "../../pages/orders-feed/orders-feed";
import OrderList from "../../pages/order-list/order-list";
import { Layout } from "../layout/layout";
import { useEffect } from "react";
import { getUserData } from "../../services/userSlice";
import OrderListProfile from "../../pages/order-list/order-list-profile";
import { useAppDispatch } from "../../hooks/hook";

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const background = location.state?.background;

  const handleModalClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // @ts-ignore
      dispatch(getUserData(token.replace("Bearer ", "")));
    }
  }, [dispatch]);

  return (
    <>
      <Routes location={background || location}>
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
        <Route path="feed" element={<OrdersFeed />} />
        <Route
          path="feed/:id"
          element={
            <Layout>
              <OrderList />
            </Layout>
          }
        />
        <Route
          path="profile/orders/:id"
          element={
            <Layout>
              <OrderListProfile />
            </Layout>
          }
        />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="ingredients/:id"
            element={
              <Modal header="Ингредиенты" onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="feed/:id"
            element={
              <Modal header="" onClose={handleModalClose}>
                <OrderList />
              </Modal>
            }
          />
          <Route
            path="profile/orders/:id"
            element={
              <Modal header="" onClose={handleModalClose}>
                <OrderList />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </DndProvider>
  );
}

export default App;
