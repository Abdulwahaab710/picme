module.exports = {
  viewEvent: (event) => ({
    type: 'VIEW_EVENT',
    event,
  }),
  viewSubmissions: (submissions) => ({
    type: 'VIEW_SUBMISSIONS',
    submissions,
  }),
};
