import {createContext, useContext, useMemo, useReducer} from 'react';
import { tasksReducer, createTasksDispatcher } from './tasksReducer.js';
import initialTasks from './initialTasks.js';

const TasksContext = createContext(null);

export function useContextTasks() {
  return useContext(TasksContext);
}

export function TasksProvider({ children })
{
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  const tasksDispatcher = createTasksDispatcher(dispatch);

  useMemo(() =>
    initialTasks.forEach(tasksDispatcher.addTask),
    []
  );

  return (
    <TasksContext value={[tasks, tasksDispatcher]}>
      {children}
    </TasksContext>
  );
}
