    import { Injectable } from '@nestjs/common';
    import * as StellarSdk from '@stellar/stellar-sdk';

    @Injectable()
    export class StellarService {
        constructor (private horizon: StellarSdk.Horizon.Server) {}

      async getAccountInfo(publicKey: string): Promise<any> {
        try {
          const account = await this.horizon.loadAccount(publicKey);
          return account;
        } catch (error) {
          console.error('Error loading account:', error);
          throw error;
        }
      }

      // ... other Stellar interactions
    }