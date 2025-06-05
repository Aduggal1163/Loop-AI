import express from 'express';
import ingestionRoutes from './routes/ingestion.routes.js';

const app = express();
app.use(express.json());

app.use('/ingest', ingestionRoutes);
app.use('/status', ingestionRoutes);

export default app;
