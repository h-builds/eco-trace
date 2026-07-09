import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '../../..');
const adminRoot = path.resolve(__dirname, '..');

function resolveInside(basePath: string, ...segments: string[]): string {
  const normalizedBase = path.normalize(basePath);
  const resolvedPath = path.normalize(path.resolve(normalizedBase, ...segments));
  const relativePath = path.relative(normalizedBase, resolvedPath);

  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    throw new Error(`Refusing to access path outside ${normalizedBase}: ${resolvedPath}`);
  }

  return resolvedPath;
}

function getRawPublicKey(keyPair: crypto.KeyPairKeyObjectResult): string {
  return keyPair.publicKey.export({ type: 'spki', format: 'der' }).subarray(12).toString('hex');
}

const keyAndes = crypto.generateKeyPairSync('ed25519');
const pubAndes = getRawPublicKey(keyAndes);

const keyVeridian = crypto.generateKeyPairSync('ed25519');
const pubVeridian = getRawPublicKey(keyVeridian);

const keyNorthStar = crypto.generateKeyPairSync('ed25519');
const pubNorthStar = getRawPublicKey(keyNorthStar);

const keyAuditor = crypto.generateKeyPairSync('ed25519');
const pubAuditor = getRawPublicKey(keyAuditor);

const keyRogue = crypto.generateKeyPairSync('ed25519');
const pubRogue = getRawPublicKey(keyRogue);

console.log(`[+] Generated Ed25519 Pair - Andes Organic \t(${pubAndes.slice(0, 16)}...)`);
console.log(`[+] Generated Ed25519 Pair - Veridian Node \t(${pubVeridian.slice(0, 16)}...)`);
console.log(`[+] Generated Ed25519 Pair - NorthStar Log \t(${pubNorthStar.slice(0, 16)}...)`);
console.log(`[+] Generated Ed25519 Pair - Demo Auditor \t(${pubAuditor.slice(0, 16)}...)`);

const registryPath = resolveInside(workspaceRoot, 'packages', 'engine', 'internal', 'crypto', 'registry.go');
let registryGo: string;

try {
  registryGo = fs.readFileSync(registryPath, 'utf-8');
} catch (err) {
  console.error(`[!] Failed to read Go registry at ${registryPath}. Are you running this from the correct directory?`, err);
  process.exit(1);
}

registryGo = registryGo.replace(/pubAndes := mustDecodeHex\("[a-f0-9]+"\)/, `pubAndes := mustDecodeHex("${pubAndes}")`);
registryGo = registryGo.replace(/pubVeridian := mustDecodeHex\("[a-f0-9]+"\)/, `pubVeridian := mustDecodeHex("${pubVeridian}")`);
registryGo = registryGo.replace(/pubNorthStar := mustDecodeHex\("[a-f0-9]+"\)/, `pubNorthStar := mustDecodeHex("${pubNorthStar}")`);
registryGo = registryGo.replace(/pubAuditor := mustDecodeHex\("[a-f0-9]+"\)/, `pubAuditor := mustDecodeHex("${pubAuditor}")`);

try {
  fs.writeFileSync(registryPath, registryGo);
  console.log(`[+] Updated Go Registry: ${registryPath}`);
} catch (err) {
  console.error(`[!] Failed to write updated Go registry at ${registryPath}.`, err);
  process.exit(1);
}

function signPayload(eventId: string, assetId: string, actorId: string, timestamp: string, actionType: string, energyKwh: number, emissionFactor: number, privateKey: crypto.KeyObject) {
  const payload = {
    event_id: eventId,
    asset_id: assetId,
    actor_id: actorId,
    timestamp: timestamp,
    action_type: actionType,
    esg_metadata: {
      energy_kwh: energyKwh,
      emission_factor: emissionFactor
    }
  };
  
  const data = Buffer.from(JSON.stringify(payload));
  return crypto.sign(null, data, privateKey).toString('hex');
}

const ASSET_ID = "ASSET-COFFEE-2026-001";

// Timestamps must follow a strict chronological sequence to satisfy the Engine's lineage validation
const t1 = new Date("2026-06-01T08:00:00Z").toISOString();
const t2 = new Date("2026-06-03T14:30:00Z").toISOString();
const t3 = new Date("2026-06-05T09:15:00Z").toISOString();
const t4 = new Date("2026-06-07T11:00:00Z").toISOString();
const t5 = new Date("2026-06-08T16:45:00Z").toISOString();
const t6 = new Date("2026-06-10T10:00:00Z").toISOString();

interface SeedEvent {
  uuid: string;
  actor_id: string;
  key: crypto.KeyObject;
  pub: string;
  ev_id: string;
  act: string;
  ts: string;
  e: number;
  f: number;
  tamper?: boolean;
  override?: string;
}

