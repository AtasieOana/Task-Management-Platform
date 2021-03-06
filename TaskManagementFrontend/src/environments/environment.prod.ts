export const environment = {
  production: true,
  baseUrl: 'http://localhost:8081',
  getUsersUrl: '/user/seeUsers',
  signUpUrl: '/user/signUp',
  loginUrl: '/user/login/{email}/{password}',
  checkUserByEmailUrl: '/user/check/{email}',
  saveBoardUrl: '/user/board/createBoard',
  getBoardUrl: '/board/getBoard/{id}',
  getBoardsUrl: '/board/seeBoards',
  getUserBoardUrl: '/user/board/getUserBoard/{id}',
  getBoardsOfUserUrl: '/user/board/getBoardsOfUser/{email}',
  getTaskListsFromBoardUrl: '/taskList/getTaskListsInBoard/{idBoard}',
  saveTaskListUrl:'/taskList/createTaskList',
  updateBoardPrivacyUrl:'/board/updatePrivacy',
  deleteTaskListUrl: '/taskList/deleteTaskList/{id}',
  updateTaskListUrl: '/taskList/updateTaskList/{id}',
  updateBoardNameUrl:'/board/updateName',
  deleteBoardUrl: '/board/deleteBoard/{id}',
  getUsersInBoardUrl: '/user/board/getUsersInBoard/{id}',
  checkExistenceUserInBoardUrl: "/user/board/checkExistenceUserInBoard/{userId}/{boardId}",
  deleteUserBoardUrl: '/user/board/deleteUserBoard/{id}',
  updateUserRoleUrl: '/user/board/updateUserRole',
  checkIfUserExistAndIsInBoard: "/user/board/checkIfUserExistAndIsInBoard/{email}/{boardId}",
  saveTaskUrl: '/task/createTask',
  getTaskFromTaskListUrl: '/task/getTaskFromTaskList/{idTaskList}',
  deleteTaskUrl: '/task/deleteTask/{id}',
  updateTaskUrl: '/task/updateTask/{id}',
  assignUserOnTaskUrl: '/user/task/assignUserOnTask',
  deleteAssignment: '/user/task/deleteAssignments/{taskId}/{userId}',
  getAssignedUsersUrl: '/user/task/getAssignedUsers/{taskId}',
  getPublicBoardsUrl: '/user/board//getPublicBoards/{userId}',
  saveUserBoardIfNotExistsUrl: '/user/board/saveUserBoardIfNotExists',
  copyBoardElementsUrl: '/taskList/copyTaskListToAnotherBoard/{idOldBoard}/{idNewBoard}',
  deleteUserUrl: '/user/deleteUser/{id}',
  updateUserUrl: '/user/updateUser/{id}',
  getInboxForUserUrl: '/inbox/getInboxForUser/{email}',
  readMessageUrl: '/inbox/markAsRead',
  addInboxMessageUrl: '/inbox/createInbox',
  findNotReadMessagesNumberUrl: '/inbox/findNotReadMessagesNumber/{email}',
};
