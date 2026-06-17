import { useEffect, useRef, useState } from 'react';
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
        empty={ empty }
        selectedId={ selectedId }
        setSelectedId={ setSelectedId }
      />
      <SingleSelectOptions
        options={ options }
        isOpened={ isOpened }
        selectedId={ selectedId }
        setSelectedId={ setSelectedId }
      />
    </div>
  );

  function onBlur()
  {
    setIsOpened( false );
  }

  function setSelectedId( newSelectedId )
  {
    onChangeSelectedId( newSelectedId );

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

function SingleSelectClear({ empty, selectedId, setSelectedId })
{
  return empty && selectedId !== undefined && (
    <div
      className="SingleSelectClear"
      onClick={ onClick }
    >
    </div>
  );

  function onClick()
  {
    setSelectedId( undefined );
  }
}

function SingleSelectOptions({ options, isOpened, selectedId, setSelectedId })
{
  return isOpened && (
    <div className="SingleSelectOptions">
      { options.entries().map( option =>
        <SingleSelectOption
          option={ option }
          selectedId={ selectedId }
          setSelectedId={ setSelectedId }
        />
      )}
    </div>
  );
}

function SingleSelectOption({ option: [ optionId, optionView ], selectedId, setSelectedId })
{
  const optionRef = useRef( null );

  useEffect( scrollSelectedOptionIntoView, [ optionRef.current ]);

  return (
    <div
      key={ optionId }
      className={ clsx('SingleSelectOption', optionId === selectedId && 'isSelected') }
      ref={ optionRef }
      onClick={ onClick }
    >
      { optionView }
    </div>
  );

  function scrollSelectedOptionIntoView()
  {
    if ( optionId === selectedId )
    {
      optionRef.current.scrollIntoView({
        container: 'nearest',
        behavior: 'smooth',
        block: 'center',
      });
    }
  }

  function onClick()
  {
    setSelectedId( optionId );
  }
}
