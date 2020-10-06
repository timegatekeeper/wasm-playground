A playground for WebAssembly experiments.

Languages

- WebAssembly text format - to help explain imports and exports
- C/C++ using Clang
- Rust
- AssemblyScript

Runtimes

- Browser (using HTTP server)
- Node.js or Deno
- wasmtime
- wamr

Setup
https://surma.dev/things/c-to-webassembly/
brew install llvm

Serve

python serve.py

TO DO:

WASM Examples
- factorial - try to implement using recursion
- long running computation (primes)
- host call example - console.log
- host call example - draw a rectangle / different shapes on the canvas
- sharing memory example - sharing /passing strings (can reference types be used?)
- sharing memory example - images
- sharing memory example - HTTP Request 

