const initialState = {
  jobsData: {},
  err: {},
  isPending: false,
  isFullfilled: false,
  isRejectred: false,
};

const JobReducers = (pervState = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_JOBS_PENDING':
      return {
        ...pervState,
        isPending: true,
        isRejectred: false,
        isFullfilled: false,
      };
    case 'GET_ALL_JOBS_REJECTED':
      return {
        ...pervState,
        isPending: false,
        isRejectred: true,
        err: action.payload,
      };
    case 'GET_ALL_JOBS_FULLFILLED':
      return {
        ...pervState,
        isPending: false,
        isFullfilled: true,
        jobsData: action.payload.data,
      };

    default:
      return {
        ...pervState,
      };
  }
};

export default JobReducers;
