const initialState = {
  img_request: [],
};

const ProgressReportReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case 'ADD_PROGRESS_REPORT':
      return {
        ...prevState,
        img_request: [...prevState.img_request, action.payload],
      };
    case 'DELETE_PROGRESS':
      return {
        ...prevState,
        img_request: [],
      };
    case 'ADD_PROGRESS_REPORT_GALERY':
      return {
        ...prevState,
        img_request: [...prevState.img_request.concat(action.payload)],
      };
    case 'UPDATE_PROGRESS_REPORT':
      const updateReport = prevState.img_request.map((item) => {
        return item.image === action.payload.image
          ? {...item, desc: action.payload.desc}
          : item;
      });
      return {
        ...prevState,
        img_request: updateReport,
      };
    case 'DELETE_PROGRESS_REPORT':
      const arr = [...prevState.img_request];
      arr.splice(action.payload, 1);
      return {
        ...prevState,
        img_request: arr,
      };
    default:
      return {
        ...prevState,
      };
  }
};

export default ProgressReportReducer;
