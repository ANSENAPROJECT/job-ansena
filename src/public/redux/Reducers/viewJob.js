const initialState = {
  activeJobGroup: [],
  inactiveJobHroup: [],
  deactivatedJobGroup: [],
};

export const ViewJobReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case 'ACTIVE_JOB_GROUP':
      return {
        ...prevState,
        activeJobGroup: action.payload,
      };
    case 'INACTIVE_JOB_GROUP':
      return {
        ...prevState,
        inactiveJobHroup: action.payload,
      };
    case 'DEACTIVATED_JOB_GROUP':
      return {
        ...prevState,
        deactivatedJobGroup: action.payload,
      };

    default:
      return {
        ...prevState,
      };
  }
};
