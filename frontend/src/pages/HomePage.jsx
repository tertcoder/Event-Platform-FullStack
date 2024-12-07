import { Link } from "react-router-dom";
import EventCard from "../components/events/EventCard";
import { MOCK_EVENTS } from "../utils/mockData";
import { EventsService } from "../services/EventApi";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await EventsService.getAllEvents();
        console.log(fetchedEvents);
        setEvents(fetchedEvents.events.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch events", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <section className="text-center bg-gradient-to-r from-primary to-secondary text-white py-16 rounded-lg">
        <h1 className="text-4xl font-poppins font-bold mb-4">
          Discover Amazing Events
        </h1>
        <p className="text-xl mb-8">
          Find and book exciting events happening near you
        </p>
        <Link
          to="/events"
          className="bg-white text-primary px-6 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-colors"
        >
          Explore Events
        </Link>
      </section>

      <section>
        <h2 className="text-3xl font-poppins font-bold mb-6 text-center">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.slice(0, 3).map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/events"
            className="bg-secondary text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors"
          >
            View All Events
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
