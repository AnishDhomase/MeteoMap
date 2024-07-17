import moment from "moment-timezone";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const daysFull = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function timeConverterToAMPM(timestamp, timezoneOffset) {
  const date = moment.unix(timestamp);
  const adjustedDate = date.utcOffset(timezoneOffset / 60);
  const formattedTime = adjustedDate.format("hh:mm A");
  return formattedTime;
}
export function getDayFromTimestamp(timestamp, timezoneOffset) {
  const timestampMs = timestamp * 1000;
  const date = moment(timestampMs);
  const adjustedDate = date.utcOffset(timezoneOffset / 60);
  const dayNumber = adjustedDate.day();

  const dayName = days[dayNumber];
  return dayName;
}
export function getCurrentDay() {
  const currentDate = new Date();
  const dayNumber = currentDate.getDay();
  return days[dayNumber];
}
export function getCurrentTimestamp() {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  return currentTimestamp;
}

export function formatDate() {
  const now = new Date();
  const day = daysFull[now.getDay()];
  const date = now.getDate().toString().padStart(2, "0");
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  return `${day}, ${date} ${month} ${year}`;
}
