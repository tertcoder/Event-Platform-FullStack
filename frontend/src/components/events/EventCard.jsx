import { CalendarIcon, LocationMarkerIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  const formatDate = date => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
      <img
        src={event.imageUrl || "/images/default-event.jpg"}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-poppins text-xl font-bold text-primary mb-2">
          {event.title}
        </h3>
        <div className="flex items-center text-gray-600 mb-2">
          <CalendarIcon className="h-5 w-5 mr-2 text-secondary" />
          <span>
            {formatDate(event.date)} at {event.time}
          </span>
        </div>
        <div className="flex items-center text-gray-600 mb-4">
          <LocationMarkerIcon className="h-5 w-5 mr-2 text-secondary" />
          <span>
            {event.location.venue}, {event.location.address.city}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-primary">
            ${event.ticketPrice}
          </span>
          <Link
            to={`/events/${event._id}`}
            className="bg-secondary text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
