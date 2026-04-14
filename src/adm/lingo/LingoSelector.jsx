import { useContextLingoSelect } from './LingoProvider.jsx';
import { saveLingoLocalStorage } from './lingoLocalStorage.js';

export function LingoSelector()
{
  const { lingo, setLingo } = useContextLingoSelect();

  return (
    <select
      value={ lingo }
      onChange={ onChange }
    >
      <option value="en">EN</option>
      <option value="de">DE</option>
    </select>
  );

  function onChange( event )
  {
    const newLingo = event.target.value;

    saveLingoLocalStorage( newLingo );

    setLingo( newLingo );
  }
}
