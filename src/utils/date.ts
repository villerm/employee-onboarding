const getFormattedDate = (date: string) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const dateValue = new Date(date);
  return dateValue.toLocaleDateString("et", dateOptions);
};

export default getFormattedDate;
