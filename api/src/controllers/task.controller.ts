import { RequestHandler } from "express";
import Joi from "joi";
import TaskModel from "../models/task.model";
import { ITask, IUpdateTaskParams } from "../../interfaces/task";

// Create a new task
export const CreateTask: RequestHandler<
  unknown,
  unknown,
  ITask,
  unknown
> = async (req, res) => {
  const Schema = Joi.object({
    userId: Joi.string().required(),
    title: Joi.string().min(3).max(30).required(),
    description: Joi.string().required(),
    done: Joi.boolean(),
  });

  const { error } = Schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const taskData: ITask = {
    userId: req.body?.userId,
    title: req.body?.title,
    description: req.body?.description,
    done: req.body?.done,
  };

  const task = new TaskModel(taskData);

  try {
    const savedTask = await task.save();
    res.send(savedTask);
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};

// Get all tasks
export const GetTasks: RequestHandler = async (req, res): Promise<void> => {
  try {
    const tasks = await TaskModel.find(
      { userId: req.params.userId },
      { __v: 0 }
    ).sort({ updatedAt: -1 });
    res.send(tasks);
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};

// Update task status
export const UpdateStatus: RequestHandler<
  IUpdateTaskParams,
  unknown,
  ITask,
  unknown
> = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = await TaskModel.findByIdAndUpdate(
      taskId,
      { $set: { done: true } },
      { new: true }
    );

    if (!updatedTask) {
      res.status(404).send("Task not found");
    } else {
      res.send(updatedTask);
    }
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};

// Delete a task
export const DeleteTask: RequestHandler = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await TaskModel.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).send("Task not found");
    }

    res.send(deletedTask);
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};
