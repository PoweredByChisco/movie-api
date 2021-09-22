const boom = require("@hapi/boom")
const { config } = require('../../config');

function withErrorStack(error, stack) {
  if (config.dev) {
    return { ...error, stack };
  } /* if we are in dev mode return error and also stack */

  return error;
}

function logErrors(err, req, res, next) {
  console.log(err);
  next(err);
} /* Print the error on the console */

function wrapErrors(err, req, res, next) {
  if(!err.isBoom) {
    next(boom.badImplementation)
  }

  next(err)
} /* A validation where verifies if the error is in boom format, if thisn't next will be a different argument */

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const { output: {statusCode, payload} } = err; /* Now you can give this format because the error is in boom format */

  res.status(statusCode);
  res.json(
    withErrorStack(payload, err.stack)
  ); /* We return in Json because is the format that we are working */
}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler,
};
