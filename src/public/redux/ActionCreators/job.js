import axios from 'axios';

const getUrl = 'http://192.168.0.109/hey-buddy';

export const getAllJobs = (idUser) => {
  return {
    type: 'GET_ALL_JOBS',
    payload: axios.get(getUrl + '/jzl/api/api/getListIndex' + idUser),
  };
};
