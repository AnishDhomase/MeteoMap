import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

import SearchedLocationContext from "./context/SearchedLocationContext";
import SettingsContext from "./context/SettingsContext";
import PageLoader from "./components/utils/pageLoader/PageLoader";
const Main = lazy(() => import("./pages/main/Main"));
const Authorization = lazy(() => import("./pages/authorization/Authorization"));

// Routing Of App
const router = createBrowserRouter([
  { path: "/", element: <Main /> },
  { path: "/authorization", element: <Authorization /> },
]);

// Local Storage
localStorage.setItem("userDetails", "[]");

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Toaster
        // Hot Toast Setting
        position="top center"
        gutter={12}
        containerStyle={{}}
        toastOptions={{
          success: { duration: 2500 },
          error: { duration: 4000 },
        }}
      />
      <div className="app">
        <SettingsContext>
          <SearchedLocationContext>
            <RouterProvider router={router} />
          </SearchedLocationContext>
        </SettingsContext>
      </div>
    </Suspense>
  );
}

export default App;
