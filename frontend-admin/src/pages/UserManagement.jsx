import { useState } from "react";
import { mockUsers } from "../utils/mockData";
import {
  UserIcon,
  FilterIcon,
  BlocksIcon,
  UnlockIcon,
  MoreVerticalIcon,
  SearchIcon,
} from "lucide-react";

const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    user =>
      (filter === "all" || user.role.toLowerCase() === filter) &&
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const renderUserRoleBadge = (role, status) => {
    const roleColors = {
      client: "bg-blue-100 text-blue-800",
      organizer: "bg-green-100 text-green-800",
    };

    const statusColors = {
      active: "bg-green-100 text-green-800",
      suspended: "bg-red-100 text-red-800",
    };

    return (
      <div className="flex items-center space-x-2">
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            roleColors[role.toLowerCase()]
          }`}
        >
          {role}
        </span>
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            statusColors[status.toLowerCase()]
          }`}
        >
          {status}
        </span>
      </div>
    );
  };

  const handleUserAction = (userId, action) => {
    const updatedUsers = users.map(user =>
      user.id === userId
        ? { ...user, status: action === "block" ? "suspended" : "active" }
        : user
    );
    setUsers(updatedUsers);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-heading font-bold text-text">
          User Management
        </h1>
        <button className="bg-primary text-white px-4 py-2 rounded-md flex items-center">
          <UserIcon className="w-5 h-5 mr-2" />
          Add New User
        </button>
      </div>

      <div className="flex justify-between mb-4 space-x-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search users by name or email"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <SearchIcon className="absolute left-3 top-3 text-gray-400" />
        </div>

        <div className="flex space-x-2">
          {["all", "client", "organizer"].map(roleFilter => (
            <button
              key={roleFilter}
              onClick={() => setFilter(roleFilter)}
              className={`px-4 py-2 rounded-md ${
                filter === roleFilter
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-text-light"
              }`}
            >
              {roleFilter.charAt(0).toUpperCase() + roleFilter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-custom rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Contact</th>
              <th className="p-4 text-left">Role & Status</th>
              <th className="p-4 text-left">Registration</th>
              <th className="p-4 text-left">Activity</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center">
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <div className="font-semibold">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm">{user.contactNumber}</div>
                  <div className="text-xs text-gray-500">
                    {user.address.city}, {user.address.state}
                  </div>
                </td>
                <td className="p-4">
                  {renderUserRoleBadge(user.role, user.status)}
                </td>
                <td className="p-4">
                  <div className="text-sm">{user.registrationDate}</div>
                  <div className="text-xs text-gray-500">
                    Last Login: {user.lastLogin}
                  </div>
                </td>
                <td className="p-4">
                  {user.role === "Client" ? (
                    <div>
                      <div className="text-sm">
                        Purchases: {user.totalPurchases}
                      </div>
                      <div className="text-xs text-gray-500">
                        ${user.totalSpent} spent
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-sm">
                        Events: {user.eventsOrganized}
                      </div>
                      <div className="text-xs text-gray-500">
                        ${user.totalRevenue} revenue
                      </div>
                    </div>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    {user.status === "active" ? (
                      <button
                        onClick={() => handleUserAction(user.id, "block")}
                        className="text-red-600 hover:bg-red-50 p-2 rounded-full"
                        title="Block User"
                      >
                        <BlocksIcon className="w-5 h-5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUserAction(user.id, "unblock")}
                        className="text-green-600 hover:bg-green-50 p-2 rounded-full"
                        title="Activate User"
                      >
                        <UnlockIcon className="w-5 h-5" />
                      </button>
                    )}
                    <div className="relative">
                      <button
                        className="text-gray-600 hover:bg-gray-50 p-2 rounded-full"
                        title="More Actions"
                      >
                        <MoreVerticalIcon className="w-5 h-5" />
                      </button>
                      {/* Dropdown menu for more actions can be added here */}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
