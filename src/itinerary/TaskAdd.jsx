import { useState} from 'react';
import { useContextTasks } from './TasksContext.jsx';

const initialText = '';

export default function TaskAdd()
{
  const [tasks, dispatch] = useContextTasks();
  const [text, setText] = useState(initialText);

  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={onChangeInput}
      />
      <button onClick={onClickAdd}>
        Add
      </button>
    </>
  );

  function onChangeInput(event)
  {
    setText(event.target.value)
  }

  function onClickAdd()
  {
    dispatch.addTask({
      text: text,
      done: false,
    });
    setText(initialText);
  }
}
