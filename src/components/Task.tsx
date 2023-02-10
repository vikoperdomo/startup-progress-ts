import React from "react";

interface Task {
  id: number;
  name: string;
  isCompleted: boolean;
}

interface Phase {
  name: string;
  tasks: Task[];
}

interface Props {
  phases: Phase[];
  handleTaskUpdate: (taskId: number, isCompleted: boolean) => void;
}

export const TaskList: React.FC<Props> = ({ phases, handleTaskUpdate }) => {
  return (
    <>
      {phases.map((phase, phaseIndex) => (
        <div key={phase.name} className="phase-container">
          <h2 className="phase-title">
            <div className="phase-number">{phaseIndex + 1}</div>
            {phase.name}
            {phase.tasks.every((task) => task.isCompleted) ? (
              <span
                role="img"
                aria-label="check"
                className="phase-status-check"
              >
                ✔️
              </span>
            ) : (
              ""
            )}
          </h2>
          <ul className="task-list">
            {phase.tasks.map((task, taskIndex) => (
              <li key={task.id} className="task-item">
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  value={task.id}
                  name={task.name}
                  className="form-control task-checkbox"
                  onChange={() => handleTaskUpdate(task.id, !task.isCompleted)}
                />
                <p className="task-name">{task.name}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};
