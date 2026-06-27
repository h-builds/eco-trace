package crypto

import (
	"bytes"
	"crypto/ed25519"
	"encoding/hex"
	"sync"
)

var (
	TrustedActors = make(map[string][]byte)
	registryMutex sync.RWMutex
)

func mustDecodeHex(s string) []byte {
	b, err := hex.DecodeString(s)
	if err != nil {
		panic("crypto: invalid hex string for trusted actor public key: " + err.Error())
	}
	return b
}

// Why: explicit call from main() guarantees deterministic ordering before isReady is set.
func InitializeRegistry() {
	registryMutex.Lock()
	defer registryMutex.Unlock()

	pubAndes := mustDecodeHex("eac2bfa828ea06f85736a43b4f0e108a9eb1d7f1cd971eef63ce32ca2d350668")
	pubVeridian := mustDecodeHex("a1bf01a054bc181c495ee8054eee8b1b103d30f64b7fa967d8ae8a54e1d2f26e")
	pubNorthStar := mustDecodeHex("29cdf1faae2448c6ef25c513f62d7a7904042bdba9edb8e19e356a5ec50b3534")
	pubAuditor := mustDecodeHex("877d5c8e40778f3487e051ebdfb80a2636280abaa7c077c4085ddb005df2016e")

	TrustedActors["Andes Organic Cooperative"] = pubAndes
	TrustedActors["Veridian Processing Node"] = pubVeridian
	TrustedActors["NorthStar Logistics"] = pubNorthStar
	TrustedActors["Eco Trace Demo Auditor"] = pubAuditor
}

func IsAuthorized(actorID string, pubKey ed25519.PublicKey) bool {
	registryMutex.RLock()
	defer registryMutex.RUnlock()
	storedKey, exists := TrustedActors[actorID]
	if !exists {
		return false
	}
	return bytes.Equal(storedKey, pubKey)
}

