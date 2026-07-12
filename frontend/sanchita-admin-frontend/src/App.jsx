import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import AcademicManagement from './components/AcademicManagement';
import UserManagementTable from './components/UserManagementTable';
import FeeCollectionSection from './components/FeeCollectionSection';
import NoticesSection from './components/NoticesSection';
import AttendanceSection from './components/AttendanceSection';
import MarksSection from './components/MarksSection';
import AssignmentsSection from './components/AssignmentsSection';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/courses" element={<AcademicManagement />} />
        <Route path="/users" element={<UserManagementTable />} />
        <Route path="/fees" element={<FeeCollectionSection />} />
        <Route path="/notices" element={<NoticesSection />} />
        <Route path="/attendance" element={<AttendanceSection />} />
        <Route path="/marks" element={<MarksSection />} />
        <Route path="/assignments" element={<AssignmentsSection />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;