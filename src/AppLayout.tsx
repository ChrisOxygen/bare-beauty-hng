import { Outlet } from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import { useAppDispatch } from "./hooks";
import { useEffect } from "react";
import { getLocalCart } from "./features/productsSlice";

function AppLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLocalCart());
  }, [dispatch]);
  return (
    <div className="layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AppLayout;
