import mongoose from "mongoose";
import os from "os";

 const getHealthStatus = async (req, res) => {
    const startTime = Date.now();
    
    try {
        // database ping logic
        let dbStatus = "DISCONNECTED";
        let dbResponseTime = 0;

        if (mongoose.connection.readyState === 1) {
            const dbStart = Date.now();
            await mongoose.connection.db.admin().ping();
            dbResponseTime = `${Date.now() - dbStart}ms`;
            dbStatus = "HEALTHY";
        }

        // system memory calculation logic
        const totalMemory = os.totalmem();
        const freeMemory = os.freemem();
        const usedMemory = totalMemory - freeMemory;
        const memoryUsagePercentage = ((usedMemory / totalMemory) * 100).toFixed(2);

        // ৩. response data assembly
        const healthData = {
            status: dbStatus === "HEALTHY" ? "UP" : "DEGRADED",
            uptime: `${Math.floor(process.uptime())} seconds`,
            timestamp: new Date().toLocaleString(),
            
            // API analytics from global object
            analytics: {
                totalRequests: global.apiMetrics.totalHits,
                trackingSince: global.apiMetrics.startTime,
                requestPerRoute: global.apiMetrics.routeHits
            },

            server: {
                responseTime: `${Date.now() - startTime}ms`,
                cpuLoad: os.loadavg(),
                nodeVersion: process.version,
            },
            
            database: {
                status: dbStatus,
                latency: dbResponseTime,
                connectionState: mongoose.connection.readyState,
            },
            
            resources: {
                memoryUsage: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
                systemMemoryFree: `${Math.round(freeMemory / 1024 / 1024)} MB`,
                memoryThresholdStatus: memoryUsagePercentage > 90 ? "CRITICAL" : "STABLE",
                totalRamUsage: `${memoryUsagePercentage}%`
            }
        };

        const statusCode = (dbStatus === "HEALTHY" && memoryUsagePercentage < 95) ? 200 : 503;
        res.status(statusCode).json(healthData);

    } catch (error) {
        res.status(500).json({
            status: "DOWN",
            error: error.message
        });
    }
};

export default getHealthStatus;