import { useAuth } from "../hooks/useAuth";
import { MOCK_EVENTS } from "../utils/mockData";
import { TicketIcon, UserIcon, MailIcon } from "@heroicons/react/solid";

const ProfilePage = () => {
  const { user, logout } = useAuth();

  // Mock ticket purchases - in real app, this would come from backend
  const mockTickets = [
    {
      id: "1",
      event: MOCK_EVENTS[0],
      quantity: 2,
      purchaseDate: new Date(),
      totalPrice: MOCK_EVENTS[0].ticketPrice * 2,
    },
    {
      id: "2",
      event: MOCK_EVENTS[1],
      quantity: 1,
      purchaseDate: new Date(),
      totalPrice: MOCK_EVENTS[1].ticketPrice,
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="bg-white shadow-md rounded-lg p-6 md:col-span-1">
          <div className="text-center">
            <div className="w-24 h-24 bg-primary text-white rounded-full mx-auto mb-4 flex items-center justify-center">
              <UserIcon className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-poppins font-bold text-primary">
              {user.name}
            </h2>
            <div className="flex items-center justify-center text-gray-600 mt-2">
              <MailIcon className="h-5 w-5 mr-2" />
              <span>{user.email}</span>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={() => {
                /* Edit Profile */
              }}
              className="w-full bg-secondary text-white py-2 rounded-md hover:bg-opacity-90"
            >
              Edit Profile
            </button>
            <button
              onClick={logout}
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-opacity-90"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tickets Section */}
        <div className="bg-white shadow-md rounded-lg p-6 md:col-span-2">
          <h3 className="text-2xl font-poppins font-bold mb-6 flex items-center">
            <TicketIcon className="h-6 w-6 mr-2 text-secondary" />
            My Tickets
          </h3>

          {mockTickets.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              You have no purchased tickets
            </div>
          ) : (
            <div className="space-y-4">
              {mockTickets.map(ticket => (
                <div
                  key={ticket.id}
                  className="flex items-center bg-gray-100 p-4 rounded-lg"
                >
                  <img
                    src={ticket.event.imageUrl}
                    alt={ticket.event.title}
                    className="w-24 h-24 object-cover rounded-md mr-4"
                  />
                  <div className="flex-grow">
                    <h4 className="text-lg font-semibold text-primary">
                      {ticket.event.title}
                    </h4>
                    <p className="text-gray-600">
                      {new Date(ticket.event.date).toLocaleDateString()} at{" "}
                      {ticket.event.time}
                    </p>
                    <div className="flex justify-between mt-2">
                      <span>
                        {ticket.quantity} Ticket{ticket.quantity > 1 ? "s" : ""}
                      </span>
                      <span className="font-bold text-secondary">
                        ${ticket.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
