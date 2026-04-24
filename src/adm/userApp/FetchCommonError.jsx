import './FetchCommonError.css';

export function FetchCommonError({ error })
{
  return error && (
    <div className="CommonError">
      { error.message }
    </div>
  );
}
