import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
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

        <Route path="/" element={<Login />} />
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