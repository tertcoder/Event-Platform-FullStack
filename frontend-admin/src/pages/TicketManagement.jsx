import { useState } from "react";
import { mockTickets } from "../utils/mockData";
import { SearchIcon, FilterIcon, RefreshCwIcon } from "lucide-react";

const TicketManagement = () => {
  const [tickets, setTickets] = useState(mockTickets);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredTickets = tickets.filter(
    ticket =>
      (filter === "all" || ticket.status === filter) &&
      (ticket.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.purchaserName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const renderTicketStatusBadge = status => {
    const statusColors = {
      confirmed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
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
      <h1 className="text-3xl font-heading font-bold text-text mb-6">
        Ticket Management
      </h1>

      <div className="flex justify-between mb-4 space-x-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search tickets by event or purchaser"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <SearchIcon className="absolute left-3 top-3 text-gray-400" />
        </div>

        <div className="flex space-x-2">
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="border rounded-md px-4 py-2"
          >
            <option value="all">All Tickets</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow-custom rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left">Event</th>
              <th className="p-4 text-left">Purchaser</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-left">Total Price</th>
              <th className="p-4 text-left">Purchase Date</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map(ticket => (
              <tr key={ticket.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{ticket.eventName}</td>
                <td className="p-4">{ticket.purchaserName}</td>
                <td className="p-4">{ticket.quantity}</td>
                <td className="p-4">${ticket.totalPrice.toLocaleString()}</td>
                <td className="p-4">{ticket.purchaseDate}</td>
                <td className="p-4">
                  {renderTicketStatusBadge(ticket.status)}
                </td>
                <td className="p-4">
                  <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-full">
                    <RefreshCwIcon className="w-5 h-5" />
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

export default TicketManagement;
