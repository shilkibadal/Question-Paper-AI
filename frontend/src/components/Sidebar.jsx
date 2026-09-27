
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  FileText,
  Settings,
  LogOut,
  GraduationCap,
} from "lucide-react";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Textbooks",
      path: "/textbooks",
      icon: BookOpen,
    },
    {
      name: "Generate Paper",
      path: "/generate-paper",
      icon: Sparkles,
    },
    {
      name: "Question Papers",
      path: "/question-papers",
      icon: FileText,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setSidebarOpen?.(false);
    navigate("/login");
  };

  return (
    <aside className={`app-sidebar ${sidebarOpen ? "open" : ""}`}>
      
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="brand-icon">
          <GraduationCap size={22} />
        </div>

        <div className="brand-text">
          <h1>Question Paper</h1>
          <span>AI Workspace</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="sidebar-content">
        <div className="sidebar-label">WORKSPACE</div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen?.(false)}
                className={({ isActive }) =>
                  `sidebar-item ${isActive ? "active" : ""}`
                }
              >
                <Icon size={19} strokeWidth={1.8} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-label settings-label">ACCOUNT</div>

        <NavLink
          to="/settings"
          onClick={() => setSidebarOpen?.(false)}
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <Settings size={19} strokeWidth={1.8} />
          <span>Settings</span>
        </NavLink>
      </div>

      {/* Bottom */}
      <div className="sidebar-footer">
        <div className="sidebar-help">
          <div className="help-icon">
            <Sparkles size={16} />
          </div>

          <div>
            <strong>AI Powered</strong>
            <span>Generate smarter papers</span>
          </div>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
