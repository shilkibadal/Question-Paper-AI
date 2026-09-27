import { useState } from "react";

function Settings() {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [profile, setProfile] = useState({
    name: storedUser.name || "Test Teacher",
    email: storedUser.email || "testteacher@example.com",
    accountType: storedUser.accountType || "Teacher",
  });

  const [preferences, setPreferences] = useState({
    language: "English",
    difficulty: "Medium",
    className: "Class 10",
  });

  const [notifications, setNotifications] = useState({
    paperGenerated: true,
    weeklySummary: true,
    newFeatures: false,
  });

  const [appearance, setAppearance] = useState("Light");
  const [activeSection, setActiveSection] = useState("profile");

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePreferenceChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.value,
    });
  };

  const toggleNotification = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  const handleSave = () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...storedUser,
        name: profile.name,
        email: profile.email,
        accountType: profile.accountType,
      })
    );

    alert("Settings saved successfully!");
  };

  const handlePasswordChange = () => {
    alert("Password change will be connected to the backend next.");
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your profile, preferences and account settings.</p>
        </div>

        <button className="primary-button" onClick={handleSave}>
          Save Changes
        </button>
      </div>

      <div className="settings-layout">
        {/* Settings Navigation */}
        <div className="settings-nav">
          <button
            className={activeSection === "profile" ? "active" : ""}
            onClick={() => setActiveSection("profile")}
          >
            👤 Profile
          </button>

          <button
            className={activeSection === "preferences" ? "active" : ""}
            onClick={() => setActiveSection("preferences")}
          >
            ⚙️ Preferences
          </button>

          <button
            className={activeSection === "notifications" ? "active" : ""}
            onClick={() => setActiveSection("notifications")}
          >
            🔔 Notifications
          </button>

          <button
            className={activeSection === "appearance" ? "active" : ""}
            onClick={() => setActiveSection("appearance")}
          >
            🎨 Appearance
          </button>

          <button
            className={activeSection === "security" ? "active" : ""}
            onClick={() => setActiveSection("security")}
          >
            🔒 Security
          </button>
        </div>

        {/* Settings Content */}
        <div className="settings-content">
          {/* Profile */}
          {activeSection === "profile" && (
            <div className="settings-card">
              <div className="settings-card-header">
                <h2>Profile Information</h2>
                <p>
                  Update the information associated with your Question Paper AI
                  account.
                </p>
              </div>

              <div className="settings-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    className="form-input"
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    className="form-input"
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="form-group">
                  <label>Account Type</label>
                  <input
                    className="form-input"
                    type="text"
                    value={profile.accountType}
                    disabled
                  />
                </div>
              </div>

              <div
                style={{
                  marginTop: "10px",
                  padding: "15px",
                  background: "#eff6ff",
                  borderRadius: "10px",
                  color: "#1e40af",
                  fontSize: "13px",
                }}
              >
                Your account information is securely stored and will be
                connected to the backend database.
              </div>
            </div>
          )}

          {/* Preferences */}
          {activeSection === "preferences" && (
            <div className="settings-card">
              <div className="settings-card-header">
                <h2>Paper Preferences</h2>
                <p>
                  Set your default options for generating question papers.
                </p>
              </div>

              <div className="settings-grid">
                <div className="form-group">
                  <label>Default Paper Language</label>

                  <select
                    className="form-select"
                    name="language"
                    value={preferences.language}
                    onChange={handlePreferenceChange}
                  >
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Bilingual</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Default Difficulty</label>

                  <select
                    className="form-select"
                    name="difficulty"
                    value={preferences.difficulty}
                    onChange={handlePreferenceChange}
                  >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Default Class</label>

                  <select
                    className="form-select"
                    name="className"
                    value={preferences.className}
                    onChange={handlePreferenceChange}
                  >
                    <option>Class 6</option>
                    <option>Class 7</option>
                    <option>Class 8</option>
                    <option>Class 9</option>
                    <option>Class 10</option>
                    <option>Class 11</option>
                    <option>Class 12</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeSection === "notifications" && (
            <div className="settings-card">
              <div className="settings-card-header">
                <h2>Notifications</h2>
                <p>Choose which updates you want to receive.</p>
              </div>

              <div className="settings-row">
                <div className="settings-row-info">
                  <h4>Paper Generated</h4>
                  <p>
                    Get notified when your question paper has been generated.
                  </p>
                </div>

                <button
                  className={`toggle ${
                    notifications.paperGenerated ? "active" : ""
                  }`}
                  onClick={() => toggleNotification("paperGenerated")}
                />
              </div>

              <div className="settings-row">
                <div className="settings-row-info">
                  <h4>Weekly Summary</h4>
                  <p>
                    Receive a summary of your textbook and paper activity.
                  </p>
                </div>

                <button
                  className={`toggle ${
                    notifications.weeklySummary ? "active" : ""
                  }`}
                  onClick={() => toggleNotification("weeklySummary")}
                />
              </div>

              <div className="settings-row">
                <div className="settings-row-info">
                  <h4>New Features</h4>
                  <p>
                    Receive information about new Question Paper AI features.
                  </p>
                </div>

                <button
                  className={`toggle ${
                    notifications.newFeatures ? "active" : ""
                  }`}
                  onClick={() => toggleNotification("newFeatures")}
                />
              </div>
            </div>
          )}

          {/* Appearance */}
          {activeSection === "appearance" && (
            <div className="settings-card">
              <div className="settings-card-header">
                <h2>Appearance</h2>
                <p>Customize how Question Paper AI looks for you.</p>
              </div>

              <div className="settings-grid">
                <div className="form-group">
                  <label>Theme</label>

                  <select
                    className="form-select"
                    value={appearance}
                    onChange={(e) => setAppearance(e.target.value)}
                  >
                    <option>Light</option>
                    <option>Dark</option>
                    <option>System Default</option>
                  </select>
                </div>
              </div>

              <div
                style={{
                  marginTop: "15px",
                  padding: "16px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  background: "#f8fafc",
                }}
              >
                <strong>Theme Preview</strong>

                <p
                  style={{
                    marginTop: "5px",
                    color: "#64748b",
                    fontSize: "13px",
                  }}
                >
                  Dark mode can be connected globally once the backend and
                  application preferences are finalized.
                </p>
              </div>
            </div>
          )}

          {/* Security */}
          {activeSection === "security" && (
            <div className="settings-card">
              <div className="settings-card-header">
                <h2>Security</h2>
                <p>Manage your password and account security.</p>
              </div>

              <div className="settings-row">
                <div className="settings-row-info">
                  <h4>Password</h4>
                  <p>
                    Change your account password regularly to keep your account
                    secure.
                  </p>
                </div>

                <button
                  className="secondary-button"
                  onClick={handlePasswordChange}
                >
                  Change Password
                </button>
              </div>

              <div className="settings-row">
                <div className="settings-row-info">
                  <h4>Authentication</h4>
                  <p>
                    Your account uses secure JWT-based authentication.
                  </p>
                </div>

                <span
                  style={{
                    color: "#16a34a",
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  ● Active
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;