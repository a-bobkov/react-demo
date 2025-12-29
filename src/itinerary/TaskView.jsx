export default function TaskView({name, onEditName})
{
  return (
    <>
      {name}
      <button onClick={onEditName}>
        Edit
      </button>
    </>
  );
}
