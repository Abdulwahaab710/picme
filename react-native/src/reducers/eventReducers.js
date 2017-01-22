const initialState = {
  event: null,
};

function config(state = initialState, action) {
  switch(action.type) {
    case 'VIEW_EVENT':
      return {
        ...state,
        event: action.event,
      };
    default:
      return state;
  }
}

module.exports = config;
