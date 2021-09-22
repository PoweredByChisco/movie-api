const boom = require('@hapi/boom');

function notFoundHandler(req, res) {
  const {
    output: { statusCode, payload },
  } = boom.notFound();

  res.status(statusCode).json(payload);
}

module.exports = notFoundHandler;
/* This function doesn't have next parameter cause will not execute any middleware after thise error */