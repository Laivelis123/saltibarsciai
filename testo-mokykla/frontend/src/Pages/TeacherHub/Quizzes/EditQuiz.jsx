import { useParams } from "react-router-dom";
import UI from "../../../components/UI/UI";
import EditQuizGroup from "./EditQuizGroup";
import EditQuizQuestion from "./EditQuizQuestion";

function EditQuiz() {
  const { quizId } = useParams();

  return (
    <UI>
      <div className="container mt-4">
        <h2 className="text-center">Redaguoti testą</h2>
        <EditQuizGroup quizId={quizId} />
        <EditQuizQuestion quizId={quizId} />
      </div>
    </UI>
  );
}

export default EditQuiz;
