import { TasksProvider } from './TasksContext.jsx';
import TaskAdd from './TaskAdd.jsx';
import TaskList from './TaskList.jsx';
import TaskCount from './TaskCount.jsx';
import "./styles.css";

export default function App()
{
  return (
    <TasksProvider>
      <h1>Prague itinerary</h1>
      <TaskAdd />
      <TaskList />
      <TaskCount />
    </TasksProvider>
  );
}
