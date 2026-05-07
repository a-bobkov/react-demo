import './FetchCommonError.css';

export function FetchCommonError({ error })
{
  return error && (
    <div className="CommonError">
      { error.message }
      <FetchCommonErrorCause
        error={ error.cause }
      />
    </div>
  );
}

function FetchCommonErrorCause({ error })
{
  return error && (
    <div className="CommonErrorCause">
      { error.message }
    </div>
  );
}
