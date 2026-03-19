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

	pubA, _ := hex.DecodeString("67ba633ae4996577363c1ff63209308a748f1a386d23989c2a80804f8766d485")
	pubB, _ := hex.DecodeString("6323e759f5a527dfc3bbfa4ac2890cace776f05fc04055a83a89641458e2999c")

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