const mockEvents: SeedEvent[] = [
  { uuid: crypto.randomUUID(), actor_id: "Andes Organic Cooperative", key: keyAndes.privateKey, pub: pubAndes, ev_id: "EVT-COFFEE-001", act: "ORIGIN", ts: t1, e: 120.0, f: 0.2 },
  { uuid: crypto.randomUUID(), actor_id: "Veridian Processing Node", key: keyVeridian.privateKey, pub: pubVeridian, ev_id: "EVT-COFFEE-002", act: "TRANSFORM", ts: t2, e: 450.5, f: 0.8 },
  { uuid: crypto.randomUUID(), actor_id: "NorthStar Logistics", key: keyNorthStar.privateKey, pub: pubNorthStar, ev_id: "EVT-COFFEE-003", act: "TRANSPORT", ts: t3, e: 310.0, f: 1.1 },
  // Tamper simulation to trigger the INVALID IntegrityStatus constraint in the Go/Wasm verification flow
  { uuid: crypto.randomUUID(), actor_id: "Veridian Processing Node", key: keyVeridian.privateKey, pub: pubVeridian, ev_id: "EVT-COFFEE-004", act: "TRANSFORM", ts: t4, e: 200.0, f: 0.5, tamper: true },
  // Simulate an UNAUTHORIZED actor error (G07 Check Failure) by using a key not present in the TrustedActor registry
  { uuid: crypto.randomUUID(), actor_id: "Unknown Logistics", key: keyRogue.privateKey, pub: pubRogue, ev_id: "EVT-COFFEE-005", act: "TRANSPORT", ts: t5, e: 150.0, f: 1.5, override: "UNAUTHORIZED" },
  { uuid: crypto.randomUUID(), actor_id: "Eco Trace Demo Auditor", key: keyAuditor.privateKey, pub: pubAuditor, ev_id: "EVT-COFFEE-006", act: "AUDIT", ts: t6, e: 0.0, f: 0.0 }
];

let sql = "DELETE FROM events;\nDELETE FROM users;\nDELETE FROM trusted_actors;\nDELETE FROM assets;\n";

sql += `INSERT INTO users (id, username, password_hash, role) VALUES ('${crypto.randomUUID()}', 'admin', 'admin2026', 'ADMIN');\n`;
sql += `INSERT INTO users (id, username, password_hash, role) VALUES ('${crypto.randomUUID()}', 'auditor', 'demo2026', 'AUDITOR');\n`;
sql += `INSERT INTO users (id, username, password_hash, role) VALUES ('${crypto.randomUUID()}', 'viewer', 'viewer2026', 'VIEWER');\n`;

sql += `INSERT INTO trusted_actors (id, name, public_key, status) VALUES ('actor-1', 'Andes Organic Cooperative', '${pubAndes}', 'ACTIVE');\n`;
sql += `INSERT INTO trusted_actors (id, name, public_key, status) VALUES ('actor-2', 'Veridian Processing Node', '${pubVeridian}', 'ACTIVE');\n`;
sql += `INSERT INTO trusted_actors (id, name, public_key, status) VALUES ('actor-3', 'NorthStar Logistics', '${pubNorthStar}', 'ACTIVE');\n`;
sql += `INSERT INTO trusted_actors (id, name, public_key, status) VALUES ('actor-4', 'Eco Trace Demo Auditor', '${pubAuditor}', 'ACTIVE');\n`;

sql += `INSERT INTO assets (id, name, description, owner_id) VALUES ('${ASSET_ID}', 'Andes Trace Coffee Lot 001', 'Verified Product Journey', 'actor-1');\n`;

for (const e of mockEvents) {
  let signature = signPayload(e.ev_id, ASSET_ID, e.actor_id, e.ts, e.act, e.e, e.f, e.key);
  
  let status = e.override || "VALID";
  if (e.tamper) {
    signature = signature.substring(0, 4) === 'ffff' ? 'aaaa' + signature.substring(4) : 'ffff' + signature.substring(4);
    status = "INVALID";
  }
  
  sql += `INSERT INTO events (id, event_id, asset_id, actor_id, timestamp, action_type, energy_kwh, emission_factor, signature, public_key, integrity_status) VALUES ('${e.uuid}', '${e.ev_id}', '${ASSET_ID}', '${e.actor_id}', '${e.ts}', '${e.act}', ${e.e}, ${e.f}, '${signature}', '${e.pub}', '${status}');\n`;
}

const sqlTarget = resolveInside(adminRoot, 'seed.sql');

try {
  fs.writeFileSync(sqlTarget, sql);
  console.log(`[+] Seed SQL generated identically at ${sqlTarget}`);
} catch (err) {
  console.error(`[!] Failed to write seed.sql at ${sqlTarget}.`, err);
  process.exit(1);
}
