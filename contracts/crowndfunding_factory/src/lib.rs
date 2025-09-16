#![no_std]
use soroban_sdk::{contract, contractimpl, Address, BytesN, Env, String, Symbol, Vec, log};
use soroban_sdk::contractmeta;
use soroban_sdk::symbol_short;

contractmeta!(key = "title", val = "Crowdfunding Factory");
contractmeta!(key = "description", val = "Factory contract to create multiple crowdfunding campaigns");
contractmeta!(key = "version", val = "1.0.0");

#[contract]
pub struct CrowdfundingFactory;

#[contractimpl]
impl CrowdfundingFactory {
    
    // Cria uma nova vaquinha
    pub fn create_campaign(
        env: Env,
        creator: Address,
        _campaign_id: BytesN<32>,      // ID único para cada vaquinha
        title: String,                 // Título da vaquinha
        _description: String,          // Descrição
        _target_amount: i128,          // Meta em stroops
        _deadline: u64,                // Timestamp de término
        _category: Symbol,             // saúde, educação, cultura, etc
        _beneficiary: Address          // Quem recebe os fundos
    ) -> Address {
        
        // Registra a criação da vaquinha
        log!(&env, "New crowdfunding created: ", title);
        
        // TODO: Aqui viria a lógica para implantar um novo contrato
        // Por enquanto retorna um endereço mockado
        creator
    }

    // Lista todas as vaquinhas criadas
    pub fn list_campaigns(env: Env) -> Vec<BytesN<32>> {
        Vec::new(&env) // Retorna lista vazia por enquanto
    }

    // Obtém detalhes de uma vaquinha específica
    pub fn get_campaign_details(
        env: Env,
        _campaign_id: BytesN<32>
    ) -> (String, String, i128, u64, Symbol, Address) {
        (
            String::from_str(&env, "Title"),
            String::from_str(&env, "Description"),
            1000000000,
            1735689600,
            symbol_short!("education"),
            Address::from_str(&env, "GAAAAAAA")
        )
    }
}