import numericMonthToText from "./numeric-month-to-text";

const formatChatMessageTime = (dateTime: string) => {
  const currentDate = new Date();
  const inputDate = new Date(dateTime);
  const month = inputDate.getMonth();
  const date = inputDate.getDate();
  const year = inputDate.getFullYear();
  const oneDay = 60 * 60 * 24 * 1000;
  const isAlready24hours = currentDate.getTime() - inputDate.getTime() > oneDay;
  const monthAsText = numericMonthToText(month);
  const timeAs12hours = inputDate.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });

  if (year !== currentDate.getFullYear()) {
    return `${date} ${monthAsText} ${year} AT ${timeAs12hours}`;
  } else if (isAlready24hours) {
    return `${date} ${monthAsText} AT ${timeAs12hours}`;
  }
  return timeAs12hours;
};
export default formatChatMessageTime;
