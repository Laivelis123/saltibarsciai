const SERVER_PATH = "http://localhost:3001/api";
const AUTH = "auth";
const CATEGORIES = "categories";
const QUESTIONS = "quizzes/questions";
const PROFILE = "profile";
const GROUPS = "groups";
const QUIZZES = "quizzes";
const ASSIGNED = "quizzes/assigned";

export const ServerPaths = {
  Auth: {
    LOGIN_PATH: `${SERVER_PATH}/${AUTH}/login`,
    REGISTER_PATH: `${SERVER_PATH}/${AUTH}/register`,
    USER_PATH: `${SERVER_PATH}/${AUTH}/user`,
    LOGOUT_PATH: `${SERVER_PATH}/${AUTH}/logout`,
    REFRESH_PATH: `${SERVER_PATH}/${AUTH}/refresh`,
    UPDATE_PASSWORD: `${SERVER_PATH}/${AUTH}/update-password`,
    CHECK_EMAIL: `${SERVER_PATH}/${AUTH}/check-email`,
  },
  CategoryRoutes: {
    ALL_CATEGORIES: `${SERVER_PATH}/${CATEGORIES}/all`,
    MY_CATEGORIES: `${SERVER_PATH}/${CATEGORIES}/my`,
    CREATE_CATEGORY: `${SERVER_PATH}/${CATEGORIES}/create`,
    DELETE_CATEGORY: (categoryId) =>
      `${SERVER_PATH}/${CATEGORIES}/${categoryId}/remove`,
    UPDATE_CATEGORY: (categoryId) =>
      `${SERVER_PATH}/${CATEGORIES}/${categoryId}/update`,
    FILTER_CATEGORIES: `${SERVER_PATH}/${CATEGORIES}/filter`,
    FILTER_CATEGORIES_NO_PARENT: `${SERVER_PATH}/${CATEGORIES}/filter?parentId=null`,
    CHILDREN_CATEGORIES: (categoryId) =>
      `${SERVER_PATH}/${CATEGORIES}/${categoryId}/children`,
    GET_CATEGORY: (categoryId) => `${SERVER_PATH}/${CATEGORIES}/${categoryId}`,
  },
  QuestRoutes: {
    CREATE_QUESTION: (quizID) => `${SERVER_PATH}/${QUESTIONS}/${quizID}`,
    GET_QUESTIONS: (quizID) => `${SERVER_PATH}/${QUESTIONS}/${quizID}/all`,
    DELETE_QUESTION: (quizId, questionId) =>
      `${SERVER_PATH}/${QUESTIONS}/${quizId}/all/${questionId}`,
    UPDATE_QUESTION: (questionId) =>
      `${SERVER_PATH}/${QUESTIONS}/${questionId}/update`,
    ADD_ANSWER: (quizId, questionId) =>
      `${SERVER_PATH}/${QUESTIONS}/${quizId}/all/${questionId}/answers`,
    DELETE_ANSWER: (quizId, questionId, answerId) =>
      `${SERVER_PATH}/${QUESTIONS}/${quizId}/all/${questionId}/answers/${answerId}`,
  },
  ProfileRoutes: {
    UPLOAD_IMAGE: `${SERVER_PATH}/${PROFILE}/upload`,
    DELETE_IMAGE: `${SERVER_PATH}/${PROFILE}/delete`,
    DELETE_PROFILE: `${SERVER_PATH}/${PROFILE}/remove`,
  },
  GroupRoutes: {
    CREATE_GROUP: `${SERVER_PATH}/${GROUPS}/create`,
    JOIN_GROUP: `${SERVER_PATH}/${GROUPS}/join`,
    MY_GROUPS: `${SERVER_PATH}/${GROUPS}/my-groups`,
    JOINED_GROUPS: `${SERVER_PATH}/${GROUPS}/joined-groups`,
    GET_GROUP: (groupId) => `${SERVER_PATH}/${GROUPS}/${groupId}`,
    UPDATE_GROUP: (groupId) => `${SERVER_PATH}/${GROUPS}/${groupId}`,
    DELETE_GROUP: (groupId) => `${SERVER_PATH}/${GROUPS}/${groupId}`,
    REMOVE_USER_FROM_GROUP: (groupId, userId) =>
      `${SERVER_PATH}/${GROUPS}/${groupId}/users/${userId}`,
    LEAVE_GROUP: (groupId) => `${SERVER_PATH}/${GROUPS}/${groupId}/leave`,
  },
  QuizRoutes: {
    MY_QUIZZES: `${SERVER_PATH}/${QUIZZES}/my-quizzes`,
    UPDATE_QUIZ: (quizId) => `${SERVER_PATH}/${QUIZZES}/${quizId}`,
    GET_QUIZ: (quizId) => `${SERVER_PATH}/${QUIZZES}/${quizId}`,
    DELETE_QUIZ: (quizId) => `${SERVER_PATH}/${QUIZZES}/${quizId}`,
    CREATE_QUIZ: `${SERVER_PATH}/${QUIZZES}/create`,
    ASSIGN_QUIZ_TO_GROUP: `${SERVER_PATH}/${QUIZZES}/assign-quiz`,
    GET_USERS_FOR_QUIZ: (quizId) => `${SERVER_PATH}/${QUIZZES}/${quizId}/users`,
    REMOVE_USER_FROM_QUIZ: (quizId, userId) =>
      `${SERVER_PATH}/${QUIZZES}/${quizId}/users/${userId}`,
  },
  AssignedRoutes: {
    GET_MY_STUDENT_AVERAGES: `${SERVER_PATH}/${ASSIGNED}/students-averages`,
    GET_QUIZ_FOR_USER: (quizId, userId) =>
      `${SERVER_PATH}/${ASSIGNED}/review/${quizId}/${userId}`,
    MY_QUIZZES: `${SERVER_PATH}/${ASSIGNED}/my-quizzes`,
    SUBMIT_QUIZ: (quizId) => `${SERVER_PATH}/${ASSIGNED}/submit/${quizId}`,
    AVERAGE_ALL_CATEGORIES: `${SERVER_PATH}/${ASSIGNED}/average-all-categories`,
    DONE_QUIZZES: `${SERVER_PATH}/${ASSIGNED}/done-quizzes`,
    AVERAGE_ALL: `${SERVER_PATH}/${ASSIGNED}/average-all`,
    TEACHER_QUIZZES: `${SERVER_PATH}/${ASSIGNED}/teacher-quizzes`,
    TAKE_QUIZ: (quizID) => `${SERVER_PATH}/${ASSIGNED}/take/${quizID}`,
    REMOVE_GRADE: (quizId, userId) =>
      `${SERVER_PATH}/${ASSIGNED}/remove-grade/${quizId}/${userId}`,
  },
};

export default ServerPaths;
