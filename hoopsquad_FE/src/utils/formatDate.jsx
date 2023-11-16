const formatDate = (writeDate) => {
  const newDate = new Date(writeDate);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return newDate.toLocaleString("ko", options);
};

export default formatDate;
