const workoutHandlers = require('./workoutHandlers');

exports.handler = async (event) => {
  return await workoutHandlers.handler(event);
};
