export const detailJob = (data) => {
  return {
    type: 'DETAIL_JOB',
    payload: data,
  };
};

export const reportHistory = (data) => {
  return {
    type: 'REPORT_HISTORY',
    payload: data,
  };
};

export const overdueHistory = (data) => {
  return {
    type: 'OVERDUE_HISTORY',
    payload: data,
  };
};

export const timeReport = (data) => {
  return {
    type: 'TIME_REPORT',
    payload: data,
  };
};

export const statusButton = (data) => {
  return {
    type: 'STATUS_BUTTON',
    payload: data,
  };
};

export const deleteAll = () => {
  return {
    type: 'DELETE_ALL',
  };
};
