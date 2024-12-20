export const formatDate=(dateString)=> {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options); // e.g., "30th November, 2024"
  };
  