module.exports = function errorHandler(error, req, res, _next) {
  const status = error.status || (error.code === 'LIMIT_FILE_SIZE' ? 413 : 500);
  if (status >= 500) console.error(error);
  res.status(status).render('error', {
    title: status === 404 ? 'Not found' : 'Something went wrong',
    status,
    message: status >= 500 ? 'An unexpected error occurred.' : error.message,
  });
};
