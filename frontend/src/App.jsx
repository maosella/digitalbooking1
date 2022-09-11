import Layout from "./components/layout";
import {
  Home,
  LoginPage,
  Product,
  SignupPage,
  NotFound,
  Booking,
  ReservationSuccess,
  CreateProduct,
  ProductSuccess,
  Validate,
  YourFavorites,
  YourReservations,
  CheckEmail,
} from "./pages";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./context";

function App() {
  const { currentUser } = useAuth();

  const PrivateWrapper = () => {
    if (currentUser) {
      return <Outlet />;
    }
    return <Navigate to="/login" />;
  };

  const PublicWrapper = () => {
    if (!currentUser) {
      return <Outlet />;
    }
    return <Navigate to="/" />;
  };

  return (
    <>
      <Layout>
        <Routes>
          <Route element={<PublicWrapper />}>
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/signup" element={<SignupPage />} />
            <Route
              path="/checkemail"
              element={
                <CheckEmail title={"¡Muchas gracias por registrarse!"} />
              }
            />
            <Route
              path="/notvalidated"
              element={<CheckEmail title={"¡Recuerde validar su correo!"} />}
            />
            <Route path="/validate" element={<Validate />} />
          </Route>

          <Route element={<PrivateWrapper />}>
            <Route path="/products/reservation/:id" element={<Booking />} />
            <Route
              path="/reservationsuccess"
              element={<ReservationSuccess />}
            />
            <Route path="/productsuccess" element={<ProductSuccess />} />
            <Route path="/yourfavourites" element={<YourFavorites />} />
            <Route path="/yourreservations" element={<YourReservations />} />
            <Route path="/createproduct" element={<CreateProduct />} />
          </Route>

          <Route path="/products/:id" element={<Product />} />
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
