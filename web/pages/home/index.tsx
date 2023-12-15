import React, { useEffect, useState } from "react";
import {
  createTask,
  deleteTask,
  getAllTask,
  updateStatus,
} from "../../service/Api/Api";
import Task from "../../components/Task";
import Header from "../../components/Header";
import { notification } from "../../components/Notification";
import { ITask, ITaskInputs, NOTIFICATION_TYPE } from "../../libs/types";

export default function Home() {
  const [inputs, setInputs] = useState<ITaskInputs>();
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allTask, setAllTask] = useState<ITask[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    setInputs((inputs) => ({ ...inputs, userId: userId || "" }));
    try {
      getAllTask()
        .then((res) => {
          setAllTask(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response?.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [isLoading]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const validateFields = () => {
    // Check if required fields are filled
    if (!inputs?.title || !inputs?.description) {
      notification("All fields are required", NOTIFICATION_TYPE.ERROR);
      return false;
    }

    return true;
  };

  const handleAddNewTask = async () => {
    if (!validateFields()) {
      return;
    }
    setIsLoading(true);

    const response = await createTask(inputs);
    if (response?.status === 200) {
      notification("Task added successfully", NOTIFICATION_TYPE.SUCCESS);
      setInputs({
        title: "",
        description: "",
      });
    } else {
      notification(response?.response?.data, NOTIFICATION_TYPE.ERROR);
    }

    setIsLoading(false);
  };

  const handleDelete = async (taskId: string) => {
    setIsLoading(true);

    try {
      const response = await deleteTask(taskId);

      if (response?.status === 200) {
        notification("Task deleted successfully", NOTIFICATION_TYPE.SUCCESS);
      } else {
        notification(response?.response?.data, NOTIFICATION_TYPE.ERROR);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const handleComplete = async (taskId: string) => {
    setIsLoading(true);

    try {
      const response = await updateStatus(taskId);

      if (response?.status === 200) {
        notification("Task completed successfully", NOTIFICATION_TYPE.SUCCESS);
      } else {
        notification(response?.response?.data, NOTIFICATION_TYPE.ERROR);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <Header />
      <h1>My Task</h1>

      <div className="task-wrapper">
        <div className="task-input">
          <div className="task-input-item">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={inputs?.title || ""}
              onChange={handleChange}
              placeholder="Title of your Task"
            />
          </div>
          <div className="task-input-item">
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={inputs?.description || ""}
              onChange={handleChange}
              placeholder="Description of your Task"
            />
          </div>
          <div className="task-input-item">
            <button
              className="primary-btn"
              type="button"
              onClick={handleAddNewTask}
            >
              Add{" "}
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${!isCompletedScreen && "active"}`}
            onClick={() => setIsCompletedScreen(false)}
          >
            To Do
          </button>
          <button
            className={`secondaryBtn ${isCompletedScreen && "active"}`}
            onClick={() => setIsCompletedScreen(true)}
          >
            Completed{" "}
          </button>
        </div>
        <div className="task-list">
          {allTask.map((item, index) => (
            <div key={index}>
              <Task
                item={item}
                handleComplete={handleComplete}
                handleDelete={handleDelete}
                isCompleted={isCompletedScreen}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
