const userHandlers = require('./userHandlers');

exports.handler = async (event) => {
  return await userHandlers.handler(event);
};
