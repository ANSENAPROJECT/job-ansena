const initialState = {
  jobsData: {},
  err: {},
  isPending: false,
  isFullfilled: false,
  isRejectred: false,
};

const JobReducers = (pervState = initialState, action) => {
  switch (action.type) {
    case 'INPUT_SUBJOB':
      return {
        ...pervState,
      };
    default:
      return {
        ...pervState,
      };
  }
};

export default JobReducers;
