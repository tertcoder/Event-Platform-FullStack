import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AdminLayout from "./layout/AdminLayout";
import Login from "./pages/Login";
import EventManagement from "./pages/EventManagement";
import TicketManagement from "./pages/TicketManagement";
import UserManagement from "./pages/UserManagement";
import DashboardStats from "./components/dashboard/DashboardStats";

// Protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = true; // Replace with actual authentication check
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardStats />} />
            <Route path="events" element={<EventManagement />} />
            <Route path="tickets" element={<TicketManagement />} />
            <Route path="users" element={<UserManagement />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
