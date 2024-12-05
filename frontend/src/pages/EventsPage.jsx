import { useState } from "react";
import EventCard from "../components/events/EventCard";
import { MOCK_EVENTS } from "../utils/mockData";

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    "All",
    "Music",
    "Sports",
    "Conference",
    "Workshop",
    "Exhibition",
    "Theater",
    "Comedy",
  ];

  const filteredEvents = MOCK_EVENTS.filter(
    event =>
      (selectedCategory === "" ||
        selectedCategory === "All" ||
        event.category === selectedCategory) &&
      (event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category
                ? "bg-primary text-white"
                : "bg-gray-200 text-textDark hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-2xl text-gray-500">
            No events found matching your search
          </p>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
