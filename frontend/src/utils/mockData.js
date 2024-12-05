export const MOCK_EVENTS = [
  {
    _id: "1",
    title: "Summer Music Festival",
    description:
      "A vibrant music festival featuring top artists from around the world.",
    date: new Date("2024-07-15"),
    time: "18:00",
    location: {
      venue: "City Park Arena",
      address: {
        street: "123 Music Lane",
        city: "Melodia",
        state: "MU",
        zipCode: "54321",
      },
    },
    category: "Music",
    ticketPrice: 75,
    totalTickets: 5000,
    availableTickets: 4500,
    imageUrl:
      "https://i.pinimg.com/originals/83/d5/7f/83d57ffd24e399b8053bcfa0d921c3e5.jpg",
    status: "Active",
  },
  {
    _id: "2",
    title: "Tech Innovation Conference",
    description:
      "Annual conference bringing together tech innovators and entrepreneurs.",
    date: new Date("2024-09-22"),
    time: "09:00",
    location: {
      venue: "Convention Center",
      address: {
        street: "456 Innovation Blvd",
        city: "Techville",
        state: "TC",
        zipCode: "12345",
      },
    },
    category: "Conference",
    ticketPrice: 250,
    totalTickets: 1000,
    availableTickets: 850,
    imageUrl:
      "https://temstechsolutions.com/wp-content/uploads/2024/01/ICTISI-2024.jpg",
    status: "Active",
  },
];
