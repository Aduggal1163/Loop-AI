## Data Ingestion API System

### Features

- Async batch processing (3 IDs max)
- Priority-based queuing (HIGH > MEDIUM > LOW)
- Rate-limited processing (1 batch / 5 sec)
- In-memory data persistence

### Endpoints

- `POST /ingest`: Submit ingestion job
- `GET /status/:id`: Check status

### Setup
`
for setup project do the following two steps ( add .env file if you want to run on a spectific port other then 5000 )
npm install
npm run dev
`
