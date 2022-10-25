import jwtAuthz from 'express-jwt-authz';

export const checkPermissions = (permissions: string[]) => {
  return jwtAuthz(permissions, {
    customScopeKey: 'permissions',
    customUserKey: 'auth',
    checkAllScopes: true,
    failWithError: true,
  });
};
