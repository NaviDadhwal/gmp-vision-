"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const cron_service_1 = require("./services/cron.service");
async function bootstrap() {
    try {
        // 1. Connect to MongoDB Atlas
        await (0, db_1.connectDB)();
        // 2. Start scheduled background workers
        cron_service_1.CronService.init();
        // 3. Start HTTP server
        const server = app_1.app.listen(env_1.env.PORT, () => {
            console.log(`🚀 [Server] GMP VISION API listening on port ${env_1.env.PORT} (${env_1.env.NODE_ENV})`);
            console.log(`📡 [Health] http://localhost:${env_1.env.PORT}/health`);
            console.log(`🔌 [Ready]  http://localhost:${env_1.env.PORT}/ready`);
        });
        // 4. Graceful termination listeners
        const shutdown = async (signal) => {
            console.log(`🛑 [Server] Received ${signal}. Commencing graceful shutdown...`);
            server.close(async () => {
                console.log('🔒 [HTTP] Closed all incoming connections');
                await (0, db_1.disconnectDB)();
                process.exit(0);
            });
            // Force exit if hanging after 10s
            setTimeout(() => {
                console.error('⚠️ [Server] Forced shutdown after timeout');
                process.exit(1);
            }, 10000);
        };
        process.on('SIGTERM', () => shutdown('SIGTERM'));
        process.on('SIGINT', () => shutdown('SIGINT'));
    }
    catch (error) {
        console.error('💥 [Server Crash] Fatal error during startup:', error);
        process.exit(1);
    }
}
bootstrap();
