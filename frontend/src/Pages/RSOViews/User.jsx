import React, { useState, useEffect, useContext } from "react";
import ucf_logo from "../../assets/ucf_logo.png";

export default function () {
  const [rsos, setRSOs] = useState([]);
  const [joinedRSOs, setJoinedRSOs] = useState([]);

  useEffect(() => {
    getRSOs();
    getJoinedRSOs();  
  }, []);

  return (
    <div className="mx-auto mt-[2vh] lg:w-[70vw] xl:w-[60vw] 2xl:w-[1000px] w-[100vw] h-[80vh]">
      {/* Top Header */}
      <div className="flex">
        <img src={ucf_logo} className="w-16" />
        <div className="font-bold my-auto ml-5 text-3xl">
          Browse and Join RSOs
        </div>
      </div>
      <div className="mt-[3vh]">
        <div className="grid grid-cols-3">{showEvents()}</div>
      </div>
    </div>
  );

  // Fetches rsos from backend
  async function getRSOs() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/rso`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return setRSOs(data);
  }

  // Displays rsos as list of cards
  function showEvents() {
    return rsos.length === 0 ? ( // If no events, show loading cards
      <div className="space-x-5 flex">
        <LoadingEventCard />
        <LoadingEventCard />
        <LoadingEventCard />
      </div>
    ) : (
      // If events, show event cards
      rsos.map((e) => {
        return (
          <div
            key={e.rso_id}
            className="border rounded-lg shadow px-8 py-5 mx-auto w-72 mt-3"
          >
            <p className="text-lg font-bold">{e.name}</p>
            <p className="text-sm text-gray-400">{e.rso_id}</p>
            {joinedRSOs.includes(e.rso_id) ? (
              <div
                className="text-red-500 cursor-pointer hover:opacity-50 text-right relative bottom-0"
                onClick={() => leaveRSO(e.rso_id)}
              >
                Leave
              </div>
            ) : (
              <div
                className="text-blue-500 cursor-pointer hover:opacity-50 text-right relative bottom-0"
                onClick={() => joinRSO(e.rso_id)}
              >
                Join
              </div>
            )}
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

  function joinRSO(rsoId) {
    fetch(
      `${import.meta.env.VITE_API_URL}/user/join-rso/${localStorage.getItem(
        "userId"
      )}/${rsoId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      getRSOs();
      getJoinedRSOs();
    });
  }

  function getJoinedRSOs() {
    fetch(
      `${import.meta.env.VITE_API_URL}/user/rso/${localStorage.getItem(
        "userId"
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(async (res) => {
      const data = await res.json();
      console.log("data")
      setJoinedRSOs(data.map((rso) => rso.rso_id));
    });
  }

  function leaveRSO(rsoId) {


    fetch(
      `${import.meta.env.VITE_API_URL}/user/leave-rso/${localStorage.getItem("userId")}/${rsoId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      getRSOs();
      getJoinedRSOs();
    });
  }
}
