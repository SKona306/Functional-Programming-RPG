const storeState = (initial) => { 
  let currentState = initial; 
  return (stateChangeFunction = state => state) => { 
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  };
};

export default storeState;
