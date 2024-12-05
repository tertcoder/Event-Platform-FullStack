import { useState } from "react";
import { mockEvents } from "../utils/mockData";
import { PlusIcon, EditIcon, TrashIcon } from "lucide-react";

const EventManagement = () => {
  const [events, setEvents] = useState(mockEvents);
  const [filter, setFilter] = useState("all");

  const filteredEvents = events.filter(
    event => filter === "all" || event.status === filter
  );

  const renderEventStatusBadge = status => {
    const statusColors = {
      active: "bg-green-100 text-green-800",
      completed: "bg-blue-100 text-blue-800",
      upcoming: "bg-yellow-100 text-yellow-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs ${statusColors[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-heading font-bold text-text">
          Event Management
        </h1>
        <button className="bg-primary text-white px-4 py-2 rounded-md flex items-center">
          <PlusIcon className="w-5 h-5 mr-2" />
          Create Event
        </button>
      </div>

      <div className="mb-4 flex space-x-2">
        {["all", "active", "completed"].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-md ${
              filter === status
                ? "bg-primary text-white"
                : "bg-gray-200 text-text-light"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white shadow-custom rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left">Event Name</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Tickets Sold</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map(event => (
              <tr key={event.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{event.name}</td>
                <td className="p-4">{event.date}</td>
                <td className="p-4">{event.location}</td>
                <td className="p-4">{renderEventStatusBadge(event.status)}</td>
                <td className="p-4">
                  {event.ticketsSold} / {event.totalTickets}
                </td>
                <td className="p-4 flex space-x-2">
                  <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-full">
                    <EditIcon className="w-5 h-5" />
                  </button>
                  <button className="text-red-600 hover:bg-red-50 p-2 rounded-full">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventManagement;
