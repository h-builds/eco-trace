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

func TestUnauthorizedActor(t *testing.T) {
	// G07: Verify Actor logic ensures unauthorized but mathematically correct signatures fail identity checks.
	trustedPub, _, _ := GenerateKeyPair()
	evilPub, evilPriv, _ := GenerateKeyPair()

	actorID := "Trusted Supplier A"
	RegisterActor(actorID, trustedPub)

	// Malicious actor signs a payload claiming to be "Trusted Supplier A"
	event := types.SupplyChainEvent{
		EventID:   "123e4567-e89b-12d3-a456-426614174000",
		AssetID:   "asset-123",
		ActorID:   actorID, // Impersonating the trustworthy actor
		Timestamp: "2026-03-19T00:00:00Z",
		Action:    types.ActionOrigin,
		ESG: types.ESGMetadata{
			EnergyKWh:      200.0,
			EmissionFactor: 0.5,
		},
	}

	// Mathematically valid signature from the Evil actor
	sig, _ := SignEvent(event, evilPriv)

	// Step 1: Signature passes mathematics
	if !VerifyEvent(event, sig, evilPub) {
		t.Fatal("Expected malicious signature to be mathematically valid for their own key")
	}

	// Step 2: Identity mapping fails
	if IsAuthorizedActor(event.ActorID, evilPub) {
		t.Error("Expected IsAuthorizedActor to reject the evil public key for the impersonated ActorID")
	}
}
