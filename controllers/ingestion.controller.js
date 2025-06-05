import { v4 as uuidv4 } from 'uuid';
import {store}  from '../models/store.model.js';
import { sortQueue } from '../utils/priorityQueue.js';

export const createIngestion = (req, res) => {
  const { ids, priority } = req.body;
  const ingestionId = uuidv4();
  const createdAt = Date.now();
  const batches = [];

  for (let i = 0; i < ids.length; i += 3) {
    batches.push({
      batch_id: uuidv4(),
      ids: ids.slice(i, i + 3),
      status: 'yet_to_start',
    });
  }

  store.ingestions.set(ingestionId, {
    ingestion_id: ingestionId,
    status: 'yet_to_start',
    batches,
  });

  store.queue.push({
    ingestionId,
    priority,
    createdAt,
    batches,
  });

  store.queue = sortQueue(store.queue);
  res.json({ ingestion_id: ingestionId });
};

export const getStatus = (req, res) => {
  const ingestion = store.ingestions.get(req.params.ingestion_id);
  if (!ingestion) return res.status(404).json({ error: 'Not found' });

  const statuses = ingestion.batches.map(b => b.status);
  let overallStatus = 'yet_to_start';
  if (statuses.every(s => s === 'completed')) overallStatus = 'completed';
  else if (statuses.some(s => s === 'triggered')) overallStatus = 'triggered';

  res.json({
    ingestion_id: ingestion.ingestion_id,
    status: overallStatus,
    batches: ingestion.batches,
  });
};
