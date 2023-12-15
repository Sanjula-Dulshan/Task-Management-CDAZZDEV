import axios from "axios";
import { LOGIN, REGISTER, TASK_URL } from "./ApiConstants";

export const login = async (user) => {
  try {
    const response = await axios.post(LOGIN, user);

    return response;
  } catch (error) {
    return error;
  }
};

export const register = async (user) => {
  try {
    const response = await axios.post(REGISTER, user);

    return response;
  } catch (error) {
    return error;
  }
};

export const createTask = async (task) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(TASK_URL, task, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const getAllTask = async () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  try {
    const response = await axios.get(TASK_URL + `/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const updateStatus = async (taskId) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.put(
      TASK_URL + `/${taskId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteTask = async (id) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.delete(TASK_URL + `/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};
