const initialState = {
  event: null,
  submissions: [],
};

function config(state = initialState, action) {
  switch(action.type) {
    case 'VIEW_EVENT':
      return {
        ...state,
        event: action.event,
      };
    case 'VIEW_SUBMISSIONS':
      return {
        ...state,
        submissions: action.submissions,
      };
    default:
      return state;
  }
}

module.exports = config;
