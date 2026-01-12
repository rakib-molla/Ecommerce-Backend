import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// internal imports
import router from './routes/index.js';
import securitySetup from './middlewares/security.middleware.js';
import errorMiddleware from './middlewares/error.middleware.js';
import ErrorHandler from './utils/ErrorHandler.js';

const app = express();

// declare global api metrics object
global.apiMetrics = {
    totalHits: 0,
    routeHits: {},
    startTime: new Date()
};
// api tracker middleware
app.use((req, res, next) => {
    global.apiMetrics.totalHits++;
    
    // track route path example: GET /api/v1/users
    const path = req.route ? req.route.path : req.url;
    const routeKey = `${req.method} ${path}`;
    
    global.apiMetrics.routeHits[routeKey] = (global.apiMetrics.routeHits[routeKey] || 0) + 1;
    next();
});

// security middlewares setup
securitySetup(app); 
// cors configuration
app.use(cors({
  origin: "*", // accept requests from any origin
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(morgan('dev'));

// Body parser middleware with size limit
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Health Check Route
app.get("/", (req, res) => {
    res.status(200).json({ 
        success: true, 
        message: "API is running smoothly",
        timestamp: new Date().toISOString()
    });
});

// Main API Route
app.use('/api/v1', router);

// Route Not Found handler
app.use((req, res, next) => {
    next(new ErrorHandler(`Route ${req.originalUrl} not found!`, 404));
});

// Global Error Handler
app.use(errorMiddleware);

export default app;