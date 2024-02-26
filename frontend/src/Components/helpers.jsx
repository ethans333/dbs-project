export function formatDate(date) {
  date = new Date(date);

  return `${days[date.getDay()]}, ${
    months[date.getMonth()]
  } ${date.getDate()} ${date.getFullYear()}`;
}

// Arrays for mapping integers to days and months
const days = [
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
