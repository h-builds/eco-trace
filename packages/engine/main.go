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

var isReady bool

func main() {
	// Deterministic init order: registry MUST be live before any JS function is exposed.
	crypto.InitializeRegistry()

	js.Global().Set("getEngineVersion", js.FuncOf(getEngineVersion))
	js.Global().Set("calculateFootprint", js.FuncOf(jsCalculateFootprint))
	js.Global().Set("verifyIntegrity", js.FuncOf(jsVerifyIntegrity))
	js.Global().Set("generateUntrustedSignature", js.FuncOf(jsGenerateUntrustedSignature))

	isReady = true
	fmt.Println("Eco-Trace Engine Initialized (Wasm)")

	cb := js.Global().Get("__ecotraceOnReady")
	if cb.Type() == js.TypeFunction {
		cb.Invoke()
	}

	select {}
}

func getEngineVersion(this js.Value, args []js.Value) interface{} {
	return "1.0.0"
}

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

func jsVerifyIntegrity(this js.Value, args []js.Value) interface{} {
	if !isReady {
		return errorStatusResponse("PENDING", "Engine registry initializing — retry shortly")
	}

	if len(args) < 3 || args[0].Type() != js.TypeObject || args[1].Type() != js.TypeString || args[2].Type() != js.TypeString {
		return errorStatusResponse("INVALID", "arguments must be: event payload object, signature hex string, public key hex string")
	}

	jsObj := args[0]
	sigHex := args[1].String()
	pubKeyHex := args[2].String()

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
		// DEBUG: Let's dump the struct to see what we actually verified
		return errorStatusResponse("INVALID", fmt.Sprintf("crypto failed for event: %+v", event))
	}

	pub, err := hex.DecodeString(pubKeyHex)
	if err != nil {
		return errorStatusResponse("INVALID", "invalid public key hex")
	}

	if !crypto.IsAuthorized(event.ActorID, pub) {
		return errorStatusResponse("UNAUTHORIZED", "Data signature is mathematically valid, but the Actor's Public Key is not found in the Trusted Actor Registry (G07 Check Failure).")
	}

	return map[string]interface{}{
		"status": "VALID",
		"error":  js.Null(),
	}
}

func errorStatusResponse(status string, msg string) map[string]interface{} {
	return map[string]interface{}{
		"status": status,
		"error":  msg,
	}
}

func jsGenerateUntrustedSignature(this js.Value, args []js.Value) interface{} {
	if !isReady {
		return errorStatusResponse("PENDING", "Engine registry initializing")
	}

	if len(args) < 1 || args[0].Type() != js.TypeObject {
		return errorStatusResponse("INVALID", "argument must be event payload object")
	}

	jsObj := args[0]
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

	pub, priv, err := crypto.GenerateKeyPair()
	if err != nil {
		return errorStatusResponse("INVALID", "failed to generate mock keys")
	}

	sigBytes, err := crypto.SignEvent(event, priv)
	if err != nil {
		return errorStatusResponse("INVALID", "failed to sign mock payload")
	}

	return map[string]interface{}{
		"status":    "VALID",
		"error":     js.Null(),
		"signature": hex.EncodeToString(sigBytes),
		"publicKey": hex.EncodeToString(pub),
	}
}
