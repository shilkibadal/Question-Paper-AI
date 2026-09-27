function TextbookCard({ title, className, subject }) {
  return (
    <div className="textbook-card">
      <div className="book-icon">📚</div>

      <h3>{title}</h3>

      <p>Class {className}</p>
      <p>{subject}</p>

      <button>View Book</button>
    </div>
  )
}

export default TextbookCard