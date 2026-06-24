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

	pubAndes := mustDecodeHex("6310116abaa654671e8c25c18f08233c3dd7441c06db5eb72d8a6b68aeed0779")
	pubVeridian := mustDecodeHex("f42fac1003c9b31031fa180699c874f8a661a030a6946e24c78f04c410b8ebb4")
	pubNorthStar := mustDecodeHex("9c1a617cc256521fe31e329d7431ca10edd9388470d6b019a068bee16c3c9d16")
	pubAuditor := mustDecodeHex("d46aa9ed56224b7430233dfd4bf26d6cb909d5691026a2c3b7ed46d76b9620b7")

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
