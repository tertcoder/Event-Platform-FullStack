import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CalendarIcon,
  LocationMarkerIcon,
  TicketIcon,
} from "@heroicons/react/solid";
import { MOCK_EVENTS } from "../utils/mockData";
import { useAuth } from "../hooks/useAuth";

const EventDetailPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const event = MOCK_EVENTS.find(e => e._id === eventId);
  const [quantity, setQuantity] = useState(1);

  if (!event) {
    return <div className="text-center text-2xl mt-12">Event Not Found</div>;
  }

  const handlePurchaseTicket = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/events/${eventId}` } });
      return;
    }

    // In a real app, this would call a purchase API
    alert(`Purchased ${quantity} ticket(s) for ${event.title}`);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full rounded-lg shadow-md object-cover h-96"
        />
      </div>

      <div className="space-y-6">
        <h1 className="text-4xl font-poppins font-bold text-primary">
          {event.title}
        </h1>

        <div className="space-y-4">
          <div className="flex items-center">
            <CalendarIcon className="h-6 w-6 mr-3 text-secondary" />
            <span className="text-lg">
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              at {event.time}
            </span>
          </div>

          <div className="flex items-center">
            <LocationMarkerIcon className="h-6 w-6 mr-3 text-secondary" />
            <span className="text-lg">
              {event.location.venue}, {event.location.address.street},
              {event.location.address.city}, {event.location.address.state}
            </span>
          </div>
        </div>

        <p className="text-gray-600 leading-relaxed">{event.description}</p>

        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold text-primary">
            ${event.ticketPrice} per ticket
          </span>
          <span className="text-gray-500">
            {event.availableTickets} tickets left
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="bg-gray-200 px-3 py-1 rounded-l-full"
            >
              -
            </button>
            <span className="px-4 py-1 bg-gray-100">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(10, quantity + 1))}
              className="bg-gray-200 px-3 py-1 rounded-r-full"
            >
              +
            </button>
          </div>

          <button
            onClick={handlePurchaseTicket}
            disabled={event.availableTickets < quantity}
            className="bg-secondary text-white px-6 py-2 rounded-full flex items-center hover:bg-opacity-90 disabled:opacity-50"
          >
            <TicketIcon className="h-5 w-5 mr-2" />
            Purchase Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
