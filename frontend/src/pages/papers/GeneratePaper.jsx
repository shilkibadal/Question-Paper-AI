
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  BookOpen,
  Settings2,
  FileText,
  Check,
  Plus,
  Minus,
} from "lucide-react";

function GeneratePaper() {
  const [formData, setFormData] = useState({
    textbook: "",
    className: "",
    section: "",
    subject: "",
    subjectType: "",
    language: "English",
    difficulty: "Medium",
    totalMarks: 50,
  });

  const [questionTypes, setQuestionTypes] = useState({
    mcq: {
      enabled: true,
      count: 10,
      marks: 1,
    },
    shortAnswer: {
      enabled: true,
      count: 5,
      marks: 2,
    },
    longAnswer: {
      enabled: true,
      count: 3,
      marks: 5,
    },
    trueFalse: {
      enabled: false,
      count: 5,
      marks: 1,
    },
  });

  const [generating, setGenerating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubjectChange = (e) => {
    const value = e.target.value;

    setFormData((previous) => ({
      ...previous,
      subjectType: value,
      subject: value === "Other" ? "" : value,
    }));
  };

  const handleCustomSubjectChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      subject: e.target.value,
    }));
  };

  const toggleQuestionType = (type) => {
    setQuestionTypes((previous) => ({
      ...previous,
      [type]: {
        ...previous[type],
        enabled: !previous[type].enabled,
      },
    }));
  };

  const changeCount = (type, amount) => {
    setQuestionTypes((previous) => ({
      ...previous,
      [type]: {
        ...previous[type],
        count: Math.max(1, previous[type].count + amount),
      },
    }));
  };

  const calculateMarks = () => {
    return Object.values(questionTypes)
      .filter((item) => item.enabled)
      .reduce(
        (total, item) => total + item.count * item.marks,
        0
      );
  };

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!formData.textbook) {
      alert("Please select a textbook.");
      return;
    }

    if (!formData.className) {
      alert("Please select a class.");
      return;
    }

    if (!formData.subject) {
      alert("Please select a subject.");
      return;
    }

    const selectedTypes = Object.entries(questionTypes)
      .filter(([, value]) => value.enabled)
      .map(([type, value]) => ({
        type,
        count: value.count,
        marks: value.marks,
      }));

    if (selectedTypes.length === 0) {
      alert("Please select at least one question type.");
      return;
    }

    try {
      setGenerating(true);

      const payload = {
        ...formData,
        totalMarks: Number(formData.totalMarks),
        questionTypes: selectedTypes,
      };

      console.log("Question paper payload:", payload);

      // Backend API will be connected next.
      await new Promise((resolve) =>
        setTimeout(resolve, 1500)
      );

      alert(
        "Question paper generation will be connected to the AI backend next."
      );
    } finally {
      setGenerating(false);
    }
  };

  const currentMarks = calculateMarks();

  return (
    <div className="page-container">
      <Link to="/dashboard" className="back-link">
        <ArrowLeft size={17} />
        Back to Dashboard
      </Link>

      <div className="page-header">
        <div>
          <h1>Generate Question Paper</h1>
          <p>
            Create a customized question paper from your textbook.
          </p>
        </div>
      </div>

      <form onSubmit={handleGenerate}>
        <div className="generate-layout">

          {/* =====================
              LEFT SIDE
          ===================== */}

          <div className="generate-main">

            {/* Source */}
            <div className="form-card">

              <div className="generate-section-header">
                <div className="generate-section-icon">
                  <BookOpen size={20} />
                </div>

                <div>
                  <h2>Choose textbook</h2>
                  <p>
                    Select the textbook from which questions
                    should be generated.
                  </p>
                </div>
              </div>

              <div className="form-grid">

                {/* Textbook */}
                <div className="form-group full-width">
                  <label>Textbook</label>

                  <select
                    name="textbook"
                    value={formData.textbook}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select a textbook
                    </option>

                    <option value="mathematics">
                      Mathematics - Class 10
                    </option>

                    <option value="science">
                      Science - Class 10
                    </option>

                    <option value="english">
                      English - Class 10
                    </option>
                  </select>
                </div>

                {/* Class */}
                <div className="form-group">
                  <label>Class</label>

                  <select
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                  >
                    <option value="">Select class</option>

                    {[6, 7, 8, 9, 10, 11, 12].map(
                      (item) => (
                        <option key={item}>
                          Class {item}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* Section */}
                <div className="form-group">
                  <label>Section</label>

                  <select
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                  >
                    <option value="">Select section</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                  </select>
                </div>

                {/* Subject */}
                <div className="form-group">
                  <label>Subject</label>

                  <select
                    name="subjectType"
                    value={formData.subjectType}
                    onChange={handleSubjectChange}
                  >
                    <option value="">
                      Select subject
                    </option>

                    <option value="Mathematics">
                      Mathematics
                    </option>

                    <option value="Science">
                      Science
                    </option>

                    <option value="English">
                      English
                    </option>

                    <option value="Hindi">
                      Hindi
                    </option>

                    <option value="Social Science">
                      Social Science
                    </option>

                    <option value="Computer Science">
                      Computer Science
                    </option>

                    <option value="Physics">
                      Physics
                    </option>

                    <option value="Chemistry">
                      Chemistry
                    </option>

                    <option value="Biology">
                      Biology
                    </option>

                    <option value="History">
                      History
                    </option>

                    <option value="Geography">
                      Geography
                    </option>

                    <option value="Political Science">
                      Political Science
                    </option>

                    <option value="Economics">
                      Economics
                    </option>

                    <option value="Accountancy">
                      Accountancy
                    </option>

                    <option value="Business Studies">
                      Business Studies
                    </option>

                    <option value="Sanskrit">
                      Sanskrit
                    </option>

                    <option value="French">
                      French
                    </option>

                    <option value="Other">
                      Other / Write your own
                    </option>
                  </select>

                  {/* Custom Subject */}
                  {formData.subjectType === "Other" && (
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleCustomSubjectChange}
                      placeholder="Enter subject name"
                      style={{ marginTop: "10px" }}
                    />
                  )}
                </div>

                {/* Paper Language */}
                <div className="form-group">
                  <label>Paper language</label>

                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                  >
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Bilingual</option>
                  </select>
                </div>

              </div>
            </div>

            {/* Difficulty */}
            <div className="form-card">

              <div className="generate-section-header">
                <div className="generate-section-icon">
                  <Settings2 size={20} />
                </div>

                <div>
                  <h2>Paper settings</h2>
                  <p>
                    Customize the difficulty and marks.
                  </p>
                </div>
              </div>

              <div className="difficulty-options">

                {["Easy", "Medium", "Hard"].map(
                  (difficulty) => (
                    <button
                      key={difficulty}
                      type="button"
                      className={`difficulty-card ${
                        formData.difficulty === difficulty
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        setFormData((previous) => ({
                          ...previous,
                          difficulty,
                        }))
                      }
                    >
                      {formData.difficulty === difficulty && (
                        <span className="selected-check">
                          <Check size={13} />
                        </span>
                      )}

                      <strong>{difficulty}</strong>

                      <span>
                        {difficulty === "Easy" &&
                          "Basic concepts"}

                        {difficulty === "Medium" &&
                          "Balanced difficulty"}

                        {difficulty === "Hard" &&
                          "Advanced concepts"}
                      </span>
                    </button>
                  )
                )}

              </div>

              <div className="marks-setting">

                <div>
                  <label>Total marks</label>
                  <p>Maximum marks for the paper</p>
                </div>

                <select
                  name="totalMarks"
                  value={formData.totalMarks}
                  onChange={handleChange}
                >
                  <option value="20">20 marks</option>
                  <option value="30">30 marks</option>
                  <option value="40">40 marks</option>
                  <option value="50">50 marks</option>
                  <option value="80">80 marks</option>
                  <option value="100">100 marks</option>
                </select>

              </div>
            </div>

            {/* Question Types */}
            <div className="form-card">

              <div className="generate-section-header">
                <div className="generate-section-icon">
                  <FileText size={20} />
                </div>

                <div>
                  <h2>Question types</h2>
                  <p>
                    Choose the types and number of questions.
                  </p>
                </div>
              </div>

              <div className="question-type-list">

                {/* MCQ */}
                <QuestionType
                  title="Multiple Choice Questions"
                  description="Questions with four answer options"
                  type="mcq"
                  data={questionTypes.mcq}
                  onToggle={toggleQuestionType}
                  onChange={changeCount}
                />

                {/* Short */}
                <QuestionType
                  title="Short Answer"
                  description="Questions requiring brief answers"
                  type="shortAnswer"
                  data={questionTypes.shortAnswer}
                  onToggle={toggleQuestionType}
                  onChange={changeCount}
                />

                {/* Long */}
                <QuestionType
                  title="Long Answer"
                  description="Detailed descriptive questions"
                  type="longAnswer"
                  data={questionTypes.longAnswer}
                  onToggle={toggleQuestionType}
                  onChange={changeCount}
                />

                {/* True false */}
                <QuestionType
                  title="True / False"
                  description="Statement based questions"
                  type="trueFalse"
                  data={questionTypes.trueFalse}
                  onToggle={toggleQuestionType}
                  onChange={changeCount}
                />

              </div>
            </div>

          </div>

          {/* =====================
              RIGHT SIDE
          ===================== */}

          <aside className="generate-sidebar">

            <div className="generation-summary">

              <div className="summary-header">
                <Sparkles size={20} />
                <h3>Paper Summary</h3>
              </div>

              <div className="summary-item">
                <span>Textbook</span>

                <strong>
                  {formData.textbook
                    ? formData.textbook === "mathematics"
                      ? "Mathematics"
                      : formData.textbook === "science"
                      ? "Science"
                      : "English"
                    : "Not selected"}
                </strong>
              </div>

              <div className="summary-item">
                <span>Class</span>

                <strong>
                  {formData.className || "Not selected"}
                </strong>
              </div>

              <div className="summary-item">
                <span>Section</span>

                <strong>
                  {formData.section || "Not selected"}
                </strong>
              </div>

              <div className="summary-item">
                <span>Subject</span>

                <strong>
                  {formData.subject || "Not selected"}
                </strong>
              </div>

              <div className="summary-item">
                <span>Language</span>

                <strong>{formData.language}</strong>
              </div>

              <div className="summary-item">
                <span>Difficulty</span>

                <strong>{formData.difficulty}</strong>
              </div>

              <div className="summary-total">
                <span>Target marks</span>

                <strong>
                  {formData.totalMarks}
                </strong>
              </div>

              <div className="summary-calculated">
                <span>Selected questions</span>

                <strong>
                  {currentMarks} marks
                </strong>
              </div>

            </div>

            <div className="ai-info-card">

              <div className="ai-info-icon">
                <Sparkles size={20} />
              </div>

              <h3>AI-powered generation</h3>

              <p>
                Question Paper AI will analyze your selected
                textbook and create questions based on the
                chosen difficulty and format.
              </p>

            </div>

            <button
              type="submit"
              className="generate-button"
              disabled={generating}
            >
              <Sparkles size={19} />

              {generating
                ? "Generating..."
                : "Generate Question Paper"}
            </button>

          </aside>

        </div>
      </form>
    </div>
  );
}

function QuestionType({
  title,
  description,
  type,
  data,
  onToggle,
  onChange,
}) {
  return (
    <div
      className={`question-type-row ${
        data.enabled ? "enabled" : ""
      }`}
    >

      <button
        type="button"
        className={`question-toggle ${
          data.enabled ? "active" : ""
        }`}
        onClick={() => onToggle(type)}
      >
        {data.enabled && <Check size={13} />}
      </button>

      <div className="question-type-info">
        <strong>{title}</strong>
        <span>{description}</span>
      </div>

      {data.enabled && (
        <div className="question-counter">

          <button
            type="button"
            onClick={() => onChange(type, -1)}
          >
            <Minus size={15} />
          </button>

          <span>{data.count}</span>

          <button
            type="button"
            onClick={() => onChange(type, 1)}
          >
            <Plus size={15} />
          </button>

        </div>
      )}

      <span className="question-marks">
        {data.marks} mark{data.marks > 1 ? "s" : ""}
      </span>

    </div>
  );
}

export default GeneratePaper;

