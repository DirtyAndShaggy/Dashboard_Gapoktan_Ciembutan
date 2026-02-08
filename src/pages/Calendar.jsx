import { useEffect, useState } from "react";

/* ===============================
   RAW calendar IDs (API use)
================================ */
const DESA_CALENDAR_ID =
  "3517600efa44129e6c8c5ed137e8eb31117db929a376d47a13ff530d40cfa595@group.calendar.google.com";

const API_KEY = "AIzaSyC8Ls8yQKnkAtURBMrN_6ThdQUg_FgLUo0";

/* ===============================
   ENCODED calendar IDs (iframe)
================================ */
const EMBED_DESA_CALENDAR = encodeURIComponent(DESA_CALENDAR_ID);
const EMBED_HOLIDAY_CALENDAR = encodeURIComponent(
  "id.indonesian#holiday@group.v.calendar.google.com"
);

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeMin = new Date().toISOString();
    const timeMax = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    ).toISOString();

    fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${DESA_CALENDAR_ID}/events` +
        `?key=${API_KEY}` +
        `&singleEvents=true` +
        `&orderBy=startTime` +
        `&timeMin=${timeMin}` +
        `&timeMax=${timeMax}` +
        `&maxResults=20`
    )
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch calendar");
        return res.json();
      })
      .then(data => {
        setEvents(data.items || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* ================= Header ================= */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-gray-800">
          Kalender Desa
        </h1>
        <p className="text-sm text-gray-500">
          Kalender kegiatan dan agenda desa
        </p>
      </div>

      {/* ================= Full Calendar ================= */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <iframe
          title="Kalender Desa"
          src={`https://calendar.google.com/calendar/embed?src=${EMBED_DESA_CALENDAR}&src=${EMBED_HOLIDAY_CALENDAR}&ctz=Asia/Jakarta&showTitle=0&showPrint=0&showCalendars=0`}
          className="w-full h-[600px] border-0"
        />
      </div>

      {/* ================= Agenda List ================= */}
      {!loading && events.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-md font-semibold text-gray-800">
            Agenda Desa (30 Hari Ke Depan)
          </h2>

          {events.slice(0, 5).map(event => (
            <AgendaCard key={event.id} event={event} />
          ))}
        </div>
      )}

      {!loading && events.length === 0 && (
        <div className="bg-white border rounded-xl p-4 text-sm text-gray-600">
          📅 Belum ada agenda desa dalam 30 hari ke depan.
          <br />
          <span className="text-gray-400">
            Kalender di atas tetap menampilkan hari libur nasional.
          </span>
        </div>
      )}
    </div>
  );
}

function AgendaCard({ event }) {
  const isAllDay = Boolean(event.start.date);
  const start = new Date(event.start.dateTime || event.start.date);

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm">
      <h3 className="font-semibold text-gray-900">
        {event.summary || "(Tanpa Judul)"}
      </h3>

      <div className="text-sm text-gray-600 mt-1">
        📅{" "}
        {start.toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        <br />
        ⏰ {isAllDay ? "Seharian" : "Sesuai jadwal"}
      </div>
    </div>
  );
}
