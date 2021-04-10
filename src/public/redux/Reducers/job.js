const initialState = {
  jobgroup: '',
  subJobData: [],
  jobgrouptitle: '',
  coAdmin: '',
  assignCrew: '',
  assignLeader: '',
};

const JobReducers = (prevstate = initialState, action) => {
  switch (action.type) {
    case 'ADD_JOBGROUP':
      return {
        ...prevstate,
        jobgroup: action.payload,
      };
    case 'DELETE_JOBGROUP':
      return {
        ...prevstate,
        jobgroup: {},
      };
    case 'ADD_SUBJOB':
      return {
        ...prevstate,
        subJobData: [...prevstate.subJobData, action.payload],
      };

    case 'DELETE_ALL_SUBJOB':
      return {
        ...prevstate,
        subJobData: [],
      };

    case 'DELETE_SUBJOB':
      return {
        ...prevstate,
        subJobData: prevstate.subJobData.filter(
          (item) => item.id != action.payload,
        ),
      };

    case 'UPDATE_SUBJOB':
      const updateData = prevstate.subJobData.map((item) => {
        return item.id === action.payload.id
          ? {...item, subjob: action.payload.subjob}
          : item;
      });
      return {
        ...prevstate,
        subJobData: updateData,
      };

    case 'UPDATE_DETAIL_SUBJOB':
      const updateDetailsubjob = prevstate.subJobData.map((item) => {
        return item.id === action.payload.id
          ? {
              ...item,
              id: action.payload.id,
              id_title: action.payload.id_title,
              subjob: action.payload.subjob,
              code: action.payload.code,
              approval: action.payload.approval,
              alarm: action.payload.alarm,
              stoppable: action.payload.stoppable,
              remind: action.payload.remind,
              note: action.payload.note,
              purpose: action.payload.purpose,
              assessor: action.payload.assessor,
              deadline: action.payload.deadline,
              deadline_revise: action.payload.deadline_revise,
              is_priority: action.payload.is_priority,
              is_failed: action.payload.is_failed,
              is_overdue: action.payload.is_overdue,
              img_refer: action.payload.img_refer,
              img_request: action.payload.img_request,
              reported: action.payload.reported,
            }
          : item;
      });
      return {
        ...prevstate,
        subJobData: updateDetailsubjob,
      };
    default:
      return {
        ...prevstate,
      };
  }
};

export default JobReducers;
