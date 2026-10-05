import { app } from './app';
import { env } from './config/env';
import { connectDB, disconnectDB } from './config/db';
import { CronService } from './services/cron.service';

async function bootstrap() {
  try {
    // 1. Connect to MongoDB Atlas
    await connectDB();

    // 2. Start scheduled background workers
    CronService.init();

    // 3. Start HTTP server
    const server = app.listen(env.PORT, () => {
      console.log(`🚀 [Server] GMP VISION API listening on port ${env.PORT} (${env.NODE_ENV})`);
      console.log(`📡 [Health] http://localhost:${env.PORT}/health`);
      console.log(`🔌 [Ready]  http://localhost:${env.PORT}/ready`);
    });

    // 4. Graceful termination listeners
    const shutdown = async (signal: string) => {
      console.log(`🛑 [Server] Received ${signal}. Commencing graceful shutdown...`);
      server.close(async () => {
        console.log('🔒 [HTTP] Closed all incoming connections');
        await disconnectDB();
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
  } catch (error) {
    console.error('💥 [Server Crash] Fatal error during startup:', error);
    process.exit(1);
  }
}

bootstrap();
