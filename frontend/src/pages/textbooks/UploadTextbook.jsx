import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Upload, FileText, X, ArrowLeft } from "lucide-react";

const API_URL = "http://localhost:5000/api";

function UploadTextbook() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    className: "",
    section: "",
    board: "",
    language: "English",
  });

  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = (selectedFile) => {
    setError("");

    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Only PDF and DOCX files are allowed.");
      return;
    }

    if (selectedFile.size > 20 * 1024 * 1024) {
      setError("File size must be less than 20 MB.");
      return;
    }

    setFile(selectedFile);

    // Automatically use filename as title if title is empty
    if (!formData.title) {
      const fileName = selectedFile.name
        .replace(/\.(pdf|docx)$/i, "")
        .replace(/[-_]/g, " ");

      setFormData((prev) => ({
        ...prev,
        title: fileName,
      }));
    }
  };

  const handleFileInput = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!file) {
      setError("Please select a PDF or DOCX textbook.");
      return;
    }

    if (!formData.title.trim()) {
      setError("Please enter a textbook title.");
      return;
    }

    if (!formData.subject.trim()) {
      setError("Please enter the subject.");
      return;
    }

    if (!formData.className.trim()) {
      setError("Please enter the class.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError("You are not logged in. Please login again.");
      return;
    }

    try {
      setUploading(true);

      const data = new FormData();

      data.append("textbook", file);
      data.append("title", formData.title);
      data.append("subject", formData.subject);
      data.append("className", formData.className);
      data.append("section", formData.section);
      data.append("board", formData.board);
      data.append("language", formData.language);

      const response = await fetch(`${API_URL}/textbooks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Upload failed");
      }

      alert("Textbook uploaded successfully!");

      navigate("/textbooks");
    } catch (error) {
      console.error("Upload error:", error);
      setError(error.message || "Failed to upload textbook.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <Link to="/textbooks" className="back-link">
            <ArrowLeft size={17} />
            Back to Textbooks
          </Link>

          <h1>Upload Textbook</h1>
          <p>
            Upload a textbook to use it as the knowledge source for AI
            question paper generation.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="upload-layout">
          <div className="upload-main">
            <div className="form-card">
              <div className="card-header">
                <div>
                  <h2>Textbook File</h2>
                  <p>Upload your PDF or DOCX textbook.</p>
                </div>
              </div>

              {!file ? (
                <div
                  className={`upload-dropzone ${
                    dragActive ? "drag-active" : ""
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                  onClick={() =>
                    document.getElementById("textbook-file").click()
                  }
                >
                  <input
                    id="textbook-file"
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileInput}
                    hidden
                  />

                  <div className="upload-icon">
                    <Upload size={28} />
                  </div>

                  <h3>Drop your textbook here</h3>

                  <p>
                    or <span>browse from your computer</span>
                  </p>

                  <small>
                    Supported formats: PDF, DOCX • Maximum size: 20 MB
                  </small>
                </div>
              ) : (
                <div className="selected-file">
                  <div className="file-icon">
                    <FileText size={24} />
                  </div>

                  <div className="file-info">
                    <strong>{file.name}</strong>

                    <span>
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>

                  <button
                    type="button"
                    className="remove-file"
                    onClick={removeFile}
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
            </div>

            <div className="form-card">
              <div className="card-header">
                <div>
                  <h2>Textbook Information</h2>
                  <p>Tell us about the textbook.</p>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Textbook Title *</label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. NCERT Mathematics Class 10"
                  />
                </div>

                <div className="form-group">
                  <label>Subject *</label>

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Mathematics"
                  />
                </div>

                <div className="form-group">
                  <label>Class *</label>

                  <select
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                  >
                    <option value="">Select class</option>
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 4">Class 4</option>
                    <option value="Class 5">Class 5</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Section</label>

                  <input
                    type="text"
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    placeholder="e.g. A"
                  />
                </div>

                <div className="form-group">
                  <label>Board</label>

                  <select
                    name="board"
                    value={formData.board}
                    onChange={handleChange}
                  >
                    <option value="">Select board</option>
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="State Board">State Board</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Language</label>

                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Bilingual">Bilingual</option>
                  </select>
                </div>
              </div>
            </div>

            {error && (
              <div className="upload-error">
                {error}
              </div>
            )}

            <div className="form-actions">
              <Link to="/textbooks" className="secondary-button">
                Cancel
              </Link>

              <button
                type="submit"
                className="primary-button"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload Textbook"}
              </button>
            </div>
          </div>

          <div className="upload-sidebar">
            <div className="info-card">
              <h3>AI Processing</h3>

              <p>
                After upload, this textbook will become available as a
                knowledge source for AI-generated question papers.
              </p>

              <div className="info-step">
                <span>1</span>
                <div>
                  <strong>Upload</strong>
                  <small>PDF or DOCX textbook</small>
                </div>
              </div>

              <div className="info-step">
                <span>2</span>
                <div>
                  <strong>Extract</strong>
                  <small>Read textbook content</small>
                </div>
              </div>

              <div className="info-step">
                <span>3</span>
                <div>
                  <strong>AI + RAG</strong>
                  <small>Use relevant content</small>
                </div>
              </div>

              <div className="info-step">
                <span>4</span>
                <div>
                  <strong>Generate</strong>
                  <small>Create question papers</small>
                </div>
              </div>
            </div>

            <div className="info-card">
              <h3>Upload Guidelines</h3>

              <ul>
                <li>Use clear PDF or DOCX files.</li>
                <li>Maximum file size is 20 MB.</li>
                <li>Prefer complete textbooks.</li>
                <li>Make sure the text is readable.</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UploadTextbook;