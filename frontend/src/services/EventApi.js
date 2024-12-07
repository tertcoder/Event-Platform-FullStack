import apiClient from "../utils/apiClient";

export const EventsService = {
  async getAllEvents() {
    const response = await apiClient.get("/events");
    return response.data;
  },

  async getEventById(eventId) {
    const response = await apiClient.get(`/events/${eventId}`);
    return response.data;
  },

  async createEvent(eventData) {
    const response = await apiClient.post("/events", eventData);
    return response.data;
  },

  async updateEvent(eventId, eventData) {
    const response = await apiClient.put(`/events/${eventId}`, eventData);
    return response.data;
  },

  async deleteEvent(eventId) {
    const response = await apiClient.delete(`/events/${eventId}`);
    return response.data;
  },
};
