//go:build js && wasm

package main

import (
	"encoding/hex"
	"fmt"
	"syscall/js"

	"github.com/eco-trace/engine/internal/crypto"
	"github.com/eco-trace/engine/internal/logic"
	"github.com/eco-trace/engine/internal/types"
)

func main() {
	fmt.Println("Eco-Trace Engine Initialized (Wasm)")

	js.Global().Set("getEngineVersion", js.FuncOf(getEngineVersion))
	js.Global().Set("calculateFootprint", js.FuncOf(jsCalculateFootprint))
	js.Global().Set("verifyIntegrity", js.FuncOf(jsVerifyIntegrity))
	js.Global().Set("registerTrustedActor", js.FuncOf(jsRegisterTrustedActor))

	select {}
}

func getEngineVersion(this js.Value, args []js.Value) interface{} {
	return "1.0.0"
}

// jsCalculateFootprint bridges JS ↔ Go for deterministic CF_total calculation.
// Accepts: JS Array of objects with { energy_kwh: number, emission_factor: number }
// Returns: JS Object { result: number, error: string|null }
//
// Marshals JS values into types.ESGMetadata (types.go L31–L35),
// delegates to logic.CalculateCarbonFootprint (calculator.go L14),
// which enforces MIN_0 via ESGMetadata.Validate() (types.go L38–L47).
func jsCalculateFootprint(this js.Value, args []js.Value) interface{} {
	if len(args) < 1 || args[0].Type() != js.TypeObject {
		return errorResponse("argument must be a JS array of ESG entries")
	}

	jsArray := args[0]
	length := jsArray.Length()

	entries := make([]types.ESGMetadata, length)
	for i := 0; i < length; i++ {
		item := jsArray.Index(i)
		entries[i] = types.ESGMetadata{
			EnergyKWh:      item.Get("energy_kwh").Float(),
			EmissionFactor: item.Get("emission_factor").Float(),
		}
	}

	result, err := logic.CalculateCarbonFootprint(entries)
	if err != nil {
		return errorResponse(err.Error())
	}

	return successResponse(result)
}

func successResponse(result float64) map[string]interface{} {
	return map[string]interface{}{
		"result": result,
		"error":  js.Null(),
	}
}

func errorResponse(msg string) map[string]interface{} {
	return map[string]interface{}{
		"result": 0,
		"error":  msg,
	}
}

// jsVerifyIntegrity validates an event object signature against a public key.
// Accepts: JS Object (SupplyChainEvent), sigHex (string), pubKeyHex (string)
// Returns: JS Object { status: "VALID" | "INVALID", error: string|null }
func jsVerifyIntegrity(this js.Value, args []js.Value) interface{} {
	if len(args) < 3 || args[0].Type() != js.TypeObject || args[1].Type() != js.TypeString || args[2].Type() != js.TypeString {
		return errorStatusResponse("INVALID", "arguments must be: event payload object, signature hex string, public key hex string")
	}

	jsObj := args[0]
	sigHex := args[1].String()
	pubKeyHex := args[2].String()

	// Reconstruct the Go SupplyChainEvent from JS object
	esgObj := jsObj.Get("esg_metadata")
	if esgObj.Type() != js.TypeObject {
		return errorStatusResponse("INVALID", "esg_metadata object missing or invalid")
	}

	event := types.SupplyChainEvent{
		EventID:   jsObj.Get("event_id").String(),
		AssetID:   jsObj.Get("asset_id").String(),
		ActorID:   jsObj.Get("actor_id").String(),
		Timestamp: jsObj.Get("timestamp").String(),
		Action:    types.ActionType(jsObj.Get("action_type").String()),
		ESG: types.ESGMetadata{
			EnergyKWh:      esgObj.Get("energy_kwh").Float(),
			EmissionFactor: esgObj.Get("emission_factor").Float(),
		},
	}

	isValid := crypto.VerifyEventHex(event, sigHex, pubKeyHex)
	if !isValid {
		return errorStatusResponse("INVALID", "cryptographic signature verification failed")
	}

	pub, err := hex.DecodeString(pubKeyHex)
	if err != nil {
		return errorStatusResponse("INVALID", "invalid public key hex")
	}

	if !crypto.IsAuthorizedActor(event.ActorID, pub) {
		return errorStatusResponse("UNAUTHORIZED_ACTOR", "signature is mathematically valid but actor is unauthorized")
	}

	return map[string]interface{}{
		"status": "VALID",
		"error":  js.Null(),
	}
}

// jsRegisterTrustedActor seeds the authorized participant map for UI demonstration logic.
// Accepts: JS Strings (ActorID string, PublicKeyHex string)
func jsRegisterTrustedActor(this js.Value, args []js.Value) interface{} {
	if len(args) < 2 || args[0].Type() != js.TypeString || args[1].Type() != js.TypeString {
		return js.Null()
	}
	
	actorID := args[0].String()
	pubKeyHex := args[1].String()
	pub, err := hex.DecodeString(pubKeyHex)
	
	if err == nil {
		crypto.RegisterActor(actorID, pub)
	}
	
	return js.Null()
}

func errorStatusResponse(status string, msg string) map[string]interface{} {
	return map[string]interface{}{
		"status": status,
		"error":  msg,
	}
}
