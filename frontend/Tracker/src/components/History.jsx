import React from "react";

const History = ({ completedTasks, onRestoreTask }) => {
  return (
    <div className="p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">History</h1>
      </div>
      <div className="space-y-2">
        {completedTasks.length > 0 ? (
          completedTasks.map((task) => (
            <div
              key={task.id}
              className="p-2 border-b border-base-300 bg-base-200 flex justify-between items-center"
            >
              <div>
                <div className="font-bold">{task.title}</div>
                <div className="text-sm opacity-70">{task.description}</div>
                <div className="text-xs opacity-50">
                  Completed on: {new Date(task.created_at).toLocaleDateString()}
                </div>
              </div>
              <button
                className="btn btn-sm btn-outline btn-success"
                onClick={() => onRestoreTask(task.id)}
              >
                Restore
              </button>
            </div>
          ))
        ) : (
          <p>No completed tasks yet.</p>
        )}
      </div>
    </div>
  );
};

export default History;
