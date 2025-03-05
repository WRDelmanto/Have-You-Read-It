import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes.jsx";

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
