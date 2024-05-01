import api from "./api";
import ServerPaths from "./ServerPaths";

const Auth = {
  login: async (data) => {
    return await api.post(ServerPaths.Auth.LOGIN_PATH, data);
  },
  register: async (data) => {
    return await api.post(ServerPaths.Auth.REGISTER_PATH, data);
  },
  user: async (data) => {
    return await api.get(ServerPaths.Auth.USER_PATH, data);
  },
  logout: async (data) => {
    return await api.post(ServerPaths.Auth.LOGOUT_PATH, data);
  },
  refresh: async (data) => {
    return await api.post(ServerPaths.Auth.REFRESH_PATH, data);
  },
};
const Categories = {
  all: async (data) => {
    return await api.get(ServerPaths.CategoryRoutes.ALL_CATEGORIES, data);
  },
  AllMy: async (data) => {
    return await api.get(ServerPaths.CategoryRoutes.MY_CATEGORIES, data);
  },
  create: async (data) => {
    return await api.post(ServerPaths.CategoryRoutes.CREATE_CATEGORY, data);
  },
  delete: async (categoryId, data) => {
    return await api.delete(
      ServerPaths.CategoryRoutes.DELETE_CATEGORY(categoryId),
      data
    );
  },
  update: async (categoryId, data) => {
    return await api.put(
      ServerPaths.CategoryRoutes.UPDATE_CATEGORY(categoryId),
      data
    );
  },
  filter: async (data) => {
    return await api.post(ServerPaths.CategoryRoutes.FILTER_CATEGORIES, data);
  },
  filterNoParent: async (data) => {
    return await api.get(
      ServerPaths.CategoryRoutes.FILTER_CATEGORIES_NO_PARENT,
      data
    );
  },
  children: async (categoryId, data) => {
    return await api.get(
      ServerPaths.CategoryRoutes.CHILDREN_CATEGORIES(categoryId),
      data
    );
  },
  get: async (categoryId, data) => {
    return await api.get(
      ServerPaths.CategoryRoutes.GET_CATEGORY(categoryId),
      data
    );
  },
};
const Questions = {
  create: async (quizID, data) => {
    try {
      return await api.post(
        ServerPaths.QuestRoutes.CREATE_QUESTION(quizID),
        data
      );
    } catch (e) {
      console.log(e);
    }
  },
  all: async (quizID, data) => {
    return await api.get(ServerPaths.QuestRoutes.GET_QUESTIONS(quizID), data);
  },
  delete: async (quizId, questionId, data) => {
    return await api.delete(
      ServerPaths.QuestRoutes.DELETE_QUESTION(quizId, questionId),
      data
    );
  },
  update: async (questionId, data) => {
    return await api.put(
      ServerPaths.QuestRoutes.UPDATE_QUESTION(questionId),
      data
    );
  },
  addAnswer: async (quizId, questionId, data) => {
    return await api.post(
      ServerPaths.QuestRoutes.ADD_ANSWER(quizId, questionId),
      data
    );
  },
  deleteAnswer: async (quizId, questionId, answerId, data) => {
    return await api.delete(
      ServerPaths.QuestRoutes.DELETE_ANSWER(quizId, questionId, answerId),
      data
    );
  },
};
const Groups = {
  create: async (data) => {
    return await api.post(ServerPaths.GroupRoutes.CREATE_GROUP, data);
  },
  join: async (data) => {
    return await api.post(ServerPaths.GroupRoutes.JOIN_GROUP, data);
  },
  myGroups: async (data) => {
    return await api.get(ServerPaths.GroupRoutes.MY_GROUPS, data);
  },
  joinedGroups: async (data) => {
    return await api.get(ServerPaths.GroupRoutes.JOINED_GROUPS, data);
  },
  get: async (groupId, data) => {
    return await api.get(ServerPaths.GroupRoutes.GET_GROUP(groupId), data);
  },
  update: async (groupId, data) => {
    return await api.put(ServerPaths.GroupRoutes.UPDATE_GROUP(groupId), data);
  },
  delete: async (groupId, data) => {
    return await api.delete(
      ServerPaths.GroupRoutes.DELETE_GROUP(groupId),
      data
    );
  },
  removeUser: async (groupId, userId, data) => {
    return await api.delete(
      ServerPaths.GroupRoutes.REMOVE_USER_FROM_GROUP(groupId, userId),
      data
    );
  },
  leave: async (groupId, data) => {
    return await api.delete(ServerPaths.GroupRoutes.LEAVE_GROUP(groupId), data);
  },
};
const Profile = {
  uploadImage: async (data) => {
    return await api.post(ServerPaths.ProfileRoutes.UPLOAD_IMAGE, data);
  },
};
const Quizzes = {
  myQuizzes: async (data) => {
    return await api.get(ServerPaths.QuizRoutes.MY_QUIZZES, data);
  },
  updateQuiz: async (quizId, data) => {
    return await api.put(ServerPaths.QuizRoutes.UPDATE_QUIZ(quizId), data);
  },
  getQuiz: async (quizId, data) => {
    return await api.get(ServerPaths.QuizRoutes.GET_QUIZ(quizId), data);
  },
  deleteQuiz: async (quizId, data) => {
    return await api.delete(ServerPaths.QuizRoutes.DELETE_QUIZ(quizId), data);
  },
  createQuiz: async (data) => {
    return await api.post(ServerPaths.QuizRoutes.CREATE_QUIZ, data);
  },
  assignQuizToGroup: async (data) => {
    return await api.post(ServerPaths.QuizRoutes.ASSIGN_QUIZ_TO_GROUP, data);
  },
  getUsersForQuiz: async (quizId, data) => {
    return await api.get(
      ServerPaths.QuizRoutes.GET_USERS_FOR_QUIZ(quizId),
      data
    );
  },
  removeUserFromQuiz: async (quizId, userId, data) => {
    return await api.delete(
      ServerPaths.QuizRoutes.REMOVE_USER_FROM_QUIZ(quizId, userId),
      data
    );
  },
};
const Assigned = {
  getQuizForUser: async (quizId, userId, data) => {
    return await api.get(
      ServerPaths.AssignedRoutes.GET_QUIZ_FOR_USER(quizId, userId),
      data
    );
  },
  myQuizzes: async (data) => {
    return await api.get(ServerPaths.AssignedRoutes.MY_QUIZZES, data);
  },
  submitQuiz: async (quizId, data) => {
    return await api.post(ServerPaths.AssignedRoutes.SUBMIT_QUIZ(quizId), data);
  },
  averageAllCategories: async (data) => {
    return await api.get(
      ServerPaths.AssignedRoutes.AVERAGE_ALL_CATEGORIES,
      data
    );
  },
  doneQuizzes: async (data) => {
    return await api.get(ServerPaths.AssignedRoutes.DONE_QUIZZES, data);
  },
  averageAll: async (data) => {
    return await api.get(ServerPaths.AssignedRoutes.AVERAGE_ALL, data);
  },
  teacherQuizzes: async (data) => {
    return await api.get(ServerPaths.AssignedRoutes.TEACHER_QUIZZES, data);
  },
  takeQuiz: async (quizID, data) => {
    return await api.get(ServerPaths.AssignedRoutes.TAKE_QUIZ(quizID), data);
  },
  removeGrade: async (quizId, userId, data) => {
    return await api.delete(
      ServerPaths.AssignedRoutes.REMOVE_GRADE(quizId, userId),
      data
    );
  },
};
export { Auth, Categories, Questions, Groups, Profile, Quizzes, Assigned };
