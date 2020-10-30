docker build -t wasm-builder:latest docker/
docker run -it --rm  -v $PWD:/wasm-playground -w /wasm-playground wasm-builder:latest bash