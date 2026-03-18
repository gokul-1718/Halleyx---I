import { Link } from "react-router-dom";
import "../styles/layout.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <h2>Workflow Engine</h2>

      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/steps">Steps</Link>
        <Link to="/execution">Execution</Link>
      </div>
    </div>
  );
}
