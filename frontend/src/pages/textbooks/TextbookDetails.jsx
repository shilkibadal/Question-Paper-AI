import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Sparkles,
  Trash2,
  Calendar,
  Globe,
} from "lucide-react";

const API_URL = "http://localhost:5000/api";

function TextbookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [textbook, setTextbook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTextbook = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          `${API_URL}/textbooks/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load textbook"
          );
        }

        setTextbook(data.textbook);
      } catch (error) {
        console.error("Textbook details error:", error);
        setError(
          error.message || "Failed to load textbook."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTextbook();
  }, [id, navigate]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this textbook?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/textbooks/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete textbook"
        );
      }

      alert("Textbook deleted successfully.");
      navigate("/textbooks");
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.message || "Failed to delete textbook.");
    }
  };

  const formatDate = (date) => {
    if (!date) return "Unknown";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getFileType = (fileName = "") => {
    const extension = fileName
      .split(".")
      .pop()
      .toUpperCase();

    return extension || "FILE";
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <BookOpen size={42} />
          <h3>Loading textbook...</h3>
          <p>Fetching textbook information.</p>
        </div>
      </div>
    );
  }

  if (error || !textbook) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <BookOpen size={42} />

          <h3>Textbook not found</h3>

          <p>
            {error ||
              "The requested textbook could not be found."}
          </p>

          <Link
            to="/textbooks"
            className="primary-button"
          >
            <ArrowLeft size={17} />
            Back to Textbooks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <Link
            to="/textbooks"
            className="back-link"
          >
            <ArrowLeft size={17} />
            Back to Textbooks
          </Link>

          <div className="details-title-row">
            <div className="details-book-icon">
              <BookOpen size={30} />
            </div>

            <div>
              <h1>{textbook.title}</h1>

              <p>
                {textbook.subject} •{" "}
                {textbook.className}
              </p>
            </div>
          </div>
        </div>

        <div className="details-actions">
          <button
            className="secondary-button"
            onClick={handleDelete}
          >
            <Trash2 size={17} />
            Delete
          </button>

          <button
            className="primary-button"
            onClick={() =>
              navigate(
                `/generate-paper?textbook=${textbook._id}`
              )
            }
          >
            <Sparkles size={17} />
            Generate Paper
          </button>
        </div>
      </div>

      {/* Information cards */}
      <div className="details-grid">
        <div className="details-card">
          <div className="details-card-icon">
            <FileText size={20} />
          </div>

          <div>
            <span>File</span>
            <strong>{textbook.fileName}</strong>
          </div>
        </div>

        <div className="details-card">
          <div className="details-card-icon">
            <BookOpen size={20} />
          </div>

          <div>
            <span>Subject</span>
            <strong>{textbook.subject}</strong>
          </div>
        </div>

        <div className="details-card">
          <div className="details-card-icon">
            <Globe size={20} />
          </div>

          <div>
            <span>Language</span>
            <strong>
              {textbook.language || "English"}
            </strong>
          </div>
        </div>

        <div className="details-card">
          <div className="details-card-icon">
            <Calendar size={20} />
          </div>

          <div>
            <span>Uploaded</span>
            <strong>
              {formatDate(textbook.createdAt)}
            </strong>
          </div>
        </div>
      </div>

      {/* Textbook information */}
      <div className="details-section">
        <div className="details-section-header">
          <div>
            <h2>Textbook Information</h2>
            <p>
              Details associated with this textbook.
            </p>
          </div>
        </div>

        <div className="information-grid">
          <div>
            <span>Title</span>
            <strong>{textbook.title}</strong>
          </div>

          <div>
            <span>Subject</span>
            <strong>{textbook.subject}</strong>
          </div>

          <div>
            <span>Class</span>
            <strong>{textbook.className}</strong>
          </div>

          <div>
            <span>Section</span>
            <strong>
              {textbook.section || "Not specified"}
            </strong>
          </div>

          <div>
            <span>Board</span>
            <strong>
              {textbook.board || "Not specified"}
            </strong>
          </div>

          <div>
            <span>Language</span>
            <strong>
              {textbook.language || "English"}
            </strong>
          </div>

          <div>
            <span>File Type</span>
            <strong>
              {getFileType(textbook.fileName)}
            </strong>
          </div>
        </div>
      </div>

      {/* AI section */}
      <div className="ai-info-banner">
        <div className="ai-info-icon">
          <Sparkles size={22} />
        </div>

        <div>
          <h3>Ready for AI Question Generation</h3>

          <p>
            This textbook can be used as the knowledge
            source for generating questions. The next
            stage will extract its content and use
            retrieval-augmented generation (RAG) to
            create questions based on the textbook.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            navigate(
              `/generate-paper?textbook=${textbook._id}`
            )
          }
        >
          Generate Paper
        </button>
      </div>
    </div>
  );
}

export default TextbookDetails;