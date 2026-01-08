import React from "react";

const TaskItem = ({ task, onEditTask, onDeleteTask, onToggleDone }) => (
  <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-2 p-2 border-b border-base-300 hover:bg-base-200">
    <div className="col-start-1 row-start-1">
      <div className="font-bold">{task.title}</div>
      <div className="text-sm opacity-70">{task.description}</div>
    </div>
    <div className="col-start-2 row-start-1 text-right text-sm opacity-70">
      <input
        type="checkbox"
        className="checkbox checkbox-primary"
        checked={task.is_done}
        onChange={() => onToggleDone(task.id, !task.is_done)}
      />
    </div>
    <div className="col-start-3 row-start-1 ml-auto">
      <div className="dropdown dropdown-end">
        <button tabIndex={0} className="btn btn-ghost btn-xs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a onClick={() => onEditTask(task)}>Edit</a>
          </li>
          <li>
            <a onClick={() => onDeleteTask(task.id)}>Delete</a>
          </li>
        </ul>
      </div>
    </div>
    <div className="col-start-1 row-start-2 text-left text-xs opacity-50 mt-1">
      <span>Created: {new Date(task.created_at).toLocaleDateString()}</span>
    </div>
  </div>
);

const TaskList = ({
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onToggleDone,
  isLargeScreen,
}) => {
  return (
    <div className="p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tasks</h1>
        {isLargeScreen && (
          <button className="btn btn-primary" onClick={onAddTask}>
            Add Task
          </button>
        )}
      </div>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
            onToggleDone={onToggleDone}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
