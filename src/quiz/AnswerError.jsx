export default function AnswerError({error})
{
  return error !== null && (
    <p className="Error">
      {error.message}
    </p>
  );
}
