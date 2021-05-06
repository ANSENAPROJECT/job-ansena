export const deviceToken = (data) => {
  return {
    type: 'DEVICE_TOKEN',
    payload: data,
  };
};
