import apiClient from "../utils/apiClient";

export const TicketsService = {
  async purchaseTickets(eventId, quantity, user) {
    try {
      const response = await apiClient.post("/tickets/purchase", {
        eventId,
        quantity,
        user,
      });
      return response.data;
    } catch (error) {
      // Centralize error handling
      if (error.response) {
        throw new Error(
          error.response.data.details || "Failed to purchase tickets"
        );
      }
      throw error;
    }
  },

  async getUserTickets(user) {
    try {
      const response = await apiClient.get(`/tickets/my-tickets/${user.id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to retrieve tickets");
    }
  },
};
