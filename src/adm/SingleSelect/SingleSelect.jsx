import { useState } from 'react';
import { clsx } from 'clsx';
import './SingleSelect.css';

export function SingleSelect({ className, empty, options, selectedId, onChangeSelectedId })
{
  const [ isOpened, setIsOpened ] = useState( false );

  return (
    <div
      className={ clsx( className, 'SingleSelect')}
      tabIndex="0"
      onBlur={ onBlur }
    >
      <SingleSelectValue
        empty={ empty }
        options={ options }
        selectedId={ selectedId }
        isOpened={ isOpened }
        setIsOpened={ setIsOpened }
      />
      <SingleSelectClear
        selectedId={ selectedId }
        setSelected={ setSelected }
      />
      <SingleSelectOptions
        options={ options }
        isOpened={ isOpened }
        selectedId={ selectedId }
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
    onChangeSelectedId( newSelected );

    setIsOpened( false );
  }
}

function SingleSelectValue({ empty, options, selectedId, isOpened, setIsOpened })
{
  const text = options.get( selectedId ) ?? empty;

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

function SingleSelectClear({ selectedId, setSelected })
{
  return selectedId !== undefined && (
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

function SingleSelectOptions({ options, isOpened, selectedId, setSelected })
{
  return isOpened && (
    <div className="SingleSelectOptions">
      { options.entries().map( option =>
        <SingleSelectOption
          option={ option }
          selectedId={ selectedId }
          setSelected={ setSelected }
        />
      )}
    </div>
  );
}

function SingleSelectOption({ option: [ optionId, optionView ], selectedId, setSelected })
{
  return (
    <div
      key={ optionId }
      className={ clsx('SingleSelectOption', optionId === selectedId && 'isSelected') }
      onClick={ onClick }
    >
      { optionView }
    </div>
  );

  function onClick()
  {
    setSelected( optionId );
  }
}
