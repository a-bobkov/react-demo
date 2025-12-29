import { useState } from 'react';

export default function Answer({isDisabled, onAnswer}) {
  const [answer, setAnswer] = useState('');

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={answer}
        onChange={handleTextareaChange}
        disabled={isDisabled}
      />
      <br />
      <button disabled={answer.length === 0 || isDisabled}>
        Submit
      </button>
    </form>
  );

  async function handleSubmit(event) {
    event.preventDefault();
    onAnswer(answer);
  }

  function handleTextareaChange(event) {
    setAnswer(event.target.value);
  }
}
