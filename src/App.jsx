import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SettingsContext from "./context/SettingsContext";
import SearchedLocationContext from "./context/SearchedLocationContext";
import { Toaster } from "react-hot-toast";
import Main from "./pages/main/Main";
import Authorization from "./pages/authorization/Authorization";

const router = createBrowserRouter([
  { path: "/", element: <Main /> },
  { path: "/authorization", element: <Authorization /> },
]);

localStorage.setItem("userDetails", "[]");

function App() {
  return (
    <>
      <Toaster
        position="top center"
        gutter={12}
        containerStyle={{}}
        toastOptions={{
          success: { duration: 1500 },
          error: { duration: 2000 },
          // style: {...css...},
        }}
      />
      <div className="app">
        <SettingsContext>
          <SearchedLocationContext>
            <RouterProvider router={router} />
          </SearchedLocationContext>
        </SettingsContext>
      </div>
    </>
  );
}

export default App;
