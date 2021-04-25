export const addProgressReport = (data) => {
  return {
    type: 'ADD_PROGRESS_REPORT',
    payload: data,
  };
};

export const addProgressReportGalery = (data) => {
  return {
    type: 'ADD_PROGRESS_REPORT_GALERY',
    payload: data,
  };
};

export const updateProgressReport = (data) => {
  return {
    type: 'UPDATE_PROGRESS_REPORT',
    payload: data,
  };
};

export const deleteProgressReport = (data) => {
  return {
    type: 'DELETE_PROGRESS_REPORT',
    payload: data,
  };
};

export const deleteProgress = () => {
  return {
    type: 'DELETE_PROGRESS',
  };
};
