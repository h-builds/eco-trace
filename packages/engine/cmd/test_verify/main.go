package main

import (
	"fmt"
	"github.com/eco-trace/engine/internal/crypto"
	"github.com/eco-trace/engine/internal/types"
)

func main() {
	event := types.SupplyChainEvent{
		EventID:   "EVT-001",
		AssetID:   "ASSET-999",
		ActorID:   "Supplier A",
		Timestamp: "2026-03-19T22:48:53.834Z",
		Action:    "ORIGIN",
		ESG: types.ESGMetadata{
			EnergyKWh:      100.5,
			EmissionFactor: 0.8,
		},
	}
	
	// Values from D1
	pubKeyHex := "6f9c9405fd2e9f2efaa3b9271f10dae8a96f9acf4249a4ebe6c2ffd500496b4a"
	sigHex := "d2f4794dbe40ace6f05622a3bb515666f417fce6bc15847295a1d62cdf43283f04da75990d03c9f18e06f4e87536c88150956bbe34a07023c35cb75cce1b3a0f"
	
	isValid := crypto.VerifyEventHex(event, sigHex, pubKeyHex)
	fmt.Printf("Signature Valid: %v\n", isValid)
}
