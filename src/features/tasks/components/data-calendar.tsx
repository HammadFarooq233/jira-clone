import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./data-calendar.css";
import { Task } from "../types";

import { enUS } from "date-fns/locale";
import {
  addMonths,
  format,
  getDay,
  parse,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useState } from "react";

interface DataCalendarProps {
  data: Task[];
}

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function DataCalendar({ data }: DataCalendarProps) {
  const [value, setValue] = useState(
    data.length > 0 ? new Date(data[0].dueDate) : new Date(),
  );

  const events = data.map((task) => ({
    start: new Date(task.dueDate),
    end: new Date(task.dueDate),
    title: task.name,
    status: task.status,
    assignee: task.assignee,
    project: task.project,
    id: task.$id,
  }));

  const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
    if (action === "PREV") {
      setValue(subMonths(value, 1));
    } else if (action === "NEXT") {
      setValue(addMonths(value, 1));
    } else if (action === "TODAY") {
      setValue(new Date());
    }
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      date={value}
      views={["month"]}
      defaultView="month"
      toolbar
      showAllEvents
      max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
      className="h-full"
      formats={{
        weekdayFormat: (date, culture, localizer) =>
          localizer?.format(date, "EEE", culture) ?? "",
      }}
    />
  );
}
