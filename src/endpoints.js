const API_BASE_URL = "http://localhost:5000";

const endpoints = {
  getTasks: `${API_BASE_URL}/getTasks`,
  insertTasks: `${API_BASE_URL}/insertTask`,
  updateTask: `${API_BASE_URL}/updateTask`,
  deleteTask: `${API_BASE_URL}/deleteTask`,

  getRouters: `${API_BASE_URL}/getRouters`,
  insertRouter: `${API_BASE_URL}/insertRouter`,
  deleteRouter: `${API_BASE_URL}/deleteRouter`,
};

export default endpoints;