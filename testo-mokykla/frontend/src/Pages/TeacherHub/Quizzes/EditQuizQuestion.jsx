import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import PropTypes from "prop-types";
import ServerPaths from "../../../context/ServerPaths";
const EditQuizQuestion = ({ quizId }) => {
  const [questions, setQuestions] = useState([]);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newAnswers, setNewAnswers] = useState([]);
  const { user } = useAuth();
  const [questionNumbers, setQuestionNumbers] = useState([]);
  const [newQuestionError, setNewQuestionError] = useState("");
  const [newAnsError, setNewAnsError] = useState("");

  const fetchQuestions = useCallback(async () => {
    try {
      const response = await axios.get(
        ServerPaths.QuestRoutes.GET_QUESTIONS(quizId),
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );
      setQuestions(response.data.questions);
      setNewAnswers(
        Array.from({ length: response.data.questions.length }, () => ({
          answerText: "",
          points: 0,
        }))
      );
      setQuestionNumbers(
        Array.from({ length: response.data.questions.length }, (_, i) => i + 1)
      );
    } catch (error) {
      console.error("Klaida gaunant klausimus:", error);
    }
  }, [quizId, user.accessToken]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleAddQuestion = async () => {
    if (!newQuestionText.trim()) {
      setNewQuestionError("Klausimo tekstas negali būti tuščias");
      return;
    }

    try {
      await axios.post(
        ServerPaths.QuestRoutes.CREATE_QUESTION(quizId),
        { questionText: newQuestionText },
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
      fetchQuestions();
      setNewQuestionText("");
      setNewQuestionError("");
    } catch (error) {
      console.error("Klaida pridedant klausimą:", error);
    }
  };
  const handleRemoveQuestion = async (questionId, questionNumber) => {
    try {
      await axios.delete(
        ServerPaths.QuestRoutes.DELETE_QUESTION(quizId, questionId),
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
      fetchQuestions();
      setQuestionNumbers(
        questionNumbers.filter((number) => number !== questionNumber)
      );
    } catch (error) {
      console.error("Klaida šalinant klausimą:", error);
    }
  };

  const handleAddAnswer = async (questionId, index) => {
    try {
      if (!newAnswers[index].answerText.trim() || newAnsError) {
        setNewAnsError("Atsakymo tekstas negali būti tuščias");
        return;
      }
      await axios.post(
        ServerPaths.QuestRoutes.ADD_ANSWER(quizId, questionId),
        {
          answerText: newAnswers[index].answerText,
          points: newAnswers[index].points,
        },
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
      fetchQuestions();
      setNewAnswers((prevState) => {
        const updatedAnswers = [...prevState];
        updatedAnswers[index] = { answerText: "", points: 0 };
        return updatedAnswers;
      });
    } catch (error) {
      console.error("Klaida dedant atsakymą:", error);
    }
  };

  const handleRemoveAnswer = async (questionId, answerId) => {
    try {
      await axios.delete(
        ServerPaths.QuestRoutes.DELETE_ANSWER(quizId, questionId, answerId),
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
      fetchQuestions();
    } catch (error) {
      console.error("Klaida šalinant atsakymą:", error);
    }
  };

  const handleAnswerTextChange = (index, value) => {
    setNewAnswers((prevState) => {
      const updatedAnswers = [...prevState];
      updatedAnswers[index].answerText = value;
      return updatedAnswers;
    });
    if (!value.trim()) {
      setNewAnsError("Atsakymo tekstas negali būti tuščias");
    } else {
      setNewAnsError("");
    }
  };

  const handlePointsChange = (index, value) => {
    setNewAnswers((prevState) => {
      const updatedAnswers = [...prevState];
      updatedAnswers[index].points = value;
      return updatedAnswers;
    });
  };

  return (
    <div className="mx-4">
      <hr />
      <div className="mt-3 mx-3">
        <h4>Pridėti klausimą</h4>
        <div className="mb-3">
          <label className="form-label">Klausimas</label>
          <input
            type="text"
            className={`form-control ${newQuestionError ? "is-invalid" : ""}`}
            value={newQuestionText}
            onChange={(e) => {
              setNewQuestionText(e.target.value);
              setNewQuestionError("");
            }}
          />
          {newQuestionError && (
            <div className="invalid-feedback">{newQuestionError}</div>
          )}
        </div>
        <button className="btn btn-primary" onClick={handleAddQuestion}>
          Pridėti klausimą
        </button>
      </div>
      <hr />
      <div className="mt-3 mx-3">
        <h4>Klausimai</h4>
        {questions.map((question, index) => (
          <div
            key={question.id}
            className="card mb-3"
            style={{ background: "none", borderRadius: "10px" }}
          >
            <div className="card-body">
              <h5 className="card-title">Klausimas {questionNumbers[index]}</h5>
              <p className="card-text mx-5">{question.questionText}</p>
              <div>
                <h6>Atsakymai:</h6>
                {question.answers &&
                  question.answers.map((answer) => (
                    <div key={answer.id} className=" mx-4 align-items-center">
                      <p>Atsakymas : {answer.answerText}</p>
                      <p className="ms-auto ">
                        Taškai: {answer.points}
                        <button
                          className="btn btn-sm btn-danger ms-2 p-2 my-2"
                          onClick={() =>
                            handleRemoveAnswer(question.id, answer.id)
                          }
                        >
                          Pašalinti
                        </button>
                      </p>
                    </div>
                  ))}
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                      newAnsError ? "is-invalid" : ""
                    }`}
                    placeholder="Naujas atsakymas"
                    value={newAnswers[index].answerText}
                    onChange={(e) =>
                      handleAnswerTextChange(index, e.target.value)
                    }
                  />
                  {newAnsError && (
                    <div className="invalid-feedback">{newAnsError}</div>
                  )}
                  <input
                    type="number"
                    min="0"
                    className="form-control mt-2"
                    placeholder="Taškai"
                    value={newAnswers[index].points}
                    onChange={(e) => handlePointsChange(index, e.target.value)}
                  />
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => handleAddAnswer(question.id, index)}
                  >
                    Pridėti atsakymą
                  </button>
                </div>
              </div>
              <button
                className="btn btn-danger mt-3"
                onClick={() =>
                  handleRemoveQuestion(question.id, questionNumbers[index])
                }
              >
                Ištrinti klausimą
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
EditQuizQuestion.propTypes = {
  quizId: PropTypes.string.isRequired,
};
export default EditQuizQuestion;
