import { useMemo } from "react";

export const useFormatDate = (dateString) => {
  const formattedDate = useMemo(() => {
    if (!dateString) return "";

    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date)) return "Invalid Date";

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    // Determine the ordinal suffix
    const ordinalSuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    // Format the date
    return `${day}${ordinalSuffix(day)} ${month}, ${year}`;
  }, [dateString]);

  return formattedDate;
};
