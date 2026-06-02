import './InputText.css';

export function InputText({ placeholder, value, onChange })
{
  return(
    <input
      className="InputText"
      type="text"
      placeholder={ placeholder }
      value={ value }
      onChange={ onChange }
    />
  );
}
