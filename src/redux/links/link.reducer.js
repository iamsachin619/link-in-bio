const INITIAL_STATE = {
  links: null
};

const linkReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_LINKS":
      return {
        ...state,
        links: action.payload
      };
    default:
      return state;
  }
};

export default linkReducer;
