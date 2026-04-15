export function notFoundHandler(req, res) {
    res.status(404).json({
        ok: false,
        error: {
            message: `Route not found: ${req.method} ${req.originalUrl}`,
        },
    });
}

export function errorHandler(error, _req, res, _next) {
    console.error('API error:', error);

    res.status(500).json({
        ok: false,
        error: {
            message: error.message || 'Internal Server Error',
        },
    });
}