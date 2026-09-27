export function errorHandler(error, req, res, next) {
  console.error(error);
  if (error.name === 'ValidationError') {
    return res.status(400).json({ message: Object.values(error.errors).map((e) => e.message).join(', ') });
  }
  res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
}
