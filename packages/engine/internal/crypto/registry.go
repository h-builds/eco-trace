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

	pubA, _ := hex.DecodeString("de75874742689ddf867ee932b2e19814d3ae6c62ca0e650e54d604c46b1b3cb4")
	pubB, _ := hex.DecodeString("b4ba45c65b368d6ed4b1112f66e39b99a5ebfd79d1108b09dd161982603cf69d")

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
