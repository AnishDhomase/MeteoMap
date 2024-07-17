import toast from "react-hot-toast";

const API_KEY = "b4620542d70be9a9dbdbae914c06ebc1";
const BASE_URL = "http://api.openweathermap.org";

export async function getWeatherDataOfCity(city, unit) {
  let response, data, lat, lon;

  const unitSystem = unit === "C" ? "metric" : "imperial";

  if (city) {
    response = await fetch(
      `${BASE_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`,
      { referrerPolicy: "unsafe-url" }
    );
    data = await response.json();
    lat = data[0].lat;
    lon = data[0].lon;
    // const { lat, lon } = data[0];
  } else {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
      },
      (error) => {
        toast.error(error.message);
      }
    );
  }

  const response1 = await fetch(
    `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unitSystem}`,
    { referrerPolicy: "unsafe-url" }
  );
  const data1 = await response1.json();

  const response2 = await fetch(
    `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unitSystem}`,
    { referrerPolicy: "unsafe-url" }
  );

  const data2 = await response2.json();
  const mixedData = { ...data1, list: data2.list };

  return mixedData;
}
