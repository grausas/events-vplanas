const pad = function (n, width, z) {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

export const changeDate = (newStartDate) => {
  const startEventDate =
    newStartDate.getFullYear() +
    "-" +
    pad(newStartDate.getMonth() + 1, 2) +
    "-" +
    pad(newStartDate.getDate(), 2);

  return startEventDate;
};

export const changeTime = (newStartDate) => {
  const startEventTime =
    pad(newStartDate.getHours(), 2) + ":" + pad(newStartDate.getMinutes(), 2);
  return startEventTime;
};
