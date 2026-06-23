#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUT_ADMIN="${SCRIPT_DIR}/../../apps/admin/public"
OUT_CONSUMER="${SCRIPT_DIR}/../../apps/consumer/public"

mkdir -p "${OUT_ADMIN}"
mkdir -p "${OUT_CONSUMER}"

echo "Compiling engine.wasm..."
GOOS=js GOARCH=wasm go build -o "${OUT_ADMIN}/engine.wasm" "${SCRIPT_DIR}/main.go"
cp "${OUT_ADMIN}/engine.wasm" "${OUT_CONSUMER}/engine.wasm"

echo "Build complete."
ls -lh "${OUT_ADMIN}/engine.wasm"
ls -lh "${OUT_CONSUMER}/engine.wasm"
