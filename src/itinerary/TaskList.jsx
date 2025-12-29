import { useContextTasks } from './TasksContext.jsx';
import Task from './Task.jsx';

export default function TaskList()
{
  const [tasks, dispatch] = useContextTasks();

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task
            task={task}
          />
        </li>
      ))}
    </ul>
  );
}
