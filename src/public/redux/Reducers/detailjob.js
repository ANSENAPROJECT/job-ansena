const initialState = {
  subjob: '',
  title: '',
  jobId: '',
  subjobId: '',
  deadline: '',
  approval: '',
  assessor: '',
  purpose: '',
  image: [],
  crew: [],
  remind: [],
  reportHistory: [],
  overdueHistory: [],
  timeReport: '',
  statusButton: '',
};

const DetailReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case 'DETAIL_JOB':
      return {
        ...prevState,
        jobId: action.payload.jobId,
        subjobId: action.payload.subjobId,
        subjob: action.payload.subjob,
        title: action.payload.title,
        deadline: action.payload.deadline,
        approval: action.payload.approval,
        assessor: action.payload.assessor,
        purpose: action.payload.purpose,
        image: action.payload.image,
        crew: action.payload.crew,
        remind: action.payload.remind,
      };
    case 'REPORT_HISTORY':
      return {
        ...prevState,
        reportHistory: action.payload,
      };
    case 'OVERDUE_HISTORY':
      return {
        ...prevState,
        overdueHistory: action.payload,
      };
    case 'REPORT_HISTORY_DONE':
      return {
        ...prevState,
        reportHistory: [...prevState.reportHistory.concat(action.payload)],
      };

    case 'PROPOSE_OVERDUE_HISTORY':
      return {
        ...prevState,
        overdueHistory: [...prevState.overdueHistory.concat(action.payload)],
      };

    case 'STATUS_BUTTON':
      return {
        ...prevState,
        statusButton: action.payload,
      };

    case 'TIME_REPORT':
      return {
        ...prevState,
        timeReport: action.payload,
      };
    case 'DELETE_ALL':
      return {
        ...prevState,
        subjob: '',
        title: '',
        deadline: '',
        approval: '',
        assessor: '',
        purpose: '',
        image: [],
        crew: [],
        remind: [],
        reportHistory: [],
        overdueHistory: [],
        timeReport: '',
        statusButton: '',
      };
    default:
      return {
        ...prevState,
      };
  }
};

export default DetailReducer;
