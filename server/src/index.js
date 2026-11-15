import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import {swaggerSpec} from './swagger-config.js';
import {initDatabase} from './models/index.js';
import authRouter from "./routes/auth-router.js";
import movieRouter from "./routes/movie-router.js";
import userRouter from "./routes/user-router.js";
import reservationRouter from "./routes/reservation-router.js";
import hallRouter from './routes/hall-router.js';

// Check if NODE_ENV environment variable is set, otherwise go to development mode
const nodeEnv = process.env.NODE_ENV || 'dev';
const port = process.env.PORT || 3000;
const app = express();

// Set up basic JSON parsing and CORS headers
app.use(express.json());
app.use(cors({origin: ['http://localhost:5173', 'http://localhost:4173']}));

// Setup swagger and make it available on /api-docs.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Setup database connection
await initDatabase();

// TODO: setup your routers here, remove the one (and the exampleRouter code) below
app.use('/auth', authRouter);
app.use('/movies', movieRouter);
app.use('/users', userRouter);
app.use('/reservations', reservationRouter);
app.use('/halls', hallRouter);

// Global error handler. In your code, throw an object with a status and message, and it will be caught here. We ignore one eslint call here, because next is needed.
app.use(function (err, req, res, _next) {
  res
    .status(err.status || 500)
    .json({
      message: err.message || 'Something went wrong!'
    });
});

// Setup server, by default on port 3000
app.listen(port, () => {
  // We allow this one console log here, because it helps us understand the server is actually running.
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}, running in ${nodeEnv} mode.`);
});

// Export app for testing purposes
export default app;
