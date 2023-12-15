import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import moment from "moment";
import PropTypes from "prop-types";
import { ITaskProps } from "../libs/types";

export default function Task({
  item,
  handleComplete,
  handleDelete,
  isCompleted,
}: Readonly<ITaskProps>) {
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const isDone = item?.done;

  const confirmDelete = (taskId: string) => {
    handleDelete(taskId);
    setIsDeleteConfirmationOpen(false);
  };

  return (
    <>
      {!isCompleted && !isDone && (
        <div className="task-list-item">
          <div>
            <h3>{item?.title}</h3>
            <p>{item?.description}</p>
            <p>
              {"Created at: "}
              {moment(item?.created_on).format("YYYY/MM/DD h:mm A")}
            </p>
          </div>
          <div>
            <AiOutlineDelete
              title="Delete?"
              className="icon"
              onClick={() => setIsDeleteConfirmationOpen(true)}
            />
            <BsCheckLg
              title="Completed?"
              className="check-icon"
              onClick={() => handleComplete(item?._id)}
            />
          </div>
        </div>
      )}

      {isCompleted && isDone && (
        <div className="task-list-item">
          <div>
            <h3>{item?.title}</h3>
            <p>{item?.description}</p>
            <p>
              {"Completed at: "}
              {moment(item?.last_modified_on).format("YYYY/MM/DD h:mm A")}
            </p>
          </div>
          <div>
            <AiOutlineDelete
              title="Delete?"
              className="icon"
              onClick={() => setIsDeleteConfirmationOpen(true)}
            />
          </div>
        </div>
      )}

      {isDeleteConfirmationOpen && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this task?</p>
          <button onClick={() => setIsDeleteConfirmationOpen(false)}>
            Cancel
          </button>
          <button onClick={() => confirmDelete(item?._id)}>Confirm</button>
        </div>
      )}
    </>
  );
}

Task.propTypes = {
  item: PropTypes.object.isRequired,
  handleComplete: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  isCompleted: PropTypes.bool.isRequired,
};
