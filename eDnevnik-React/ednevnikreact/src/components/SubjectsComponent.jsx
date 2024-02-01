
export default function SubjectsComponent({ SubjectName, onClick }) {
  return (
    <div className="subject" onClick={onClick}>
      <p>{SubjectName}</p>
    </div>
  );
}
