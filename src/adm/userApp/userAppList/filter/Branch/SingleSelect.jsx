import { useState } from 'react';
import { clsx } from 'clsx';
import './SingleSelect.css';

export function SingleSelect({ prompt, options, selected, onChangeSelected })
{
  const [ isOpened, setIsOpened ] = useState( false );

  return (
    <div className="SingleSelect" tabIndex="0" onBlur={ onBlur }>
      <SingleSelectValue
        prompt={ prompt }
        selected={ selected }
        isOpened={ isOpened }
        setIsOpened={ setIsOpened }
      />
      <SingleSelectClear
        selected={ selected }
        setSelected={ setSelected }
      />
      <SingleSelectOptions
        options={ options }
        isOpened={ isOpened }
        setIsOpened={ setIsOpened }
        selected={ selected }
        setSelected={ setSelected }
      />
    </div>
  );

  function onBlur()
  {
    setIsOpened( false );
  }

  function setSelected( newSelected )
  {
    onChangeSelected( newSelected );

    setIsOpened( false );
  }
}

function SingleSelectValue({ prompt, selected, isOpened, setIsOpened })
{
  const text = selected !== undefined
    ? selected.text
    : prompt;

  return (
    <div className="SingleSelectValue" onClick={ onClick }>
      { text }
    </div>
  );

  function onClick()
  {
    setIsOpened( !isOpened );
  }
}

function SingleSelectClear({ selected, setSelected })
{
  return selected !== undefined && (
    <div
      className="SingleSelectClear"
      onClick={ onClick }
    >
    </div>
  );

  function onClick()
  {
    setSelected( undefined );
  }
}

function SingleSelectOptions({ options, isOpened, selected, setSelected })
{
  return isOpened && (
    <div className="SingleSelectOptions">
      { options.map( option =>
        <SingleSelectOption
          key={ option.id }
          option={ option }
          selected={ selected }
          setSelected={ setSelected }
        />
      )}
    </div>
  );
}

function SingleSelectOption({ option, selected, setSelected })
{
  const text = option.text;

  return (
    <div
      className={ clsx('SingleSelectOption', option === selected && 'isSelected') }
      onClick={ onClick }
    >
      { text }
    </div>
  );

  function onClick()
  {
    setSelected( option );
  }
}
