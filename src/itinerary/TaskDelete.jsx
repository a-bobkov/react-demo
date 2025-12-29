export default function TaskDelete({taskId, onDeleteTask})
{
  return (
    <button onClick={onClickDelete}>
      Delete
    </button>
  );

  function onClickDelete()
  {
    onDeleteTask(taskId)
  }
}
