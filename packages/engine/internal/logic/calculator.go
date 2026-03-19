package logic

import (
	"fmt"
	"math"

	"github.com/eco-trace/engine/internal/types"
)

const roundingPrecision = 1e9

// CalculateCarbonFootprint computes CF_total = Σ(E_i × EF_i).
// Returns a validation error if any ESGMetadata entry has negative values.
func CalculateCarbonFootprint(entries []types.ESGMetadata) (float64, error) {
	var total float64
	for i, e := range entries {
		if err := e.Validate(); err != nil {
			return 0, fmt.Errorf("entry %d: %w", i, err)
		}
		total += e.EnergyKWh * e.EmissionFactor
	}
	return roundFloat(total), nil
}

// roundFloat eliminates IEEE 754 floating-point noise by rounding to 9 significant decimal places.
func roundFloat(val float64) float64 {
	return math.Round(val*roundingPrecision) / roundingPrecision
}
