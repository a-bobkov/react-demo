import { UserLocationProvider } from './userApp/userLocation/UserLocationProvider.jsx';
import { UserApp } from './userApp/UserApp.jsx';
import { BranchLocationProvider } from './branchApp/branchLocation/BranchLocationProvider.jsx';
import { BranchApp } from './branchApp/BranchApp.jsx';
import { BRANCH_APP, USER_APP } from './Adm.jsx';

export function Application({ app })
{
  switch ( app )
  {
    case USER_APP:
      const userPrefix = '/user';
      return (
        <UserLocationProvider prefix={ userPrefix }>
          <UserApp />
        </UserLocationProvider>
      );

    case BRANCH_APP:
      const branchPrefix = '/branch';
      return (
        <BranchLocationProvider prefix={ branchPrefix }>
          <BranchApp />
        </BranchLocationProvider>
      );

    default:
      return '404';
  }
}
