import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";
import ForgotPassword from "../pages/ForgotPassword";
// Add more screens as needed

function AppRoutes() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* Other routes */}
    </Routes>
  );
}

export default AppRoutes;
