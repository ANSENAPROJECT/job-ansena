const initialState = {
  token: '',
};

const TokenReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case 'DEVICE_TOKEN':
      return {
        ...prevState,
        token: action.payload,
      };

    default:
      return {
        ...prevState,
      };
  }
};

export default TokenReducer;
