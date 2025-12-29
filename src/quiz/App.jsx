import { useState } from 'react';
import Answer from './Answer.jsx';
import AnswerError from './AnswerError.jsx';

export default function App() {
  const [status, setStatus] = useState('typing');
  const [error, setError] = useState(null);

  if (status === 'success') {
    return <h1>That's right!</h1>
  }

  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <Answer
        onAnswer={onAnswer}
        isDisabled={status === 'submitting'}
      />
      <AnswerError
        error={error}
      />
    </>
  );

  async function onAnswer(answer) {
    try {
      setStatus('submitting');
      setError(null);
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }
}

async function submitForm(answer)
{
  await delay(1500);

  let shouldError = answer.toLowerCase() !== 'lima'

  if (shouldError) {
    throw new Error('Good guess but a wrong answer. Try again!');
  }
}

function delay(delayMs)
{
  return new Promise(resolve => setTimeout(resolve, delayMs));
}
