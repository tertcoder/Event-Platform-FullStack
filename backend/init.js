const mongoose = require("mongoose");
const User = require("./models/User");
const Event = require("./models/Event");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Sample seed data
const seedUsers = [
  {
    firstName: "Latisha",
    lastName: "Carelle",
    email: "latisha@event.com",
    password: "latisha123",
    role: "admin",
  },
  {
    firstName: "Alain",
    lastName: "Gushaka",
    email: "alain@event.com",
    password: "alain123",
    role: "user",
  },
];

const seedEvents = [
  {
    title: "Bujumbura Music Fest",
    description:
      "A vibrant festival showcasing local and international artists.",
    date: new Date("2024-06-10"),
    time: "05:00 PM",
    location: {
      venue: "Independence Square",
      address: {
        street: "Avenue de l'Indépendance",
        city: "Bujumbura",
        state: "BU",
        zipCode: "1000",
      },
    },
    category: "Music",
    ticketPrice: 50.0,
    totalTickets: 2000,
    organizer: null,
    imageUrl:
      "https://cdn5.vectorstock.com/i/1000x1000/88/44/music-fest-poster-with-instruments-vector-30748844.jpg",
  },
  {
    title: "Burundi Tech Summit",
    description: "A gathering of innovators and entrepreneurs in tech.",
    date: new Date("2024-08-20"),
    time: "09:00 AM",
    location: {
      venue: "Bujumbura Convention Center",
      address: {
        street: "Rue de l'Unité",
        city: "Bujumbura",
        state: "BU",
        zipCode: "1010",
      },
    },
    category: "Conference",
    ticketPrice: 150.0,
    totalTickets: 500,
    organizer: null,
    imageUrl:
      "https://www.directsellingnews.com/wp-content/uploads/2021/12/2100x900_HEADER_TECH_SUMMIT.jpg",
  },
  {
    title: "Ngozi Agricultural Expo",
    description:
      "Showcasing the latest innovations in farming and agriculture.",
    date: new Date("2024-09-15"),
    time: "10:00 AM",
    location: {
      venue: "Ngozi Fairgrounds",
      address: {
        street: "Route des Collines",
        city: "Ngozi",
        state: "NG",
        zipCode: "2000",
      },
    },
    category: "Exhibition",
    ticketPrice: 20.0,
    totalTickets: 300,
    organizer: null,
    imageUrl:
      "https://www.shutterstock.com/image-vector/design-concept-agriculture-exhibition-fair-600nw-1649072110.jpg",
  },
  {
    title: "Gitega Art and Culture Fair",
    description: "A celebration of art and culture from Burundi and beyond.",
    date: new Date("2024-07-25"),
    time: "03:00 PM",
    location: {
      venue: "Gitega Cultural Center",
      address: {
        street: "Avenue du Patrimoine",
        city: "Gitega",
        state: "GI",
        zipCode: "3000",
      },
    },
    category: "Exhibition",
    ticketPrice: 25.0,
    totalTickets: 700,
    organizer: null,
    imageUrl:
      "https://i.pinimg.com/originals/fd/ef/7f/fdef7f789e16283fb407a357b267fa15.jpg",
  },
  {
    title: "Burundi Marathon 2024",
    description:
      "Join the annual marathon through the scenic routes of Burundi.",
    date: new Date("2024-04-18"),
    time: "06:00 AM",
    location: {
      venue: "Stadium Prince Louis Rwagasore",
      address: {
        street: "Boulevard Mwambutsa",
        city: "Bujumbura",
        state: "BU",
        zipCode: "1000",
      },
    },
    category: "Sports",
    ticketPrice: 15.0,
    totalTickets: 1000,
    organizer: null,
    imageUrl:
      "https://www.upnextghana.com/ung-admin/uploads/files/jzt42k5pfhvl9wa.jpg",
  },
  {
    title: "Kayanza Coffee Festival",
    description: "Experience the rich coffee culture of Burundi.",
    date: new Date("2024-10-05"),
    time: "08:00 AM",
    location: {
      venue: "Kayanza Coffee Plaza",
      address: {
        street: "Place de la Caféiculture",
        city: "Kayanza",
        state: "KY",
        zipCode: "4000",
      },
    },
    category: "Other",
    ticketPrice: 10.0,
    totalTickets: 600,
    organizer: null,
    imageUrl:
      "https://marketplace.canva.com/EAFJRN9EKxE/1/0/1131w/canva-brown-illustrated-coffee-festival-flyer-FDmphS0iUq0.jpg",
  },
  {
    title: "Burundi Film Week",
    description: "A week-long celebration of local and international cinema.",
    date: new Date("2024-05-12"),
    time: "07:00 PM",
    location: {
      venue: "Cinema Bujumbura",
      address: {
        street: "Boulevard de la Révolution",
        city: "Bujumbura",
        state: "BU",
        zipCode: "1000",
      },
    },
    category: "Theater",
    ticketPrice: 30.0,
    totalTickets: 800,
    organizer: null,
    imageUrl:
      "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/film-festival-flyer-template-f8ddd87899ce372f0b0d224b20c1d65a_screen.jpg?ts=1636974580",
  },
  {
    title: "Burundi Fashion Gala",
    description:
      "Showcasing the latest trends in fashion from Burundi and Africa.",
    date: new Date("2024-11-18"),
    time: "05:00 PM",
    location: {
      venue: "Royal Palm Hotel",
      address: {
        street: "Avenue de la Paix",
        city: "Bujumbura",
        state: "BU",
        zipCode: "1000",
      },
    },
    category: "Other",
    ticketPrice: 70.0,
    totalTickets: 400,
    organizer: null,
    imageUrl:
      "https://img.freepik.com/premium-psd/fashion-show-flyer_710940-4015.jpg?semt=ais_hybrid",
  },
  {
    title: "Makamba Green Energy Expo",
    description: "Exploring sustainable energy solutions for the future.",
    date: new Date("2024-03-21"),
    time: "10:00 AM",
    location: {
      venue: "Makamba Civic Hall",
      address: {
        street: "Rue des Energies",
        city: "Makamba",
        state: "MK",
        zipCode: "5000",
      },
    },
    category: "Exhibition",
    ticketPrice: 35.0,
    totalTickets: 300,
    organizer: null,
    imageUrl:
      "https://img.freepik.com/free-psd/renewable-sustainable-energy-vertical-poster-template-with-spheres-lightning-bolts_23-2149448817.jpg",
  },
  {
    title: "Burundi Poetry Night",
    description: "An evening of poetry and spoken word performances.",
    date: new Date("2024-12-05"),
    time: "06:00 PM",
    location: {
      venue: "Bujumbura Arts Center",
      address: {
        street: "Avenue des Artistes",
        city: "Bujumbura",
        state: "BU",
        zipCode: "1000",
      },
    },
    category: "Other",
    ticketPrice: 20.0,
    totalTickets: 200,
    organizer: null,
    imageUrl:
      "https://artsgarage.org/wp-content/uploads/2020/01/PoetryOpenMic_WEBFEATURE-01.png",
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing data
    await User.deleteMany({});
    await Event.deleteMany({});

    // Create admin user
    const createdUsers = await User.create(seedUsers);

    // Assign organizer to first event
    seedEvents[0].organizer = createdUsers[0]._id;

    // Create events
    await Event.create(seedEvents);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
}

seedDatabase();
