package crypto

import (
	"encoding/hex"
	"testing"

	"github.com/eco-trace/engine/internal/types"
)

func TestSignAndVerifyEvent(t *testing.T) {
	// G01: Correct signature generation
	pub, priv, err := GenerateKeyPair()
	if err != nil {
		t.Fatalf("GenerateKeyPair failed: %v", err)
	}

	event := types.SupplyChainEvent{
		EventID:   "123e4567-e89b-12d3-a456-426614174000",
		AssetID:   "asset-123",
		ActorID:   hex.EncodeToString(pub),
		Timestamp: "2026-03-19T00:00:00Z",
		Action:    types.ActionOrigin,
		ESG: types.ESGMetadata{
			EnergyKWh:      150.5,
			EmissionFactor: 0.45,
		},
	}

	sig, err := SignEvent(event, priv)
	if err != nil {
		t.Fatalf("SignEvent failed: %v", err)
	}

	// Verify valid signature
	if !VerifyEvent(event, sig, pub) {
		t.Error("VerifyEvent failed for valid signature")
	}

	// Verify hex wrapper
	sigHex := hex.EncodeToString(sig)
	pubHex := hex.EncodeToString(pub)
	if !VerifyEventHex(event, sigHex, pubHex) {
		t.Error("VerifyEventHex failed for valid hex strings")
	}
}

func TestTamperDetection(t *testing.T) {
	// G02: Detection of tampered payloads
	pub, priv, _ := GenerateKeyPair()

	event := types.SupplyChainEvent{
		EventID:   "123e4567-e89b-12d3-a456-426614174000",
		AssetID:   "asset-123",
		ActorID:   hex.EncodeToString(pub),
		Timestamp: "2026-03-19T00:00:00Z",
		Action:    types.ActionOrigin,
		ESG: types.ESGMetadata{
			EnergyKWh:      150.5,
			EmissionFactor: 0.45,
		},
	}

	sig, _ := SignEvent(event, priv)

	// Tamper with EnergyKWh
	tamperedEvent := event
	tamperedEvent.ESG.EnergyKWh = 999.9

	if VerifyEvent(tamperedEvent, sig, pub) {
		t.Error("VerifyEvent incorrectly validated tampered event payload (EnergyKWh changed)")
	}

	// Tamper with ActorID
	tamperedEvent2 := event
	tamperedEvent2.ActorID = "malicious-actor"

	if VerifyEvent(tamperedEvent2, sig, pub) {
		t.Error("VerifyEvent incorrectly validated tampered event payload (ActorID changed)")
	}
}
