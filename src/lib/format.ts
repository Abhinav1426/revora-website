/** e.g. "28 October 2026". UTC so the build machine's time zone never shifts the day. */
export function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
