import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Plus,
  Search,
  Eye,
  Sparkles,
  Trash2,
  FileText,
} from "lucide-react";

const API_URL = "http://localhost:5000/api";

function Textbooks() {
  const navigate = useNavigate();

  const [textbooks, setTextbooks] = useState([]);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [subjectFilter, setSubjectFilter] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTextbooks = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_URL}/textbooks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch textbooks");
      }

      setTextbooks(data.textbooks || []);
    } catch (error) {
      console.error("Fetch textbooks error:", error);
      setError(error.message || "Failed to load textbooks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTextbooks();
  }, []);

  const classes = useMemo(() => {
    return [
      "All",
      ...new Set(
        textbooks
          .map((textbook) => textbook.className)
          .filter(Boolean)
      ),
    ];
  }, [textbooks]);

  const subjects = useMemo(() => {
    return [
      "All",
      ...new Set(
        textbooks
          .map((textbook) => textbook.subject)
          .filter(Boolean)
      ),
    ];
  }, [textbooks]);

  const filteredTextbooks = useMemo(() => {
    return textbooks.filter((textbook) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        textbook.title?.toLowerCase().includes(searchText) ||
        textbook.subject?.toLowerCase().includes(searchText) ||
        textbook.board?.toLowerCase().includes(searchText);

      const matchesClass =
        classFilter === "All" ||
        textbook.className === classFilter;

      const matchesSubject =
        subjectFilter === "All" ||
        textbook.subject === subjectFilter;

      return (
        matchesSearch &&
        matchesClass &&
        matchesSubject
      );
    });
  }, [textbooks, search, classFilter, subjectFilter]);

  const handleDelete = async (id) => {
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

      setTextbooks((prev) =>
        prev.filter((textbook) => textbook._id !== id)
      );
    } catch (error) {
      console.error("Delete textbook error:", error);
      alert(error.message || "Failed to delete textbook.");
    }
  };

  const getFileType = (fileName = "") => {
    const extension = fileName
      .split(".")
      .pop()
      .toUpperCase();

    return extension || "FILE";
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Textbooks</h1>
          <p>
            Manage your textbooks and use them as knowledge
            sources for AI question generation.
          </p>
        </div>

        <Link
          to="/textbooks/upload"
          className="primary-button"
        >
          <Plus size={18} />
          Upload Textbook
        </Link>
      </div>

      {/* Search + Filters */}
      <div className="filter-bar">
        <div className="search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search textbooks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
        >
          {classes.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All Classes" : item}
            </option>
          ))}
        </select>

        <select
          value={subjectFilter}
          onChange={(e) =>
            setSubjectFilter(e.target.value)
          }
        >
          {subjects.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All Subjects" : item}
            </option>
          ))}
        </select>
      </div>

      {/* Error */}
      {error && (
        <div className="upload-error">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="empty-state">
          <BookOpen size={42} />
          <h3>Loading textbooks...</h3>
          <p>
            Fetching your textbooks from the database.
          </p>
        </div>
      ) : filteredTextbooks.length === 0 ? (
        /* Empty */
        <div className="empty-state">
          <div className="empty-icon">
            <BookOpen size={30} />
          </div>

          <h3>
            {textbooks.length === 0
              ? "No textbooks uploaded yet"
              : "No textbooks found"}
          </h3>

          <p>
            {textbooks.length === 0
              ? "Upload your first textbook to start generating AI-powered question papers."
              : "Try changing your search or filters."}
          </p>

          {textbooks.length === 0 && (
            <Link
              to="/textbooks/upload"
              className="primary-button"
            >
              <Plus size={18} />
              Upload Your First Textbook
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className="section-heading">
            <div>
              <h2>Your Textbooks</h2>
              <span>
                {filteredTextbooks.length} textbook
                {filteredTextbooks.length !== 1
                  ? "s"
                  : ""}
              </span>
            </div>
          </div>

          <div className="textbook-grid">
            {filteredTextbooks.map((textbook) => (
              <div
                className="textbook-card"
                key={textbook._id}
              >
                <div className="textbook-card-top">
                  <div className="textbook-icon">
                    <FileText size={24} />
                  </div>

                  <span className="file-type-badge">
                    {getFileType(textbook.fileName)}
                  </span>
                </div>

                <div className="textbook-card-body">
                  <h3>{textbook.title}</h3>

                  <p className="textbook-subject">
                    {textbook.subject}
                  </p>

                  <div className="textbook-meta">
                    <span>
                      {textbook.className}
                    </span>

                    {textbook.section && (
                      <span>
                        Section {textbook.section}
                      </span>
                    )}

                    {textbook.board && (
                      <span>
                        {textbook.board}
                      </span>
                    )}
                  </div>

                  <div className="textbook-language">
                    {textbook.language || "English"}
                  </div>
                </div>

                <div className="textbook-actions">
                  <button
                    className="secondary-button"
                    onClick={() =>
                      navigate(
                        `/textbooks/${textbook._id}`
                      )
                    }
                  >
                    <Eye size={16} />
                    View
                  </button>

                  <button
                    className="primary-button"
                    onClick={() =>
                      navigate(
                        `/generate-paper?textbook=${textbook._id}`
                      )
                    }
                  >
                    <Sparkles size={16} />
                    Generate
                  </button>

                  <button
                    className="icon-button danger"
                    title="Delete textbook"
                    onClick={() =>
                      handleDelete(textbook._id)
                    }
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Textbooks;