import { AgeCalculator } from "@dipaktelangre/age-calculator";

const getMonthsByDate = (date: string) => {
  const months = AgeCalculator.getAgeIn(new Date(date), "month");
  if (months > 1) return months + " months";
  return months + " month";
};

export default getMonthsByDate;
