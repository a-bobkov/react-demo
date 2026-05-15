import { useState } from 'react';
import { saveHighlight, loadHighlight } from './persistUserListHighlight.js';

export function useUserListHighlight()
{
  const [ highlight, setHighlight ] = useState( loadHighlight );

  return {
    highlight: highlight,
    setHighlight: setSaveHighlight,
  };

  function setSaveHighlight( newHighlight )
  {
    saveHighlight( newHighlight );

    setHighlight( newHighlight );
  }
}
