const daysOfTheWeek: { [key: number]: string } = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const daysOfTheWeekHebrew: { [key: number]: string } = {
  0: "ראשון",
  1: "שני",
  2: "שלישי",
  3: "רביעי",
  4: "חמישי",
  5: "שישי",
  6: "שבת",
};

export const dateToDayOfTheWeek = (date: string): string => {
  const day = new Date(date).getDay();
  return daysOfTheWeekHebrew[day];
};
