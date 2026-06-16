import { clsx } from 'clsx';
import { BranchFormFieldErrors } from './BranchFormFieldErrors.jsx';
import './BranchFormField.css';

export function BranchFormField({ label, renderControl, saveErrors, formErrors, isFieldChanged })
{
  return (
    <div className="BranchFormField">
      <div className={ clsx('BranchFormFieldName', isFieldChanged && 'isFieldChanged') }>
        { label }
      </div>
      <div className="BranchFormFieldValue">
        { renderControl() }
        <BranchFormFieldErrors
          formError={ formErrors }
          saveError={ saveErrors }
        />
      </div>
    </div>
  );
}
