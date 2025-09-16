#![no_std]
use soroban_sdk::{contract, contractimpl, Address, BytesN, Env, String, Symbol, Vec, log, symbol_short, vec};

#[contract]
pub struct CrowdfundingFactory;

#[contractimpl]
impl CrowdfundingFactory {
    
    pub fn create_campaign(
        env: Env,
        creator: Address,
        _campaign_id: BytesN<32>,
        title: String,
        _description: String,
        _target_amount: i128,
        _deadline: u64,
        _category: Symbol,
        _beneficiary: Address
    ) -> Address {
        log!(&env, "New crowdfunding created: ", title.clone());
        creator
    }

    pub fn list_campaigns(env: Env) -> Vec<BytesN<32>> {
        Vec::new(&env)
    }

    pub fn get_campaign_details(
        env: Env,
        _campaign_id: BytesN<32>
    ) -> (String, String, i128, u64, Symbol, Address) {
        let creator = Address::from_string(&String::from_str(&env, "GAAAAAAA"));
        (
            String::from_str(&env, "Crowdfunding Education"),
            String::from_str(&env, "Funding to Schoolarships"),
            1000000000,
            1735689600,
            symbol_short!("education"),
            creator
        )
    }

    pub fn test_accents(env: Env) -> Vec<Symbol> {
        vec![
            &env,
            symbol_short!("education"),
            symbol_short!("health"), 
            symbol_short!("culture"),
            symbol_short!("community")
        ]
    }
}