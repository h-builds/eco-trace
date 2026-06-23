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

// Why: explicit call from main() guarantees deterministic ordering before isReady is set.
func InitializeRegistry() {
	registryMutex.Lock()
	defer registryMutex.Unlock()

	pubA, _ := hex.DecodeString("858eccd1690a64cd7c9c2ed8d2612a786dac3fca2eeea90f2a097cc213be48c0")
	pubB, _ := hex.DecodeString("de485d357f87e6591b8a00bd09dad90995573c2e6ffc8c2a9bbefa642c1715ae")

	TrustedActors["Supplier A"] = pubA
	TrustedActors["Factory B"] = pubB
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
