import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LocationsContext from "./context/LocationsContext";
import SettingsContext from "./context/SettingsContext";
import SearchedLocationContext from "./context/SearchedLocationContext";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import Main from "./pages/main/Main";
import Authorization from "./pages/authorization/Authorization";

const router = createBrowserRouter([
  { path: "/", element: <Main /> },
  { path: "/authorization", element: <Authorization /> },
]);

function App() {
  useEffect(() => localStorage.setItem("userDetails", "[]"), []);
  return (
    <>
      <Toaster
        position="top center"
        gutter={12}
        containerStyle={{}}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          // style: {...css...},
        }}
      />
      <div className="app">
        <SettingsContext>
          <LocationsContext>
            <SearchedLocationContext>
              <RouterProvider router={router} />
            </SearchedLocationContext>
          </LocationsContext>
        </SettingsContext>
      </div>
    </>
  );
}

export default App;
