import React, { useState, useEffect } from "react";
import { initialPhases } from "./utils/initialPhases";
import { TaskList } from "./components/Task";
import { Fact } from "./components/Fact";
import "./styles.css";

export const App: React.FC = () => {
  // Options for the startup progress
  // Use `useState` hook to keep track of the startup progress phases
  const [phases, setPhases] = useState(initialPhases);

  // Use `useEffect` hook to persist the state of phases in local storage
  useEffect(() => {
    const storedPhases = localStorage.getItem("phases");
    // Check if there are any phases stored in local storage
    if (storedPhases) {
      setPhases(JSON.parse(storedPhases));
    }
  }, []);

  /**
   * handleTaskUpdate is a function that updates the completion state of a task
   * @param {number} taskId - The ID of the task to be updated.
   * @param {boolean} isCompleted - The new completion state of the task.
   */
  const handleTaskUpdate = (taskId: number, isCompleted: boolean) => {
    setPhases((prevPhases) => {
      // Create a copy of the previous phases state
      const updatedPhases = [...prevPhases];

      // Find the index of the phase that contains the task with the specified id
      const phaseIndex = updatedPhases.findIndex((phase) =>
        phase.tasks.find((task: any) => task.id === taskId)
      );

      // Find the index of the task with the specified id within its phase
      const taskIndex = updatedPhases[phaseIndex].tasks.findIndex(
        (task: any) => task.id === taskId
      );

      // Update the completion state of the task
      updatedPhases[phaseIndex].tasks[taskIndex].isCompleted = isCompleted;

      // Store the updated phases in local storage
      localStorage.setItem("phases", JSON.stringify(updatedPhases));

      // Return the updated phases to update the state
      return updatedPhases;
    });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Startup Progress</h1>
      </header>
      <main className="app-main">
        <TaskList phases={phases} handleTaskUpdate={handleTaskUpdate} />
        <Fact
          isAllPhasesCompleted={phases.every((phase) =>
            phase.tasks.every((task: any) => task.isCompleted)
          )}
        ></Fact>
      </main>
    </div>
  );
};
