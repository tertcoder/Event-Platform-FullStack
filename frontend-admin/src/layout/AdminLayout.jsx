// src/layout/AdminLayout.jsx
import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  HomeIcon,
  TicketIcon,
  UsersIcon,
  CalendarIcon,
  LogOutIcon,
} from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <HomeIcon className="w-5 h-5" />,
    },
    {
      name: "Events",
      path: "/events",
      icon: <CalendarIcon className="w-5 h-5" />,
    },
    {
      name: "Tickets",
      path: "/tickets",
      icon: <TicketIcon className="w-5 h-5" />,
    },
    {
      name: "Users",
      path: "/users",
      icon: <UsersIcon className="w-5 h-5" />,
    },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-heading font-bold text-primary">
          Event Hub
        </h2>
      </div>
      <nav className="p-4">
        {menuItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center p-3 mb-2 rounded-md transition-colors duration-200
              ${
                isActive
                  ? "bg-primary text-white"
                  : "text-text-light hover:bg-gray-100"
              }
            `}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
        <button className="w-full flex items-center p-3 mt-4 text-red-600 hover:bg-red-50 rounded-md">
          <LogOutIcon className="w-5 h-5 mr-3" />
          Logout
        </button>
      </nav>
    </div>
  );
};

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
