import { useState, useEffect } from "react";
import ucf_logo from "../../assets/ucf_logo.png";
import CommentSidebar from "./Components/CommentSidebar";
import { formatDate } from "../../Components/helpers";
import { useContext } from "react";
import { Context } from "../../ProjectContext";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

export default function () {
  const [focusedEvent, setFocusedEvent] = useState("");
  const [events, setEvents] = useState([]);

  const [orgs, setOrgs] = useState([]);

  const { setShowRightSideMenu } = useContext(Context);

  useEffect(() => {
    getevents();
    getRSOs();
  }, []);

  return (
    <div className="mx-auto mt-[2vh] lg:w-[70vw] xl:w-[60vw] 2xl:w-[1000px] w-[100vw] h-[80vh]">
      {/* Top Header */}
      <div className="flex">
        <img src={ucf_logo} className="w-16" />
        <div className="font-bold my-auto ml-5 text-3xl">
          Add or Browse Events
        </div>
      </div>
      <div className="grid grid-cols-2 mt-[3vh] gap-x-10 divide-x">
        {/* Left Side */}
        <div className="mx-auto">
          <div className="font-bold">Add new event:</div>
          <EventForm />
        </div>
        {/* Right Side */}
        <div className="space-y-5">{showEvents()}</div>
        {/* Right Sidebar */}
        <CommentSidebar event_id={focusedEvent} />
      </div>
    </div>
  );

  // Fetches events from backend
  async function getevents() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/events`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return setEvents(data);
  }

  // Displays events as list of cards
  function showEvents() {
    return events.length === 0 ? ( // If no events, show loading cards
      <div className="space-y-5">
        <LoadingEventCard />
        <LoadingEventCard />
        <LoadingEventCard />
      </div>
    ) : (
      // If events, show event cards
      events.map((e) => {
        const date = new Date(e.time);
        return (
          <div
            key={e.event_id}
            className="border rounded-lg shadow px-8 py-5 mx-auto w-72"
          >
            <p className="text-lg font-bold">{e.ename}</p>
            <p className="text-sm text-gray-400">{formatDate(date)}</p>
            <p className="truncate mt-2 mb-4">{e.description}</p>
            <div className="flex">
              <div
                className="mr-auto text-red-400 cursor-pointer hover:opacity-50"
                onClick={() => {
                  // Delete event
                  if (confirm("Are you sure you want to delete this event?")) {
                    fetch(
                      `${import.meta.env.VITE_API_URL}/events/${e.event_id}`,
                      {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    ).then(() => getevents());
                  }
                }}
              >
                Delete
              </div>
              <div
                className="text-blue-500 cursor-pointer hover:opacity-50"
                onClick={() => {
                  setShowRightSideMenu(true);
                  console.log(e.event_id);
                  setFocusedEvent(e.event_id);
                }}
              >
                Comment
              </div>
            </div>
          </div>
        );
      })
    );
  }

  // Loading Event Card
  function LoadingEventCard() {
    return (
      <div className="rounded-lg w-fit px-8 py-5 mx-auto min-w-72 h-32 bg-gray-100 animate-pulse"></div>
    );
  }

  // Form to add new event
  function EventForm() {
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");
    const [eventType, setEventType] = useState("");
    const [rso, setRso] = useState("");
    const [eventName, setEventName] = useState("");
    const [address, setAddress] = useState("");
    const [creatingLocation, setCreatingLocation] = useState(false);
    const [locationAddress, setLocationAddress] = useState("");
    const [locationName, setLocationName] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");

    return (
      <div className="grid grid-cols-1 w-fit space-y-5 mt-5">
        {/* Name */}
        <input
          className="border rounded shadow w-full px-3 py-1"
          type="text"
          name="eventName"
          placeholder="Event Name"
          onChange={(e) => setEventName(e.target.value)}
          value={eventName}
        />
        {/* Description */}
        <textarea
          className="border rounded shadow w-fit min-w-80 px-5 py-4"
          cols={30}
          rows={10}
          name="description"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        {/* Location */}
        {!creatingLocation ? (
          <div>
            <Dropdown
              options={["Location A", "Location B", "Location C"]}
              placeholder="Event Address"
              controlClassName="border rounded-lg shadow w-fit w-full"
              menuClassName="border-none rounded-lg shadow-lg w-fit w-full"
              value={address}
              onChange={(e) => setAddress(e.value)}
            />
            <div
              onClick={() => setCreatingLocation(true)}
              className="text-blue-500 text-sm mt-1 text-right hover:opacity-50 cursor-pointer"
            >
              Create New Location
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p>Create New Location</p>
            <input
              className="border rounded shadow w-full px-3 py-1"
              type="text"
              name="locationName"
              placeholder="Location Name"
              onChange={(e) => setLocationName(e.target.value)}
              value={locationName}
            />
            <input
              className="border rounded shadow w-full px-3 py-1"
              type="text"
              name="address"
              placeholder="Location Address"
              onChange={(e) => setLocationAddress(e.target.value)}
              value={locationAddress}
            />
            <input
              className="border rounded shadow w-full px-3 py-1"
              type="text"
              name="longitude"
              placeholder="Longitude"
              onChange={(e) => setLongitude(e.target.value)}
              value={longitude}
            />
            <div>
              <input
                className="border rounded shadow w-full px-3 py-1"
                type="text"
                name="latitude"
                placeholder="Latitude"
                onChange={(e) => setLatitude(e.target.value)}
                value={latitude}
              />
              <div
                onClick={() => setCreatingLocation(false)}
                className="text-red-500 text-sm mt-1 text-right hover:opacity-50 cursor-pointer"
              >
                Cancel
              </div>
            </div>
          </div>
        )}
        {/* Time */}
        <input
          type="datetime-local"
          name="time"
          onChange={(e) => setTime(e.target.value)}
          value={time}
          className="border rounded shadow w-fit px-8 py-5 w-full"
          required
          placeholder="Time"
        />
        {/* Event Type */}
        <Dropdown
          options={["RSO Event", "Private Event", "Public Event"]}
          placeholder="Event Type"
          controlClassName="border rounded-lg shadow w-fit w-full"
          menuClassName="border-none rounded-lg shadow-lg w-fit w-full"
          value={eventType}
          onChange={(e) => setEventType(e.value)}
        />

        {/* RSO */}
        {eventType === "RSO Event" && (
          <Dropdown
            options={orgs.map((o) => o.name)}
            placeholder="Select an RSO"
            controlClassName="border rounded-lg shadow w-fit w-full"
            menuClassName="border-none rounded-lg shadow-lg w-fit w-full"
            value={rso}
            onChange={(e) => setRso(e.value)}
          />
        )}
        {/* Submit Form for creating new event */}
        <button
          className="w-fit bg-[#ffcc00] rounded px-3 py-1 hover:opacity-50"
          onClick={() => {
            if (
              eventName === "" ||
              description === "" ||
              time === "" ||
              eventType === ""
            ) {
              alert("Please fill in all fields");
              return;
            } else {
              if (creatingLocation) {
                const id = Math.floor(Date.now() * Math.random());

                fetch(`${import.meta.env.VITE_API_URL}/location/${id}`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    lname: locationName,
                    address: locationAddress,
                    longitude: longitude,
                    latitude: latitude,
                  }),
                });
              }
              addNewEvent(time, description, eventName).then(getevents);
            }
          }}
        >
          Submit
        </button>
      </div>
    );
  }

  // Adds new event to backend
  async function addNewEvent(time, description, name) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_id: Date.now() * Math.random(),
        time: time,
        description: description,
        ename: name,
      }),
    });
    const data = await response.json();
    return data;
  }

  function getRSOs() {
    fetch(`${import.meta.env.VITE_API_URL}/rso`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setOrgs(data));
  }
}
