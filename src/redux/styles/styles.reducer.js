const INITIAL_STATE = {
  currentStyles: {
    primaryColor: "#00ff00",
    bgColor: "#ffffff",
    dnColor: "#000000"
  }
};

const stylesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_STYLES":
      return {
        ...state,
        currentStyles: action.payload
      };
    default:
      return state;
  }
};

export default stylesReducer;
