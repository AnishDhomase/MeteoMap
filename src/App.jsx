import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LocationsContext from "./context/LocationsContext";
import SettingsContext from "./context/SettingsContext";
import SearchedLocationContext from "./context/SearchedLocationContext";
import Main from "./pages/Main";
import Authorization from "./pages/Authorization";

const router = createBrowserRouter([
  { path: "/", element: <Main /> },
  { path: "/authorization", element: <Authorization /> },
]);

function App() {
  return (
    <div className="app">
      <SettingsContext>
        <LocationsContext>
          <SearchedLocationContext>
            <RouterProvider router={router} />
          </SearchedLocationContext>
        </LocationsContext>
      </SettingsContext>
    </div>
  );
}

export default App;
