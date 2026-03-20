import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getRawPublicKey(keyPair: crypto.KeyPairKeyObjectResult): string {
  return keyPair.publicKey.export({ type: 'spki', format: 'der' }).subarray(12).toString('hex');
}
const keyA = crypto.generateKeyPairSync('ed25519');
const pubA = getRawPublicKey(keyA);

const keyB = crypto.generateKeyPairSync('ed25519');
const pubB = getRawPublicKey(keyB);
const keyD = crypto.generateKeyPairSync('ed25519');

console.log(`[+] Generated Ed25519 Pair - Supplier A \t(${pubA.slice(0, 16)}...)`);
console.log(`[+] Generated Ed25519 Pair - Factory B \t(${pubB.slice(0, 16)}...)`);

const registryPath = path.resolve(__dirname, '../../../packages/engine/internal/crypto/registry.go');
let registryGo = fs.readFileSync(registryPath, 'utf-8');

registryGo = registryGo.replace(/pubA, _ := hex\.DecodeString\("[a-f0-9]+"\)/, `pubA, _ := hex.DecodeString("${pubA}")`);
registryGo = registryGo.replace(/pubB, _ := hex\.DecodeString\("[a-f0-9]+"\)/, `pubB, _ := hex.DecodeString("${pubB}")`);

fs.writeFileSync(registryPath, registryGo);
console.log(`[+] Updated Go Registry: ${registryPath}`);

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

const mockEvents = [
  { uuid: crypto.randomUUID(), actor_id: "Supplier A", key: keyA.privateKey, pub: pubA, ev_id: "EVT-001", act: "ORIGIN", e: 100.5, f: 0.8 },
  { uuid: crypto.randomUUID(), actor_id: "Supplier A", key: keyA.privateKey, pub: pubA, ev_id: "EVT-002", act: "TRANSFORM", e: 200.0, f: 0.9 },
  { uuid: crypto.randomUUID(), actor_id: "Factory B", key: keyB.privateKey, pub: pubB, ev_id: "EVT-003", act: "TRANSFORM", e: 500.2, f: 0.5 },
  { uuid: crypto.randomUUID(), actor_id: "Factory B", key: keyB.privateKey, pub: pubB, ev_id: "EVT-004", act: "AUDIT", e: 150.0, f: 0.5 },
  { uuid: crypto.randomUUID(), actor_id: "Logistics D", key: keyD.privateKey, pub: getRawPublicKey(keyD), ev_id: "EVT-005", act: "TRANSPORT", e: 50.0, f: 1.2, override: "UNAUTHORIZED" },
];

let sql = "DELETE FROM events;\n";

for (const e of mockEvents) {
  const ts = new Date().toISOString();
  const signature = signPayload(e.ev_id, "ASSET-999", e.actor_id, ts, e.act, e.e, e.f, e.key);
  const status = e.override || "VALID";
  
  sql += `INSERT INTO events (id, event_id, asset_id, actor_id, timestamp, action_type, energy_kwh, emission_factor, signature, public_key, integrity_status) VALUES ('${e.uuid}', '${e.ev_id}', 'ASSET-999', '${e.actor_id}', '${ts}', '${e.act}', ${e.e}, ${e.f}, '${signature}', '${e.pub}', '${status}');\n`;
}

const sqlTarget = path.resolve(__dirname, '../seed.sql');
fs.writeFileSync(sqlTarget, sql);
console.log(`[+] Seed SQL generated identically at ${sqlTarget}`);
