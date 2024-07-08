import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import FaceMoisturizers from "./pages/FaceMoisturizers";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <FaceMoisturizers />,
      },
      // {
      //   path: "/:category",
      //   element: <CategoryPage />,
      // },
      // {
      //   path: "/product/:slug",
      //   element: <SingleProduct />,
      // },
      // {
      //   path: "/checkout",
      //   element: <Checkout />,
      // },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
