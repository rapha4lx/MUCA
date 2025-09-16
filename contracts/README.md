**VAMOS LÁ!** Passo a passo **LINHA POR LINHA** para deploy de teste:

### 🚀 **1. PRIMEIRO, GERA UMA CHAVE PARA TESTE**
```bash
# Cria uma identidade para testes
soroban config identity generate teste-vaquinha
```

### 📝 **2. ANOTA SUA CHAVE PÚBLICA**
```bash
# Mostra o endereço público da sua chave
soroban config identity address teste-vaquinha
```
**→ ANOTA ESSE ENDEREÇO!** (ex: `GABCD123...`)

### 💰 **3. PEGA XLM DE GRAÇA NA TESTNET**
```bash
# Substitui pelo SEU endereço público anotado acima
curl "https://friendbot.stellar.org/?addr=SEU_ENDERECO_PUBLICO_AQUI"
```
**→ Deve retornar `{"success": true}`**

### 🏗️ **4. COMPILA O CONTRATO NOVAMENTE**
```bash
# Na pasta do seu projeto
soroban contract build
```

### 📦 **5. FAZ O DEPLOY DO CONTRATO**
```bash
soroban contract deploy \
    --wasm target/wasm32-unknown-unknown/release/contrato_hackathon.wasm \
    --source teste-vaquinha \       # Usa a chave que criamos
    --network testnet
```
**→ ANOTA O ID DO CONTRATO que aparecer!** (ex: `CABCD123...`)

### 🧪 **6. TESTA O CONTRATO**
```bash
# Chama a função de inicialização (substitui pelos seus valores)
soroban contract invoke \
    --id ID_DO_CONTRATO_ANOTADO \   # Cola o ID do contrato aqui
    --network testnet \
    -- initialize_campaign \
    --creator SEU_ENDERECO_PUBLICO \      # Mesmo endereço de acima
    --target_amount 1000000000 \    # 1000 XLM em stroops (1 XLM = 1.000.000 stroops)
    --deadline 1735689600 \         # 1º de Janeiro de 2025 (timestamp Unix)
    --campaign_type educacao \      # Tipo da vaquinha
    --beneficiary SEU_ENDERECO_PUBLICO  # Quem recebe (pode ser o mesmo)
```

### ✅ **7. VERIFICA SE FUNCIONOU**
```bash
# Consulta o status da vaquinha
soroban contract invoke \
    --id ID_DO_CONTRATO \
    --network testnet \
    -- get_campaign_status
```

---

### 🎯 **COMANDÃO ÚNICO (copia e cola substituindo os valores):**

```bash
# Gera chave
soroban config identity generate teste-vaquinha

# Pega endereço público
ENDERECO=$(soroban config identity address teste-vaquinha)
echo "Seu endereço: $ENDERECO"

# Pega XLM grátis
curl "https://friendbot.stellar.org/?addr=$ENDERECO"

# Compila
soroban contract build

# Deploy e pega ID do contrato
CONTRATO_ID=$(soroban contract deploy --wasm target/wasm32-unknown-unknown/release/contrato_hackathon.wasm --source teste-vaquinha --network testnet)
echo "ID do Contrato: $CONTRATO_ID"

# Inicializa vaquinha
soroban contract invoke --id $CONTRATO_ID --network testnet -- initialize_campaign --creator $ENDERECO --target_amount 1000000000 --deadline 1735689600 --campaign_type educacao --beneficiary $ENDERECO
```

---

### ⚠️ **OBSERVAÇÕES IMPORTANTES:**

1.  **TESTNET**: Todos os valores são fictícios (não use dinheiro real)
2.  **STROOPS**: 1 XLM = 1.000.000 stroops (use 6 zeros)
3.  **TIMESTAMP**: Use https://www.unixtimestamp.com/ para converter datas
4.  **ANOTE OS IDs**: Contrato e Endereço são importantes

---

**AGORA EXECUTA!** Esse é o fluxo completo de deploy de teste. 🚀

Precisa de ajuda em alguma etapa específica? 🦀⚡
