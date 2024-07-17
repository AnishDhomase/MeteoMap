import toast from "react-hot-toast";

export function handleLogout(
  isAuthorized,
  savedLocations,
  favLocations,
  setIsAuthorized,
  setSavedLocations,
  setFavLocations,
  saveAccDataToLocalStorage
) {
  toast.success(`Successfully Logout!`);
  saveAccDataToLocalStorage(isAuthorized, savedLocations, favLocations);
  setIsAuthorized(null);
  setSavedLocations([]);
  setFavLocations([]);
}
