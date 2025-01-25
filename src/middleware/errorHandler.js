const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || "Internal Server Error",
      timestamp: "2025-01-25 14:00:22",
    },
  });
};

export default errorHandler;
