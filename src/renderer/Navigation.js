import React from "react";
import { Link } from "react-router-dom";

export default function Navigation({ token, onLogout }) {
  return (
    <nav>
      <Link to="/home">Home</Link>
      <Link to="/lock">Dashboard</Link>
      {token && (
        <button type="button" onClick={onLogout}>
          Sign Out
        </button>
      )}
    </nav>
  );
};
