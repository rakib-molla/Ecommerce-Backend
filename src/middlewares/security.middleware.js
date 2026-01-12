import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import { config } from '../config/index.js';


// Rate limiting configuration (per IP request control)
const limiter = rateLimit({
    windowMs: `${config.maxRequestsPerMinute}` * 60 * 1000, 
    max: `${config.maxRequestsPerWindow}`, // Maximum 100 requests from one IP in 15 minutes
    message: {
        success: false,
        message: "Too many requests from this IP, please try again after 15 minutes"
    },
    standardHeaders: true, // Rate limit info pass `RateLimit-*` headers
    legacyHeaders: false, // `X-RateLimit-*` headers off
});

// all security middlewares 
const securitySetup = (app) => {
    // HTTP headers security are protected by Helmet
    app.use(helmet());

    // Protects against XSS attacks (cleans malicious scripts from the body)
    

    // HTTP Parameter Pollution protection
    app.use(hpp());

    // Setting rate limits on specific API routes
    app.use('/api', limiter);
};

export default securitySetup;