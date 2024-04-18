import dayjs from "dayjs"

export const generateDate = (
  year = dayjs().year(),
  month = dayjs().month(),
) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month")
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month")
  const arrayOfDate = []

  // prefix day
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    arrayOfDate.push({
      today: false,
      currentMonth: false,
      date: firstDateOfMonth.day(i),
    })
  }

  // current month day
  for (let i = firstDateOfMonth.date(); i < lastDateOfMonth.date(); i++) {
    arrayOfDate.push({
      today:
        firstDateOfMonth.date(i).toDate().toDateString() ===
        dayjs().toDate().toDateString(),
      currentMonth: true,
      date: firstDateOfMonth.date(i),
    })
  }

  const remaining = 7 * 5 - arrayOfDate.length

  for (
    let i = lastDateOfMonth.date() + 1;
    i <= lastDateOfMonth.date() + remaining;
    i++
  ) {
    arrayOfDate.push({
      today: false,
      currentMonth: false,
      date: lastDateOfMonth.date(i),
    })
  }
  return arrayOfDate
}
