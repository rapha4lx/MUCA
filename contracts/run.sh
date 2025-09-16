#!/bin/bash

# Builda a imagem Docker usando o Dockerfile
docker build -t stellar-arch-builder .

# Executa o container, monta a pasta atual e compila o projeto
docker run -it --rm \
  -v $(pwd):/app \
  -v cargo-cache:/usr/local/cargo/registry \
  stellar-arch-builder \
  cargo build --release
