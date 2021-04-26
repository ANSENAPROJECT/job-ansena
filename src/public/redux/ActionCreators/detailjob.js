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

export const reportHistoryDone = (data) => {
  return {
    type: 'REPORT_HISTORY_DONE',
    payload: data,
  };
};

export const proposeOverdueHistory = (data) => {
  return {
    type: 'PROPOSE_OVERDUE_HISTORY',
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

export const listRevise = (data) => {
  return {
    type: 'LIST_REVISE',
    payload: data,
  };
};

export const deleteAll = () => {
  return {
    type: 'DELETE_ALL',
  };
};
