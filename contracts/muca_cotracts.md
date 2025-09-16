scripts hack meridian

# Gera e mostra a secret key
podman run -it --rm -v $(pwd):/app:Z stellar-builder /bin/bash -c "
source /root/.cargo/env
soroban config identity generate teste-vaquinha
soroban config identity show teste-vaquinha
"

# Depois usa a secret key que foi mostrada
podman run -it --rm -v $(pwd):/app:Z stellar-builder soroban contract deploy \
    --wasm target/wasm32-unknown-unknown/release/muca_contract.wasm \
    --source  GCFJXZMWN6GMWHMCTN3CTQ27AX4W2AQT3INMZYHPNGONPKRIVYCJZTJT \ 
    --network testnet
    
   Public Key GCFJXZMWN6GMWHMCTN3CTQ27AX4W2AQT3INMZYHPNGONPKRIVYCJZTJT
   secret key SBIOYGQAESWAQHOOFWPQMEREXKXGCFY4K6D5CAAJXSWLTF74E6ROJD4Q
   
   dados do contrato
   
   #
    curl "https://friendbot.stellar.org/?addr=GCFJXZMWN6GMWHMCTN3CTQ27AX4W2AQT3INMZYHPNGONPKRIVYCJZTJT"{
  "_links": {
    "self": {
      "href": "https://horizon-testnet.stellar.org/transactions/d7ce67fd66fb0a0827540eda41f38101995c7e9870b6261fb34bfe3b7691832b"
    },
    "account": {
      "href": "https://horizon-testnet.stellar.org/accounts/GAZWO5JUO43QYIZDADA6VXJ72O777IQSCXTRM77AHE6LKETAKJXAZT5D"
    },
    "ledger": {
      "href": "https://horizon-testnet.stellar.org/ledgers/562695"
    },
    "operations": {
      "href": "https://horizon-testnet.stellar.org/transactions/d7ce67fd66fb0a0827540eda41f38101995c7e9870b6261fb34bfe3b7691832b/operations{?cursor,limit,order}",
      "templated": true
    },
    "effects": {
      "href": "https://horizon-testnet.stellar.org/transactions/d7ce67fd66fb0a0827540eda41f38101995c7e9870b6261fb34bfe3b7691832b/effects{?cursor,limit,order}",
      "templated": true
    },
    "precedes": {
      "href": "https://horizon-testnet.stellar.org/transactions?order=asc\u0026cursor=2416756622626816"
    },
    "succeeds": {
      "href": "https://horizon-testnet.stellar.org/transactions?order=desc\u0026cursor=2416756622626816"
    },
    "transaction": {
      "href": "https://horizon-testnet.stellar.org/transactions/d7ce67fd66fb0a0827540eda41f38101995c7e9870b6261fb34bfe3b7691832b"
    }
  },
  "id": "d7ce67fd66fb0a0827540eda41f38101995c7e9870b6261fb34bfe3b7691832b",
  "paging_token": "2416756622626816",
  "successful": true,
  "hash": "d7ce67fd66fb0a0827540eda41f38101995c7e9870b6261fb34bfe3b7691832b",
  "ledger": 562695,
  "created_at": "2025-09-16T07:47:26Z",
  "source_account": "GAZWO5JUO43QYIZDADA6VXJ72O777IQSCXTRM77AHE6LKETAKJXAZT5D",
  "source_account_sequence": "1219770712176",
  "fee_account": "GAZWO5JUO43QYIZDADA6VXJ72O777IQSCXTRM77AHE6LKETAKJXAZT5D",
  "fee_charged": "100",
  "max_fee": "1000000",
  "operation_count": 1,
  "envelope_xdr": "AAAAAgAAAAAzZ3U0dzcMIyMAwerdP9O//6ISFecWf+A5PLUSYFJuDAAPQkAAAAEcAAAAcAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAABB90WssODNIgi6BHveqzxTRmIpvAFRyVNM+Hm2GVuCcAAAAAAAAAACKm+WWb4zLHYKbdinDXwX5bQIT2hrM4O9pnNeqKK4EnAAAABdIdugAAAAAAAAAAAJgUm4MAAAAQIirxsbO58bOiFfhXZFylsueAJIWwRp+vJHChWFYwljFg2qyGZNmpvAknGN1nqYUY6XIyFfKRAJR+YadYQ4FEQyGVuCcAAAAQL2Hc85YBD7x/URhpxe6c7TjVLju9alED/ehbm2j+YttSkp4xeDDzXbiSG1qh2JohOTPNugEib6ymnEgUPsnvAM=",
  "result_xdr": "AAAAAAAAAGQAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAA=",
  "fee_meta_xdr": "AAAAAgAAAAMACGmGAAAAAAAAAAAzZ3U0dzcMIyMAwerdP9O//6ISFecWf+A5PLUSYFJuDAAAAAA8MzUkAAABHAAAAG8AAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAADAAAAAAAIaYYAAAAAaMg3TwAAAAAAAAABAAiWBwAAAAAAAAAAM2d1NHc3DCMjAMHq3T/Tv/+iEhXnFn/gOTy1EmBSbgwAAAAAPDM0wAAAARwAAABvAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAwAAAAAACGmGAAAAAGjIN08AAAAA",
  "memo_type": "none",
  "signatures": [
    "iKvGxs7nxs6IV+FdkXKWy54AkhbBGn68kcKFYVjCWMWDarIZk2am8CScY3WephRjpcjIV8pEAlH5hp1hDgURDA==",
    "vYdzzlgEPvH9RGGnF7pztONUuO71qUQP96FubaP5i21KSnjF4MPNduJIbWqHYmiE5M826ASJvrKacSBQ+ye8Aw=="
  ],
  "preconditions": {
    "timebounds": {
      "min_time": "0"
    }
  }

  
#deploy template
podman run -it --rm -v $(pwd):/app:Z -v ~/.config/stellar/identity:/root/.config/stellar/identity:Z stellar-builder soroban contract deploy \
    --wasm target/wasm32-unknown-unknown/release/crowdfunding_template.wasm \
    --source muca_test \
    --network testnet
ℹ Simulating install transaction…
ℹ Signing transaction: b0e6435b95b997c929385b9b72cf8956115baf417ab802395768f5ed7ac3008e
🌎 Submitting install transaction…
ℹ Using wasm hash a159d146a042b51239358ae4cf6c9e519865b59e0c30e6ebab8dd4e27a264677
ℹ Simulating deploy transaction…
ℹ Transaction hash is c301f49ff5b0f519d4fc58f2b43dacfcba89c7295b67ddea5202c0e3e615469a
🔗 https://stellar.expert/explorer/testnet/tx/c301f49ff5b0f519d4fc58f2b43dacfcba89c7295b67ddea5202c0e3e615469a
ℹ Signing transaction: c301f49ff5b0f519d4fc58f2b43dacfcba89c7295b67ddea5202c0e3e615469a
🌎 Submitting deploy transaction…
🔗 https://stellar.expert/explorer/testnet/contract/CBLBFMN7GG27V3MWWVNRTBWULWNB2Z3TAO73UMSM5BQE7N4GWOWDD7ZM
✅ Deployed!
CBLBFMN7GG27V3MWWVNRTBWULWNB2Z3TAO73UMSM5BQE7N4GWOWDD7ZM


#deploy crowdfanding_factory

#deploy template
podman run -it --rm -v $(pwd):/app:Z -v ~/.config/stellar/identity:/root/.config/stellar/identity:Z stellar-builder soroban contract deploy \
    --wasm target/wasm32-unknown-unknown/release/crowdfunding_template.wasm \
    --source muca_test \
    --network testnet
ℹ Simulating install transaction…
ℹ Signing transaction: b0e6435b95b997c929385b9b72cf8956115baf417ab802395768f5ed7ac3008e
🌎 Submitting install transaction…
ℹ Using wasm hash a159d146a042b51239358ae4cf6c9e519865b59e0c30e6ebab8dd4e27a264677
ℹ Simulating deploy transaction…
ℹ Transaction hash is c301f49ff5b0f519d4fc58f2b43dacfcba89c7295b67ddea5202c0e3e615469a
🔗 https://stellar.expert/explorer/testnet/tx/c301f49ff5b0f519d4fc58f2b43dacfcba89c7295b67ddea5202c0e3e615469a
ℹ Signing transaction: c301f49ff5b0f519d4fc58f2b43dacfcba89c7295b67ddea5202c0e3e615469a
🌎 Submitting deploy transaction…
🔗 https://stellar.expert/explorer/testnet/contract/CBLBFMN7GG27V3MWWVNRTBWULWNB2Z3TAO73UMSM5BQE7N4GWOWDD7ZM
✅ Deployed!
CBLBFMN7GG27V3MWWVNRTBWULWNB2Z3TAO73UMSM5BQE7N4GWOWDD7ZM
