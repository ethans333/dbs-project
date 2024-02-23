import { useState, useEffect } from "react";
import ucf_logo from "./assets/ucf_logo.png";

export default function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getevents();
  }, []);

  return (
    <div className="mx-auto mt-[2vh] lg:w-[70vw] xl:w-[60vw] 2xl:w-[1000px] w-[100vw] h-[80vh]">
      <div className="flex">
        <img src={ucf_logo} className="w-16" />
        <div className="font-bold my-auto ml-5 text-3xl">
          Add or Browse Events
        </div>
      </div>
      <div className="grid grid-cols-2 mt-[3vh] gap-x-10 divide-x">
        <div className="mx-auto">
          <div>Add new event:</div>
          <EventForm />
        </div>
        <div className="space-y-5">{showEvents()}</div>
      </div>
    </div>
  );

  async function getevents() {
    const response = await fetch("http://localhost:3002/api/events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return setEvents(data);
  }

  function showEvents() {
    return events == [] ? (
      <p>Loading Events</p>
    ) : (
      events.map((e) => {
        const date = new Date(e.time);

        return (
          <div
            key={e.event_id}
            className="border rounded-lg shadow-lg w-fit px-8 py-5 mx-auto min-w-72"
          >
            <p>
              {`${days[date.getDay()]}, ${
                months[date.getMonth()]
              } ${date.getDate()}, ${date.getFullYear()}`}
            </p>
            <p>{e.description}</p>
          </div>
        );
      })
    );
  }

  function EventForm() {
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");

    return (
      <div className="grid grid-cols-1 w-fit space-y-5 mt-5">
        <textarea
          className="border rounded-lg shadow-lg w-fit px-8 py-5"
          cols={30}
          rows={10}
          name="description"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <input
          type="datetime-local"
          name="time"
          onChange={(e) => setTime(e.target.value)}
          value={time}
          className="border rounded-lg shadow-lg w-fit px-8 py-5 w-full"
          required
          placeholder="Time"
        />
        <button
          className="w-fit bg-[#ffcc00] rounded px-3 py-1 hover:opacity-50"
          onClick={() => addNewEvent(time, description).then(getevents)}
        >
          Submit
        </button>
      </div>
    );
  }

  async function addNewEvent(time, description) {
    const response = await fetch("http://localhost:3002/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_id: Date.now() * Math.random(),
        time: time,
        description: description,
      }),
    });
    const data = await response.json();
    return data;
  }
}

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
