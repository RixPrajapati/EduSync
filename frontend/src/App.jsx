import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import TeacherDashboard from "./TeacherDashboard";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin-dashboard" element={<TeacherDashboard />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
