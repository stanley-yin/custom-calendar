import React from "react"

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

export default DayButton
