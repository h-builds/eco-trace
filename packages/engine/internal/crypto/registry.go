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

	pubA, _ := hex.DecodeString("6706a403489a767a61d425b8260f1f4882fb92033f52ef95bb4f6532f0f02fe5")
	pubB, _ := hex.DecodeString("8349b187e836917b1ea11c59af28572f4f56823a6911c2b6618529d3fab4683c")

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
