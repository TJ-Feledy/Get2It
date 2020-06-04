import React from "react";
import classes from "classnames";
import { isSameMonth, isToday } from "date-fns";

function Calendar(props) {
  const {
    getFormattedDate,
    getWeeksInMonth,
    getDayLabelsInWeek,
    setDatePrevMonth,
    setDateNextMonth,
    getItemProps,
    selectedItem,
    date
  } = props;

  const currentDate = getFormattedDate("MMM  YYYY");
  const weeksInCurrentMonth = getWeeksInMonth();
  const dayLabels = getDayLabelsInWeek();

  const isSelectedDay = date =>
    selectedItem && getFormattedDate(selectedItem) === getFormattedDate(date);
  const isDisabled = dateValue => !isSameMonth(date, dateValue);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="color-white" onClick={setDatePrevMonth}>
          &larr;
        </button>

        <span className="text-bold color-white">{currentDate}</span>

        <button className="color-white" onClick={setDateNextMonth}>
          &rarr;
        </button>
      </div>

      <div className="calendar-body">
        <div className="week day-labels">
          {dayLabels.map(label => (
            <div className="day color-white" key={label}>
              {label}
            </div>
          ))}
        </div>

        {weeksInCurrentMonth.map((week, i) => (
          <div className="week" key={i}>
            {week.map(day => (
              <div
                {...getItemProps({
                  key: day.label,
                  item: day.dateValue,
                  disabled: isDisabled(day.dateValue),
                  className: classes("day", {
                    "is-selected": isSelectedDay(day.dateValue),
                    "is-today": isToday(day.dateValue)
                  })
                })}
              >
                {day.label}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
