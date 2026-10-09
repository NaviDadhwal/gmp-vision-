const { app } = require('../dist/app');
const { connectDB } = require('../dist/config/db');

// Ensure MongoDB Atlas connection is established on serverless invocations
app.use(async (_req, _res, next) => {
  try {
    await connectDB();
  } catch (err) {
    console.error('⚠️ [MongoDB Connection Warning]:', err && err.message ? err.message : err);
  }
  next();
});

module.exports = app;
