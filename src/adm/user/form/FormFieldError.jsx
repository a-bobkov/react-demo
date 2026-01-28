import './FormFieldError.css';

export function FormFieldError({ error })
{
  return (
    <div className="FormFieldError">
      { error }
    </div>
  );
}
