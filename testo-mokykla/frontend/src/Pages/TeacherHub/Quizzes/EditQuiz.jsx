import { useParams } from "react-router-dom";
import UI from "../../../components/UI/UI";
import EditQuizGroup from "./EditQuizGroup";
import EditQuizQuestion from "./EditQuizQuestion";

function EditQuiz() {
  const { quizId } = useParams();

  return (
    <UI>
      <div className="container my-4 ">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div
              className="mt-5 py-4 card"
              style={{
                borderRadius: "30px",
                backgroundColor: "rgba(78, 174, 18, 0.878)",
              }}
            >
              <h2 className="text-center">Redaguoti testą</h2>
              <EditQuizQuestion quizId={quizId} />
            </div>
          </div>
          <div className="col-md-7">
            <div
              className="my-5 pb-2 card"
              style={{
                borderRadius: "30px",
                backgroundColor: "rgba(78, 174, 18, 0.878)",
              }}
            >
              <EditQuizGroup quizId={quizId} />
            </div>
          </div>
        </div>
      </div>
    </UI>
  );
}

export default EditQuiz;
