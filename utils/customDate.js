// Constants for the default configuration days for the week calendar
const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Function to render 5-day forecast data
const getWeekDay = (date) => {
  return DAYS[new Date(date * 1000).getDay()];
};

export { getWeekDay };
