const setCurrentDate = () => {
  const dateObj = new Date();
  const currentHour = dateObj.getHours();
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  if (currentHour < 6) {
    dateObj.setDate(dateObj.getDate() - 1);
    return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(dateObj.getDate()).padStart(2, "0")}`;
  }

  return `${year}-${month}-${day}`;
};
export default setCurrentDate;
