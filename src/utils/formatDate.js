export const formatDate = (date) => {
  // Format the date as '14th Jan, 2025'
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formatter = new Intl.DateTimeFormat('en-GB', options);
  const formattedDate = formatter.format(new Date(date));

  // Add 'th', 'st', 'nd', or 'rd' to the day part
  const day = new Date(date).getDate();
  const suffix = (day) => {
    if (day > 3 && day < 21) return 'th'; // Special case for 11th, 12th, 13th
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const dayWithSuffix = `${day}${suffix(day)}`;
  const formattedDateWithSuffix = formattedDate.replace(day, dayWithSuffix);

  return formattedDateWithSuffix;
};

export const formatTime = (date) => {
  // Format the time as '1:18 PM'
  const options = { hour: '2-digit', minute: '2-digit', hour12: true };
  const timeFormatter = new Intl.DateTimeFormat('en-US', options);
  return timeFormatter.format(new Date(date));
};
