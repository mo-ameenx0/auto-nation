const API_BASE_URL = "http://localhost:5000";

const endpoints = {
  getTasks: `${API_BASE_URL}/getTasks`,
  insertTasks: `${API_BASE_URL}/insertTask`,
  updateTask: `${API_BASE_URL}/updateTask`,
};

export default endpoints;
