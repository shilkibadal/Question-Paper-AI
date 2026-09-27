import { Link } from "react-router-dom";
import {
  FileText,
  Plus,
  Search,
  Eye,
  Download,
  Trash2,
  MoreVertical,
  Calendar,
} from "lucide-react";
import { useState } from "react";

const demoPapers = [
  {
    id: "1",
    title: "Mathematics Mid-Term Examination",
    subject: "Mathematics",
    className: "Class 10",
    section: "A",
    marks: 50,
    questions: 18,
    difficulty: "Medium",
    language: "English",
    date: "20 Sep 2026",
  },
  {
    id: "2",
    title: "Science Unit Test",
    subject: "Science",
    className: "Class 10",
    section: "A",
    marks: 30,
    questions: 12,
    difficulty: "Easy",
    language: "English",
    date: "18 Sep 2026",
  },
  {
    id: "3",
    title: "Mathematics Practice Paper",
    subject: "Mathematics",
    className: "Class 9",
    section: "B",
    marks: 40,
    questions: 16,
    difficulty: "Hard",
    language: "Hindi",
    date: "15 Sep 2026",
  },
];

function QuestionPapers() {
  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);

  const filteredPapers = demoPapers.filter((paper) =>
    `${paper.title} ${paper.subject} ${paper.className}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="page-container">

      <div className="page-header">

        <div>
          <h1>Question Papers</h1>
          <p>
            View and manage all your generated question papers.
          </p>
        </div>

        <Link
          to="/generate-paper"
          className="primary-button"
        >
          <Plus size={18} />
          Generate Paper
        </Link>

      </div>

      <div className="paper-toolbar">

        <div className="search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search question papers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select className="filter-select">
          <option>All Subjects</option>
          <option>Mathematics</option>
          <option>Science</option>
          <option>English</option>
          <option>Hindi</option>
        </select>

        <select className="filter-select">
          <option>All Classes</option>
          <option>Class 6</option>
          <option>Class 7</option>
          <option>Class 8</option>
          <option>Class 9</option>
          <option>Class 10</option>
          <option>Class 11</option>
          <option>Class 12</option>
        </select>

      </div>

      {filteredPapers.length === 0 ? (
        <div className="empty-state">

          <FileText size={42} />

          <h3>No question papers found</h3>

          <p>
            Generate your first question paper from a textbook.
          </p>

          <Link
            to="/generate-paper"
            className="primary-button"
          >
            <Plus size={18} />
            Generate Paper
          </Link>

        </div>
      ) : (
        <div className="papers-list">

          {filteredPapers.map((paper) => (
            <div className="paper-card" key={paper.id}>

              <div className="paper-card-icon">
                <FileText size={23} />
              </div>

              <div className="paper-card-main">

                <Link
                  to={`/question-papers/${paper.id}`}
                  className="paper-title"
                >
                  {paper.title}
                </Link>

                <div className="paper-subtitle">
                  {paper.subject} · {paper.className} · Section{" "}
                  {paper.section}
                </div>

                <div className="paper-meta">

                  <span>
                    {paper.marks} marks
                  </span>

                  <span>
                    {paper.questions} questions
                  </span>

                  <span>
                    {paper.difficulty}
                  </span>

                  <span>
                    {paper.language}
                  </span>

                  <span className="paper-date">
                    <Calendar size={13} />
                    {paper.date}
                  </span>

                </div>

              </div>

              <div className="paper-card-actions">

                <Link
                  to={`/question-papers/${paper.id}`}
                  className="paper-action"
                  title="View"
                >
                  <Eye size={17} />
                </Link>

                <button
                  className="paper-action"
                  title="Download"
                  onClick={() =>
                    alert("PDF download will be connected next.")
                  }
                >
                  <Download size={17} />
                </button>

                <div className="paper-menu-wrapper">

                  <button
                    className="paper-action"
                    onClick={() =>
                      setActiveMenu(
                        activeMenu === paper.id
                          ? null
                          : paper.id
                      )
                    }
                  >
                    <MoreVertical size={17} />
                  </button>

                  {activeMenu === paper.id && (
                    <div className="dropdown-menu paper-dropdown">

                      <Link to={`/question-papers/${paper.id}`}>
                        <Eye size={15} />
                        View paper
                      </Link>

                      <button
                        onClick={() =>
                          alert(
                            "Delete functionality will be connected to MongoDB next."
                          )
                        }
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>

                    </div>
                  )}

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default QuestionPapers;