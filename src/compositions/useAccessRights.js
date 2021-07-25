const userRights = JSON.parse(
  localStorage.getItem('_urights') || sessionStorage.getItem('_urights')
);

export default (module) => {
  const canCreate = userRights[module] ? userRights[module].c : false;
  const canRead = userRights[module] ? userRights[module].r : false;
  const canUpdate = userRights[module] ? userRights[module].u : false;
  const canDelete = userRights[module] ? userRights[module].d : false;

  function hasAccess (module, action = 'r') {
    return userRights[module] ? userRights[module][action] : false;
  }

  return {
    canCreate,
    canRead,
    canUpdate,
    canDelete,
    hasAccess
  };
};
