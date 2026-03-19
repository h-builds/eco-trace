const WASM_PATH = "/engine.wasm";
const GLUE_PATH = "/wasm_exec.js";

let initPromise: Promise<void> | null = null;

async function loadGlueScript(): Promise<void> {
  if (typeof globalThis.Go !== "undefined") return;

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `${GLUE_PATH}?v=${Date.now()}`;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error(`Failed to load ${GLUE_PATH}`));
    document.head.appendChild(script);
  });
}

async function initWasm(): Promise<void> {
  await loadGlueScript();

  // Register the readiness callback BEFORE go.run() so Go can invoke it
  // synchronously at the end of main().
  const readyPromise = new Promise<void>((resolve) => {
    (globalThis as any).__ecotraceOnReady = () => resolve();
  });

  const go = new globalThis.Go();
  const result = await WebAssembly.instantiateStreaming(
    fetch(`${WASM_PATH}?v=${Date.now()}`),
    go.importObject
  );
  // Non-blocking: Go's main() blocks on `select {}`, so we don't await run().
  go.run(result.instance);

  await readyPromise;
}

// Singleton — guarantees engine.wasm is loaded and registry is ready exactly once.
export function getWasmInit(): Promise<void> {
  if (!initPromise) {
    initPromise = initWasm();
  }
  return initPromise;
}
