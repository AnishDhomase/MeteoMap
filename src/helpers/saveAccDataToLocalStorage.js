export function saveAccDataToLocalStorage(
  isAuthorized,
  savedLocations,
  favLocations
) {
  const localDataBase = JSON.parse(localStorage.getItem("userDetails"));
  const newLocalDataBase = localDataBase.map((account, ind) =>
    account.name === isAuthorized.name
      ? {
          ...account,
          accSavedLocations: savedLocations,
          accFavLocations: favLocations,
        }
      : account
  );
  localStorage.setItem("userDetails", JSON.stringify(newLocalDataBase));
}
