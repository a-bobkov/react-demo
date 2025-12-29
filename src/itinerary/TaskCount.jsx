import { useContextTasks } from './TasksContext.jsx';

export default function TaskCount()
{
  const [tasks, dispatch] = useContextTasks();

  const doneTasksCount = tasks.reduce(
    (result, task) => task.done ? result + 1 : result,
    0,
  );

  return (
    <>
      <hr/>
      Tasks done: {doneTasksCount} / {tasks.length}
    </>
  );
}
