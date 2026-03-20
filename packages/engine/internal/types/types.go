package types

import (
	"errors"
	"fmt"
)

// ActionType categorizes supply chain operations.
type ActionType string

const (
	ActionOrigin    ActionType = "ORIGIN"
	ActionTransform ActionType = "TRANSFORM"
	ActionTransport ActionType = "TRANSPORT"
	ActionAudit     ActionType = "AUDIT"
)

// IntegrityStatus represents the cryptographic and logical verification state.
type IntegrityStatus string

const (
	IntegrityValid   IntegrityStatus = "VALID"
	IntegrityWarning IntegrityStatus = "WARNING"
	IntegrityInvalid IntegrityStatus = "INVALID"
)

// ConfidenceScore quantifies data reliability (range: 0.0–1.0).
type ConfidenceScore float64

// ESGMetadata holds energy and emission data for a supply chain action.
type ESGMetadata struct {
	// EnergyKWh is the energy consumed during the action (unit: kWh, constraint: >= 0).
	EnergyKWh float64 `json:"energy_kwh"`
	// EmissionFactor is the emission intensity for the energy source (unit: kgCO₂e/kWh, constraint: >= 0).
	EmissionFactor float64 `json:"emission_factor"`
}

// Validate enforces MIN_0 constraints on ESGMetadata fields.
func (m ESGMetadata) Validate() error {
	if m.EnergyKWh < 0 {
		return fmt.Errorf("energy_kwh must be non-negative, got %f", m.EnergyKWh)
	}
	if m.EmissionFactor < 0 {
		return fmt.Errorf("emission_factor must be non-negative, got %f", m.EmissionFactor)
	}
	return nil
}

// SupplyChainEvent is the core entity for ESG traceability.
type SupplyChainEvent struct {
	// EventID is the UUID primary key for this event.
	EventID   string
	AssetID   string
	ActorID   string
	Timestamp string
	Action    ActionType
	ESG       ESGMetadata
	Signature string
}

// ValidateUUID checks that EventID is a non-empty, RFC 4122–shaped UUID.
func ValidateUUID(id string) error {
	if len(id) != 36 {
		return errors.New("event_id must be a 36-character UUID")
	}
	for i, c := range id {
		switch i {
		case 8, 13, 18, 23:
			if c != '-' {
				return fmt.Errorf("event_id: expected '-' at position %d", i)
			}
		default:
			if !((c >= '0' && c <= '9') || (c >= 'a' && c <= 'f') || (c >= 'A' && c <= 'F')) {
				return fmt.Errorf("event_id: invalid hex character at position %d", i)
			}
		}
	}
	return nil
}
