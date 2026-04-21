"use client";

import { useEffect, useState } from "react";

const weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export default function CalendarPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [calendar, setCalendar] = useState<any>({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [toast, setToast] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 📡 FETCH EVENTS
  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data.events));
  }, []);

  // 🧠 ADD TO APP CALENDAR
  const addToAppCalendar = (event: any) => {
    const key = event.date;

    setCalendar((prev: any) => ({
      ...prev,
      [key]: event,
    }));

    setToast("Added to your calendar");
    setTimeout(() => setToast(null), 2000);
  };

  // 🌍 GOOGLE CALENDAR (FIXED)
  const addToGoogleCalendar = (event: any) => {
    const startDate = new Date(event.date);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

    const formatDate = (date: Date) => {
      return (
        date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
      );
    };

    const start = formatDate(startDate);
    const end = formatDate(endDate);

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE
&text=${encodeURIComponent(event.title)}
&dates=${start}/${end}
&details=${encodeURIComponent("Hackathon Event")}
&location=${encodeURIComponent(event.type)}
&sf=true&output=xml`;

    window.open(url, "_blank");
  };

  // 📅 GENERATE CALENDAR DAYS
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const days = [];

  for (let i = 0; i < firstDay; i++) days.push(null);

  for (let d = 1; d <= daysInMonth; d++) {
    const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    days.push({ day: d, fullDate });
  }

  return (
    <main className="min-h-screen bg-white text-black p-6">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-6">

        <button
          onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
          className="px-3 py-1 bg-[#4285F4] text-white rounded"
        >
          ←
        </button>

        <h1 className="text-xl font-semibold">
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </h1>

        <button
          onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
          className="px-3 py-1 bg-[#4285F4] text-white rounded"
        >
          →
        </button>

      </div>

      {/* 🔥 EVENTS */}
      <div className="mb-6">
        <h2 className="mb-3 font-semibold text-[#EA4335]">
          🔥 Upcoming Hackathons
        </h2>

        {events.map((e) => (
          <div
            key={e.id}
            className="bg-gray-100 p-3 rounded mb-2 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{e.title}</p>
              <p className="text-xs text-gray-500">{e.date}</p>
            </div>

            <div className="flex gap-2">

              {/* 🧠 APP */}
              <button
                onClick={() => addToAppCalendar(e)}
                className="bg-[#34A853] text-white px-3 py-1 rounded text-xs"
              >
                Add to Saarthi
              </button>

              {/* 🌍 GOOGLE */}
              <button
                onClick={() => addToGoogleCalendar(e)}
                className="bg-[#4285F4] text-white px-3 py-1 rounded text-xs"
              >
                Add to Google Calender
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* 📅 CALENDAR GRID */}
      <div className="grid grid-cols-7 gap-2">

        {/* WEEKDAYS */}
        {weekDays.map((d) => (
          <div key={d} className="text-center text-sm text-gray-500">
            {d}
          </div>
        ))}

        {/* DAYS */}
        {days.map((item, i) => (
          <div
            key={i}
            className="h-24 border rounded p-1 relative bg-gray-50"
          >
            {item && (
              <>
                <span className="absolute top-1 right-1 text-xs text-gray-500">
                  {item.day}
                </span>

                {/* ✅ EVENT MARK */}
                {calendar[item.fullDate] && (
                  <div className="mt-5 bg-[#34A853] text-white text-[10px] p-1 rounded">
                    {calendar[item.fullDate].title}
                  </div>
                )}
              </>
            )}
          </div>
        ))}

      </div>

      {/* ✅ TOAST */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#34A853] text-white px-4 py-2 rounded shadow-lg flex items-center gap-2 animate-fadeIn">
          ✔ {toast}
        </div>
      )}
    </main>
  );
}