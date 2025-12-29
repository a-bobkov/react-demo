export default function TaskDone({isDone, onChangeDone})
{
  console.log('isDone: ', isDone);

  return (
    <input
      type="checkbox"
      checked={isDone}
      onChange={onChange}
    />
  );

  function onChange(event)
  {
    onChangeDone(event.target.checked);
  }
}
