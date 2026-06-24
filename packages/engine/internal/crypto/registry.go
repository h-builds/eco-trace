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

	pubAndes := mustDecodeHex("1a5830a8fdbc051af2b6421cf56e02a0efc1e262917a49d803fc9ce0fd60b1fd")
	pubVeridian := mustDecodeHex("58e612474b5bc04614fa2ea505e85c5809b4623b32e53297536393838acaf1df")
	pubNorthStar := mustDecodeHex("7b27ec9f1b4165a8224f211518ab76c84af077dd99e456999042ab1913e12565")
	pubAuditor := mustDecodeHex("ce5a2f4bd68a64e16979fcb363fef8065bc1bf6cd957abc0993d1f1e4848871b")

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
