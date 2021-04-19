export const addProgress = (data) => {
  return {
    type: 'ADD_PROGRESS',
    payload: data,
  };
};

export const updateProgress = (data) => {
  return {
    type: 'UPDATE_PROGRESS',
    payload: data,
  };
};

export const deleteProgress = (data) => {
  return {
    type: 'DELETE_PROGRESS',
    payload: data,
  };
};
