import { clsx } from 'clsx';
import { useLingo } from '../../lingo/LingoProvider.jsx';
import './Button.css';

export function Button({ className, label, disableReasons = [], onClick })
{
  const { lingo } = useLingo();

  const reasons = disableReasons.filter( Boolean );

  const title = reasons.length > 0
    ? lingo({
      en: 'Disabled because\n' + reasons.join(';\n') + '.',
      de: 'Deaktiviert, da\n' + reasons.join(';\n') + '.',
    })
    : undefined;

  return (
    <button
      className={ clsx('Button', className )}
      type="button"
      title={ title }
      disabled={ reasons.length > 0 }
      onClick={ onClick }
    >
      { label }
    </button>
  );
}
