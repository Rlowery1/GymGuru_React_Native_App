const progressHandlers = require('./progressHandlers');

exports.handler = async (event) => {
  return await progressHandlers.handler(event);
};
