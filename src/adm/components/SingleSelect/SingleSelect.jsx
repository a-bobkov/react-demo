import { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import './SingleSelect.css';

export function SingleSelect({ className, empty, options, selectedId, onChangeSelectedId })
{
  const [ isOpened, setIsOpened ] = useState( false );

  return (
    <single-select
      className={ className }
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
    </single-select>
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
    <single-select-value
      onClick={ onClick }
    >
      { text }
    </single-select-value>
  );

  function onClick()
  {
    setIsOpened( !isOpened );
  }
}

function SingleSelectClear({ empty, selectedId, setSelectedId })
{
  return empty && selectedId !== undefined && (
    <single-select-clear
      onClick={ onClick }
    >
      ✗
    </single-select-clear>
  );

  function onClick()
  {
    setSelectedId( undefined );
  }
}

function SingleSelectOptions({ options, isOpened, selectedId, setSelectedId })
{
  return isOpened && (
    <single-select-options>
      { options.entries().map( option =>
        <SingleSelectOption
          option={ option }
          selectedId={ selectedId }
          setSelectedId={ setSelectedId }
        />
      )}
    </single-select-options>
  );
}

function SingleSelectOption({ option: [ optionId, optionView ], selectedId, setSelectedId })
{
  const optionRef = useRef( null );

  useEffect( scrollSelectedOptionIntoView, [ optionRef.current ]);

  return (
    <single-select-option
      key={ optionId }
      className={ clsx({ 'isSingleSelectOptionSelected': optionId === selectedId })}
      ref={ optionRef }
      onClick={ onClick }
    >
      { optionView }
    </single-select-option>
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
