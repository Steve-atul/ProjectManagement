// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();
//   return `${month}/${day}/${year}`;
// };

// export default formatDate;



const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()];

  // Determine the appropriate suffix for the day
  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return "th"; // Catch all 11th, 12th, 13th
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  const daySuffix = getDaySuffix(day);

  // Return the date in the format (Feb 10th)
  return `${month} ${day}${daySuffix}`;
};

export default formatDate;

