-- Schema for SupplyChainEvent
-- Fields map to DATA_DICTIONARY.md

DROP TABLE IF EXISTS events;
CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY, -- UUID
    event_id TEXT NOT NULL, -- DATA_DICTIONARY.md: lines 9-12 (event_id)
    asset_id TEXT NOT NULL, -- DATA_DICTIONARY.md: lines 13-16
    actor_id TEXT NOT NULL, -- DATA_DICTIONARY.md: lines 17-20
    timestamp DATETIME NOT NULL, -- ISO8601, DATA_DICTIONARY.md: lines 21-24
    action_type TEXT NOT NULL CHECK (action_type IN ('ORIGIN', 'TRANSFORM', 'TRANSPORT', 'AUDIT')), -- Enum Options, DATA_DICTIONARY.md: lines 25-28
    energy_kwh REAL NOT NULL CHECK (energy_kwh >= 0), -- Float (kWh), DATA_DICTIONARY.md: lines 32-36
    emission_factor REAL NOT NULL CHECK (emission_factor >= 0), -- Float (kgCO2e/kWh), DATA_DICTIONARY.md: lines 37-41
    signature TEXT NOT NULL, -- Cryptographic identity
    public_key TEXT NOT NULL, -- Ed25519 public key hex
    integrity_status TEXT NOT NULL CHECK (integrity_status IN ('VALID', 'WARNING', 'INVALID', 'UNAUTHORIZED')) -- Enum Options, DATA_DICTIONARY.md: lines 46-52
);

-- Index exactly the fields required for the formula: CF_total = sum(E_i * EF_i)
-- Allows high-speed auditing by isolating these fields in an index.
CREATE INDEX idx_events_audit_factors ON events(energy_kwh, emission_factor);

-- Schema for RBAC Users
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY, -- UUID
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('ADMIN', 'AUDITOR', 'VIEWER'))
);

-- Schema for Auth Audit Logs (G10)
DROP TABLE IF EXISTS audit_logs;
CREATE TABLE IF NOT EXISTS audit_logs (
    id TEXT PRIMARY KEY, -- UUID
    actor_id TEXT NOT NULL,
    action TEXT NOT NULL CHECK (action IN ('LOGIN', 'LOGOUT', 'ESCALATE', 'CREATE_ACTOR', 'REGISTER_ASSET')),
    timestamp DATETIME NOT NULL,
    details TEXT NOT NULL
);

-- Schema for Trusted Actors (G07 Registry)
DROP TABLE IF EXISTS trusted_actors;
CREATE TABLE IF NOT EXISTS trusted_actors (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    public_key TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL CHECK (status IN ('ACTIVE', 'REVOKED')),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS assets;
CREATE TABLE IF NOT EXISTS assets (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    owner_id TEXT NOT NULL REFERENCES trusted_actors(id),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

