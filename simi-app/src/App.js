import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProvideAuth from "./auth/ProvideAuth";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <ProvideAuth>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          {/* <Navigate from="/" to="login" /> */}
        </Router>
      </ProvideAuth>
    </>
  );
}

export default App;

function Dashboard() {
  return (
    <div>Dashboard</div>
  )
}