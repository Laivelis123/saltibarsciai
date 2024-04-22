import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

const EditQuizQuestion = ({ quizId }) => {
  const [questions, setQuestions] = useState([]);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newAnswers, setNewAnswers] = useState([]); // State for answer text and points
  const { user } = useAuth();
  const [questionNumbers, setQuestionNumbers] = useState([]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/quizzes/questions/${quizId}/all`,
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
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const handleAddQuestion = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/quizzes/questions/${quizId}`,
        { questionText: newQuestionText },
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
      fetchQuestions();
      setNewQuestionText(""); // Reset the input field after adding question
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };
  const handleRemoveQuestion = async (questionId, questionNumber) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/quizzes/questions/${quizId}/all/${questionId}`,
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
      fetchQuestions();
      // Update question numbers after removing a question
      setQuestionNumbers(
        questionNumbers.filter((number) => number !== questionNumber)
      );
    } catch (error) {
      console.error("Error removing question:", error);
    }
  };

  const handleAddAnswer = async (questionId, index) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/quizzes/questions/${quizId}/all/${questionId}/answers`,
        {
          answerText: newAnswers[index].answerText,
          points: newAnswers[index].points,
        },
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
      fetchQuestions();
      // Reset input fields after adding answer
      setNewAnswers((prevState) => {
        const updatedAnswers = [...prevState];
        updatedAnswers[index] = { answerText: "", points: 0 };
        return updatedAnswers;
      });
    } catch (error) {
      console.error("Error adding answer:", error);
    }
  };

  const handleRemoveAnswer = async (questionId, answerId) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/quizzes/questions/${quizId}/all/${questionId}/answers/${answerId}`, // Ensure that the questionId is properly included in the URL
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
      fetchQuestions();
    } catch (error) {
      console.error("Error removing answer:", error);
    }
  };

  const handleAnswerTextChange = (index, value) => {
    setNewAnswers((prevState) => {
      const updatedAnswers = [...prevState];
      updatedAnswers[index].answerText = value;
      return updatedAnswers;
    });
  };

  const handlePointsChange = (index, value) => {
    setNewAnswers((prevState) => {
      const updatedAnswers = [...prevState];
      updatedAnswers[index].points = value;
      return updatedAnswers;
    });
  };

  return (
    <div>
      <hr />
      <div className="mt-3">
        <h4>Pridėti klausimą</h4>
        <div className="mb-3">
          <label className="form-label">Klausimas</label>
          <input
            type="text"
            className="form-control"
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleAddQuestion}>
          Pridėti klausimą
        </button>
      </div>
      <hr />
      <div className="mt-3">
        <h4>Klausimai</h4>
        {questions.map((question, index) => (
          <div key={question.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Klausimas {questionNumbers[index]}</h5>
              <p className="card-text">{question.questionText}</p>
              <div>
                <h6>Atsakymai:</h6>
                {question.answers &&
                  question.answers.map((answer) => (
                    <div key={answer.id} className=" align-items-center">
                      <p>Atsakymas : {answer.answerText}</p>
                      <p className="ms-auto">
                        Taškai: {answer.points}
                        <button
                          className="btn btn-sm btn-danger ms-2"
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
                    className="form-control"
                    placeholder="Naujas atsakymas"
                    value={newAnswers[index].answerText}
                    onChange={(e) =>
                      handleAnswerTextChange(index, e.target.value)
                    }
                  />
                  <input
                    type="number"
                    min="0"
                    className="form-control mt-2"
                    placeholder="Taškai"
                    value={newAnswers[index].points}
                    onChange={(e) => handlePointsChange(index, e.target.value)}
                  />
                  <button
                    className="btn btn-outline-primary mt-2"
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

export default EditQuizQuestion;
