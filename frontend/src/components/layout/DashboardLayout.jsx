
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, Bell } from "lucide-react";
import Sidebar from "../Sidebar";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  let user = {};

  try {
    user = JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    user = {};
  }

  const userName = user.name || "Teacher";
  const initials = userName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="app-shell">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="app-main">

        {/* Topbar */}
        <header className="app-topbar">

          <button
            className="mobile-menu"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={21} />
          </button>

          <div className="topbar-spacer" />

          <button className="notification-button">
            <Bell size={19} />
            <span className="notification-dot" />
          </button>

          <div className="topbar-divider" />

          <div className="user-profile">
            <div className="user-avatar">
              {initials}
            </div>

            <div className="user-info">
              <strong>{userName}</strong>
              <span>{user.accountType || "Teacher"}</span>
            </div>
          </div>

        </header>

        {/* Main content */}
        <main className="app-content">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default DashboardLayout;
