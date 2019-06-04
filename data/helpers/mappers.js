module.exports = {
  intToBoolean,
  booleanToint,
  projectToBody,
  actionToBody,
};

function intToBoolean(int) {
  return int === 1 ? true : false;
}

function booleanToint(bool) {
  return bool === true ? 1 : 0;
}

function projectToBody(project) {
  const result = {
    ...project,
    is_complete: intToBoolean(project.is_complete),
  };

  if (project.actions) {
    result.actions = project.actions.map(action => ({
      ...action,
      is_complete: intToBoolean(action.is_complete),
    }));
  }

  return result;
}

function actionToBody(action) {
  return {
    ...action,
    is_complete: intToBoolean(action.is_complete),
  };
}
