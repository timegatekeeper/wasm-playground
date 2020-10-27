#!/bin/bash

# get rustup, the toolchain installer here: https://www.rust-lang.org/learn/get-started
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

#ensure it's up to date, and add webassembly as a target
rustup update
rustup target add wasm32-unknown-unknown