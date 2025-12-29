export default function TaskCount({ tasks })
{
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
