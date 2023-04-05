const exerciseHandlers = require('./exerciseHandlers');

exports.handler = async (event) => {
  return await exerciseHandlers.handler(event);
};
