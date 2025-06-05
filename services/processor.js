import {store} from "../models/store.model.js"
function mockExternalAPI(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id, data: 'processed' });
    }, 1000);
  });
}

async function processBatch(batch) {
  batch.status = 'triggered';
  await Promise.all(batch.ids.map(id => mockExternalAPI(id)));
  batch.status = 'completed';
}

async function processQueue() {
  if (store.queue.length === 0) return;

  const job = store.queue[0];

  const nextBatch = job.batches.find(b => b.status === 'yet_to_start');
  if (nextBatch) {
    await processBatch(nextBatch);
    const remaining = job.batches.some(b => b.status !== 'completed');
    if (!remaining) {
      store.queue.shift();
    }
  } else {
    store.queue.shift();
  }
}

setInterval(processQueue, 5000);
