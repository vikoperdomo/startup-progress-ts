// App.tsx
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
   * handleTaskReopen is a function that updates the completion state of a task
   * @param {number} taskId - The ID of the task to be updated.
   */
  const handleTaskCompletion = (taskId: number) => {
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
      updatedPhases[phaseIndex].tasks[taskIndex].isCompleted = true;

      // Store the updated phases in local storage
      localStorage.setItem("phases", JSON.stringify(updatedPhases));

      // Return the updated phases to update the state
      return updatedPhases;
    });
  };

  /**
   * handleTaskReopen is a function that updates the state of a task and marks it as not completed.
   * @param {number} taskId - The ID of the task to be updated.
   */
  const handleTaskReopen = (taskId: number) => {
    // Update the state of the task with setPhases
    setPhases((prevPhases) => {
      // Create a copy of the previous phases state
      const updatedPhases = [...prevPhases];
      // Find the index of the phase that contains the task with the specified ID
      const phaseIndex = updatedPhases.findIndex((phase) =>
        phase.tasks.find((task: any) => task.id === taskId)
      );
      // Find the index of the task within the phase
      const taskIndex = updatedPhases[phaseIndex].tasks.findIndex(
        (task: any) => task.id === taskId
      );
      // Update the isCompleted property of the task to false
      updatedPhases[phaseIndex].tasks[taskIndex].isCompleted = false;
      // Store the updated state in local storage
      localStorage.setItem("phases", JSON.stringify(updatedPhases));
      // Return the updated state
      return updatedPhases;
    });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Startup Progress</h1>
      </header>
      <main className="app-main">
        <TaskList
          phases={phases}
          handleTaskCompletion={handleTaskCompletion}
          handleTaskReopen={handleTaskReopen}
        />
        <Fact
          isAllPhasesCompleted={phases.every((phase) =>
            phase.tasks.every((task: any) => task.isCompleted)
          )}
        ></Fact>
      </main>
    </div>
  );
};
