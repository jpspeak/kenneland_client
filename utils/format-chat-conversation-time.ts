import numericMonthToText from "./numeric-month-to-text";

const formatChatConversationTime = (dateTime: string) => {
  const oneDay = 60 * 60 * 24 * 1000;
  const currentDate = new Date();
  const inputDate = new Date(dateTime);
  const month = inputDate.getMonth();
  const date = inputDate.getDate();
  const year = inputDate.getFullYear();
  const isAlready24hours = currentDate.getTime() - inputDate.getTime() > oneDay;
  const timeAs12hours = inputDate.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
  const monthAsText = numericMonthToText(month);

  if (year !== currentDate.getFullYear()) {
    return date + " " + monthAsText + " " + year;
  } else if (isAlready24hours) {
    return date + " " + monthAsText;
  }
  return timeAs12hours;
};
export default formatChatConversationTime;
