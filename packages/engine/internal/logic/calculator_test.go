package logic

import (
	"math"
	"testing"

	"github.com/eco-trace/engine/internal/types"
)

func almostEqual(a, b, tolerance float64) bool {
	return math.Abs(a-b) < tolerance
}

// G03: CF_total accuracy for multiple energy inputs.
func TestCalculateCarbonFootprint_MultipleInputs(t *testing.T) {
	inputs := []types.ESGMetadata{
		{EnergyKWh: 100, EmissionFactor: 0.5},
		{EnergyKWh: 200, EmissionFactor: 0.3},
	}
	got, err := CalculateCarbonFootprint(inputs)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	want := 110.0 // 100*0.5 + 200*0.3
	if !almostEqual(got, want, 1e-9) {
		t.Errorf("got %f, want %f", got, want)
	}
}

// G03: Single input accuracy.
func TestCalculateCarbonFootprint_SingleInput(t *testing.T) {
	inputs := []types.ESGMetadata{
		{EnergyKWh: 50, EmissionFactor: 0.4},
	}
	got, err := CalculateCarbonFootprint(inputs)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	want := 20.0
	if !almostEqual(got, want, 1e-9) {
		t.Errorf("got %f, want %f", got, want)
	}
}

// G03: Empty input returns zero.
func TestCalculateCarbonFootprint_Empty(t *testing.T) {
	got, err := CalculateCarbonFootprint(nil)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if got != 0.0 {
		t.Errorf("got %f, want 0.0", got)
	}
}

// G03: Zero energy is valid.
func TestCalculateCarbonFootprint_ZeroEnergy(t *testing.T) {
	inputs := []types.ESGMetadata{
		{EnergyKWh: 0, EmissionFactor: 0.5},
	}
	got, err := CalculateCarbonFootprint(inputs)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if got != 0.0 {
		t.Errorf("got %f, want 0.0", got)
	}
}

// G04: Negative energy must be rejected.
func TestCalculateCarbonFootprint_NegativeEnergy(t *testing.T) {
	inputs := []types.ESGMetadata{
		{EnergyKWh: -10, EmissionFactor: 0.5},
	}
	_, err := CalculateCarbonFootprint(inputs)
	if err == nil {
		t.Fatal("expected error for negative energy_kwh, got nil")
	}
}

// G04: Negative emission factor must be rejected.
func TestCalculateCarbonFootprint_NegativeEmissionFactor(t *testing.T) {
	inputs := []types.ESGMetadata{
		{EnergyKWh: 100, EmissionFactor: -0.3},
	}
	_, err := CalculateCarbonFootprint(inputs)
	if err == nil {
		t.Fatal("expected error for negative emission_factor, got nil")
	}
}

// G03: Rounding eliminates float noise (e.g. 0.1+0.2 artifacts).
func TestCalculateCarbonFootprint_FloatPrecision(t *testing.T) {
	inputs := []types.ESGMetadata{
		{EnergyKWh: 0.1, EmissionFactor: 0.2},
		{EnergyKWh: 0.3, EmissionFactor: 0.1},
	}
	got, err := CalculateCarbonFootprint(inputs)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	want := 0.05 // 0.1*0.2 + 0.3*0.1 = 0.02 + 0.03
	if !almostEqual(got, want, 1e-9) {
		t.Errorf("got %.15f, want %.15f", got, want)
	}
}
