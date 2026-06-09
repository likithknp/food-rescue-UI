import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import Onboarding2 from "./pages/Onboarding2";
import Onboarding3 from "./pages/Onboarding3";
import Dashboard from "./pages/Dashboard";
import AddDonation from "./pages/AddDonation";
import Donations from "./pages/Donations";
import NGOs from "./pages/NGOs";
import PickupRequests from "./pages/PickupRequests";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Welcome />} />
        <Route path="/onboarding-2" element={<Onboarding2 />} />
        <Route path="/onboarding-3" element={<Onboarding3 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-donation" element={<AddDonation />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/ngos" element={<NGOs />} />
        <Route path="/pickups" element={<PickupRequests />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;