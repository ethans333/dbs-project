/*
    
    User Permissions

    1. User can view all events with their organization.
    2. User can view all comments on events.
    3. User can add comments to events.
*/

import React, { useState, useEffect, useContext } from "react";
import { formatDate } from "../../Components/helpers";
import { Context } from "../../ProjectContext";
import ucf_logo from "../../assets/ucf_logo.png";
import CommentSidebar from "./Components/CommentSidebar";

export default function () {
  const [events, setEvents] = useState([]);
  const [focusedEvent, setFocusedEvent] = useState("");

  const { setShowRightSideMenu } = useContext(Context);

  useEffect(() => {
    getevents();
  }, []);

  return (
    <div className="mx-auto mt-[2vh] lg:w-[70vw] xl:w-[60vw] 2xl:w-[1000px] w-[100vw] h-[80vh]">
      {/* Top Header */}
      <div className="flex">
        <img src={ucf_logo} className="w-16" />
        <div className="font-bold my-auto ml-5 text-3xl">
          Browse Events
        </div>
      </div>
      <div className="mt-[3vh]">
        <div className="grid grid-cols-3">{showEvents()}</div>
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
      <div className="space-x-5 flex">
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
            className="border rounded-lg shadow px-8 py-5 mx-auto w-72 mt-3"
          >
            <p className="text-lg font-bold">{e.ename}</p>
            <p className="text-sm text-gray-400">{formatDate(date)}</p>
            <p className="truncate mt-2 mb-4">{e.description}</p>
            <div
              className="text-blue-500 cursor-pointer hover:opacity-50 text-right relative bottom-0"
              onClick={() => {
                setShowRightSideMenu(true);
                setFocusedEvent(e.event_id);
              }}
            >
              Comment
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
}
