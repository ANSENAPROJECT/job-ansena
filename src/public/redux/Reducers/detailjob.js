const initialState = {
  subjob: '',
  title: '',
  jobId: '',
  subjobId: '',
  deadline: '',
  approval: [],
  assessor: '',
  purpose: '',
  image: [],
  crew: [],
  remind: [],
  reportHistory: [],
  overdueHistory: [],
  timeReport: '',
  noteRequest: '',
  noteReport: '',
  statusButton: '',
  deadlineOverdue: '',
  imgRequest: '',
  imgReport: '',
  noteRevise: '',
  imgRevise: [],
  timeReport: '',
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
        noteRequest: action.payload.noteRequest,
        noteReport: action.payload.noteReport,
        deadlineOverdue: action.payload.deadlineOverdue,
        imgRequest: action.payload.imgRequest,
        imgReport: action.payload.imgReport,
        noteRevise: action.payload.noteRevise,
        timeReport: action.payload.timeReport,
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

    case 'LIST_REVISE':
      return {
        ...prevState,
        imgRevise: action.payload,
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
