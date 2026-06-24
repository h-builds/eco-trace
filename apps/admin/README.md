# Eco Trace Admin Workstation

## Local Data Reset

To reset the local Cloudflare D1 database to the canonical demo state:

1. Generate the deterministic seed data (this updates the Go registry with the expected public keys and regenerates `seed.sql`):
   ```bash
   npx tsx lib/seed.ts
   ```

2. Reset the database schema:
   ```bash
   npx wrangler d1 execute eco-trace-events --local --file=./schema.sql
   ```

3. Populate demo events:
   ```bash
   npx wrangler d1 execute eco-trace-events --local --file=./seed.sql
   ```
