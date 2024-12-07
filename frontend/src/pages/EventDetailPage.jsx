import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CalendarIcon,
  LocationMarkerIcon,
  TicketIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/solid";
import { MOCK_EVENTS } from "../utils/mockData";
import { useAuth } from "../hooks/useAuth";
import { EventsService } from "../services/EventApi";
import { TicketsService } from "../services/TicketApi";

const EventDetailPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const navigate = useNavigate();
  // user object is like this  {
  //     "id": "6752a338bb045542b82ccfee",
  //     "email": "tuyishimirebt12@gmail.com",
  //     "name": "Bon Tertius Tuyishimire",
  //     "role": "client"
  // }
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const fetchedEvent = await EventsService.getEventById(eventId);
        console.log(fetchEvent);
        setEvent(fetchedEvent);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch event", error);
        setLoading(false);
        navigate("/events");
      }
    };

    fetchEvent();
  }, [eventId, navigate]);

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

  if (loading) return <div>Loading...</div>;

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
            onClick={() => setIsPurchaseModalOpen(true)}
            disabled={event.availableTickets < 1}
            className="bg-secondary text-white px-6 py-2 rounded-full"
          >
            Buy Tickets
          </button>

          {event && (
            <TicketPurchaseModal
              event={event}
              isOpen={isPurchaseModalOpen}
              onClose={() => setIsPurchaseModalOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const TicketPurchaseModal = ({ event, isOpen, onClose, onPurchaseSuccess }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, user, logout } = useAuth();

  const handleQuantityChange = change => {
    setQuantity(prevQuantity =>
      Math.min(Math.max(1, prevQuantity + change), event.availableTickets)
    );
  };

  const handlePurchaseTicket = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log(event);
      const result = await TicketsService.purchaseTickets(
        event._id,
        quantity,
        user
      );

      // Optional: Call a success callback if provided
      if (onPurchaseSuccess) {
        onPurchaseSuccess(result);
      }

      // Show success message
      alert(`Successfully purchased ${quantity} ticket(s) for ${event.title}`);

      // Close the modal
      onClose();
    } catch (err) {
      // Set error state to display to user
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-96 p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          disabled={isLoading}
        >
          &#x2715;
        </button>

        {/* Modal Header */}
        <div className="flex items-center mb-4">
          <TicketIcon className="h-6 w-6 mr-2 text-secondary" />
          <h2 className="text-xl font-bold">Purchase Tickets</h2>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Event Details */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">{event.title}</span>
            <span className="text-gray-600">
              ${event.ticketPrice} per ticket
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between">
            <span>Available Tickets: {event.availableTickets}</span>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1 || isLoading}
                className="
                  bg-gray-200 p-2 rounded-full 
                  disabled:opacity-50 disabled:cursor-not-allowed
                  hover:bg-gray-300 transition-colors
                "
              >
                <MinusIcon className="h-4 w-4" />
              </button>

              <span className="px-4 py-2 border rounded">{quantity}</span>

              <button
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= event.availableTickets || isLoading}
                className="
                  bg-gray-200 p-2 rounded-full 
                  disabled:opacity-50 disabled:cursor-not-allowed
                  hover:bg-gray-300 transition-colors
                "
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Total Price */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-bold">Total Price:</span>
            <span className="text-xl text-secondary">
              ${(event.ticketPrice * quantity).toFixed(2)}
            </span>
          </div>

          {/* Purchase Button */}
          <button
            onClick={handlePurchaseTicket}
            disabled={quantity > event.availableTickets || isLoading}
            className="
              w-full py-3 mt-4 
              bg-secondary text-white rounded-lg 
              flex items-center justify-center
              hover:bg-opacity-90 
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {isLoading ? (
              <span>Processing...</span>
            ) : (
              <>
                <TicketIcon className="mr-2 h-5 w-5" />
                Purchase Tickets
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
