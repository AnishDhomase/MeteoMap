import toast from "react-hot-toast";

const API_KEY = "b4620542d70be9a9dbdbae914c06ebc1";
const BASE_URL = "http://api.openweathermap.org";

export async function getWeatherDataOfCity(city) {
  let response, data, lat, lon;

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
    `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    { referrerPolicy: "unsafe-url" }
  );
  const data1 = await response1.json();
  return data1;
}
