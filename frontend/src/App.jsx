import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import instance from "./axios"; // Assuming you have an axios instance set up

function App() {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    instance
      .get("/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalOpen(false);
    setEmail("");
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }
    window.open(selectedLink);
    alert("You have successfully subscribed to the event!");
    await instance.post("/subscribe", { email, event_link: selectedLink });
  };

  return (
    <>
      <div className="flex flex-col bg-gray-100">
        <header className="flex flex-row bg-gray-200 items-center justify-between py-3">
          <div className="mx-10 font-bold text-gray-500 text-3xl font-sans cursor-pointer">
            Louder World
          </div>
          <div className="mx-10 flex flex-row gap-5 items-center rounded-xl border-2 border-gray-300 bg-white hover:bg-gray-500 hover:text-white px-10 py-2 cursor-pointer ease-in-out duration-300 font-bold text-gray-500">
            Sign In
          </div>
        </header>
        <div>
          <div className="flex flex-col items-center justify-center py-10">
            <div className="text-4xl font-bold text-gray-500 mb-5">
              Upcoming Events
            </div>
            <div className="flex flex-wrap gap-5 items-center justify-center">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="bg-white shadow-lg rounded-lg p-5 w-64 cursor-pointer hover:shadow-xl transition-shadow min-h-[30rem] flex flex-col hover:scale-105 ease-in-out duration-500"
                  onClick={() => {
                    setSelectedLink(event.link);
                    setModalOpen(true);
                  }}
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="rounded-lg mb-3 h-[10rem] w-full object-cover"
                  />
                  <h2 className="text-xl font-semibold text-gray-700">
                    {event.title}
                  </h2>
                  <p className="text-gray-500">{event.date}</p>
                  <p className="text-gray-500 font-semibold text-sm">
                    {event.description}
                  </p>
                  <button className="border-2 border-gray-500 text-gray-500 font-semibold px-10 py-2 rounded-xl mt-auto w-full hover:bg-gray-500 hover:text-white ease-in-out duration-500">
                    Get Tickets
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Enter Your Email
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                required
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
