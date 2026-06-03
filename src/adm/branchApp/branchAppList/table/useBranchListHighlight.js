import { useState } from 'react';
import { saveHighlight, loadHighlight } from './persistBranchListHighlight.js';

export function useBranchListHighlight()
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
