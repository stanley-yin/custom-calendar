import React, { useState } from "react"
import { generateDate } from "../libs/generateDate"
import dayjs from "dayjs"
var isBetween = require("dayjs/plugin/isBetween")
dayjs.extend(isBetween)
import { MdKeyboardArrowLeft } from "react-icons/md"
import { MdKeyboardArrowRight } from "react-icons/md"

const DayButton = ({ dateItem, handleDateRange, isSelected }) => {
  const { date, currentMonth, today } = dateItem
  return (
    <button
      disabled={!currentMonth}
      onClick={() => handleDateRange(date)}
      className={`w-[50px] h-[36px] cursor-pointer ${isSelected ? "bg-[#006edc]" : "hover:bg-[#e6e6e6] "} ${today ? "bg-[#ffff76]" : ""} ${currentMonth ? "" : "text-[#757575] cursor-not-allowed"}`}
    >
      {date.date()}日
    </button>
  )
}

const Calendar = () => {
  const currentDate = dayjs()
  const [today, setToday] = useState(currentDate)
  const year = today.year()
  const month = today.month()
  const arrayOfDate = generateDate(year, month)
  const [selected, setSelected] = React.useState([])

  const handleDateRange = date => {
    let tempList = selected
    if (tempList.length >= 2) {
      tempList = []
    }
    if (tempList.length > 0 && date >= tempList[0]) {
      setSelected([...selected, date])
    } else {
      setSelected([date])
    }
  }

  const currentMonth = `${year}年${month + 1}月`
  const arrowClass = "w-[44px] h-[44px] p-2 hover:bg-[#e6e6e6] cursor-pointer"
  return (
    <div className="w-[350px] h-60 text-base mx-auto">
      <div className="flex justify-between items-center h-[44px] mb-4">
        <MdKeyboardArrowLeft
          className={arrowClass}
          onClick={() => {
            setToday(today.month(today.month() - 1))
          }}
        />
        {currentMonth}
        <MdKeyboardArrowRight
          className={arrowClass}
          onClick={() => {
            setToday(today.month(today.month() + 1))
          }}
        />
      </div>
      <div className="grid grid-cols-7 ">
        {arrayOfDate.map((dateItem, index) => {
          const isSelected =
            selected.length > 1
              ? dayjs(dateItem.date).isBetween(
                  selected[0],
                  selected[1],
                  "day",
                  "[]",
                )
              : dateItem.date.toDate().toDateString() ===
                selected[0]?.toDate().toDateString()

          return (
            <DayButton
              dateItem={dateItem}
              key={index}
              handleDateRange={handleDateRange}
              isSelected={isSelected}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Calendar
