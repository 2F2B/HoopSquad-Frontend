const formatDate = (writeDate, extractTime = false) => {
  const newDate = new Date(writeDate);
  const options = extractTime
    ? { hour: "numeric", minute: "numeric" }
    : {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };

  return newDate.toLocaleString("ko", options);
};

export default formatDate;
