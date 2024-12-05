import React from "react";
import { mockEvents } from "../../utils/mockData";

const DashboardStats = () => {
  // Calculate dashboard statistics
  const totalEvents = mockEvents.length;
  const activeEvents = mockEvents.filter(
    event => event.status === "active"
  ).length;
  const totalTicketsSold = mockEvents.reduce(
    (sum, event) => sum + event.ticketsSold,
    0
  );
  const totalRevenue = mockEvents.reduce(
    (sum, event) => sum + event.ticketsSold * event.ticketPrice,
    0
  );

  const statsCards = [
    {
      title: "Total Events",
      value: totalEvents,
      icon: "🎉",
    },
    {
      title: "Active Events",
      value: activeEvents,
      icon: "🔥",
    },
    {
      title: "Tickets Sold",
      value: totalTicketsSold,
      icon: "🎫",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: "💰",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-heading font-bold text-text mb-6">
        Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-custom p-6 flex items-center space-x-4 transition-transform transform hover:scale-105"
          >
            <div className="text-4xl">{stat.icon}</div>
            <div>
              <p className="text-text-light text-sm">{stat.title}</p>
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-2xl font-heading font-semibold text-text mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="bg-primary text-white py-3 rounded-md hover:bg-primary-dark transition-colors">
            Create New Event
          </button>
          <button className="bg-secondary text-white py-3 rounded-md hover:bg-secondary-light transition-colors">
            Manage Tickets
          </button>
          <button className="bg-text-light text-white py-3 rounded-md hover:opacity-80 transition-colors">
            User Management
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
