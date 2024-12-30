"use client";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Breakpoint } from "@mui/material";
import "../calender/calender.css"
const events = [{ title: "Meeting", start: new Date() }];

export function DemoApp() {
  const handleEventClick = (info: any) => {
    console.log(info, "INFO");
  };
  return (
    <div>
      <h1>Calender</h1>
      <FullCalendar
        eventClassNames="custom-fullcalendar"
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
          interactionPlugin,
          multiMonthPlugin,
        ]}
        initialView="dayGridMonth"
        weekends={true}
        height="1000px"
        events={events}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right:
            "dayGridMonth,timeGridWeek,timeGridDay,listWeek,multiMonthFourMonth",
        }}
        buttonText={{
          today: "Today",
          dayGridMonth: "Month",
          timeGridWeek: "Week",
          timeGridDay: "Day",
          listWeek: "List",
        }}
        views={{
          multiMonthFourMonth: {
            type: "multiMonth",
            buttonText: "Multi Month",
            duration: { months: 12 },
          },
        }}
      />
    </div>
  );
}

// a custom render function
function renderEventContent(eventInfo: any) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
