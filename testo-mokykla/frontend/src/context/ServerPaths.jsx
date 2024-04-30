const SERVER_PATH = "http://localhost:3001/api";

export const ServerPaths = {
  Auth: {
    LOGIN_PATH: `${SERVER_PATH}/auth/login`,
    REGISTER_PATH: `${SERVER_PATH}/auth/register`,
    USER_PATH: `${SERVER_PATH}/auth/user`,
    LOGOUT_PATH: `${SERVER_PATH}/auth/logout`,
    REFRESH_PATH: `${SERVER_PATH}/auth/refresh`,
  },
  CategoryRoutes: {
    ALL_CATEGORIES: `${SERVER_PATH}/categories/all`,
    MY_CATEGORIES: `${SERVER_PATH}/categories/my`,
    CREATE_CATEGORY: `${SERVER_PATH}/categories/create`,
    DELETE_CATEGORY: (categoryId) =>
      `${SERVER_PATH}/categories/${categoryId}/remove`,
    UPDATE_CATEGORY: (categoryId) =>
      `${SERVER_PATH}/categories/${categoryId}/update`,
    FILTER_CATEGORIES: `${SERVER_PATH}/categories/filter`,
    FILTER_CATEGORIES_NO_PARENT: `${SERVER_PATH}/categories/filter?parentId=null`,
    CHILDREN_CATEGORIES: (categoryId) =>
      `${SERVER_PATH}/categories/${categoryId}/children`,
    GET_CATEGORY: (categoryId) => `${SERVER_PATH}/categories/${categoryId}`,
  },
  QuestRoutes: {
    CREATE_QUESTION: (quizID) => `${SERVER_PATH}/quizzes/questions/${quizID}`,
    GET_QUESTIONS: (quizID) => `${SERVER_PATH}/quizzes/questions/${quizID}/all`,
    DELETE_QUESTION: (quizId, questionId) =>
      `${SERVER_PATH}/quizzes/questions/${quizId}/all/${questionId}`,
    UPDATE_QUESTION: (questionId) =>
      `${SERVER_PATH}/quizzes/questions/${questionId}/update`,
    ADD_ANSWER: (quizId, questionId) =>
      `${SERVER_PATH}/quizzes/questions/${quizId}/all/${questionId}/answers`,
    DELETE_ANSWER: (quizId, questionId, answerId) =>
      `${SERVER_PATH}/quizzes/questions/${quizId}/all/${questionId}/answers/${answerId}`,
  },
  ProfileRoutes: {
    UPLOAD_IMAGE: `${SERVER_PATH}/profile/upload`,
  },
  GroupRoutes: {
    CREATE_GROUP: `${SERVER_PATH}/groups/create`,
    JOIN_GROUP: `${SERVER_PATH}/groups/join`,
    MY_GROUPS: `${SERVER_PATH}/groups/my-groups`,
    JOINED_GROUPS: `${SERVER_PATH}/groups/joined-groups`,
    GET_GROUP: (groupId) => `${SERVER_PATH}/groups/${groupId}`,
    UPDATE_GROUP: (groupId) => `${SERVER_PATH}/groups/${groupId}`,
    DELETE_GROUP: (groupId) => `${SERVER_PATH}/groups/${groupId}`,
    REMOVE_USER_FROM_GROUP: (groupId, userId) =>
      `${SERVER_PATH}/groups/${groupId}/users/${userId}`,
    LEAVE_GROUP: (groupId) => `${SERVER_PATH}/groups/${groupId}/leave`,
  },
  QuizRoutes: {
    MY_QUIZZES: `${SERVER_PATH}/quizzes/my-quizzes`,
    UPDATE_QUIZ: (quizId) => `${SERVER_PATH}/quizzes/${quizId}`,
    GET_QUIZ: (quizId) => `${SERVER_PATH}/quizzes/${quizId}`,
    DELETE_QUIZ: (quizId) => `${SERVER_PATH}/quizzes/${quizId}`,
    CREATE_QUIZ: `${SERVER_PATH}/quizzes/create`,
    ASSIGN_QUIZ_TO_GROUP: `${SERVER_PATH}/quizzes/assign-quiz`,
    GET_USERS_FOR_QUIZ: (quizId) => `${SERVER_PATH}/quizzes/${quizId}/users`,
    REMOVE_USER_FROM_QUIZ: (quizId, userId) =>
      `${SERVER_PATH}/quizzes/${quizId}/users/${userId}`,
  },
  AssignedRoutes: {
    GET_QUIZ_FOR_USER: (quizId, userId) =>
      `${SERVER_PATH}/quizzes/assigned/${quizId}/${userId}`,
    MY_QUIZZES: `${SERVER_PATH}/quizzes/assigned/my-quizzes`,
    SUBMIT_QUIZ: (quizId) => `${SERVER_PATH}/quizzes/assigned/${quizId}/submit`,
    AVERAGE_ALL_CATEGORIES: `${SERVER_PATH}/quizzes/assigned/average-all-categories`,
    DONE_QUIZZES: `${SERVER_PATH}/quizzes/assigned/done-quizzes`,
    AVERAGE_ALL: `${SERVER_PATH}/quizzes/assigned/average-all`,
    TEACHER_QUIZZES: `${SERVER_PATH}/quizzes/assigned/teacher-quizzes`,
    TAKE_QUIZ: (quizID) => `${SERVER_PATH}/quizzes/questions/${quizID}`,
    REMOVE_GRADE: (quizId, userId) =>
      `${SERVER_PATH}/quizzes/assigned/remove-grade/${quizId}/${userId}`,
  },
};

export default ServerPaths;
