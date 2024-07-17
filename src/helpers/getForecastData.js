import {
  getCurrentDay,
  getDayFromTimestamp,
  timeConverterToAMPM,
} from "./dateTime";

export function getForecastData(data, currentTimestamp) {
  const afterCurrentTime = data.list.filter(
    (item, ind) => item.dt > currentTimestamp
  );
  const FiveHrsForecast = afterCurrentTime.slice(0, 5);
  const FormattedFiveHrsForecast = FiveHrsForecast.map((item, ind) => {
    return {
      localeTime: timeConverterToAMPM(item.dt, data?.timezone),
      temp: item.main.temp,
    };
  });
  const today = getCurrentDay();
  const afterToday = afterCurrentTime
    .map((item, ind) => {
      return {
        day: getDayFromTimestamp(item.dt, data?.timezone),
        temp: item.main.temp,
        icon: item.weather[0].icon,
      };
    })
    .filter((item, ind) => item.day !== today);
  let dailyForecast = afterToday.filter((item, ind) => ind % 8 === 0);

  return { FormattedFiveHrsForecast, dailyForecast };
}
