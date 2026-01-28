import './FetchCommonError.css';

export function FetchCommonError({ error })
{
  if (!error) {
    return null;
  }

  return (
    <div className="CommonError">
      { error.message }
    </div>
  );
}
