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

	pubA, _ := hex.DecodeString("e8b5c03f53a9b4cdf2cb6cf29d695ee8eb70c5610f0656f1d7645cc816f14a9d")
	pubB, _ := hex.DecodeString("bf9cd6252551d1697007b83e34cf438aa70aec9bb1ba58af25cc1d05317d4b9b")

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
