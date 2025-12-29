import { useState } from 'react';

export default function TaskEdit({name, onSaveName})
{
  const [text, setText] = useState(name);

  return (
    <label>
      <input
        value={text}
        onChange={onChangeInput}
      />
      <button onClick={onClickSave}>
        Save
      </button>
    </label>
  );

  function onChangeInput(event)
  {
    setText(event.target.value);
  }

  function onClickSave()
  {
    onSaveName(text);
  }
}
