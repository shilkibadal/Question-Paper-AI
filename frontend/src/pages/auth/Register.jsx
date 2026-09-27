import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    accountType: "Teacher",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      setMessage("Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.error("Registration error:", err);
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="register-page"
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        background: "#f8fafc",
      }}
    >

      {/* ================= LEFT SIDE ================= */}

      <div
        style={{
          background: "#2563eb",
          color: "white",
          padding: "60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Link
          to="/"
          style={{
            color: "white",
            fontSize: "22px",
            fontWeight: "800",
            marginBottom: "60px",
            textDecoration: "none",
          }}
        >
          Question Paper AI
        </Link>

        <div style={{ maxWidth: "520px" }}>

          <h1
            style={{
              fontSize: "44px",
              lineHeight: "1.1",
              marginBottom: "20px",
            }}
          >
            Create better question papers, faster.
          </h1>

          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.7",
              opacity: 0.9,
            }}
          >
            Upload textbooks, customize your paper and create
            professional question papers from one simple workspace.
          </p>

        </div>
      </div>


      {/* ================= RIGHT SIDE ================= */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "30px",
        }}
      >

        <div
          style={{
            width: "100%",
            maxWidth: "440px",
            background: "white",
            padding: "35px",
            borderRadius: "18px",
            border: "1px solid #e2e8f0",
            boxShadow:
              "0 15px 40px rgba(15, 23, 42, 0.07)",
          }}
        >

          {/* Header */}

          <div style={{ marginBottom: "28px" }}>

            <h2
              style={{
                fontSize: "28px",
                marginBottom: "7px",
              }}
            >
              Create your account
            </h2>

            <p
              style={{
                color: "#64748b",
                fontSize: "14px",
              }}
            >
              Create your Question Paper AI account.
            </p>

          </div>


          {/* Error */}

          {error && (
            <div
              style={{
                background: "#fef2f2",
                color: "#dc2626",
                border: "1px solid #fecaca",
                borderRadius: "9px",
                padding: "11px 13px",
                marginBottom: "18px",
                fontSize: "13px",
              }}
            >
              {error}
            </div>
          )}


          {/* Success */}

          {message && (
            <div
              style={{
                background: "#f0fdf4",
                color: "#16a34a",
                border: "1px solid #bbf7d0",
                borderRadius: "9px",
                padding: "11px 13px",
                marginBottom: "18px",
                fontSize: "13px",
              }}
            >
              {message}
            </div>
          )}


          <form onSubmit={handleSubmit}>

            {/* Name */}

            <div className="form-group">

              <label>Full Name</label>

              <input
                className="form-input"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
              />

            </div>


            {/* Email */}

            <div className="form-group">

              <label>Email Address</label>

              <input
                className="form-input"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />

            </div>


            {/* Password */}

            <div className="form-group">

              <label>Password</label>

              <div style={{ position: "relative" }}>

                <input
                  className="form-input"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  style={{
                    paddingRight: "65px",
                  }}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    border: "none",
                    background: "transparent",
                    color: "#2563eb",
                    fontSize: "12px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>


            {/* Account Type */}

            <div className="form-group">

              <label>Account Type</label>

              <select
                className="form-select"
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
              >
                <option value="Teacher">
                  Teacher
                </option>

                <option value="School Admin">
                  School Admin
                </option>
              </select>

            </div>


            {/* Button */}

            <button
              type="submit"
              className="primary-button"
              disabled={loading}
              style={{
                width: "100%",
                padding: "13px",
                opacity: loading ? 0.7 : 1,
                marginTop: "5px",
              }}
            >
              {loading
                ? "Creating account..."
                : "Create Account"}
            </button>

          </form>


          {/* Login */}

          <div
            style={{
              textAlign: "center",
              marginTop: "25px",
              paddingTop: "20px",
              borderTop: "1px solid #e2e8f0",
              fontSize: "13px",
              color: "#64748b",
            }}
          >
            Already have an account?{" "}

            <Link
              to="/login"
              style={{
                color: "#2563eb",
                fontWeight: "700",
                textDecoration: "none",
              }}
            >
              Sign in
            </Link>

          </div>

        </div>

      </div>


      {/* ================= MOBILE ================= */}

      <style>
        {`
          @media (max-width: 800px) {
            .register-page {
              grid-template-columns: 1fr !important;
            }

            .register-page > div:first-child {
              display: none !important;
            }

            .register-page > div:last-child {
              min-height: 100vh;
            }
          }
        `}
      </style>

    </div>
  );
}

export default Register;