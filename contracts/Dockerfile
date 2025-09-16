#FROM docker.io/archlinux:base-devel

# INSTALA AS VERSÕES CORRETAS E ESTÁVEIS
#RUN pacman -Syu --noconfirm --needed \
#   rustup \
#  clang \  # 👈 Clang específico mais estável
#    openssl \
#    pkgconf \
#    && rustup default stable

#WORKDIR /app */

FROM docker.io/archlinux:base-devel

# Instala Rust via rustup (versão mais atual)
RUN pacman -Syu --noconfirm --needed \
    curl \
    clang \
    openssl \
    pkgconf \
    && curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

# INSTALA O SOROBAN E WASM DURANTE O BUILD
ENV PATH="/root/.cargo/bin:${PATH}"
RUN source /root/.cargo/env && \
    cargo install --locked soroban-cli && \
    rustup target add wasm32-unknown-unknown
ENV PATH="/root/.cargo/bin:${PATH}"

WORKDIR /app
