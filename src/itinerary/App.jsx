// https://react.dev/learn/choosing-the-state-structure

import { useState } from 'react';
import TaskAdd from './TaskAdd.jsx';
import TaskList from './TaskList.jsx';
import TaskCount from './TaskCount.jsx';
import initialTasks from './initialTasks.js';
import "./styles.css";

export default function App()
{
  const [tasks, setTasks] = useState(initialTasks);
  const [id, setId] = useState(initialTasks.length);

  return (
    <>
      <h1>Prague itinerary</h1>
      <TaskAdd
        id={id}
        onAddTask={onAddTask}
      />
      <TaskList
        tasks={tasks}
        onChangeTask={onChangeTask}
        onDeleteTask={onDeleteTask}
      />
      <TaskCount
        tasks={tasks}
      />
    </>
  );

  function onAddTask(task)
  {
    setTasks([...tasks, task ]);

    setId(id => id + 1);
  }

  function onChangeTask(changedTask)
  {
    const newTasks = tasks.map((task) =>
      task.id === changedTask.id ? changedTask : task
    );

    setTasks(newTasks);
  }

  function onDeleteTask(taskId)
  {
    const newTasks = tasks.filter(
      task => task.id !== taskId
    );

    setTasks(newTasks);
  }
}
