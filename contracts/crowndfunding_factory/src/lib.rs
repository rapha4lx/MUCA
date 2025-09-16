#![no_std]
use soroban_sdk::{contract, contractimpl, Address, BytesN, Env, String, Symbol, Vec, Map, log};
use soroban_sdk::contractmeta;

contractmeta!(
    title: "Crowdfunding Factory",
    description: "Factory contract to create multiple crowdfunding campaigns",
    version: "1.0.0"
);

#[contract]
pub struct CrowdfundingFactory;

#[contractimpl]
impl CrowdfundingFactory {
    
    // Cria uma nova vaquinha
    pub fn create_campaign(
        env: Env,
        creator: Address,
        campaign_id: BytesN<32>,      // ID único para cada vaquinha
        title: String,                // Título da vaquinha
        description: String,          // Descrição
        target_amount: i128,          // Meta em stroops
        deadline: u64,                // Timestamp de término
        category: Symbol,             // saúde, educação, cultura, etc
        beneficiary: Address          // Quem recebe os fundos
    ) -> Address {
        
        // Registra a criação da vaquinha
        log!(&env, "Nova vaquinha criada: ", title);
        
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
        campaign_id: BytesN<32>
    ) -> (String, String, i128, u64, Symbol, Address) {
        (
            String::from_str(&env, "Título"),
            String::from_str(&env, "Descrição"),
            1000000000,
            1735689600,
            symbol_short!("educacao"),
            Address::generate(&env)
        )
    }
}