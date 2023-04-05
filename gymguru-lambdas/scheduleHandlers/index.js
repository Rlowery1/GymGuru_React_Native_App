const scheduleHandlers = require('./scheduleHandlers');

exports.handler = async (event) => {
  return await scheduleHandlers.handler(event);
};
