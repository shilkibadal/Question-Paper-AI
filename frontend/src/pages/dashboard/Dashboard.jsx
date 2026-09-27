import { Link } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const userName = user?.name || "Teacher";

  const stats = [
    {
      title: "Total Textbooks",
      value: "12",
      description: "Across all subjects",
      icon: "📚",
    },
    {
      title: "Question Papers",
      value: "28",
      description: "Generated papers",
      icon: "📝",
    },
    {
      title: "Subjects",
      value: "6",
      description: "Active subjects",
      icon: "📖",
    },
    {
      title: "This Month",
      value: "8",
      description: "Papers generated",
      icon: "📊",
    },
  ];

  const recentPapers = [
    {
      title: "Mathematics Unit Test",
      subject: "Mathematics",
      className: "Class 10",
      marks: 50,
      date: "Today",
    },
    {
      title: "Science Mid-Term Examination",
      subject: "Science",
      className: "Class 9",
      marks: 80,
      date: "Yesterday",
    },
    {
      title: "English Practice Paper",
      subject: "English",
      className: "Class 8",
      marks: 40,
      date: "Sep 18, 2026",
    },
  ];

  return (
    <div className="page-container">
      {/* Welcome Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1
            style={{
              margin: "0 0 8px",
              fontSize: "30px",
              color: "#0f172a",
            }}
          >
            Welcome back, {userName.split(" ")[0]} 👋
          </h1>

          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            Here's what's happening with your question papers today.
          </p>
        </div>

        <Link
          to="/generate-paper"
          className="primary-button"
          style={{
            textDecoration: "none",
          }}
        >
          + Generate Question Paper
        </Link>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.title}
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "22px",
              boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "18px",
              }}
            >
              <span
                style={{
                  fontSize: "26px",
                  width: "46px",
                  height: "46px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#eff6ff",
                  borderRadius: "12px",
                }}
              >
                {stat.icon}
              </span>

              <span
                style={{
                  color: "#16a34a",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                Active
              </span>
            </div>

            <div
              style={{
                fontSize: "30px",
                fontWeight: "800",
                color: "#0f172a",
                marginBottom: "4px",
              }}
            >
              {stat.value}
            </div>

            <div
              style={{
                fontWeight: "600",
                color: "#334155",
                marginBottom: "5px",
              }}
            >
              {stat.title}
            </div>

            <div
              style={{
                fontSize: "13px",
                color: "#94a3b8",
              }}
            >
              {stat.description}
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {/* Recent Papers */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "22px 24px",
              borderBottom: "1px solid #e2e8f0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h2
                style={{
                  margin: "0 0 5px",
                  fontSize: "19px",
                  color: "#0f172a",
                }}
              >
                Recent Question Papers
              </h2>

              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  color: "#94a3b8",
                }}
              >
                Your recently generated papers
              </p>
            </div>

            <Link
              to="/question-papers"
              style={{
                color: "#2563eb",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              View all →
            </Link>
          </div>

          <div>
            {recentPapers.map((paper, index) => (
              <div
                key={paper.title}
                style={{
                  padding: "20px 24px",
                  borderBottom:
                    index !== recentPapers.length - 1
                      ? "1px solid #f1f5f9"
                      : "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "11px",
                      background: "#eff6ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                    }}
                  >
                    📄
                  </div>

                  <div>
                    <h3
                      style={{
                        margin: "0 0 5px",
                        fontSize: "15px",
                        color: "#0f172a",
                      }}
                    >
                      {paper.title}
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        color: "#64748b",
                        fontSize: "13px",
                      }}
                    >
                      {paper.subject} • {paper.className} • {paper.marks} marks
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    textAlign: "right",
                    whiteSpace: "nowrap",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#94a3b8",
                      marginBottom: "7px",
                    }}
                  >
                    {paper.date}
                  </div>

                  <Link
                    to="/question-papers/1"
                    style={{
                      color: "#2563eb",
                      fontSize: "13px",
                      textDecoration: "none",
                      fontWeight: "600",
                    }}
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <h2
            style={{
              margin: "0 0 6px",
              fontSize: "19px",
              color: "#0f172a",
            }}
          >
            Quick Actions
          </h2>

          <p
            style={{
              margin: "0 0 20px",
              color: "#94a3b8",
              fontSize: "13px",
            }}
          >
            Get started with your next task
          </p>

          <div style={{ display: "grid", gap: "12px" }}>
            <Link
              to="/textbooks/upload"
              style={{
                textDecoration: "none",
                padding: "15px",
                border: "1px solid #dbeafe",
                borderRadius: "12px",
                background: "#f8fbff",
                display: "flex",
                alignItems: "center",
                gap: "13px",
              }}
            >
              <span style={{ fontSize: "22px" }}>📚</span>

              <div>
                <div
                  style={{
                    color: "#0f172a",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Upload Textbook
                </div>

                <div
                  style={{
                    color: "#94a3b8",
                    fontSize: "12px",
                    marginTop: "3px",
                  }}
                >
                  Add a new textbook
                </div>
              </div>
            </Link>

            <Link
              to="/generate-paper"
              style={{
                textDecoration: "none",
                padding: "15px",
                border: "1px solid #dbeafe",
                borderRadius: "12px",
                background: "#f8fbff",
                display: "flex",
                alignItems: "center",
                gap: "13px",
              }}
            >
              <span style={{ fontSize: "22px" }}>✨</span>

              <div>
                <div
                  style={{
                    color: "#0f172a",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Generate Paper
                </div>

                <div
                  style={{
                    color: "#94a3b8",
                    fontSize: "12px",
                    marginTop: "3px",
                  }}
                >
                  Create a new exam
                </div>
              </div>
            </Link>

            <Link
              to="/textbooks"
              style={{
                textDecoration: "none",
                padding: "15px",
                border: "1px solid #dbeafe",
                borderRadius: "12px",
                background: "#f8fbff",
                display: "flex",
                alignItems: "center",
                gap: "13px",
              }}
            >
              <span style={{ fontSize: "22px" }}>📖</span>

              <div>
                <div
                  style={{
                    color: "#0f172a",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Browse Textbooks
                </div>

                <div
                  style={{
                    color: "#94a3b8",
                    fontSize: "12px",
                    marginTop: "3px",
                  }}
                >
                  View your library
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div
        style={{
          marginTop: "24px",
          padding: "25px",
          borderRadius: "16px",
          background: "#eff6ff",
          border: "1px solid #dbeafe",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2
            style={{
              margin: "0 0 7px",
              fontSize: "19px",
              color: "#1e3a8a",
            }}
          >
            Ready to create your next paper?
          </h2>

          <p
            style={{
              margin: 0,
              color: "#475569",
              fontSize: "14px",
            }}
          >
            Select your textbook, customize the exam settings, and generate a
            paper in just a few steps.
          </p>
        </div>

        <Link
          to="/generate-paper"
          className="primary-button"
          style={{
            textDecoration: "none",
          }}
        >
          Start Generating →
        </Link>
      </div>

      {/* Responsive */}
      <style>
        {`
          @media (max-width: 1100px) {
            .page-container > div:nth-child(2) {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }

            .page-container > div:nth-child(3) {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 700px) {
            .page-container > div:nth-child(2) {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Dashboard;