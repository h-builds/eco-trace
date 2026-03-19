#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUT_DIR="${SCRIPT_DIR}/../../public"

mkdir -p "${OUT_DIR}"

echo "Compiling engine.wasm..."
GOOS=js GOARCH=wasm go build -o "${OUT_DIR}/engine.wasm" "${SCRIPT_DIR}/main.go"

echo "Copying wasm_exec.js..."
cp "$(go env GOROOT)/lib/wasm/wasm_exec.js" "${OUT_DIR}/wasm_exec.js"

echo "Build complete: ${OUT_DIR}/engine.wasm"
ls -lh "${OUT_DIR}/engine.wasm"
