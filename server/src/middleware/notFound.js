export function notFound(req, res) {
  res.status(404).json({ message: `API route not found: ${req.method} ${req.originalUrl}` });
}
