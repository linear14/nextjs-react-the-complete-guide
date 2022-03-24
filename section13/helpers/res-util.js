export const handleErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({ hasError: true, message });
};
