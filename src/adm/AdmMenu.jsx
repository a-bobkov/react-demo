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
    <svg viewBox="0 0 60 58">
      <path d="m56 47-10-5h-1 7l5-1 1-2v-3q-4-4-7-16S51 8 39 8h-5l-1-2q-3-3-10-3-9 0-10 3-2 5-2 7v5l-1 2v4l1 4 4 7v3l-1 2-9 5q-5 3-5 8v5h60v-4q0-5-4-7m-12 9H2v-3q0-4 4-6l9-5 2-4v-4q-1 0-4-7v-1l-1-1v-4l1-2v-7l2-5q2-2 8-2t8 2l2 3v9l1 2v4l-1 1-1 1-4 7v5l1 1v2h2l9 5q4 2 4 6zm14 0H46v-3q0-5-5-8l-7-3v-1l-1-1h-3v-5l1-1 3-6 2-3v-4l-1-3v-8h4c10 0 10 9 10 10q3 12 7 18v1l-4 1h-7l-2 2 2 2 10 4q3 2 3 6z"/>
    </svg>
  );
}

function AdmMenuItemIconBranch()
{
  return (
    <svg viewBox="0 0 512 488">
      <path d="M80 352q7-1 8-8v-48c0-13 11-24 24-24h136v72a8 8 0 0 0 16 0v-72h136c13 0 24 11 24 24v48a8 8 0 0 0 16 0v-48c0-22-18-40-40-40H264v-24a8 8 0 0 0-16 0v24H112c-22 0-40 18-40 40v48q1 7 8 8m64-144h224a8 8 0 0 0 0-16h-8V32q-1-7-8-8H160q-7 1-8 8v160h-8a8 8 0 0 0 0 16m24-168h176v152H168z"/>
      <path d="M224 120q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m32 0q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m32 0q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m32 0q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m-128 0q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m32 32q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m32 0q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m32 0q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m32 0q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m-128 0q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m136 320v-96q-1-7-8-8H192q-7 1-8 8v96a8 8 0 0 0 0 16h144a8 8 0 0 0 0-16m-128-88h112v88H200z"/>
      <path d="M224 400q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m32 0q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m32 0q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m-64 32q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m32 0q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m32 0q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8M224 88q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m32 0q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m32 0q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m32 0q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m-128 0q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m32-32q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m32 0q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m32 0q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m32 0q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m-128 0q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m-40 416v-96q-1-7-8-8H16q-7 1-8 8v96a8 8 0 0 0 0 16h144a8 8 0 0 0 0-16M24 384h112v88H24z"/>
      <path d="M48 400q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m32 0q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m32 0q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m-64 32q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m32 0q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m32 0q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m392 40v-96q-1-7-8-8H368q-7 1-8 8v96a8 8 0 0 0 0 16h144a8 8 0 0 0 0-16m-128-88h112v88H376z"/>
      <path d="M400 400q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m32 0q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m32 0q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m-64 32q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m32 0q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8m32 0q-7 1-8 8v8a8 8 0 0 0 16 0v-8q-1-7-8-8"/>
    </svg>
  );
}
