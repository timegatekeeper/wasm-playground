# Web Assembly Playground

Repo for WebAssembly Workshop 04/11/20.


## Schedule

1. Introduction to wasm & slides
2. Compile your first wasm module and run it outside the browser.
3. Get creative: create a wasm Paint Bot.

## Setup

The first part of this workshop will be to demonstrate how to compile to wasm from different languages. For this, you'll need a number of tools (compilers for the different languages).

We've provided a docker container which has all of these tools pre-installed. For this, you will need to **install docker**. To build and run the container, run the script:
```
$ ./run_docker.sh
```

Alternatively, you can also install the tools localy yourself. You'll need:
* `node` (recent version > 13)
* `clang` and `llvm` for C & C++. You need a version that has wasm32 as a target. On mac, you can simply do `brew install llvm`, which will install both.
* Rust toolchain. See [rust example README](examples/rust/README.md)
* `asc`, the Assembly Script compiler. See [AssemblyScript example README](examples/assembly_script/README.md)
* `wat2wasm` and `wasm2wat` executables. Get release builds for your platform [here](https://github.com/WebAssembly/wabt/releases).
* python (you should already have it by default)


## Structure of the repo

This repo contains all the source code and code templates needed for tasks 2 and 3 in the schedule. 

### Compiling to wasm

In task 2, we'll be demonstrating how we can compile to wasm from a range of differnet languages: wat (WebAssembly text format), c, rust and assembly script. 

Under the `examples` folder, we are providing a small set of code examples from each of those languages. The README for each language explains the setup required and how to build to wasm.

### Runtimes

In the `runtimes` folder, we have implemented 2 examples of non-browser wasm runtimes.

One is using node, which uses the V8 engine as its backend. It simply loads the compiled module into a `WebAssembly` javascript object, much like the browser would do.

The second example is implemented in Rust. It pulls in `wasmtime` (a rust-based wasm runtime) as a library, which provides our rust project with the ability of loading wasm modules, passing it imports, and using its exports.

### Creative task

The creative task requires each participant to choose their preferred language and build a Paint Bot which can be compiled to wasm. All the compiled Paint Bots will then be loaded on a single client canvas to make one combined piece of art.

In the `src` folder, we have example bots for each for the languages. You can use those as inspiration when desigining your own Paint Bots.

See the creative task [README](./src/README.md)

**Designing your bot**
TODO: Create README in src folder which explains the game loop and the bot api 

**Local testing**

To faciitate rendering for the creative task, we will run the Paint Bots in the browser.

The runtime is implemented in `main.js`, which is loaded in the `index.html` page. You will not need to edit these files. Your sole responsibility is creating an awesome bot :) 

Once your bot is compile, the wasm module will need to be hosted before it can be pulled into the runtime for testing. You can use the `serve.py` script provided to host your wasm-playground project on `localhost:8000`:

```
$ python serve.py
```

The `bots.json` file contains a list of bots to load into the canvas. You can simple put the name of your bot in there:

```json
[
    "path/to/myPaintBot.wasm"
]
```

and then open up a web page at `localhost:8000`.

You should see your bot paint on the canvas! 

Once you are confident that your bot works as expected and that your Bot can paint better than Picasso, put your compiled wasm bot in ... TODO, and open a PR.

Towards the end of the session, we'll demonstrate all the Bots painting on the same canvas together!