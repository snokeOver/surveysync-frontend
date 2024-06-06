// Function to format the date to DD-MMM-YYYY
const formatDate = (dateString) => {
  const dateOptions = { day: "2-digit", month: "short", year: "numeric" };

  const date = new Date(dateString);
  let formattedDate = date
    .toLocaleDateString("en-GB", dateOptions)
    .replace(/ /g, "-");

  // Extract the month part and convert it to uppercase
  const month = date.toLocaleString("en-GB", { month: "short" }).toUpperCase();
  formattedDate = formattedDate.replace(/\b[A-Za-z]{3}\b/, month);

  return formattedDate;
};

// Function to format the date to DD-MMM-YYYY HH:MM AM/PM
const formatDateTime = (dateString) => {
  const dateOptions = { day: "2-digit", month: "short", year: "numeric" };
  const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };

  const date = new Date(dateString);
  let formattedDate = date
    .toLocaleDateString("en-GB", dateOptions)
    .replace(/ /g, "-");

  // Extract the month part and convert it to uppercase
  const month = date.toLocaleString("en-GB", { month: "short" }).toUpperCase();
  formattedDate = formattedDate.replace(/\b[A-Za-z]{3}\b/, month);

  let formattedTime = date.toLocaleTimeString("en-GB", timeOptions);

  // Ensure AM/PM is in uppercase
  formattedTime = formattedTime.replace("am", "AM").replace("pm", "PM");

  return `${formattedDate}, ${formattedTime}`;
};

export { formatDate, formatDateTime };
