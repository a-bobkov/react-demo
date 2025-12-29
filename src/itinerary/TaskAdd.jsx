import { useState } from 'react';

const initialText = '';

export default function TaskAdd({id, onAddTask})
{
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
    onAddTask({
      id: id,
      text: text,
      done: false,
    });
    setText(initialText);
  }
}
