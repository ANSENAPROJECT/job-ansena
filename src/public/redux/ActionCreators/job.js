export const addJobGroup = (data) => {
  return {
    type: 'ADD_JOBGROUP',
    payload: data,
  };
};

export const deleteJobGroup = () => {
  return {
    type: 'DELETE_JOBGROUP',
  };
};

export const addSubjob = (data) => {
  return {
    type: 'ADD_SUBJOB',
    payload: data,
  };
};

export const deleteAllSubJob = () => {
  return {
    type: 'DELETE_ALL_SUBJOB',
  };
};

export const updateSubjob = (data) => {
  return {
    type: 'UPDATE_SUBJOB',
    payload: data,
  };
};

export const updateDetailSubjob = (data) => {
  return {
    type: 'UPDATE_DETAIL_SUBJOB',
    payload: data,
  };
};

export const deleteSubjob = (data) => {
  return {
    type: 'DELETE_SUBJOB',
    payload: data,
  };
};
