import { useLingo } from './lingo/LingoProvider.jsx';
import { PopstateLink } from './popstate/PopstateLink.jsx';
import { branchPath, userPath } from './useAdmLocation.js';
import './AdmMenu.css';

export function AdmMenu({ admLocationApi })
{
  const { lingo } = useLingo();

  return (
    <adm-menu>
      <adm-menu-header>
        { lingo({
          en: `Applications`,
          de: `Anwendungen`,
        })}
      </adm-menu-header>
      <AdmMenuItem
        isCurrent={ admLocationApi.isUserLocation() }
        path={ userPath }
        admMenuItemIcon={ <AdmMenuItemIconUser/> }
        admMenuItemLabel={ lingo({
          en: `Users`,
          de: `Benutzer`,
        }) }
      />
      <AdmMenuItem
        isCurrent={ admLocationApi.isBranchLocation() }
        path={ branchPath }
        admMenuItemIcon={ <AdmMenuItemIconBranch/> }
        admMenuItemLabel={ lingo({
          en: `Branches`,
          de: `Niederlassungen`,
        }) }
      />
    </adm-menu>
  );
}

function AdmMenuItem({ isCurrent, path, admMenuItemIcon, admMenuItemLabel })
{
  return (
    <adm-menu-item inert={ isCurrent }>
      <PopstateLink path={ path }>
        <adm-menu-item-content>
          <adm-menu-item-icon>
            { admMenuItemIcon }
          </adm-menu-item-icon>
          { admMenuItemLabel }
        </adm-menu-item-content>
      </PopstateLink>
    </adm-menu-item>
  );
}

function AdmMenuItemIconUser()
{
  return (
    <svg viewBox="0 0 62 57">
      <path d="m57 45-10-5h-1 7l5-1 1-2v-3q-4-4-7-16S52 6 40 6h-5l-1-2q-3-3-10-3-9 0-10 3-2 5-2 7v5l-1 2v4l1 4 4 7v3l-1 2-9 5q-5 3-5 8v5h60v-4q0-5-4-7m-12 9H3v-3q0-4 4-6l9-5 2-4v-4q-1 0-4-7v-1l-1-1v-4l1-2v-7l2-5q2-2 8-2t8 2l2 3v9l1 2v4l-1 1-1 1-4 7v5l1 1v2h2l9 5q4 2 4 6zm14 0H47v-3q0-5-5-8l-7-3v-1l-1-1h-3v-5l1-1 3-6 2-3v-4l-1-3V8h4c10 0 10 9 10 10q3 12 7 18v1l-4 1h-7l-2 2 2 2 10 4q3 2 3 6z"/>
    </svg>
  );
}

function AdmMenuItemIconBranch()
{
  return (
    <svg viewBox="-15 0 165 180">
      <path fillRule="evenodd" d="m66 47h8v7h-8zm-3 0v7h-8v-7zm0-4h-8v-7h8zm3 0v-7h8v7zm12-8h-2v22H53V35h-2v-4h27zm25 111h8v8h-8zm-3 0v8h-8v-8zm0-3h-8v-7h8zm3 0v-7h8v7zm0-11v-7h8v7zm-3 0h-8v-7h8zm13-10v35H90v-35zm-10-22h8v8h-8zm-3 0v8h-8v-8zm0-3h-8v-7h8zm3 0v-7h8v7zm0-11v-7h8v7zm-3 0h-8v-7h8zm13-10v35H90V76zm-46 70h7v8h-7zm-4 0v8h-7v-8zm0-3h-7v-7h7zm4 0v-7h7v7zm0-11v-7h7v7zm-4 0h-7v-7h7zm14-10v35H53v-35zm-10-22h7v8h-7zm-4 0v8h-7v-8zm0-3h-7v-7h7zm4 0v-7h7v7zm0-11v-7h7v7zm-4 0h-7v-7h7zm14-10v35H53V76zm-46 70h8v8h-8zm-3 0v8h-8v-8zm0-3h-8v-7h8zm3 0v-7h8v7zm0-11v-7h8v7zm-3 0h-8v-7h8zm13-10v35H18v-35zm-10-22h8v8h-8zm-3 0v8h-8v-8zm0-3h-8v-7h8zm3 0v-7h8v7zm0-11v-7h8v7zm-3 0h-8v-7h8zm13-10v35H18V76zm80-6v96H11V70zM84 31v35H44V31L64 9zm46 39h-4v100H6V70H1l14-43h26L64 2l24 25h24z"/>
    </svg>
  );
}
