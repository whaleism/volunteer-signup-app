export function getShiftDay(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const dayOfWeek = date.getDay();

  if (dayOfWeek === 2) return "Tuesday";
  if (dayOfWeek === 5) return "Friday";
  return null;
}
