import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        background: "#f8fafc",
      }}
    >
      {/* Left side */}
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
            Upload textbooks, customize your paper and create professional
            question papers from one simple workspace.
          </p>
        </div>
      </div>

      {/* Right side */}
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
            boxShadow: "0 15px 40px rgba(15, 23, 42, 0.07)",
          }}
        >
          <div style={{ marginBottom: "28px" }}>
            <h2
              style={{
                fontSize: "28px",
                marginBottom: "7px",
              }}
            >
              Welcome back
            </h2>

            <p
              style={{
                color: "#64748b",
                fontSize: "14px",
              }}
            >
              Sign in to your Question Paper AI account.
            </p>
          </div>

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

          <form onSubmit={handleSubmit}>
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

            <div className="form-group">
              <label>Password</label>

              <div style={{ position: "relative" }}>
                <input
                  className="form-input"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  style={{ paddingRight: "80px" }}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
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
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "22px",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  fontSize: "13px",
                  color: "#475569",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />

                Remember me
              </label>

              <button
                type="button"
                onClick={() =>
                  alert("Password recovery will be added soon.")
                }
                style={{
                  border: "none",
                  background: "none",
                  color: "#2563eb",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="primary-button"
              disabled={loading}
              style={{
                width: "100%",
                padding: "13px",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

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
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#2563eb",
                fontWeight: "700",
              }}
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile styles */}
      <style>
        {`
          @media (max-width: 800px) {
            .login-page {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Login;