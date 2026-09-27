import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      {/* Navbar */}
      <header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            to="/"
            style={{
              fontSize: "21px",
              fontWeight: "800",
              color: "#2563eb",
            }}
          >
            Question Paper AI
          </Link>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <Link
              to="/login"
              className="secondary-button"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="primary-button"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        style={{
          padding: "80px 24px",
          background:
            "linear-gradient(135deg, #eff6ff 0%, #ffffff 60%)",
        }}
      >
        <div
          style={{
            maxWidth: "1150px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "50px",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-block",
                padding: "7px 12px",
                background: "#dbeafe",
                color: "#1d4ed8",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "700",
                marginBottom: "18px",
              }}
            >
              AI-Powered Question Paper Generator
            </div>

            <h1
              style={{
                fontSize: "clamp(38px, 5vw, 62px)",
                lineHeight: "1.05",
                letterSpacing: "-2px",
                marginBottom: "20px",
                color: "#0f172a",
              }}
            >
              Create Smart Question Papers From Your Textbooks
            </h1>

            <p
              style={{
                fontSize: "17px",
                lineHeight: "1.7",
                color: "#64748b",
                maxWidth: "650px",
                marginBottom: "30px",
              }}
            >
              Upload your textbooks, choose your class and subject, customize
              difficulty and question types, and generate professional
              question papers in minutes.
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/register"
                className="primary-button"
                style={{
                  padding: "14px 22px",
                  fontSize: "15px",
                }}
              >
                Create Free Account →
              </Link>

              <Link
                to="/login"
                className="secondary-button"
                style={{
                  padding: "14px 22px",
                  fontSize: "15px",
                }}
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Paper Preview */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #dbe2ea",
              borderRadius: "18px",
              padding: "25px",
              boxShadow: "0 20px 50px rgba(15, 23, 42, 0.1)",
            }}
          >
            <div
              style={{
                textAlign: "center",
                borderBottom: "2px solid #0f172a",
                paddingBottom: "15px",
                marginBottom: "18px",
              }}
            >
              <div
                style={{
                  fontWeight: "800",
                  fontSize: "17px",
                }}
              >
                SAMPLE SCHOOL
              </div>

              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  marginTop: "4px",
                }}
              >
                PERIODIC TEST - 2026
              </div>

              <div
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                  marginTop: "3px",
                }}
              >
                Mathematics • Class 10
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                marginBottom: "18px",
              }}
            >
              <span>Name: __________________</span>
              <span>Marks: 50</span>
            </div>

            {[
              "Which of the following is a rational number?",
              "Solve the given quadratic equation.",
              "Find the value of x in the following expression.",
              "Explain the relationship between the two variables.",
            ].map((question, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: "10px",
                  padding: "10px 0",
                  borderBottom: "1px solid #f1f5f9",
                  fontSize: "12px",
                }}
              >
                <strong>{index + 1}.</strong>
                <span>{question}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        style={{
          padding: "70px 24px",
          background: "#ffffff",
        }}
      >
        <div
          style={{
            maxWidth: "1150px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            <h2
              style={{
                fontSize: "32px",
                marginBottom: "10px",
              }}
            >
              Everything You Need to Create Better Papers
            </h2>

            <p
              style={{
                color: "#64748b",
              }}
            >
              Designed to make question-paper creation faster and easier.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {[
              {
                icon: "📚",
                title: "Textbook Based",
                text: "Upload your textbooks and use them as the foundation for your question papers.",
              },
              {
                icon: "⚡",
                title: "Fast Generation",
                text: "Generate customized papers without manually creating every question.",
              },
              {
                icon: "🎯",
                title: "Customizable",
                text: "Choose marks, difficulty, language and question types according to your needs.",
              },
              {
                icon: "🌐",
                title: "Multilingual",
                text: "Create papers in English, Hindi or bilingual formats.",
              },
              {
                icon: "📄",
                title: "Professional Papers",
                text: "Get clean, printable question papers ready for classroom use.",
              },
              {
                icon: "🔐",
                title: "Secure Workspace",
                text: "Keep your textbooks and generated papers organized in your account.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "15px",
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    fontSize: "28px",
                    marginBottom: "14px",
                  }}
                >
                  {feature.icon}
                </div>

                <h3
                  style={{
                    fontSize: "16px",
                    marginBottom: "8px",
                  }}
                >
                  {feature.title}
                </h3>

                <p
                  style={{
                    color: "#64748b",
                    fontSize: "13px",
                    lineHeight: "1.6",
                  }}
                >
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        style={{
          padding: "70px 24px",
          background: "#f8fafc",
        }}
      >
        <div
          style={{
            maxWidth: "950px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            <h2
              style={{
                fontSize: "32px",
                marginBottom: "10px",
              }}
            >
              How It Works
            </h2>

            <p style={{ color: "#64748b" }}>
              Create your first question paper in three simple steps.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "25px",
            }}
          >
            {[
              ["01", "Upload", "Upload your textbook and organize it by class and subject."],
              ["02", "Customize", "Select language, difficulty, marks and question types."],
              ["03", "Generate", "Generate, review, print or download your question paper."],
            ].map(([number, title, text]) => (
              <div
                key={number}
                style={{
                  background: "#ffffff",
                  borderRadius: "15px",
                  padding: "25px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div
                  style={{
                    color: "#2563eb",
                    fontWeight: "800",
                    fontSize: "14px",
                    marginBottom: "12px",
                  }}
                >
                  {number}
                </div>

                <h3 style={{ marginBottom: "8px" }}>{title}</h3>

                <p
                  style={{
                    color: "#64748b",
                    fontSize: "13px",
                    lineHeight: "1.6",
                  }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "70px 24px",
          background: "#2563eb",
          color: "white",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "34px",
            marginBottom: "12px",
          }}
        >
          Ready to Create Smarter Question Papers?
        </h2>

        <p
          style={{
            opacity: 0.9,
            marginBottom: "25px",
          }}
        >
          Start organizing your textbooks and generating papers today.
        </p>

        <Link
          to="/register"
          style={{
            display: "inline-flex",
            padding: "13px 22px",
            borderRadius: "10px",
            background: "#ffffff",
            color: "#2563eb",
            fontWeight: "700",
          }}
        >
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "25px",
          textAlign: "center",
          background: "#0f172a",
          color: "#94a3b8",
          fontSize: "13px",
        }}
      >
        © 2026 Question Paper AI. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;