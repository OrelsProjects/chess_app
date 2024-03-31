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

export const dateToDayOfTheWeek = (date: string | number): string => {
  const day = new Date(date).getDay();
  return daysOfTheWeekHebrew[day];
};

// yyyy-mm-dd
export const formatDate = (date: string | number): string => {
  return new Date(date).toLocaleDateString("he-IL");
};

export const toDate = (epochTime: string | number): Date => {
  let timeIntSeconds: any = epochTime;
  if (typeof epochTime === "string") {
    timeIntSeconds =
      epochTime.length > 10
        ? parseInt(epochTime.substring(0, epochTime.length - 3))
        : parseInt(epochTime);
  } else if (typeof epochTime === "number") {
    if (`${timeIntSeconds}`.length > 10) {
      timeIntSeconds /= 1000;
    }
  } else {
    throw new Error(`Date not valid in toDate: ${epochTime}`);
  }
  return new Date(timeIntSeconds * 1000);
};
