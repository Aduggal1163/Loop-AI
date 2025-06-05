import express from 'express';
import { createIngestion, getStatus } from '../controllers/ingestion.controller.js';

const router = express.Router();

router.post('/', createIngestion);
router.get('/:ingestion_id', getStatus);

export default router ;
