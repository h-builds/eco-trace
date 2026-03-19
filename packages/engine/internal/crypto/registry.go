package crypto

import (
	"bytes"
	"crypto/ed25519"
	"sync"
)

// trustedRegistry maps ActorIDs (e.g., business identities) to their authorized public keys.
// Shielded under Go internal package scope per Zero-Slop rules.
var (
	trustedRegistry = make(map[string][]byte)
	registryMutex   sync.RWMutex
)

// RegisterActor securely links an ActorID to an Ed25519 PublicKey.
func RegisterActor(actorID string, pubKey ed25519.PublicKey) {
	registryMutex.Lock()
	defer registryMutex.Unlock()
	// Create a copy to prevent mutation
	keyCopy := make([]byte, len(pubKey))
	copy(keyCopy, pubKey)
	trustedRegistry[actorID] = keyCopy
}

// IsAuthorizedActor checks if the provided public key cryptographically matches the identity registered to the ActorID.
func IsAuthorizedActor(actorID string, pubKey ed25519.PublicKey) bool {
	registryMutex.RLock()
	defer registryMutex.RUnlock()
	storedKey, exists := trustedRegistry[actorID]
	if !exists {
		return false
	}
	return bytes.Equal(storedKey, pubKey)
}
