// Package crypto provides Ed25519 signing and verification for SupplyChainEvent integrity.
// Implementation is reserved for EVALS G01/G02.
package crypto

import (
	"crypto/ed25519"
	"encoding/hex"
	"encoding/json"
	"fmt"

	"github.com/eco-trace/engine/internal/types"
)

// canonicalEvent is a deterministic, Signature-less snapshot for serialization.
type canonicalEvent struct {
	EventID   string            `json:"event_id"`
	AssetID   string            `json:"asset_id"`
	ActorID   string            `json:"actor_id"`
	Timestamp string            `json:"timestamp"`
	Action    types.ActionType  `json:"action_type"`
	ESG       types.ESGMetadata `json:"esg_metadata"`
}

func serializeEvent(e types.SupplyChainEvent) ([]byte, error) {
	ce := canonicalEvent{
		EventID:   e.EventID,
		AssetID:   e.AssetID,
		ActorID:   e.ActorID,
		Timestamp: e.Timestamp,
		Action:    e.Action,
		ESG:       e.ESG,
	}
	// json.Marshal guarantees stable field ordering matching the struct definition
	// for simple standard types in Go, avoiding hash mismatch.
	return json.Marshal(ce)
}

func GenerateKeyPair() (ed25519.PublicKey, ed25519.PrivateKey, error) {
	pub, priv, err := ed25519.GenerateKey(nil)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to generate ed25519 keys: %w", err)
	}
	return pub, priv, nil
}

func SignEvent(event types.SupplyChainEvent, privKey ed25519.PrivateKey) ([]byte, error) {
	data, err := serializeEvent(event)
	if err != nil {
		return nil, fmt.Errorf("failed to serialize event for signing: %w", err)
	}
	return ed25519.Sign(privKey, data), nil
}

func VerifyEvent(event types.SupplyChainEvent, signature []byte, pubKey ed25519.PublicKey) bool {
	data, err := serializeEvent(event)
	if err != nil {
		return false
	}
	return ed25519.Verify(pubKey, data, signature)
}

func VerifyEventHex(event types.SupplyChainEvent, sigHex string, pubKeyHex string) bool {
	sig, err := hex.DecodeString(sigHex)
	if err != nil {
		return false
	}
	pub, err := hex.DecodeString(pubKeyHex)
	if err != nil {
		return false
	}
	return VerifyEvent(event, sig, pub)
}
