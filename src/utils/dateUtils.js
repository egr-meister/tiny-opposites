// Small, safe date helpers. Never crash on missing or invalid dates.

export function getNowIso() {
  try {
    return new Date().toISOString();
  } catch (e) {
    return "";
  }
}

// Formats an ISO string into a friendly readable form. Returns an empty
// string when the input is missing or invalid.
export function formatDateTime(isoString) {
  try {
    if (!isoString || typeof isoString !== "string") {
      return "";
    }
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      return "";
    }
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    const month = months[date.getMonth()] || "";
    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    if (hours === 0) hours = 12;
    return `${month} ${day}, ${year} ${hours}:${minutes} ${ampm}`;
  } catch (e) {
    return "";
  }
}
