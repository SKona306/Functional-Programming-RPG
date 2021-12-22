const changeState = (prop) => { 
  return (value) => { 
    return (state) => ({
      ...state, 
      [prop] : (state[prop] || 0) + value 
    });
  };
};

const changeStateString = (prop) => {
  return (value) => { 
    return (state) => ({
      ...state, 
      [prop] : (state[prop] || "") + value 
    });
  };
};
export {
  changeState, changeStateString
};