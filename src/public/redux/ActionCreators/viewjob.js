export const activeJobGroup = (data) => {
  return {
    type: 'ACTIVE_JOB_GROUP',
    payload: data,
  };
};

export const inactiveJobGroup = (data) => {
  return {
    type: 'INACTIVE_JOB_GROUP',
    payload: data,
  };
};

export const deactivatedJobGroup = (data) => {
  return {
    type: 'DEACTIVATED_JOB_GROUP',
    payload: data,
  };
};
