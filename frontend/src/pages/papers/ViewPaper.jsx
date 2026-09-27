import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  Printer,
  Trash2,
  Edit3,
  FileText,
} from "lucide-react";

function ViewPaper() {
  const { id } = useParams();

  const paper = {
    id,
    title: "Mathematics Mid-Term Examination",
    school: "Your School Name",
    subject: "Mathematics",
    className: "Class 10",
    section: "A",
    time: "3 Hours",
    marks: 50,
    date: "20 September 2026",
  };

  const mcqs = [
    {
      question:
        "Which of the following is an irrational number?",
      options: [
        "√2",
        "4/5",
        "0.25",
        "3",
      ],
      marks: 1,
    },
    {
      question:
        "The HCF of two numbers is 12 and their LCM is 180. If one number is 36, what is the other number?",
      options: [
        "48",
        "60",
        "72",
        "90",
      ],
      marks: 1,
    },
    {
      question:
        "Which polynomial has 2 as one of its zeroes?",
      options: [
        "x² - 4",
        "x² + 4",
        "x² + 2",
        "x² - 2",
      ],
      marks: 1,
    },
    {
      question:
        "The graph of a pair of linear equations represents parallel lines when:",
      options: [
        "a₁/a₂ ≠ b₁/b₂",
        "a₁/a₂ = b₁/b₂ ≠ c₁/c₂",
        "a₁/a₂ = b₁/b₂ = c₁/c₂",
        "None of these",
      ],
      marks: 1,
    },
    {
      question:
        "What is the degree of a quadratic polynomial?",
      options: [
        "1",
        "2",
        "3",
        "4",
      ],
      marks: 1,
    },
  ];

  const shortQuestions = [
    {
      question:
        "Find the zeroes of the polynomial x² - 5x + 6.",
      marks: 2,
    },
    {
      question:
        "Solve the pair of equations 2x + 3y = 7 and x - y = 1.",
      marks: 2,
    },
    {
      question:
        "Find the 10th term of the arithmetic progression 3, 7, 11, 15, ...",
      marks: 2,
    },
    {
      question:
        "State and explain the Basic Proportionality Theorem.",
      marks: 2,
    },
    {
      question:
        "Find the distance between the points (2, 3) and (6, 6).",
      marks: 2,
    },
  ];

  const longQuestions = [
    {
      question:
        "Prove that √5 is an irrational number.",
      marks: 5,
    },
    {
      question:
        "Solve the following quadratic equation using the quadratic formula and verify your answer.",
      marks: 5,
    },
    {
      question:
        "A train travels a certain distance at a uniform speed. If the speed had been 6 km/h more, it would have taken 2 hours less. Find the original speed.",
      marks: 5,
    },
  ];

  return (
    <div className="page-container paper-view-page">

      {/* Top actions */}

      <div className="paper-view-top">

        <Link
          to="/question-papers"
          className="back-link"
        >
          <ArrowLeft size={17} />
          Back to Question Papers
        </Link>

        <div className="paper-view-actions">

          <button
            className="secondary-button"
            onClick={() => window.print()}
          >
            <Printer size={17} />
            Print
          </button>

          <button
            className="secondary-button"
            onClick={() =>
              alert("PDF download will be connected next.")
            }
          >
            <Download size={17} />
            Download PDF
          </button>

          <Link
            to="/generate-paper"
            className="secondary-button"
          >
            <Edit3 size={17} />
            Create New
          </Link>

        </div>

      </div>

      {/* Paper */}

      <div className="exam-paper">

        <div className="exam-header">

          <h2>{paper.school}</h2>

          <h1>QUESTION PAPER</h1>

          <h3>{paper.title}</h3>

          <div className="exam-info-row">

            <span>
              <strong>Subject:</strong>{" "}
              {paper.subject}
            </span>

            <span>
              <strong>Class:</strong>{" "}
              {paper.className}
            </span>

            <span>
              <strong>Section:</strong>{" "}
              {paper.section}
            </span>

          </div>

          <div className="exam-info-row">

            <span>
              <strong>Time:</strong>{" "}
              {paper.time}
            </span>

            <span>
              <strong>Maximum Marks:</strong>{" "}
              {paper.marks}
            </span>

          </div>

        </div>

        <div className="student-info">

          <div>
            Name:
            <span></span>
          </div>

          <div>
            Roll No:
            <span></span>
          </div>

          <div>
            Date:
            <span>{paper.date}</span>
          </div>

        </div>

        {/* Instructions */}

        <div className="exam-instructions">

          <h3>General Instructions</h3>

          <ol>
            <li>
              All questions are compulsory unless
              otherwise stated.
            </li>

            <li>
              Read each question carefully before
              answering.
            </li>

            <li>
              Marks for each question are indicated
              against it.
            </li>

            <li>
              Show all necessary working for numerical
              questions.
            </li>
          </ol>

        </div>

        {/* Section A */}

        <section className="exam-section">

          <div className="exam-section-heading">

            <div>
              <strong>SECTION A</strong>
              <span>Multiple Choice Questions</span>
            </div>

            <strong>
              {mcqs.length} × 1 = {mcqs.length} Marks
            </strong>

          </div>

          <div className="exam-questions">

            {mcqs.map((item, index) => (
              <div
                className="exam-question"
                key={index}
              >

                <div className="question-number">
                  {index + 1}.
                </div>

                <div className="question-content">

                  <p>{item.question}</p>

                  <div className="mcq-options">

                    {item.options.map(
                      (option, optionIndex) => (
                        <span key={optionIndex}>
                          {String.fromCharCode(
                            97 + optionIndex
                          )}) {option}
                        </span>
                      )
                    )}

                  </div>

                </div>

                <span className="question-mark">
                  [{item.marks}]
                </span>

              </div>
            ))}

          </div>

        </section>

        {/* Section B */}

        <section className="exam-section">

          <div className="exam-section-heading">

            <div>
              <strong>SECTION B</strong>
              <span>Short Answer Questions</span>
            </div>

            <strong>
              {shortQuestions.length} × 2 ={" "}
              {shortQuestions.length * 2} Marks
            </strong>

          </div>

          <div className="exam-questions">

            {shortQuestions.map((item, index) => (
              <div
                className="exam-question"
                key={index}
              >

                <div className="question-number">
                  {mcqs.length + index + 1}.
                </div>

                <div className="question-content">
                  <p>{item.question}</p>
                </div>

                <span className="question-mark">
                  [{item.marks}]
                </span>

              </div>
            ))}

          </div>

        </section>

        {/* Section C */}

        <section className="exam-section">

          <div className="exam-section-heading">

            <div>
              <strong>SECTION C</strong>
              <span>Long Answer Questions</span>
            </div>

            <strong>
              {longQuestions.length} × 5 ={" "}
              {longQuestions.length * 5} Marks
            </strong>

          </div>

          <div className="exam-questions">

            {longQuestions.map((item, index) => (
              <div
                className="exam-question"
                key={index}
              >

                <div className="question-number">
                  {mcqs.length +
                    shortQuestions.length +
                    index +
                    1}.
                </div>

                <div className="question-content">
                  <p>{item.question}</p>

                  <div className="answer-space large">
                    <span>Answer:</span>
                  </div>
                </div>

                <span className="question-mark">
                  [{item.marks}]
                </span>

              </div>
            ))}

          </div>

        </section>

        <div className="paper-end">
          <span>*** End of Question Paper ***</span>
        </div>

      </div>

    </div>
  );
}

export default ViewPaper;